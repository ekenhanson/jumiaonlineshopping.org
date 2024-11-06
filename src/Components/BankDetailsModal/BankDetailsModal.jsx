
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Alert } from "react-bootstrap";
import "./BankDetailsModal.css";

const BankDetailsModal = ({ show, handleClose }) => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  // State for bank details and form fields
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    recipientName: "",
    ruth: "", // Default value, may not be fetched from API
  });

  // State for input fields
  const [newBankName, setNewBankName] = useState("");
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newRecipientName, setNewRecipientName] = useState("");
  const [newRuth, setRuth] = useState("");

  // State for loading and flash message
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashVariant, setFlashVariant] = useState("");

  // Fetch bank details when the modal is opened
  useEffect(() => {
    if (show) {
      const fetchBankDetails = async () => {
        try {
          const response = await fetch(`${djangoHostname}/api/payments/bank-details/1/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setBankDetails({
              bankName: data.bank_name,
              accountNumber: data.account_number,
              recipientName: data.recipient_name,
              // ruth: data.ruth 
            });
            setNewBankName(data.bank_name);
            setNewAccountNumber(data.account_number);
            setNewRecipientName(data.recipient_name);
            // setRuth(data.ruth);
          } else {
            setFlashVariant("danger");
            setFlashMessage("Failed to fetch bank details.");
          }
        } catch (error) {
          console.error("Error:", error);
          setFlashVariant("danger");
          setFlashMessage("An error occurred while fetching bank details.");
        }
      };

      fetchBankDetails();
    }
  }, [show]);

  // Function to handle form submission and send PATCH request
  const handleSubmit = async () => {
    setLoading(true);
    setFlashMessage(""); // Clear any previous messages

    const updatedBankDetails = {
      bank_name: newBankName || bankDetails.bankName,
      account_number: newAccountNumber || bankDetails.accountNumber,
      recipient_name: newRecipientName || bankDetails.recipientName,
      // ruth: newRuth || bankDetails.ruth
    };

    try {
      const response = await fetch(`${djangoHostname}/api/payments/bank-details/1/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBankDetails),
      });

      if (response.ok) {
        const data = await response.json();

        setBankDetails({
          ...bankDetails,
          bankName: data.bank_name,
          accountNumber: data.account_number,
          recipientName: data.recipient_name,
          // ruth: data.ruth,
        });

        setFlashVariant("success");
        setFlashMessage("Bank details updated successfully!");
      } else {
        setFlashVariant("danger");
        setFlashMessage("Failed to update bank details.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFlashVariant("danger");
      setFlashMessage("An error occurred while updating bank details.");
    }

    setLoading(false);

    // Clear the input fields
    setNewBankName("");
    setNewAccountNumber("");
    setNewRecipientName("");
    setRuth("");
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog w-100">
      <Modal.Header closeButton>
        <Modal.Title>Current Bank Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row justify-content-center paym-card">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="text-center py-lg-5 py-4">
              <p>Bank Name</p>
              <p>{bankDetails.bankName}</p>
              <div className="w-75 me-lg-auto mx-auto">
                <hr className="horizontal border-3 text-white" />
              </div>
              <p>Account</p>
              <p>{bankDetails.accountNumber}</p>
            </div>
          </div>
          <div className="d-none w-75 me-lg-auto mx-auto d-none d-sm-block d-md-none">
            <hr className="horizontal border-3 text-white" />
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12">
            <div className="text-center py-lg-5 py-4">
              <p>Recipient</p>
              <p>{bankDetails.recipientName}</p>
              <div className="w-75 me-lg-auto mx-auto">
                <hr className="horizontal border-3 text-white" />
              </div>
              {/* <p>RUT Number</p>
              <p>{bankDetails.ruth}</p> */}
            </div>
          </div>
        </div>

        {/* Flash message */}
        {flashMessage && (
          <Alert variant={flashVariant} onClose={() => setFlashMessage("")} dismissible>
            {flashMessage}
          </Alert>
        )}

        <div className="text-start my-4">
          <label htmlFor="newBankName" className="text-start">
            New Bank Name
          </label>
          <input
            type="text"
            name="newBankName"
            id="newBankName"
            className="form-control rounded-3 border border-2"
            placeholder="Enter new bank name"
            value={newBankName}
            onChange={(e) => setNewBankName(e.target.value)}
          />
        </div>
        <div className="text-start my-4">
          <label htmlFor="newRecipientName" className="text-start">
            New Recipient Name
          </label>
          <input
            type="text"
            name="newRecipientName"
            id="newRecipientName"
            className="form-control rounded-3 border border-2"
            placeholder="Enter new recipient name"
            value={newRecipientName}
            onChange={(e) => setNewRecipientName(e.target.value)}
          />
        </div>
        <div className="text-start my-4">
          <label htmlFor="newAccountNumber" className="text-start">
            New Account Number
          </label>
          <input
            type="number"
            name="newAccountNumber"
            id="newAccountNumber"
            className="form-control rounded-3 border border-2"
            placeholder="Enter new account number"
            value={newAccountNumber}
            onChange={(e) => setNewAccountNumber(e.target.value)}
          />
        </div>
        {/* <div className="text-start my-4">
          <label htmlFor="ruthName" className="text-start">
           RUT
          </label>
          <input
            type="text"
            name="newRuth"
            id="newRuth"
            className="form-control rounded-3 border border-2"
            placeholder="Enter new RUT"
            value={newRuth}
            onChange={(e) => setRuth(e.target.value)}
          />
        </div> */}
        <div className="my-4">
          <button
            className="btn change text-light"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

BankDetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BankDetailsModal;

