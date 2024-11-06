import { useState, useEffect } from "react";
import "./Vip3Details.css";
import { Link } from "react-router-dom";
import SearchL from "../SearchL/SearchL";

const Vip3Details = () => {
  const [vip3Users, setVip3Users] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [promoting, setPromoting] = useState(null);
  const [demoting, setDemoting] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const usersPerPage = 10;

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  useEffect(() => {
    const fetchVip3Users = async (page = 1) => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP3/?page=${page}`);
        const data = await response.json();

        if (page === 1) {
          // Reset users when fetching the first page
          setVip3Users(data.results);
        } else {
          // Append users for subsequent pages
          setVip3Users((prevUsers) => [...prevUsers, ...data.results]);
        }

        setFilteredUsers((prev) => {
          return page === 1 ? data.results : [...prev, ...data.results];
        });

        setTotalPages(Math.ceil(data.count / usersPerPage)); // Total pages based on count
      } catch (error) {
        console.error("Error fetching VIP 3 users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVip3Users(currentPage);
  }, [currentPage]);

  const handleSearch = (query) => {
    const filtered = vip3Users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered); // Update the state with the filtered users
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfFirstUser = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfFirstUser + usersPerPage); // Paginated current users

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Pagination logic for limiting pages to 10 displayed at a time
  const pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
    const start = Math.max(0, currentPage - 5);
    return start + i + 1;
  });

  const promoteToVip3 = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to promote this user to VIP3?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }
    setPromoting(userId); // Set loading state to the user ID
    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/users/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commission1: "0.0",
            commission2: "0.0",
            grabbed_orders_count: 0,
            level: "VIP3",
          }),
        }
      );

      if (response.ok) {
        setVip3Users(vip3Users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
      } else {
        alert("Failed to promote user.");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
    } finally {
      setPromoting(null); // Reset loading state
    }
  };

  const demoteToVip2 = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to demote this user to VIP2?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    setDemoting(userId); // Set loading state only after confirmation

    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/users/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            balance: "0.0",
            unsettle: "0.0",
            commission1: "0.0",
            commission2: "0.0",
            grabbed_orders_count: 0,
            level: "VIP2",
          }),
        }
      );

      if (response.ok) {
        setVip3Users(vip3Users.filter((user) => user.id !== userId)); // Update the state to remove the demoted user
      } else {
        alert("Failed to demote user.");
      }
    } catch (error) {
      console.error("Error demoting user:", error);
    } finally {
      setDemoting(null); // Reset loading state
    }
  };

  // Handle Deletion
  const deleteUser = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    setDeleting(userId); // Set loading state to the user ID

    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setVip3Users(vip3Users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(null); // Reset loading state
    }
  };

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
                VIP 3 Users
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
                {currentUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{indexOfFirstUser + index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.invitationCode_display?.code || "N9e75e38a6dA"}</td>
                    <td>${user.balance}</td>
                    <td>({user.grabbed_orders_count})</td>
                    <td className="d-flex justify-content-center">
                      <button
                        className="btn btn-warning text-light text-center w-100 px-2 py-1 rounded mx-1"
                        onClick={() => demoteToVip2(user.id)}
                        disabled={demoting === user.id}
                      >
                        {demoting === user.id ? (
                          <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                        ) : (
                          "Demote"
                        )}
                      </button>

                      <button
                        className="btn btn-danger text-light px-2 py-1 text-center rounded mx-1"
                        onClick={() => deleteUser(user.id)}
                        disabled={deleting === user.id}
                      >
                        {deleting === user.id ? (
                          <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handlePrevPage}>
                    Previous
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(number)}>
                      {number}
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
        </div>
      </div>
    </div>
  );
};

export default Vip3Details;

// import { useState, useEffect } from "react";
// import "./Vip3Details.css";
// import { Link } from "react-router-dom";
// import SearchL from "../SearchL/SearchL";

// const Vip3Details = () => {
//   const [vip3Users, setVip3Users] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [promoting, setPromoting] = useState(null);
//   const [demoting, setDemoting] = useState(null);
//   const [deleting, setDeleting] = useState(null);
//   const usersPerPage = 10;

//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

//   useEffect(() => {
//     const fetchVip3Users = async (page = 1) => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP3/?page=${page}`);
//         const data = await response.json();

//         if (page === 1) {
//           // Reset users when fetching the first page
//           setVip3Users(data.results);
//         } else {
//           // Append users for subsequent pages
//           setVip3Users((prevUsers) => [...prevUsers, ...data.results]);
//         }

//         setFilteredUsers((prev) => {
//           return page === 1 ? data.results : [...prev, ...data.results];
//         });

//         setTotalPages(Math.ceil(data.count / usersPerPage)); // Total pages based on count
//       } catch (error) {
//         console.error("Error fetching VIP 3 users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVip3Users(currentPage);
//   }, [currentPage]);

//   const handleSearch = (query) => {
//     const filtered = vip3Users.filter(user =>
//       `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
//       (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
//     );
//     setFilteredUsers(filtered); // Update the state with the filtered users
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const indexOfFirstUser = (currentPage - 1) * usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfFirstUser + usersPerPage); // Paginated current users

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   // Pagination logic for limiting pages to 10 displayed at a time
//   const pageNumbers = Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
//     const start = Math.max(0, currentPage - 5);
//     return start + i + 1;
//   });

//   const promoteToVip3 = async (userId) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to promote this user to VIP3?"
//     );
//     if (!isConfirmed) {
//       return; // If the user cancels, exit the function
//     }
//     setPromoting(userId); // Set loading state to the user ID
//     try {
//       const response = await fetch(
//         `${djangoHostname}/api/accounts/users/${userId}/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             commission1: "0.0",
//             commission2: "0.0",
//             grabbed_orders_count: 0,
//             level: "VIP3",
//           }),
//         }
//       );

//       if (response.ok) {
//         setVip3Users(vip3Users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
//       } else {
//         alert("Failed to promote user.");
//       }
//     } catch (error) {
//       console.error("Error promoting user:", error);
//     } finally {
//       setPromoting(null); // Reset loading state
//     }
//   };

//   const demoteToVip2 = async (userId) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to demote this user to VIP2?"
//     );
//     if (!isConfirmed) {
//       return; // If the user cancels, exit the function
//     }

//     setDemoting(userId); // Set loading state only after confirmation

//     try {
//       const response = await fetch(
//         `${djangoHostname}/api/accounts/users/${userId}/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             balance: "0.0",
//             unsettle: "0.0",
//             commission1: "0.0",
//             commission2: "0.0",
//             grabbed_orders_count: 0,
//             level: "VIP2",
//           }),
//         }
//       );

//       if (response.ok) {
//         setVip3Users(vip3Users.filter((user) => user.id !== userId)); // Update the state to remove the demoted user
//       } else {
//         alert("Failed to demote user.");
//       }
//     } catch (error) {
//       console.error("Error demoting user:", error);
//     } finally {
//       setDemoting(null); // Reset loading state
//     }
//   };

//   // Handle Deletion
//   const deleteUser = async (userId) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (!isConfirmed) {
//       return; // If the user cancels, exit the function
//     }

//     setDeleting(userId); // Set loading state to the user ID

//     try {
//       const response = await fetch(
//         `${djangoHostname}/api/accounts/users/${userId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (response.ok) {
//         setVip3Users(vip3Users.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
//       } else {
//         alert("Failed to delete user.");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     } finally {
//       setDeleting(null); // Reset loading state
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="my-3">
//         <h3 className="text-light">
//           <Link to={"/admin-dashboard"} className="text-light">
//             <i className="bi bi-chevron-left me-4"></i>
//           </Link>
//           ADMIN DASHBOARD
//         </h3>
//       </div>
//       <div className="container bg-light rounded">
//         <div className="row">
//           <div className="table-responsive">
//             <SearchL onSearch={handleSearch} />
//             <table className="table caption-top text-center">
//               <caption className="text-center fs-2 fw-bold text-dark py-3">
//                 VIP 3 Users
//               </caption>
//               <thead>
//                 <tr>
//                   <th scope="col">#No.</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">ID Number</th>
//                   <th scope="col">Balance</th>
//                   <th scope="col">Number Of Grabs</th>
//                   <th scope="col">Control Panel</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUsers.map((user, index) => (
//                   <tr key={user.id}>
//                     <th scope="row">{indexOfFirstUser + index + 1}</th>
//                     <td>{user.firstName}</td>
//                     <td>{user.invitationCode_display?.code || "N9e75e38a6dA"}</td>
//                     <td>${user.balance}</td>
//                     <td>({user.grabbed_orders_count})</td>
//                     <td className="d-flex justify-content-center">
//                       <button
//                         className="btn btn-warning text-light text-center w-100 px-2 py-1 rounded mx-1"
//                         onClick={() => demoteToVip2(user.id)}
//                         disabled={demoting === user.id}
//                       >
//                         {demoting === user.id ? (
//                           <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                         ) : (
//                           "Demote to VIP2"
//                         )}
//                       </button>
//                       <button
//                         className="btn btn-primary text-center w-100 px-2 py-1 rounded mx-1"
//                         onClick={() => promoteToVip3(user.id)}
//                         disabled={promoting === user.id}
//                       >
//                         {promoting === user.id ? (
//                           <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                         ) : (
//                           "Promote to VIP3"
//                         )}
//                       </button>
//                       <button
//                         className="btn btn-danger text-center w-100 px-2 py-1 rounded mx-1"
//                         onClick={() => deleteUser(user.id)}
//                         disabled={deleting === user.id}
//                       >
//                         {deleting === user.id ? (
//                           <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                         ) : (
//                           "Delete"
//                         )}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <nav aria-label="Page navigation example">
//               <ul className="pagination justify-content-center">
//                 <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                   <button className="page-link" onClick={handlePrevPage}>
//                     Previous
//                   </button>
//                 </li>
//                 {pageNumbers.map((page) => (
//                   <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
//                     <button className="page-link" onClick={() => setCurrentPage(page)}>
//                       {page}
//                     </button>
//                   </li>
//                 ))}
//                 <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                   <button className="page-link" onClick={handleNextPage}>
//                     Next
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Vip3Details;
