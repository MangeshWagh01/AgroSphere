import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MarketManagement() {
  const [markets, setMarkets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:8989/market/list", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const marketData = await response.json();
          setMarkets(marketData);
        } else {
          console.error("Failed to fetch markets.");
        }
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };

    fetchData();
  }, []);

  // Handle Edit
  const handleEdit = (id) => {
    navigate(`/editMarket/${id}`);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this market?")) return;

    fetch(`https://localhost:8989/market/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) =>
        response.ok
          ? setMarkets(markets.filter((market) => market.id !== id))
          : alert("Failed to delete market")
      )
      .catch((error) => alert("Error deleting market:", error));
  };

  return (
    <section>
      <h3>Markets</h3>
      <table>
        <thead>
          <tr>
            <th>Market Name</th>
            <th>Location</th>
            <th>District</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {markets.map((market) => (
            <tr key={market.id}>
              <td>{market.name}</td>
              <td>{market.address}</td>
              <td>{market.district}</td>
              <td>{market.state}</td>
              <td>
                <button onClick={() => handleEdit(market.id)}>Edit</button>
                <button onClick={() => handleDelete(market.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
