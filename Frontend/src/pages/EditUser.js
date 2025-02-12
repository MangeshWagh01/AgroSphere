

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditUser.css"; // Make sure to import the CSS file for the styles

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initialize state with default values to avoid uncontrolled input
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    role: "",
    contactNo: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://localhost:8989/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserData(data); // Set user data after fetch
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form submission to update user data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const updatedData = {
      email: userData.email,
      role: userData.role,
      address: userData.address,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    try {
      const response = await fetch(`https://localhost:8989/users/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("User updated successfully!");
        navigate("/admin-dash"); // Navigate back to the admin dashboard or another page
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="edit-user-container">
      <div className="form-container">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              value={userData.firstName}
              onChange={(e) =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={userData.lastName}
              onChange={(e) =>
                setUserData({ ...userData, lastName: e.target.value })
              }
            />
          </label>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
