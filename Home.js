import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = formData;
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setFormData({ name: "", email: "", age: "", password: "" });
    setEditIndex(null);
  };

  const handleAdd = () => {
    if (!formData.name || !formData.email || !formData.age || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    const newUsers = [...users, formData];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setFormData({ name: "", email: "", age: "", password: "" });
  };

  return (
    <div className="container home-container mt-5">
      <h2 className="text-center mb-4">{editIndex !== null ? "Edit User" : "Add User"}</h2>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card p-4 mb-4 shadow-sm">
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center">
                {editIndex !== null ? (
                  <button className="btn btn-primary mt-2" onClick={handleUpdate}>
                    Update
                  </button>
                ) : (
                  <button className="btn btn-success mt-2" onClick={handleAdd}>
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>

          <h4 className="text-center">Registered Users</h4>
          <table className="table table-bordered table-hover table-striped mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
