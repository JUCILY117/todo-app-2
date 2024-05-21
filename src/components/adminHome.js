import React, { useEffect, useState } from "react";
import { faTrash, faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    }
  };

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className={`admin-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="admin-header">
        <h3>Welcome Admin</h3>
        <div>
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <button onClick={logOut} className="btn btn-primary">
            Log Out
          </button>
        </div>
      </div>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className="search-input"
        />
        <span className="record-info">
          {searchQuery.length > 0 ? `Records Found: ${data.length}` : `Total Records: ${data.length}`}
        </span>
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i) => (
              <tr key={i._id}>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.fname)}
                    className="delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
