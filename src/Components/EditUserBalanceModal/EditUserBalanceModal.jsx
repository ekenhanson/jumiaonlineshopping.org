import { useState } from "react";
import { useNavigate } from "react-router-dom";   
import PropTypes from "prop-types";
import { Modal, Alert } from "react-bootstrap";
import './EditUserBalanceModal.css';

const EditUserBalanceModal = ({ show, handleClose, firstName, lastName, balance, userId }) => {

  const navigate = useNavigate();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState(""); // State for flash message
  const [flashVariant, setFlashVariant] = useState(""); // State for flash message variant (success, danger, etc.)
  const [number, setNumber] = useState(""); // State for the number input
  const [isAdding, setIsAdding] = useState(true); // State for managing add or subtract


  // Function to send the POST request to the endpoint
  const generateLink = async () => {
    setLoading(true);
    setFlashMessage(""); // Clear any previous messages
  
    // Validate input amount
    const parsedNumber = parseFloat(number);
    if (isNaN(parsedNumber) || parsedNumber <= 0) {
      setFlashVariant("danger");
      setFlashMessage("Please enter a valid amount.");
      setLoading(false);
      return;
    }
  
    try {
      // Fetch the current user balance first
      const userResponse = await fetch(`${djangoHostname}/api/accounts/users/${userId}`);
      
      if (!userResponse.ok) {
        setFlashVariant("danger");
        setFlashMessage("Failed to fetch user data.");
        setLoading(false);
        return;
      }
      
      const userData = await userResponse.json();
      const currentBalance = parseFloat(userData.balance);
  
      // Validate that the amount is less than or equal to the current balance if subtracting
      if (!isAdding && parsedNumber > currentBalance) {
        setFlashVariant("danger");
        setFlashMessage("The amount to subtract exceeds the current balance.");
        setLoading(false);
        return;
      }
  
      // Calculate the new balance
      const newBalance = isAdding ? currentBalance + parsedNumber : currentBalance - parsedNumber;
  
      // Perform the PATCH request to update the balance
      const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          balance: newBalance
        }),
      });
  
      if (response.ok) {
        setFlashVariant("success");
        setFlashMessage(`Balance ${isAdding ? 'added to' : 'subtracted from'} user successfully!`);

        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
        
      } else {
        setFlashVariant("danger");
        setFlashMessage("An error occurred while updating the user balance.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFlashVariant("danger");
      setFlashMessage("An error occurred while updating the user balance.");
    }
    setLoading(false);
  };
  


  // Function to handle checkbox change
  const handleCheckboxChange = (type) => {
    if (type === "add") {
      setIsAdding(true);
    } else if (type === "subtract") {
      setIsAdding(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Update {`${lastName || "Users's"}`} Balance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">

          {/* Flash message */}
          {flashMessage && (
            <Alert variant={flashVariant} onClose={() => setFlashMessage("")} dismissible>
              {flashMessage}
            </Alert>
          )}

          <div className="row">
            <div className="col-md-6 mb-4">
              <label>First and Last Names</label>
              <input
                type="text"
                name="firstName"
                className="form-control rounded-end-5 border border-3"
                placeholder="First and Last Name"
                value={`${firstName || ""} ${lastName || ""}`}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-4">
              <label>{firstName || "User"} Balance </label>
              <input
                type="text"
                name="lastName"
                className="form-control rounded-end-5 border border-3"
                placeholder="Balance"
                value={balance || ""}
                readOnly
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Amount to add or subtract"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{ borderRadius: "25px" }}
            />
            <div className="mt-2">
              <label className="me-2">
                <input
                  type="checkbox"
                  checked={isAdding}
                  onChange={() => handleCheckboxChange("add")}
                  style={{ marginRight: "5px" }}
                />
                Add
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={!isAdding}
                  onChange={() => handleCheckboxChange("subtract")}
                  style={{ marginRight: "5px" }}
                />
                Subtract
              </label>
            </div>
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
              {loading
                ? "Generating..."
                : isAdding
                ? "Add Amount"
                : "Subtract Amount"}
            </button>
          </div>
     
        </div>
      </Modal.Body>
    </Modal>
  );
};

EditUserBalanceModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EditUserBalanceModal;
