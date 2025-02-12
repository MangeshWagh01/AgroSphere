import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditMarket.css"; // Import the CSS file

const EditMarket = () => {
  const { id } = useParams(); // Get the market ID from the URL
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMarket = async () => {
      try {
        const response = await fetch(`https://localhost:8989/market/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarket();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const updatedData = {
      name: marketData.name,
      address: marketData.address,
      district: marketData.district,
      state: marketData.state,
    };

    try {
      const response = await fetch(`https://localhost:8989/market/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Market updated successfully!");
        navigate("/admin-dash"); // Navigate back to the admin dashboard or another page
      } else {
        alert("Failed to update market.");
      }
    } catch (error) {
      console.error("Error updating market:", error);
    }
  };

  if (!marketData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-market-container">
      <h2>Edit Market</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Market Name:</label>
          <input
            type="text"
            value={marketData.name}
            onChange={(e) =>
              setMarketData({ ...marketData, name: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={marketData.address}
            onChange={(e) =>
              setMarketData({ ...marketData, address: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>District:</label>
          <input
            type="text"
            value={marketData.district}
            onChange={(e) =>
              setMarketData({ ...marketData, district: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            value={marketData.state}
            onChange={(e) =>
              setMarketData({ ...marketData, state: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditMarket;
