
import PropTypes from "prop-types";  // Import PropTypes
import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode';
import Navbar from "react-bootstrap/Navbar";
import logo1 from "../assets/wallmart-logo.png";
import Search from "../Search/Search";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";

function DashNav({ toggleSidebar }) {  // Accept toggleSidebar as a prop
  return (
    <Navbar expand="md" className="nave bg-light w-100 fixed-top d-block">
      <Container>
        <Navbar.Brand href="#" className="d-none d-md-block">
          <img src={logo1} alt="Logo" />
        </Navbar.Brand>
        <div className="d-block d-md-none d-flex align-items-center ms-auto text-end">
          {/* <Search/> */}
          <ProfileNavbar/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
        </div>
        <div className="d-none d-md-block d-flex align-items-center flex-start">
          <Search/>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
        <div className="d-none d-md-block ms-auto ">
        <ProfileNavbar/>
        </div>
          {/* Your Navbar content goes here */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


DashNav.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
export default DashNav;



// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import PropTypes from 'prop-types';
// import './DashNav.css';

// const Search = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleInputChange = (e) => {
//     const newQuery = e.target.value;
//     setQuery(newQuery);
//     onSearch(newQuery); // Trigger search on every input change
//   };

//   return (
//     <div className="container-fluid">
//       <div className="container">
//         <div className="form-group search-input-wrapper">
//           <input 
//             type="search" 
//             className="form-control" 
//             placeholder="Search..." 
//             value={query} 
//             onChange={handleInputChange} 
//           />
//           <button type="button" className="search-icon-btn">
//             <FaSearch />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// Search.propTypes = {
//   onSearch: PropTypes.func.isRequired,
// };

// export default Search;