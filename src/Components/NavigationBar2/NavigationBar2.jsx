// import Container from "react-bootstrap/Container";
// import CountryCode from '../CountryCode/CountryCode'
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo1 from "../assets/wallmart-logo.png";

// function NavigationBar2() {
//   return (
//     <Navbar expand="lg" className="nave bg-light w-100 fixed-top">
//       <Container>
//         <Navbar.Brand href="#">
//           <img src={logo1} alt="" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           ></Nav>
//           <div className="notification d-flex align-items-center">
//             <div className="country">
//               <CountryCode />
//             </div>

//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar2;

// import React from 'react';
// import Container from "react-bootstrap/Container";
// import CountryCode from "../CountryCode/CountryCode"; // Adjust import path as needed
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import logo1 from "../assets/wallmart-logo.png";
// // import { LanguageProvider } from '../context/LanguageContext'; // Adjust import path as needed

// function NavigationBar2() {
//   return (
//     <Navbar expand="lg" className="nave">
//       <Container>
//         <Navbar.Brand href="#">
//           <img src={logo1} alt="" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: "100px" }}
//             navbarScroll
//           ></Nav>
//           <div className="notification d-flex align-items-center">
//             <div className="country">
//               <CountryCode />
//             </div>
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavigationBar2;

import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo1 from "../assets/wallmart-logo.png";
import logo2 from "../assets/walmart-semi-logo.png";
//import logo1 from "../assets/jumia_logo.png";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { Navigate } from "react-router-dom";

function NavigationBar2() {
  return (
    <Navbar expand="lg" className="nave bg-light w-100 fixed-top">
      <Container>
        <Navbar.Brand href="#" onClick={Navigate('/homepage')}>
          <img src={logo2} alt="Logo" />
        </Navbar.Brand>
        <div className="notification d-flex align-items-center ms-auto">
          <div className="">
            {/* <CountryCode /> */}
            {/* <LanguageSwitcher/> */}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar2;
