import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Alert } from "react-bootstrap";
import './PasswordRecoveryModal.css';

const PasswordRecoveryModal = ({ show, handleClose }) => {
  
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(""); // State for flash message
  const [flashVariant, setFlashVariant] = useState(""); // State for flash message variant (success, danger, etc.)
  const [number, setNumber] = useState(""); // State for the number input

  // Function to send the POST request to the endpoint
  const generateLink = async () => {
    setLoading(true);
    setFlashMessage(""); // Clear any previous messages
    try {

      const response = await fetch(`${djangoHostname}/api/accounts/reset-password/`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: number, // Include the number in the request body
        }), 
      });

      if (response.ok) {
        const data = await response.json();
        setLink(data.code); // Adjust this according to the response format
        setFlashVariant("success");
        setFlashMessage("Token for password recovery generated successfully!");
      } else {
        setFlashVariant("danger");
        setFlashMessage("User with this number does not exist");
      }
    } catch (error) {
      console.error("Error:", error);
      setFlashVariant("danger");
      setFlashMessage("An error occurred while generating the link.");
    }
    setLoading(false);
  };

  const copyLink = () => {
    if (link) {
      navigator.clipboard.writeText(link);
      setFlashVariant("success");
      setFlashMessage("Link copied to clipboard!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Password Rest Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">

          {/* Flash message */}
          {flashMessage && (
            <Alert variant={flashVariant} onClose={() => setFlashMessage("")} dismissible>
              {flashMessage}
            </Alert>
          )}

          <p className="text-start pt-3">Enter Your Phone Number with Country Code</p>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{ borderRadius: "25px" }}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              value={link}
              readOnly
              style={{ borderRadius: "25px", paddingRight: "100px" }}
            />
            <button 
              className="btn generate" 
              onClick={generateLink}
              disabled={loading} // Disable button while loading
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                height: '100%',
                borderRadius: "25px",
                backgroundColor: loading ? "#d3d3d3" : "#FFA500", // Change color if loading
                color: "#fff"
              }}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="my-5">
            <button 
              className="btn copy py-2 w-75 text-light" 
              onClick={copyLink}
              disabled={!link} // Disable button if no link is generated
              style={{
                borderRadius: "25px",
                backgroundColor: "#FFA500",
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

PasswordRecoveryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PasswordRecoveryModal;
