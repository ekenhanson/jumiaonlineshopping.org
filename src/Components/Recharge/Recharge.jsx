import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import SliderToggle2 from "../SliderToggle2/SliderToggle2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Recharge.css";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";

const Recharge = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    if (user_type !== "client" && token) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const userID = localStorage.getItem("user_id");
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amountFromQuery = queryParams.get("amount");

  const [senderName, setSenderName] = useState("");
  const [uploadProf, setUploadProf] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    account: "",
    recipient: ""
  });

  // Flash message state
  const [flashMessage, setFlashMessage] = useState(null);
  const [flashType, setFlashType] = useState(""); // "success" or "error"

  // Loader state
  const [loading, setLoading] = useState(false);

  // Fetch bank details on component mount and when selectedMethod changes
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await fetch(
          `${djangoHostname}/api/payments/bank-details/`
        );

        if (response.ok) {
          const data = await response.json();
          const dataValue = data[0];

          setBankDetails({
            bankName: dataValue.bank_name,
            account: dataValue.account_number,
            recipient: dataValue.recipient_name,
            ruth: dataValue.ruth,
            amount: formatAmount(amountFromQuery) || formatAmount(data.amount),
          });
        } else {
          console.error("Failed to fetch bank details.");
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, [djangoHostname, amountFromQuery]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
  };

  const handleFileChange = (e) => {
    setUploadProf(e.target.files[0]);
    const fileName = e.target.files[0] ? e.target.files[0].name : t('no_file_chosen');
    document.getElementById('file-name').textContent = fileName;
  };

  const handleFileUpload = async (formData) => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `${djangoHostname}/api/recharge/recharges/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setFlashMessage("File Uploaded");
        setFlashType("success");

        // Clear the input fields after successful upload
        setSenderName("");
        setUploadProf(null);
        setBankDetails({
          bankName: "",
          account: "",
          recipient: ""
        });

        // Delay the reload for 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000); // 3 seconds delay
      } else {
        setFlashMessage("Failed to upload");
        setFlashType("error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setFlashMessage("An error occurred");
      setFlashType("error");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!senderName || !uploadProf) {
      setFlashMessage("Select Receipt");
      setFlashType("error");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to upload this receipt?"
    );
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }

    const formData = new FormData();
    formData.append("user", userID);
    formData.append("payment_name", senderName);
    formData.append("recharge_method", "bank_transfer");
    formData.append("amount_top_up", bankDetails.amount);
    formData.append("receipt_image", uploadProf); // Add file to formData

    handleFileUpload(formData);
  };

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setFlashMessage("Bank account number copied to successfully!");
          setFlashType("success");
        })
        .catch((error) => {
          console.error("Copy failed", error);
          setFlashMessage("Failed to copy");
          setFlashType("error");
        });
    }
  };
  

  return (
    <div className="container px-3">
      <div className="row my-5">
        <div className="col-auto">
          <Link to={"/homepage"}>
            <i className="bi bi-arrow-left fs-3 text-dark"></i>
          </Link>
        </div>
        <div className="col-auto mx-auto">
          <h1>Recharge Account</h1>
          {/* <h1>{t("recharge_account")}</h1> */}
        </div>
      </div>
      <SliderToggle2
        selectedMethod="bank-payment" // Force selectedMethod to "bank-payment"
        setSelectedMethod={() => {}} // No-op function for setting selected method
      />
      <form className="px-2" onSubmit={handleSubmit}>
        <div className="container">
          <p>
           Step 1: Copy Account
            {/* {t("step_1")}: {t("copy_account")} */}
          </p>
        </div>
        <div className="container rounded-4 paym-card">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="text-center py-lg-5 py-4">
                <p>Bank Name</p>
                {/* <p>{t("bank_name")}</p> */}
                <p className="fw-bold">{bankDetails.bankName}</p>
                <div className="w-75 me-lg-auto mx-auto">
                  <hr className="horizontal border-3 text-white " />
                </div>
                <div className="text-center">
                  <p>Bank Account</p>
                  <p className="fw-bold">{bankDetails.account}</p>

                  <button
                    className="btn copy py-2 w-75 text-light"
                    onClick={() => copyToClipboard(bankDetails.account)}
                    style={{
                      borderRadius: "25px",
                      backgroundColor: "#FFA500",
                    }}
                  >
                    Copy Account Number
                  </button>

                  {/* Flash message displayed near the copy button */}
                  {flashMessage && (
                    <div
                      className={`alert alert-${flashType} mt-2`}
                      role="alert"
                      style={{ width: "75%", margin: "0 auto" }} // Adjust width and position
                    >
                      {flashMessage}
                    </div>
                  )}
                </div>

              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 align-self-center">
              <div className="text-center">
                <p>Amount</p>
                {/* <p>{t("amount")}</p> */}
                <p className="fw-bold">KSh{formatAmount(amountFromQuery)}</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="text-center py-lg-5 px-2">
                <p>Recipient Name</p>
                {/* <p>{t("recipient_name")}</p> */}
                <p className="fw-bold">{bankDetails.recipient}</p>
                <div className="w-100 me-lg-auto mx-auto">
                  <hr className="horizontal border-3 text-white " />
                </div>

                {/* <div className="text-center">
                  <p>RUT</p> */}
                  {/* <p>{t("rut")}</p> */}
                  {/* <p className="fw-bold">{bankDetails.ruth}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <p>
            Step 2: Upload Reciept
            {/* {t("step_2")}:{t("upload_reciept")} */}
          </p>
        </div>
        <div className="container my-3">
          <label className="fw-bold" htmlFor="username">
            Enter Name
            {/* {t("enter_name")} */}
          </label>
          <input
            type="text"
            className="form-control ps-5 py-3 border border-3 rounded-3"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder= "name"
            // placeholder={t("name")}
            required
          />
        </div>
        <div className="my-3">
          <label htmlFor="uploadProf">Upload Proof</label>
          <div className="custom-file-upload">
            <label htmlFor="uploadProf" className="custom-file-label">
              Choose File
              {/* {t("choose_file")} */}
            </label>
            <input
              type="file"
              name="uploadProf"
              id="uploadProf"
              onChange={handleFileChange}
              className="form-control border border-3 rounded-3 ps-5 file-input"
              required
              style={{ display: "none" }} // Hide the default file input
            />
            <span id="file-name">No File Chosen</span>
            {/* <span id="file-name">{t("no_file_chosen")}</span> */}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 rounded-pill my-3"
          disabled={loading}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Upload"
            // t("upload")
          )}
        </button>
        {flashMessage && (
          <div
            className={`alert alert-${flashType} text-center`}
            role="alert"
          >
            {flashMessage}
          </div>
        )}
      </form>
    </div>
  );
};

Recharge.propTypes = {
  // Define PropTypes if necessary
};

export default Recharge;
