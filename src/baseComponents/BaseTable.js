// BaseTable.js
import React, { useMemo, useRef, useState } from "react";

/* ============================== Helpers ============================== */

function clsx(...arr) {
  return arr.filter(Boolean).join(" ");
}

function defaultComparator(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), "vi");
}

function Arrow({ order }) {
  return (
    <span className="bt-sort" aria-hidden>
      <span className={clsx("bt-up", order === "ascend" && "on")}>▲</span>
      <span className={clsx("bt-down", order === "descend" && "on")}>▼</span>
    </span>
  );
}

function BasePagination({ current, pageSize, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const go = (p) => onChange?.(Math.min(Math.max(1, p), pages), pageSize);
  return (
    <div className="bt-pagination">
      <button onClick={() => go(current - 1)} disabled={current <= 1}>Trước</button>
      <span>{current}/{pages}</span>
      <button onClick={() => go(current + 1)} disabled={current >= pages}>Sau</button>
    </div>
  );
}

/* ============================== BaseTable ============================== */

export default function BaseTable({
  columns = [],
  data = [],

  // khóa dòng
  rowKey = "id",

  // selection
  selectable = true,
  selectedRowKeys = [],
  onSelectionChange,          // (keys)=>void
  selectAllMode = "page",     // "page" | "all"

  // click row
  onRowClick,                 // (row, idx)=>void
  getRowClassName,            // (row, idx)=>string

  // sort (controlled hoặc uncontrolled)
  sortState,                  // { key, order: "ascend"|"descend"|null }
  onSortChange,               // (next) => void

  // pagination (controlled, optional)
  pagination,                 // { current, pageSize, total?, onChange(current,pageSize) }
  clientSide = true,          // xử lý sort/paginate phía client

  // className
  containerClassName = "order-table-container",
  tableClassName = "order-table",

  // empty
  emptyText = "Không có dữ liệu",
}) {
  /* --------- derive row key --------- */
  const getKey = (row, idx) =>
    typeof rowKey === "function" ? rowKey(row, idx) : row?.[rowKey] ?? idx;

  /* --------- sort state (uncontrolled fallback) --------- */
  const [innerSort, setInnerSort] = useState({ key: null, order: null });
  const activeSort = sortState ?? innerSort;
  const setSort = (next) => (onSortChange ? onSortChange(next) : setInnerSort(next));

  const onHeaderClick = (col) => {
    if (!col.sorter) return;
    const key = col.key || col.dataIndex;
    const cur = activeSort.key === key ? activeSort.order : null;
    const nextOrder = cur === "ascend" ? "descend" : cur === "descend" ? null : "ascend";
    setSort({ key, order: nextOrder });
  };

  /* --------- process data (sort + paginate) --------- */
  const totalRows = data.length;

  const processed = useMemo(() => {
    let arr = data;

    // client sort
    if (clientSide && activeSort?.key && activeSort.order) {
      const col = columns.find((c) => (c.key || c.dataIndex) === activeSort.key);
      if (col) {
        const cmp = typeof col.sorter === "function" ? col.sorter : defaultComparator;
        const di = col.dataIndex;
        arr = [...arr].sort((a, b) => {
          const av = di ? a[di] : a;
          const bv = di ? b[di] : b;
          const r = cmp(av, bv, a, b);
          return activeSort.order === "ascend" ? r : -r;
        });
      }
    } else {
      arr = [...arr];
    }

    // client pagination
    if (pagination && clientSide) {
      const { current, pageSize } = pagination;
      const start = (Math.max(1, current) - 1) * pageSize;
      const end = start + pageSize;
      arr = arr.slice(start, end);
    }

    return arr;
  }, [data, columns, activeSort, pagination, clientSide]);

  /* --------- selection logic --------- */
  // Chọn tất cả theo trang hay toàn bộ
  const pageKeys = processed.map(getKey);
  const allKeys = selectAllMode === "all" ? data.map(getKey) : pageKeys;

  const isAllChecked =
    selectable && allKeys.length > 0 && allKeys.every((k) => selectedRowKeys.includes(k));

  const isIndeterminate =
    selectable && allKeys.some((k) => selectedRowKeys.includes(k)) && !isAllChecked;

  const headerCheckboxRef = useRef(null);
  if (headerCheckboxRef.current) {
    headerCheckboxRef.current.indeterminate = isIndeterminate;
  }

  const toggleAll = () => {
    if (!selectable || !onSelectionChange) return;
    onSelectionChange(isAllChecked ? selectedRowKeys.filter((k) => !allKeys.includes(k)) : Array.from(new Set([...selectedRowKeys, ...allKeys])));
  };

  const toggleOne = (key) => {
    if (!selectable || !onSelectionChange) return;
    if (selectedRowKeys.includes(key)) {
      onSelectionChange(selectedRowKeys.filter((k) => k !== key));
    } else {
      onSelectionChange([...selectedRowKeys, key]);
    }
  };

  /* --------- render --------- */
  return (
    <>
      <div className={containerClassName}>
        <table className={tableClassName}>
          <thead>
            <tr>
              {selectable && (
                <th>
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={isAllChecked}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const key = col.key || col.dataIndex || col.title;
                const isSorted =
                  (col.key || col.dataIndex) === activeSort?.key && !!activeSort?.order;
                return (
                  <th
                    key={key}
                    className={clsx(col.thClassName, col.sorter && "bt-sortable")}
                    onClick={() => onHeaderClick(col)}
                    style={{ width: col.width }}
                  >
                    <span className="bt-th-inner">
                      {typeof col.title === "function" ? col.title(col) : col.title}
                      {col.sorter && <Arrow order={isSorted ? activeSort.order : null} />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {processed.length === 0 ? (
              <tr>
                <td
                  colSpan={(selectable ? 1 : 0) + columns.length}
                  style={{ textAlign: "center", padding: 16 }}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              processed.map((row, idx) => {
                const key = getKey(row, idx);
                const checked = selectedRowKeys.includes(key);
                const rowCls = getRowClassName?.(row, idx);

                return (
                  <tr key={key} className={rowCls} onClick={() => onRowClick?.(row, idx)}>
                    {selectable && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleOne(key)}
                        />
                      </td>
                    )}

                    {columns.map((col) => {
                      const cellKey = (col.key || col.dataIndex || col.title) + "_cell";
                      const val = col.dataIndex ? row[col.dataIndex] : undefined;
                      const content = col.render ? col.render(val, row, idx) : val;

                      const cellCls =
                        typeof col.className === "function"
                          ? col.className(val, row, idx)
                          : col.className;

                      return (
                        <td key={cellKey} className={cellCls} style={{ textAlign: col.align }}>
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <BasePagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total ?? totalRows}
          onChange={pagination.onChange}
        />
      )}
    </>
  );
}
