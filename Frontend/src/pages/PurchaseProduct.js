import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PurchaseProductForm.css";

const PurchaseProductForm = () => {
  const [formData, setFormData] = useState({
    buyerId: "",
    productId: "",
    marketId: "",
    appointmentId: "",
    quantity: "",
    rate: "",
  });

  const [buyerName, setBuyerName] = useState("");
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (userId && userName) {
      setFormData((prevData) => ({ ...prevData, buyerId: userId }));
      setBuyerName(userName);
    }

    if (!token) {
      alert("User not authenticated");
      return;
    }

    // Fetching both products and markets together
    const fetchData = async () => {
      try {
        const productResponse = axios.get(
          "https://localhost:8989/product/list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const marketResponse = axios.get("https://localhost:8989/market/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const [productsRes, marketsRes] = await Promise.all([
          productResponse,
          marketResponse,
        ]);

        setProducts(productsRes.data);
        setMarkets(marketsRes.data);
      } catch (error) {
        console.error("Error fetching products or markets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on component mount

  useEffect(() => {
    const { productId, marketId } = formData;
    if (productId && marketId) {
      const fetchAppointments = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `https://localhost:8989/appointment/appointments?marketId=${marketId}&productId=${productId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setAppointments(response.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };

      fetchAppointments();
    }
  }, [formData.productId, formData.marketId]); // Trigger fetchAppointments when productId or marketId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:8989/order/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order placed successfully!");
      console.log(response.data);
    } catch (error) {
      alert(
        "Error placing order: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Purchase Product</h2>

        <div className="input-group">
          <label htmlFor="buyerName">Buyer Name</label>
          <input
            type="text"
            id="buyerName"
            name="buyerName"
            className="input"
            value={buyerName}
            readOnly
          />
        </div>

        <div className="input-group">
          <label htmlFor="productId">Product</label>
          <select
            id="productId"
            name="productId"
            className="input"
            value={formData.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {loading ? (
              <option>Loading products...</option>
            ) : (
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.prod_name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="marketId">Market</label>
          <select
            id="marketId"
            name="marketId"
            className="input"
            value={formData.marketId}
            onChange={handleChange}
            required
          >
            <option value="">Select Market</option>
            {loading ? (
              <option>Loading markets...</option>
            ) : (
              markets.map((market) => (
                <option key={market.id} value={market.id}>
                  {market.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="appointmentId">Appointment</label>
          <select
            id="appointmentId"
            name="appointmentId"
            className="input"
            value={formData.appointmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                {appointment.id} - {appointment.farmer.firstName}{" "}
                {appointment.farmer.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="input"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="rate">Rate</label>
          <input
            type="number"
            id="rate"
            name="rate"
            className="input"
            value={formData.rate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="button">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default PurchaseProductForm;
