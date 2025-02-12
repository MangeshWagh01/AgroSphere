
import { useState, useEffect } from "react";

import "./Appointments.css";

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:8989/appointment/list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const appointmentsData = await response.json();

          // Get today's date in YYYY-MM-DD format (ignores time part)
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to ignore the time component
          const todayString = today.toISOString().split("T")[0]; // Today in YYYY-MM-DD format

          // Filter appointments to include only those with today's date
          const todayAppointments = appointmentsData.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            appointmentDate.setHours(0, 0, 0, 0); // Normalize appointment date to ignore time
            return appointmentDate.toISOString().split("T")[0] === todayString;
          });

          setAppointments(todayAppointments);
        } else {
          console.error("Failed to fetch appointments.");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []);

  const filteredAppointments = appointments.filter((appointment) =>
    statusFilter === "All" ? true : appointment.status === statusFilter
  );

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:8989/appointment/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status } : appointment
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      alert("Error updating status.");
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    fetch(`https://localhost:8989/appointment/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) =>
        response.ok
          ? setAppointments(appointments.filter((app) => app.id !== id))
          : alert("Failed to delete appointment")
      )
      .catch((error) => alert("Error deleting appointment:", error));
  };

  return (
    <section>
      <h3>Today's Appointments</h3>
      {/* Filter section */}
      // Add this within the return statement where your status filter is.
      <div className="filter-container">
        <label>Status Filter:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Farmer</th>
            <th>Market</th>
            <th>Product</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  {appointment.farmer.firstName} {appointment.farmer.lastName}
                </td>
                <td>{appointment.market.name}</td>
                <td>{appointment.product.prod_name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Accepted")
                    }
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(appointment.id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                  <button onClick={() => handleDelete(appointment.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No appointments for today.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
