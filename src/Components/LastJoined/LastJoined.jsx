// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for routing
// import "./LastJoined.css";
// import SearchL from "../SearchL/SearchL";

// const LastJoined = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(10); // Number of users to display per page

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/accounts/users/`); // Replace with your API endpoint
//         const data = await response.json();

//         // Check the structure of the response
//         // Assuming `data` is the array of user objects
//         const sortedUsers = data.sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined));

//         setUsers(sortedUsers); // Set sorted users to state
//         setFilteredUsers(sortedUsers); // Initialize filtered users
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [djangoHostname]);

//   const handleSearch = (query) => {
//     const filtered = users.filter(user => 
//       `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
//       user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container-fluid my-5 bg-light rounded">
//       <div className="row">
//         <SearchL onSearch={handleSearch} />
//         <div className="table-responsive">
//           <table className="table caption-top">
//             <caption className="text-center fs-2 fw-bold text-dark py-3">
//               Last Joined Users
//             </caption>
//             <thead>
//               <tr>
//                 <th scope="col">#No.</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">ID Number</th>
//                 <th scope="col">Balance</th>
//                 <th scope="col">Join Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.length > 0 ? (
//                 currentUsers.map((user, index) => (
//                   <tr key={user.id}>
//                     <th scope="row">{indexOfFirstUser + index + 1}</th>
//                     <td>
//                       <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
//                         {user.firstName} {user.lastName}
//                       </Link>
//                     </td>
//                     <td>
//                       <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
//                         {user.invitationCode_display.code}
//                       </Link>
//                     </td>
//                     <td>KSh {user.balance}</td>
//                     <td className="d-flex justify-content-center">
//                       <span className="timy text-light px-2 py-1 rounded">
//                         {new Date(user.date_joined).toLocaleString()}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center">No users found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {filteredUsers.length > 0 && (
//         <nav>
//           <ul className="pagination justify-content-center">
//             {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map(
//               (_, index) => (
//                 <li key={index} className="page-item">
//                   <button
//                     onClick={() => paginate(index + 1)}
//                     className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               )
//             )}
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default LastJoined;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for routing
// import "./LastJoined.css";
// import SearchL from "../SearchL/SearchL";

// const LastJoined = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [usersPerPage] = useState(10); // Number of users to display per page
//   const [pagesToShow] = useState(10); // Number of pages to display in pagination

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${djangoHostname}/api/accounts/users/`); // Replace with your API endpoint
//         const data = await response.json();

//         // Sort users by date joined
//         const sortedUsers = data.sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined));

//         setUsers(sortedUsers);
//         setFilteredUsers(sortedUsers); // Initialize filtered users
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [djangoHostname]);

//   const handleSearch = (query) => {
//     const filtered = users.filter(user =>
//       `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
//       user.invitationCode_display.code.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   // Pagination logic
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPagination = () => {
//     const pages = [];
//     const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
//     const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

//     // Add "Previous" button
//     if (currentPage > 1) {
//       pages.push(
//         <li key="prev" className="page-item">
//           <button onClick={() => paginate(currentPage - 1)} className="page-link">Previous</button>
//         </li>
//       );
//     }

//     // Add first page and ellipsis if needed
//     if (startPage > 1) {
//       pages.push(
//         <li key="first" className="page-item">
//           <button onClick={() => paginate(1)} className="page-link">1</button>
//         </li>
//       );
//       if (startPage > 2) {
//         pages.push(<li key="ellipsis1" className="page-item disabled"><span className="page-link">...</span></li>);
//       }
//     }

//     // Generate page numbers
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
//           <button onClick={() => paginate(i)} className="page-link">{i}</button>
//         </li>
//       );
//     }

//     // Add last page and ellipsis if needed
//     if (endPage < totalPages - 1) {
//       pages.push(<li key="ellipsis2" className="page-item disabled"><span className="page-link">...</span></li>);
//     }
//     if (endPage < totalPages) {
//       pages.push(
//         <li key="last" className="page-item">
//           <button onClick={() => paginate(totalPages)} className="page-link">{totalPages}</button>
//         </li>
//       );
//     }

//     // Add "Next" button
//     if (currentPage < totalPages) {
//       pages.push(
//         <li key="next" className="page-item">
//           <button onClick={() => paginate(currentPage + 1)} className="page-link">Next</button>
//         </li>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="container-fluid my-5 bg-light rounded">
//       <div className="row">
//         <SearchL onSearch={handleSearch} />
//         <div className="table-responsive">
//           <table className="table caption-top">
//             <caption className="text-center fs-2 fw-bold text-dark py-3">
//               Last Joined Users
//             </caption>
//             <thead>
//               <tr>
//                 <th scope="col">#No.</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">ID Number</th>
//                 <th scope="col">Balance</th>
//                 <th scope="col">Join Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.length > 0 ? (
//                 currentUsers.map((user, index) => (
//                   <tr key={user.id}>
//                     <th scope="row">{indexOfFirstUser + index + 1}</th>
//                     <td>
//                       <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
//                         {user.firstName} {user.lastName}
//                       </Link>
//                     </td>
//                     <td>
//                       <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
//                         {user.invitationCode_display.code}
//                       </Link>
//                     </td>
//                     <td>KSh {user.balance}</td>
//                     <td className="d-flex justify-content-center">
//                       <span className="timy text-light px-2 py-1 rounded">
//                         {new Date(user.date_joined).toLocaleString()}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center">No users found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       {filteredUsers.length > 0 && (
//         <nav>
//           <ul className="pagination justify-content-center">
//             {renderPagination()}
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default LastJoined;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LastJoined.css";
import SearchL from "../SearchL/SearchL";

const LastJoined = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(`${djangoHostname}/api/accounts/users/`);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [previousPageUrl, setPreviousPageUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [pagesToShow] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(currentPageUrl);
        const data = await response.json();
        setUsers(data.results);
        setFilteredUsers(data.results); // Initialize filteredUsers with all users
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
        setTotalPages(Math.ceil(data.count / usersPerPage));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPageUrl]);
  const handleSearch = async (query) => {
    if (!query) {
      setFilteredUsers(users); // If query is empty, show all users
      return;
    }
  
    try {
      // Make a GET request to search-users endpoint
      // const response = await fetch(`http://127.0.0.1:9090//api/accounts/search-users/?q=${query}`);
      const response = await fetch(`${djangoHostname}/api/accounts/search-users/?q=${query}`);
      const data = await response.json();
  
      // Check if the response contains results and update state accordingly
      if (response.ok) {
        setFilteredUsers(data); // Assuming 'data' is an array of matching users
      } else {
        setFilteredUsers([]); // If no results found
      }
  
      setCurrentPage(1); // Reset to first page on search
    } catch (error) {
      console.error("Error searching users:", error);
      setFilteredUsers([]); // Handle error by setting no users found
    }
  };
  
  const paginate = (url) => {
    if (url) {
      setCurrentPageUrl(url);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
  
    if (previousPageUrl) {
      pages.push(
        <li key="prev" className="page-item">
          <button onClick={() => paginate(previousPageUrl)} className="page-link">Previous</button>
        </li>
      );
    }
  
    for (let i = startPage; i <= endPage; i++) {
      const pageUrl = `${djangoHostname}/api/accounts/users/?page=${i}`;
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
          <button onClick={() => paginate(pageUrl)} className="page-link">{i}</button>
        </li>
      );
    }
  
    if (nextPageUrl) {
      pages.push(
        <li key="next" className="page-item">
          <button onClick={() => paginate(nextPageUrl)} className="page-link">Next</button>
        </li>
      );
    }
  
    return pages;
  };

  return (
    <div className="container-fluid my-5 bg-light rounded">
      <div className="row">
        <SearchL onSearch={handleSearch} />
        <div className="table-responsive">
          <table className="table caption-top">
            <caption className="text-center fs-2 fw-bold text-dark py-3">
              Last Joined Users
            </caption>
            <thead>
              <tr>
                <th scope="col">#No.</th>
                <th scope="col">Name</th>
                <th scope="col">ID Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Join Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
                        {user.firstName} {user.lastName}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/profile?userId=${user.id}`} className="text-decoration-none text-dark">
                        {user.invitationCode_display?.code || "N9e75e38a6dA"}
                      </Link>
                    </td>
                    <td>KSh {user.balance}</td>
                    <td className="d-flex justify-content-center">
                      <span className="timy text-light px-2 py-1 rounded">
                        {new Date(user.date_joined).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {filteredUsers.length > 0 && (
        <nav>
          <ul className="pagination justify-content-center">
            {renderPagination()}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default LastJoined;
