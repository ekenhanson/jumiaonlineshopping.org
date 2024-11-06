import { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../assets/walmart.png";
import img2 from "../assets/bg.png";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar2 from "../NavigationBar2/NavigationBar2";
import { useTranslation } from 'react-i18next';
import PasswordRecoveryModal from "../PasswordRecoveryModal/PasswordRecoveryModal";
import EditUserBalanceModal from "../EditUserBalanceModal/EditUserBalanceModal";
import EditUserUnsettleModal from "../EditUserUnsettleModal/EditUserUnsettleModal";
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get query parameters from the URL
  const { t } = useTranslation();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  // Store userId in state
  const [userId, setUserId] = useState(null);
  
  const [formData, setFormData] = useState({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const [userDetails, setUserDetails] = useState({}); // For storing fetched user details
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditUserBalanceModal, setShowEditUserBalanceModal] = useState(false);
  const [showEditUserUnsettleModal, setShowEditUserUnsettleModal] = useState(false);

  // Functions to handle modal open and close
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenModalU = () => setShowModal(true);  
  const handleCloseModalU = () => setShowModal(false);

const handleOpenEditUserBalanceModal = () => setShowEditUserBalanceModal(true);
const handleCloseEditUserBalanceModal = () => setShowEditUserBalanceModal(false);

const handleOpenEditUserUnsettleModal = () => setShowEditUserUnsettleModal(true);
const handleCloseEditUserUnsettleModal= () => setShowEditUserUnsettleModal(false);


  // Extract userId from query params and store in state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userIdFromQuery = queryParams.get("userId");
    setUserId(userIdFromQuery); // Store userId in state
  }, [location.search]);

  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${djangoHostname}/api/accounts/users/${userId}/`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          // console.log("data:", data);
          setUserDetails(data);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError("Error fetching user details");
        }
      };

      fetchUserDetails();
    }
  }, [userId]); // Add userId as a dependency so it triggers fetch when it changes

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true); 

    const payload = {
      new_password: formData.password,
    };

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/reset-password-confirm/${formData.token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setSuccess(result.message);
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2000);
      
    } catch (error) {
      setError("Incorrect Token: " + error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false once the request is completed
    }
  };

 
  return (
    <div className="container-fluid header">
      <NavigationBar2 />
      <section className="container">
        <div className="row justify-content-center align-items-start">
          <div className="col-lg-5 col-md-6 col-sm-12 text-center mt-5">
            <div>
              <img src={img1} alt="icon" />
            </div>
            <h2>{userDetails.firstName || ""} {userDetails.lastName || ""} Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
              {/* New Readonly Fields */}
              <div className="row">
                
                <div className="col-md-6 mb-4">
                <label>User Balance </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control rounded-end-5 border border-3"
                    placeholder="Last Name"
                    value={userDetails.balance || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-4">
                <label>User Unsettle</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control rounded-end-5 border border-3"
                    placeholder="Phone"
                    value={userDetails.unsettle || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-4">
                <label>User Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control rounded-end-5 border border-3"
                    placeholder="phone"
                    value={userDetails.phone || ""}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label>User Withdrawal Password</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control rounded-end-5 border border-3"
                    placeholder="First Name"
                    value={`${userDetails.withdrawalPassword}`}
                    readOnly
                  />
                </div>
              </div>

              {/* Existing Fields */}
              <div className="input-group my-4">
                <input
                  type="text"
                  name="token"
                  className="form-control rounded-end-5 border border-3"
                  placeholder="Enter the copied token here"
                  value={formData.token}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control py-3 rounded-5 border border-3"
                  placeholder="Password"
                  // placeholder={t('password')}
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control py-3 rounded-5 border border-3"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
             
              {error && <div className="text-danger">{error}</div>}
              {success && <div className="text-success">{success}</div>}
              <div className="regs-btn my-4 fw-bold fs-4">
                <button
                  type="submit"
                  className="w-100 rounded-5 text-light py-2 reg-btn border-0"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>

            <div className="d-flex justify-content-between mt-3">
              <button 
                type="button" 
                className="btn btn-primary me-2" 
                onClick={handleOpenModal}
              >
                Get Password Reset Token
              </button>
              <PasswordRecoveryModal 
                show={showModal} 
                handleClose={handleCloseModal} 
              />

              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleOpenEditUserBalanceModal}
              >
                Edit User Balance
              </button>
              <EditUserBalanceModal 
                show={showEditUserBalanceModal} 
                handleClose={handleCloseEditUserBalanceModal} 
                firstName={userDetails.firstName} 
                lastName={userDetails.lastName} 
                balance={userDetails.balance} 
                userId={userDetails.id} 
              /> &nbsp; &nbsp;
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleOpenEditUserUnsettleModal}
              >
                Edit User Unsettlement
              </button>

              <EditUserUnsettleModal
                show={showEditUserUnsettleModal} 
                handleClose={handleCloseEditUserUnsettleModal} 
                firstName={userDetails.firstName} 
                lastName={userDetails.lastName} 
                unsettle={userDetails.unsettle} 
                userId={userDetails.id} 

              />
            </div>
          </div>
          <div className="col-lg-7 col-md-6 col-sm-12">
            <img src={img2} alt="img" className="img-fluid" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
