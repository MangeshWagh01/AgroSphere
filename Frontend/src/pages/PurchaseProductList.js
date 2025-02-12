
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PurchaseProductList.css'; // Import the CSS file

const PurchaseProductList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId'); // Get the userId from localStorage
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`https://localhost:8989/order/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.product.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Purchase Product Details</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by Product Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredOrders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Buyer Name</th>
              <th scope="col">Farmer Name</th>
              <th scope="col">Product Name</th>
              <th scope="col">Market Name</th>
              <th scope="col">Market Address</th>
              <th scope="col">Market District</th>
              <th scope="col">Rate (₹)</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Amount (₹)</th>
              <th scope="col">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{localStorage.getItem('userName')}</td>
                <td>{order.farmer.firstName}</td>
                <td>{order.product.prod_name}</td>
                <td>{order.market.name}</td>
                <td>{order.market.address}</td>
                <td>{order.market.district}</td>
                <td>₹{order.rate}</td>
                <td>{order.quantity}</td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PurchaseProductList;
