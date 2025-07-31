import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles/Trade/trade.scss';
import moment from 'moment';
import TransferForm from '../pages/Formpayment'; // 

const { Option } = Select;

const columnsConfig = [
  { title: 'STT', dataIndex: 'STT', key: 'STT', type: 'number' },
  { title: 'Thời gian yêu cầu', dataIndex: 'date', key: 'date', type: 'date' },
  { title: 'Tên người nhận', dataIndex: 'name', key: 'name', type: 'text' },
  { title: 'STK nhận', dataIndex: 'account', key: 'account', type: 'text' },
  {
    title: 'Ngân hàng nhận',
    dataIndex: 'bank',
    key: 'bank',
    type: 'combobox',
    options: ['Techcombank', 'Vietcombank', 'BIDV']
  },
  {
    title: 'Số tiền chuyển (VND)',
    dataIndex: 'amount',
    key: 'amount',
    type: 'number',
    render: (amount) => amount.toLocaleString('vi-VN')
  },
  {
    title: 'Phí (VND)',
    dataIndex: 'fee',
    key: 'fee',
    type: 'number',
    render: (fee) => fee.toLocaleString('vi-VN')
  },
  { title: 'Loại phí', dataIndex: 'tfee', key: 'tfee', type: 'text' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    type: 'combobox',
    options: ['Chờ thanh toán', 'Đã thanh toán', 'Huỷ'],
    render: (status) => {
      let className = 'status';
      if (status === 'Chờ thanh toán') className += ' waiting';
      else if (status === 'Đã thanh toán') className += ' success';
      else if (status === 'Huỷ') className += ' cancel';
      return <span className={className}>{status}</span>;
    }
  }
];

const initialData = [
  {
    key: '1',
    STT: 1,
    name: 'Võ Thị Quỳnh',
    date: '03/05/2021, 00:00',
    account: '132592298',
    bank: 'Techcombank',
    amount: 10000000,
    fee: 1000,
    tfee: '--',
    status: 'Chờ thanh toán'
  },
  {
    key: '2',
    STT: 2,
    name: 'Võ Thị Quỳnh',
    date: '03/05/2021, 00:00',
    account: '132592298',
    bank: 'Techcombank',
    amount: 10000000,
    fee: 1000,
    tfee: '--',
    status: 'Chờ thanh toán'
  },
  {
    key: '3',
    STT: 3,
    name: 'Bùi Thị Kim',
    date: '03/05/2021, 00:00',
    account: '132592298',
    bank: 'Techcombank',
    amount: 10000000,
    fee: 1000,
    tfee: '--',
    status: 'Đã thanh toán'
  },
  {
    key: '4',
    STT: 4,
    name: 'Trần Thị Zô',
    date: '03/05/2021, 00:00',
    account: '132592298',
    bank: 'Techcombank',
    amount: 10000000,
    fee: 1000,
    tfee: '--',
    status: 'Chờ thanh toán'
  },
  {
    key: '5',
    STT: 5,
    name: 'Thái Thị Vân',
    date: '03/05/2021, 00:00',
    account: '132592298',
    bank: 'Techcombank',
    amount: 10000000,
    fee: 1000,
    tfee: '--',
    status: 'Huỷ'
  }
];

const Trade = () => {
  const [data, setData] = useState(initialData);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  const handleTransferClick = () => {
    setShowForm(true);
  };

  const showEditModal = (item) => {
    form.setFieldsValue({
      ...item,
      date: item.date ? moment(item.date, 'DD/MM/YYYY, HH:mm') : null
    });
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedItem = {
        ...editingItem,
        ...values,
        date: values.date.format('DD/MM/YYYY, HH:mm')
      };
      const newData = data.map((item) =>
        item.key === editingItem.key ? updatedItem : item
      );
      setData(newData);
      setIsModalOpen(false);
    });
  };

  const columns = [
    ...columnsConfig.map((col) => ({
      ...col,
      render: col.render || ((text) => text)
    })),
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <div className="actions">
          <Button
            icon={<EditOutlined />}
            className="edit-btn-trade"
            onClick={() => showEditModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            className="delete-btn-trade"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      )
    }
  ];

  return (
    <div className="container">
      <div className="header-section">
        <div className="left__header">
          <h1 className="header--page text">Chuyển tiền Online</h1>
        </div>
        <div className="right__header">
          <button className='right--page text' onClick={handleTransferClick}>Chuyển khoản</button>
        </div>
        {/* FORM chuyển khoản (import từ TransferForm.jsx) */}
        {showForm && <TransferForm onCancel={() => setShowForm(false)} />}
      </div>

      <div className="search-form">
        {/* Form tìm kiếm */}
        <div className="form-group">
          <label htmlFor="account-select">Tài khoản</label>
          <select id="account-select" className="input-field">
            <option value="206582897">206582897</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="from-date">Từ ngày</label>
          <input type="date" id="from-date" className="input-field" />
        </div>

        <div className="form-group">
          <label htmlFor="to-date">Đến ngày</label>
          <input type="date" id="to-date" className="input-field" />
        </div>

        <div className="form-group">
          <label htmlFor="bankID">Số tài khoản nhận</label>
          <select className="input-field">
            <option value="206582897">206582897</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Trạng thái</label>
          <select className="input-field">
            <option value="all">All</option>
            <option value="waiting">Chờ thanh toán</option>
            <option value="success">Đã thanh toán</option>
            <option value="cancel">Huỷ</option>
          </select>
        </div>

        <div className="form-group">
          <button className="search-btn">Tìm kiếm</button>
        </div>
      </div>

      <div className="table__section">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="key"
        />
      </div>

      <Modal
        title="Chỉnh sửa dữ liệu"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          {columnsConfig.map((col) => (
            <Form.Item
              key={col.dataIndex}
              label={col.title}
              name={col.dataIndex}
              rules={[{ required: true, message: `Vui lòng nhập ${col.title}` }]}
            >
              {col.type === 'text' && <Input />}
              {col.type === 'number' && <Input type="number" />}
              {col.type === 'date' && <DatePicker showTime style={{ width: '100%' }} />}
              {col.type === 'combobox' && (
                <Select>
                  {col.options.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default Trade;
