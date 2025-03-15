import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Alluser.css";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const Alluser = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Users");
        setUsers(response.data);
      } catch (error) {
        alert("No Users Found");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userid) => {
    try {
        await axios(`http://localhost:5000/UserDelete/${userid}`, {
            headers: { "Content-Type": "application/json" }
        });
        setUsers(users.filter((user) => user.userid !== userid));
    } catch (error) {
        alert("Error deleting user");
    }
};

  return (
    <div className="alluser-container">
      <div className="header">
        <button className="back-buttons" onClick={() => navigate("/Admin")}>
          <FaArrowLeft />
        </button>
        <h2 className="title">All Users</h2>
      </div>

      {users.length > 0 ? (
        <div className="user-list">
          {users.map((user) => (
            <div className="user-card" key={user.username}>
        
              <h3><span>Name:</span> {user.username}</h3>
              <h3><span>Password:</span> {user.password}</h3>
              <h3><span>Email:</span> {user.email}</h3>
              <button className="delete-button" onClick={() => handleDelete(user.userid)}>
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="no-user">No Users Found</h2>
      )}
    </div>
  );
};

export default Alluser;
