
import { useState, useEffect } from "react";
import "./Vip2Details.css";
import { Link } from "react-router-dom";
import SearchL from "../SearchL/SearchL";

const Vip2Details = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [vip2Users, setVip2Users] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [promoting, setPromoting] = useState(null);
  const [demoting, setDemoting] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const usersPerPage = 10;

  // useEffect(() => {
  //   const fetchVip2Users = async (page = 1) => {
  //     try {
  //       const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP2/`);
  //       const data = await response.json();
  //       setVip2Users(data);  // assuming response has 'results' field
  //       setTotalPages(Math.ceil(data.count / usersPerPage));  // assuming response has 'count' field
  //     } catch (error) {
  //       console.error("Error fetching VIP 2 users:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVip2Users(currentPage);
  // }, [currentPage]);
  useEffect(() => {
    const fetchVip2Users = async (page = 1) => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP2/`);
        const data = await response.json();
        //console.log(data);  // Check the structure of the API response
  
        setVip2Users(data.results || []);  // Ensure it's an array
        setTotalPages(Math.ceil(data.count / usersPerPage));  // Use data.count to calculate total pages
      } catch (error) {
        console.error("Error fetching VIP 2 users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVip2Users(currentPage);
  }, [currentPage]);
  


  const handleSearch = (query) => {
    const filtered = vipUsers.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
    );
    setVipUsers(filtered); // Update the state with the filtered users
    setCurrentPage(1); // Reset to first page on search
  };


  const promoteToVip3 = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to promote this user to VIP3 ?");
    if (!isConfirmed) return;
    setPromoting(userId);
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commission1: "0.0",
          commission2: "0.0",
          grabbed_orders_count: 0,
          level: "VIP3",
        }),
      });
      if (response.ok) {
        setVip2Users(vip2Users.filter((user) => user.id !== userId));
      } else {
        alert("Failed to promote user.");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
    } finally {
      setPromoting(null);
    }
  };

  const demoteToVip1 = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to demote this user to VIP1 ?");
    if (!isConfirmed) return;
    setDemoting(userId);
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commission1: "0.0",
          commission2: "0.0",
          grabbed_orders_count: 0,
          level: "VIP1",
        }),
      });
      if (response.ok) {
        setVip2Users(vip2Users.filter((user) => user.id !== userId));
      } else {
        alert("Failed to demote user.");
      }
    } catch (error) {
      console.error("Error demoting user:", error);
    } finally {
      setDemoting(null);
    }
  };

  const deleteUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;
    setDeleting(userId);
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVip2Users(vip2Users.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
    const start = Math.max(0, currentPage - 5);
    return start + i + 1;
  });

  const indexOfFirstUser = (currentPage - 1) * usersPerPage;

  return (
    <div className="container-fluid">
      <div className="my-3">
        <h3 className="text-light">
          <Link to={"/admin-dashboard"} className="text-light">
            <i className="bi bi-chevron-left me-4"></i>
          </Link>
          ADMIN DASHBOARD
        </h3>
      </div>
      <div className="container bg-light rounded">
        <div className="row">
          <div className="table-responsive">
          <SearchL onSearch={handleSearch} />
            <table className="table caption-top text-center">
              <caption className="text-center fs-2 fw-bold text-dark py-3">
                VIP 2 Users
              </caption>
              <thead>
                <tr>
                  <th scope="col">#No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">ID Number</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Number Of Grabs</th>
                  <th scope="col">Control Panel</th>
                </tr>
              </thead>
              <tbody>
                {vip2Users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{indexOfFirstUser + index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.invitationCode_display?.code || "N9e75e38a6dA"}</td>
                    <td>${user.balance}</td>
                    <td>({user.grabbed_orders_count})</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-success text-light w-100 px-2 py-1 rounded mx-1"
                        onClick={() => promoteToVip3(user.id)}
                        disabled={promoting === user.id}
                      >
                        {promoting === user.id ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Promote"
                        )}
                      </button>

                      <button
                        className="btn btn-warning text-light px-2 py-1 w-100 rounded mx-1"
                        onClick={() => demoteToVip1(user.id)}
                        disabled={demoting === user.id}
                      >
                        {demoting === user.id ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          "Demote"
                        )}
                      </button>

                      <button
                        className="btn btn-danger text-light px-2 py-1 rounded mx-1"
                        onClick={() => deleteUser(user.id)}
                        disabled={deleting === user.id}
                      >
                        {deleting === user.id ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <i className="bi bi-trash3"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Vip2Details;
