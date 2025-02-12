import { useState, useEffect } from "react";
import './AppointmentBookingForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Alert } from 'react-bootstrap';

export default function AppointmentBookingForm() {
  const [farmerId] = useState(localStorage.getItem('userId') || '');
  const [marketId, setMarketId] = useState('');
  const [productId, setProductId] = useState('');
  const [date, setDate] = useState('');
  const [markets, setMarkets] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const farmerName = localStorage.getItem('userName') || 'Unknown Farmer';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const marketResponse = await fetch('https://localhost:8989/market/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const productResponse = await fetch('https://localhost:8989/product/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (marketResponse.ok && productResponse.ok) {
          setMarkets(await marketResponse.json());
          setProducts(await productResponse.json());
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error) {
        setError("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      farmer: { id: farmerId },
      market: { id: marketId },
      product: { id: productId },
      date: date
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://localhost:8989/appointment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        setMarketId('');
        setProductId('');
        setDate('');
      } else if (response.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error while booking appointment:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="container my-5">
      <form className="form shadow-lg p-4" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Book Appointment</h2>

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <>
            <div className="form-group mb-3">
              <label>Farmer</label>
              <input
                type="text"
                className="form-control"
                value={farmerName}
                readOnly
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="marketSelect">Market</label>
              <select
                id="marketSelect"
                className="form-control"
                value={marketId}
                onChange={(e) => setMarketId(e.target.value)}
              >
                <option value="">Select a Market</option>
                {markets.map((market) => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="productSelect">Product</label>
              <select
                id="productSelect"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                <option value="">Select a Product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.prod_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Book Appointment</button>
          </>
        )}
      </form>
    </div>
  );
}
