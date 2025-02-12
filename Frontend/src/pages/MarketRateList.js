

import { useState, useEffect } from 'react';
import './MarketRateList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MarketRateList() {
  const [rates, setRates] = useState([]);
  const [filteredRates, setFilteredRates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minRate, setMinRate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRates = async () => {
      try {
        const response = await fetch('https://localhost:8989/rate/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setRates(data);
          setFilteredRates(data);
        } else {
          console.error("Failed to fetch rates.");
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterData(e.target.value, minRate);
  };

  const handleRateChange = (e) => {
    setMinRate(e.target.value);
    filterData(searchTerm, e.target.value);
  };

  const filterData = (productName, minRateValue) => {
    const filtered = rates.filter(rate =>
      rate.product.prod_name.toLowerCase().includes(productName.toLowerCase()) &&
      (minRateValue === '' || rate.rate >= parseFloat(minRateValue))
    );
    setFilteredRates(filtered);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Market Rates</h2>
    
    <center>
      {/* Search and Filter Section */}
      <div className="d-flex justify-content-center mb-4">
        <div className="d-flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control w-auto"
          />
          <input
            type="number"
            placeholder="Min Rate"
            value={minRate}
            onChange={handleRateChange}
            className="form-control w-auto"
          />
        </div>
      </div>
      </center>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Sr.No</th>
              <th>Market Name</th>
              <th>Address</th>
              <th>District</th>
              <th>Product Name</th>
              <th>Updated On</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredRates.length > 0 ? (
              filteredRates.map((rate, index) => (
                <tr key={rate.id}>
                  <td>{index + 1}</td>
                  <td>{rate.market.name}</td>
                  <td>{rate.market.address}</td>
                  <td>{rate.market.district}</td>
                  <td>{rate.product.prod_name}</td>
                  <td>{rate.update_on}</td>
                  <td>{rate.rate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

