// BaseDropdownBank.js
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * options: [{ value: "VCB", label: "Vietcombank", icon: VietcombankSvg }, ...]
 * onChange(nextValue, nextOption)  // nhận 1 hoặc 2 tham số đều OK
 */
export default function BaseDropdownBank({
  value,
  onChange,
  options = [],
  placeholder = "Chọn",
  name = "bank",
  disabled = false,
  className = "",
  noOptionsText = "Không có lựa chọn",
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0); // index đang highlight
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);
  const optionRefs = useRef([]);

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  // đóng khi click ra ngoài
  useEffect(() => {
    const onDoc = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // khi mở menu, highlight item đang chọn
  useEffect(() => {
    if (!open) return;
    const idx = options.findIndex((o) => o.value === value);
    setHi(idx >= 0 ? idx : 0);
  }, [open, options, value]);

  // cuộn tới option đang highlight
  useEffect(() => {
    if (!open) return;
    const el = optionRefs.current[hi];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [open, hi]);

  const emitChange = (opt) => {
    if (!opt) return;
    if (typeof onChange === "function") {
      // truyền cả value và option để tuỳ bên gọi dùng 1 hay 2 tham số
      onChange(opt.value, opt);
    }
  };

  const onKeyDown = (e) => {
    if (disabled) return;

    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((i) => (i + 1) % Math.max(options.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((i) => (i - 1 + Math.max(options.length, 1)) % Math.max(options.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[hi];
      emitChange(opt);
      setOpen(false);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className={`bankselect ${className}`} ref={wrapperRef}>
      <button
        type="button"
        className={`bankselect-control${open ? " open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        disabled={disabled}
      >
        {selected ? (
          <>
            {selected.icon && <img src={selected.icon} alt="" className="bankselect-icon" />}
            <span>{selected.label}</span>
          </>
        ) : (
          <span className="bankselect-placeholder">{placeholder}</span>
        )}
        <svg className="bankselect-caret" width="18" height="18" viewBox="0 0 20 20">
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className="bankselect-menu" role="listbox" ref={menuRef} tabIndex={-1}>
          {options.length === 0 ? (
            <li className="bankselect-empty">{noOptionsText}</li>
          ) : (
            options.map((opt, i) => {
              const isSel = value === opt.value;
              const isActive = i === hi;
              return (
                <li
                  key={opt.value}
                  ref={(el) => (optionRefs.current[i] = el)}
                  role="option"
                  aria-selected={isSel}
                  className={`bankselect-option${isActive ? " active" : ""}${isSel ? " selected" : ""}`}
                  onMouseEnter={() => setHi(i)}
                  // dùng onMouseDown để chọn trước khi button mất focus
                  onMouseDown={(e) => {
                    e.preventDefault();
                    emitChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt.icon && <img src={opt.icon} alt="" className="bankselect-icon" />}
                  <span>{opt.label}</span>
                  {isSel && <span className="bankselect-check">✓</span>}
                </li>
              );
            })
          )}
        </ul>
      )}

      {/* Native select ẩn để vẫn submit form nếu cần */}
      <select
        name={name}
        value={value || ""}
        onChange={(e) => {
          const v = e.target.value;
          const opt = options.find((o) => o.value === v) || { value: v, label: v };
          emitChange(opt);
        }}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="" />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export { BaseDropdownBank };