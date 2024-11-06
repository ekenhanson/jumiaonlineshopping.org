// // import React from 'react'
// import "./Vip1Details.css";

// const Vip1Details = () => {
//   return (
//     <div className="container-fluid">
//       <div className="container bg-light rounded">
//         <h2></h2>
//         <div className="row">

//             <div className="table-responsive">
//               <table className="table caption-top text-center">
//                 <caption className="text-center fs-2 fw-bold text-dark py-3">Last Joined Users</caption>
//                 <thead>
//                   <tr>
//                     <th scope="col">#No.</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">ID Number</th>
//                     <th scope="col">Balance</th>
//                     <th scope="col">Number Of Grabs</th>
//                     <th scope="col">Control Panel</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">1</th>
//                     <td>Mark</td>
//                     <td>23311</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td>
//                       <span className="timy text-light px-2 py-1 rounded">
//                        Promote
//                       </span>
//                       <span className="bg-danger text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">2</th>
//                     <td>Jacob</td>
//                     <td>12745622</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td>
//                     <span className="timy text-light px-2 py-1 rounded">
//                        Promote
//                       </span>
//                       <span className="bg-danger text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </span>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">3</th>
//                     <td>Larry</td>
//                     <td>43226</td>
//                     <td>$0</td>
//                     <td>(0)</td>
//                     <td>
//                     <span className="timy text-light px-2 py-1 rounded">
//                        Promote
//                       </span>
//                       <span className="bg-danger text-light px-2 mx-1 py-1 rounded">
//                       <i className="bi bi-trash3"></i>
//                       </span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Vip1Details;

// import { useEffect, useState } from "react";
// import "./Vip1Details.css";
// import { Link } from "react-router-dom";

// const Vip1Details = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [vipUsers, setVipUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(10);
//   const [deleting, setDeleting] = useState(null); // State to track loading status
//   const [promoting, setPromoting] = useState(null); // State to track loading status

//  // Fetch VIP 1 users from the backend
//  useEffect(() => {
//   const fetchVipUsers = async (url) => {
//     try {
//       const response = await fetch(url || `${djangoHostname}/api/accounts/users/by-level/VIP1/`); 
//       const data = await response.json();
//       setVipUsers(data.results);  // Update to handle paginated 'results' array
//       setNextPageUrl(data.next);
//       setPreviousPageUrl(data.previous);
//       setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 users per page
//     } catch (error) {
//       console.error("Error fetching VIP users:", error);
//     }
//   };

//   fetchVipUsers();
// }, []);

// // Fetch users for a specific page
// const fetchPage = async (pageUrl) => {
//   if (pageUrl) {
//     try {
//       const response = await fetch(pageUrl);
//       const data = await response.json();
//       setVipUsers(data.results);
//       setNextPageUrl(data.next);
//       setPreviousPageUrl(data.previous);
//       setCurrentPage(currentPage + (pageUrl === nextPageUrl ? 1 : -1));
//     } catch (error) {
//       console.error("Error fetching page:", error);
//     }
//   }
// };


//   // Handle Promotion
//   const handlePromote = async (userId) => {
//     const isConfirmed = window.confirm("Are you sure you want to promote this user?");
//     if (!isConfirmed) {
//       return; // If the user cancels, exit the function
//     }
//     setPromoting(userId); // Set loading state to the user ID
//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             // balance: "0.0",
//             // unsettle: "0.0",
//             commission1: "0.0",
//             commission2: "0.0",
//             grabbed_orders_count: 0,
//             level: "VIP2",
//           }),
//         }
//       );
  
//       if (response.ok) {
//         setVipUsers(vipUsers.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
//         // alert("User promoted successfully!");
//         // Optionally, update the UI to reflect the changes
//       } else {
//         alert("Failed to promote user.");
//       }
//     } catch (error) {
//       console.error("Error promoting user:", error);
//     }
//     finally {
//       setPromoting(null); // Reset loading state
//     }
//   };
  

//   // Handle Deletion
//   const handleDelete = async (userId) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this user?");
//     if (!isConfirmed) {
//       return; // If the user cancels, exit the function
//     }
  
//     setDeleting(userId); // Set loading state to the user ID
  
//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setVipUsers(vipUsers.filter((user) => user.id !== userId)); // Update the state to remove the deleted user
//         // alert("User deleted successfully!");
//       } else {
//         alert("Failed to delete user.");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     } finally {
//       setDeleting(null); // Reset loading state
//     }
//   };


//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = vipUsers;
//   // const currentUsers = vipUsers.slice(indexOfFirstUser, indexOfLastUser);


//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
//       <div className="container bg-light rounded ">
//         <div className="row">
//           <div className="table-responsive">
//             <table className="table caption-top text-center">
//               <caption className="text-center fs-2 fw-bold text-dark py-3">
//                 VIP 1 Users
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
//                     <td>{user.invitationCode_display?.code || "N/A"} </td>
//                     <td>${user.balance}</td>
//                     <td>({user.grabbed_orders_count})</td>
//                     <td className="d-flex justify-content-center px-3">
//                     <button
//                         className="timy text-light border-0 px-2 py-1 rounded"
//                         onClick={() => handlePromote(user.id)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {promoting === user.id ? (
//                           <button
//                             className="spinner-border spinner-border-sm text-light"
//                             role="status"
//                             aria-hidden="true"
//                           ></button>
//                         ) : (
//                           "Promote"
//                         )}
//                       </button>

//                      <button
//                         className="bg-danger border-0 text-light px-2 mx-1 py-1 rounded"
//                         onClick={() => handleDelete(user.id)}
//                         style={{ cursor: "pointer" }}
//                       >
//                         {deleting === user.id ? (
//                           <button
//                             className="spinner-border spinner-border-sm text-light"
//                             role="status"
//                             aria-hidden="true"
//                           ></button>
//                         ) : (
//                           <i className="bi bi-trash3"></i>
//                         )}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <nav>
//           <ul className="pagination justify-content-center">
//             {Array.from({
//               length: Math.ceil(vipUsers.length / usersPerPage),
//             }).map((_, index) => (
//               <li key={index} className="page-item">
//                 <button
//                   onClick={() => paginate(index + 1)}
//                   className={`page-link ${
//                     currentPage === index + 1 ? "active" : ""
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Vip1Details;


// import { useEffect, useState } from "react";
// import "./Vip1Details.css";
// import { Link } from "react-router-dom";
// import SearchL from "../SearchL/SearchL";

// const Vip1Details = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [vipUsers, setVipUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [deleting, setDeleting] = useState(null);
//   const [promoting, setPromoting] = useState(null);
//   const usersPerPage = 10;
//   const pagesToShow = 10;
//   const [startPage, setStartPage] = useState(1);

//   useEffect(() => {
//     const fetchVipUsers = async (page = 1) => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP1/`);
//         const data = await response.json();
//         setVipUsers(data); // Ensure vipUsers is always an array
//         setTotalPages(Math.ceil(data.count / usersPerPage));
//       } catch (error) {
//         console.error("Error fetching VIP users:", error);
//       }
//     };

//     fetchVipUsers(currentPage);
//   }, [currentPage]);

//   const handleSearch = (query) => {
//     const filtered = vipUsers.filter(user =>
//       `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
//       (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
//     );
//     setVipUsers(filtered); // Update the state with the filtered users
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const paginate = (url) => {
//     if (url) {
//       setCurrentPageUrl(url);
//     }
//   };

//   const handlePromote = async (userId) => {
//     const isConfirmed = window.confirm("Are you sure you want to promote this user?");
//     if (!isConfirmed) return;

//     setPromoting(userId);
//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           commission1: "0.0",
//           commission2: "0.0",
//           grabbed_orders_count: 0,
//           level: "VIP2",
//         }),
//       });

//       if (response.ok) {
//         setVipUsers(vipUsers.filter((user) => user.id !== userId));
//       } else {
//         alert("Failed to promote user.");
//       }
//     } catch (error) {
//       console.error("Error promoting user:", error);
//     } finally {
//       setPromoting(null);
//     }
//   };

//   const handleDelete = async (userId) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this user?");
//     if (!isConfirmed) return;

//     setDeleting(userId);
//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setVipUsers(vipUsers.filter((user) => user.id !== userId));
//       } else {
//         alert("Failed to delete user.");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const indexOfFirstUser = (currentPage - 1) * usersPerPage;

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleNextSet = () => {
//     if (startPage + pagesToShow <= totalPages) {
//       setStartPage(startPage + pagesToShow);
//     }
//   };

//   const handlePreviousSet = () => {
//     if (startPage - pagesToShow > 0) {
//       setStartPage(startPage - pagesToShow);
//     }
//   };

//   const paginationItems = Array.from({ length: Math.min(pagesToShow, totalPages - startPage + 1) }, (_, i) => {
//     const page = startPage + i;
//     return (
//       <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
//         <button className="page-link" onClick={() => handlePageChange(page)}>
//           {page}
//         </button>
//       </li>
//     );
//   });

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
//               <caption className="text-center fs-2 fw-bold text-dark py-3">VIP1 Users</caption>
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
//                 {vipUsers.length > 0 ? (
//                   vipUsers.map((user, index) => (
//                     <tr key={user.id}>
//                       <td>{indexOfFirstUser + index + 1}</td>
//                       <td>{user.firstName}</td>
//                       <td>{user.invitationCode_display?.code || "N9e75e38a6dA"}</td>
//                       <td>{user.balance}</td>
//                       <td>{user.grabbed_orders_count}</td>
//                       <td>
//                         <button
//                           className="timy text-light border-0 px-2 py-1 rounded"
//                           onClick={() => handlePromote(user.id)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {promoting === user.id ? (
//                             <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                           ) : (
//                             "Promote"
//                           )}
//                         </button>
//                         <button
//                           className="bg-danger border-0 text-light px-2 mx-1 py-1 rounded"
//                           onClick={() => handleDelete(user.id)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {deleting === user.id ? (
//                             <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                           ) : (
//                             <i className="bi bi-trash3"></i>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6">No users found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <nav>
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${startPage === 1 ? "disabled" : ""}`}>
//             <button className="page-link" onClick={handlePreviousSet}>
//               Previous
//             </button>
//           </li>
//           {paginationItems}
//           <li className={`page-item ${startPage + pagesToShow > totalPages ? "disabled" : ""}`}>
//             <button className="page-link" onClick={handleNextSet}>
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Vip1Details;


// import { useEffect, useState } from "react";
// import "./Vip1Details.css";
// import { Link } from "react-router-dom";
// import SearchL from "../SearchL/SearchL";

// const Vip1Details = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [vipUsers, setVipUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [deleting, setDeleting] = useState(null);
//   const [promoting, setPromoting] = useState(null);
//   const [nextPageUrl, setNextPageUrl] = useState(null);
//   const [previousPageUrl, setPreviousPageUrl] = useState(null);
//   const usersPerPage = 10;

//   useEffect(() => {
//     const fetchVipUsers = async (page = 1) => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP1/?page=${page}`);
//         const data = await response.json();
//         setVipUsers(data.results); // Set results to vipUsers
//         setTotalPages(Math.ceil(data.count / usersPerPage));
//         setNextPageUrl(data.next);
//         setPreviousPageUrl(data.previous);
//       } catch (error) {
//         console.error("Error fetching VIP users:", error);
//       }
//     };

//     fetchVipUsers(currentPage);
//   }, [currentPage]);

//   const handleSearch = (query) => {
//     const filtered = vipUsers.filter(user =>
//       `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
//       (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
//     );
//     setVipUsers(filtered); // Update the state with the filtered users
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const handlePromote = async (userId) => {
//     const isConfirmed = window.confirm("Are you sure you want to promote this user?");
//     if (!isConfirmed) return;

//     setPromoting(userId);
//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           commission1: "0.0",
//           commission2: "0.0",
//           grabbed_orders_count: 0,
//           level: "VIP2",
//         }),
//       });

//       if (response.ok) {
//         setVipUsers(vipUsers.filter((user) => user.id !== userId));
//       } else {
//         alert("Failed to promote user.");
//       }
//     } catch (error) {
//       console.error("Error promoting user:", error);
//     } finally {
//       setPromoting(null);
//     }
//   };

//   const handleDelete = async (userId) => {
//     const isConfirmed = window.confirm("Are you sure you want to delete this user?");
//     if (!isConfirmed) return;

//     setDeleting(userId);
//     try {
//       const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         setVipUsers(vipUsers.filter((user) => user.id !== userId));
//       } else {
//         alert("Failed to delete user.");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
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
//               <caption className="text-center fs-2 fw-bold text-dark py-3">VIP1 Users</caption>
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
//                 {vipUsers.length > 0 ? (
//                   vipUsers.map((user, index) => (
//                     <tr key={user.id}>
//                       <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
//                       <td>{user.firstName}</td>
//                       <td>{user.invitationCode_display?.code ||  "N9e75e38a6dA"}</td>
//                       <td>{user.balance}</td>
//                       <td>{user.grabbed_orders_count}</td>
//                       <td>
//                         <button
//                           className="timy text-light border-0 px-2 py-1 rounded"
//                           onClick={() => handlePromote(user.id)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {promoting === user.id ? (
//                             <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                           ) : (
//                             "Promote"
//                           )}
//                         </button>
//                         <button
//                           className="bg-danger border-0 text-light px-2 mx-1 py-1 rounded"
//                           onClick={() => handleDelete(user.id)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {deleting === user.id ? (
//                             <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
//                           ) : (
//                             <i className="bi bi-trash3"></i>
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6">No users found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <nav>
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//             <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               Previous
//             </button>
//           </li>
//           {[...Array(totalPages)].map((_, index) => (
//             <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
//               <button className="page-link" onClick={() => handlePageChange(index + 1)}>
//                 {index + 1}
//               </button>
//             </li>
//           ))}
//           <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//             <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Vip1Details;


import { useEffect, useState } from "react";
import "./Vip1Details.css";
import { Link } from "react-router-dom";
import SearchL from "../SearchL/SearchL";

const Vip1Details = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [vipUsers, setVipUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleting, setDeleting] = useState(null);
  const [promoting, setPromoting] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const usersPerPage = 10;
  const maxVisiblePages = 10; // Max number of visible page buttons

  useEffect(() => {
    const fetchVipUsers = async (page = 1) => {
      try {
        const response = await fetch(`${djangoHostname}/api/accounts/users/by-level/VIP1/?page=${page}`);
        const data = await response.json();
        setVipUsers(data.results); // Set results to vipUsers
        setTotalPages(Math.ceil(data.count / usersPerPage));
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
      } catch (error) {
        console.error("Error fetching VIP users:", error);
      }
    };

    fetchVipUsers(currentPage);
  }, [currentPage]);

  const handleSearch = (query) => {
    const filtered = vipUsers.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      (user.invitationCode_display && user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase()))
    );
    setVipUsers(filtered); // Update the state with the filtered users
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePromote = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to promote this user?");
    if (!isConfirmed) return;

    setPromoting(userId);
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          commission1: "0.0",
          commission2: "0.0",
          grabbed_orders_count: 0,
          level: "VIP2",
        }),
      });

      if (response.ok) {
        setVipUsers(vipUsers.filter((user) => user.id !== userId));
      } else {
        alert("Failed to promote user.");
      }
    } catch (error) {
      console.error("Error promoting user:", error);
    } finally {
      setPromoting(null);
    }
  };

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    setDeleting(userId);
    try {
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setVipUsers(vipUsers.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const visiblePages = [];
    for (let page = startPage; page <= endPage; page++) {
      visiblePages.push(page);
    }
    return visiblePages;
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
              <caption className="text-center fs-2 fw-bold text-dark py-3">VIP1 Users</caption>
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
                {vipUsers.length > 0 ? (
                  vipUsers.map((user, index) => (
                    <tr key={user.id}>
                      <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.invitationCode_display?.code ||  "N9e75e38a6dA"}</td>
                      <td>{user.balance}</td>
                      <td>{user.grabbed_orders_count}</td>
                      <td>
                        <button
                          className="timy text-light border-0 px-2 py-1 rounded"
                          onClick={() => handlePromote(user.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {promoting === user.id ? (
                            <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                          ) : (
                            "Promote"
                          )}
                        </button>
                        <button
                          className="bg-danger border-0 text-light px-2 mx-1 py-1 rounded"
                          onClick={() => handleDelete(user.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {deleting === user.id ? (
                            <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                          ) : (
                            <i className="bi bi-trash3"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {getVisiblePages().map((page) => (
            <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Vip1Details;
