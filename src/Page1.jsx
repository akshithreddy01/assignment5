import React, { useState, useEffect } from 'react';
import { DatePicker, Input, Button, Table, Modal, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Page1 = () => {
  const [dates, setDates] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [dates, products, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching product data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    if (search) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (dates && dates.length === 2) {
      const [start, end] = dates;
      filtered = filtered.filter((product) => {
        const productDate = moment();
        return productDate.isBetween(start, end, 'days', '[]');
      });
    }

    setFilteredProducts(filtered);
  };

  const onRangeChange = (selectedDates) => {
    setDates(selectedDates);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = (values) => {
    const newProduct = {
      id: products.length + 1,
      title: values.title,
      price: values.price,
      description: values.description,
    };

    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setModalVisible(false);
    message.success('Product added successfully!');
  };

  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return current && current > moment().endOf('day');
    }
    const [startDate] = dates;
    return current && current > moment().endOf('day') && current < startDate;
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(to right, #C33764,#1D2671)', 
      minHeight: '100vh',
      color: '#fff' 
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '20px' 
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          borderRight: '4px solid #fff',
          width: '20ch',
          animation: 'typing 4s steps(15, end) infinite, blink-caret 0.75s step-end infinite'
        }}>
          Product's Catalogue
        </h2>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <RangePicker
          value={dates}
          onChange={onRangeChange}
          disabledDate={disabledDate}
          allowClear={true}
        />
        <Input
          placeholder="Search product"
          style={{ width: 300 }}
          onChange={handleSearch}
        />
        <Button type="primary" onClick={openModal}>
          Add New Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        rowKey="id"
        style={{ marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px' }}
      />

      <Modal
        title="Add New Product"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleModalSubmit}>
          <Form.Item label="Product Name" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      <style>
        {`
          @keyframes typing {
            from { width: 0; }
            to { width: 20ch; } 
          }

          @keyframes blink-caret {
            from, to { border-color: transparent; }
            50% { border-color: white; }
          }
        `}
      </style>
    </div>
  );
};

export default Page1;
