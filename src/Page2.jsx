import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'antd';

const Page2 = () => {
  const location = useLocation();
  const { products } = location.state || {};  // Safely retrieve products

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

  if (!products || products.length === 0) {
    return <h3>No products to display</h3>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product List - Page 2</h2>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default Page2;
