import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { HouseDoor, Person } from 'react-bootstrap-icons';
import './NavigationBar.css';

const NavigationBar = () => {
  const location = useLocation();
  const { t } = useTranslation();


  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <Navbar bg="light" className="custom-navbar fixed-bottom">
      <Container className="justify-content-center align-items-center">
        <Nav className="d-flex justify-content-around w-100">
          <Nav.Item className={`nav-item ${isActive('/homepage')}`}>
            <Link to="/homepage" className="d-flex flex-column align-items-center text-decoration-none text-dark">
              <HouseDoor className="nav-icon" />
              <span className="nav-text">Home</span>
            </Link>
          </Nav.Item>
  
          <Nav.Item className={`nav-item grab-order ${isActive('/grab-order')}`}>
            <Link to="/grab-order" className="d-flex flex-column align-items-center text-decoration-none">
              <i className="bi bi-bag-plus nav-icon grab-order-icon"></i>
              <span className="nav-text">Grab Order</span>
            </Link>
          </Nav.Item>
          <Nav.Item className={`nav-item ${isActive('/account')}`}>
            <Link to="/account" className="d-flex flex-column text-dark align-items-center text-decoration-none">
              <Person className="nav-icon" />
              <span className="nav-text">Profile</span>
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;