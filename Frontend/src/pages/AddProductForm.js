
import { useState, useEffect } from "react";
import "./AddProductForm.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [marketId, setMarketId] = useState("");
  const [markets, setMarkets] = useState([]); // State to hold market data

  useEffect(() => {
    // Fetch markets from the backend
    const fetchMarkets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://localhost:8989/market/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMarkets(data);
        } else {
          console.error("Failed to fetch markets");
        }
      } catch (error) {
        console.error("Error fetching markets:", error);
      }
    };

    fetchMarkets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      prod_name: productName,
      prod_qty: productQty,
      prod_description: productDescription,
      market: {
        id: marketId,
      },
    };

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://localhost:8989/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setProductName("");
        setProductQty("");
        setProductDescription("");
        setMarketId("");
      } else if (response.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error while adding product:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="container-fluid px-3 py-5">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Add Product</h2>

        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productQty">Product Quantity</label>
          <input
            type="number"
            id="productQty"
            className="form-control"
            value={productQty}
            onChange={(e) => setProductQty(e.target.value)}
            placeholder="Enter product quantity"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            className="form-control"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="marketSelect">Market Name</label>
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

        <button type="submit" className="btn btn-primary btn-block">
          Add Product
        </button>
      </form>
    </div>
  );
}
