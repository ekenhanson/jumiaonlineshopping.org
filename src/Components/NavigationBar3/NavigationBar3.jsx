

import PropTypes from "prop-types";  // Import PropTypes
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo1 from "../assets/wallmart-logo.png";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function NavigationBar3({ toggleSidebar }) {  // Accept toggleSidebar as a prop
  return (
    <Navbar expand="md" className="nave bg-light w-100 fixed-top d-block">
      <Container>
        <Navbar.Brand href="#" className="d-none d-md-block">
          <img src={logo1} alt="Logo" />
        </Navbar.Brand>
        {/* <div className="d-block d-md-none d-flex align-items-center ms-auto text-end">
        <LanguageSwitcher/>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />
        </div> */}
        {/* <div className="d-none d-md-block d-flex align-items-center country">
          <LanguageSwitcher/>
        </div> */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Your Navbar content goes here */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


NavigationBar3.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
export default NavigationBar3;