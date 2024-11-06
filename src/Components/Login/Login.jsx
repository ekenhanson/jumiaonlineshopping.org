import { useState, useEffect } from "react";
import axios from 'axios';
import "./Login.css";
import img1 from "../assets/walmart.png";
import img2 from "../assets/bg.png";
import img3 from "../assets/reg-img.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar2 from "../NavigationBar2/NavigationBar2";
import Forbidden from "../Forbidden/Forbidden";
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    termsAccepted: false,
  });

  const [countryCodes, setCountryCodes] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data.map(country => ({
          code: `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`,
          country: country.name.common,
          flag: country.flags.svg,
        }));
        countries.sort((a, b) => a.country.localeCompare(b.country));
        setCountryCodes(countries);
      } catch (error) {
        console.error('Error fetching country codes:', error);
      }
    };

    const fetchUserCountryCode = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setCountryCode(response.data.country_calling_code);
      } catch (error) {
        console.error('Error fetching user country code:', error);
      }
    };

    fetchCountryCodes();
    fetchUserCountryCode();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const payload = {
      phone: `${countryCode}${formData.phone}`,
      password: formData.password,
    };

    try {
      const response = await fetch(`${djangoHostname}/api/accounts/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network_response");
      }

      const result = await response.json();
      setSuccess("Login successful");

      localStorage.setItem("token", result.token);
      localStorage.setItem("user_type", result.user_type);
      localStorage.setItem("user_id", result.user_id);
      localStorage.setItem("phone", result.phone);
      localStorage.setItem("firstName", result.firstName);
      localStorage.setItem("lastName", result.lastName);
      const userInvitationCode = result.user_invitation_code?.code || '';
      localStorage.setItem("user_invitation_code", userInvitationCode);

      if (result.user_type === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/homepage');
      }

    } catch (error) {
      setError("Login Failed  " + error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open modal
  const handleOpenModal = () => setShowModal(true);

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container-fluid header py-5">
      <NavigationBar2 />
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12 text-center mt-5">
            <div>
              {/* <img src={img1} alt="icon" /> */}
            </div>
            <div className="py-3">
              <h2 className="text-start">Login</h2>
              <p className="text-start">Welcome back! Please login to your account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group my-4">
                <select
                  className="form-select rounded-start-5 py-3 border border-2"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((code) => (
                    <option key={code.country} value={code.code}>
                      <img src={code.flag} alt={code.country} style={{ width: '20px', marginRight: '10px' }} />
                      {code.code} ({code.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  className="form-control rounded-end-5 border border-2"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group my-4 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control py-3 rounded-5 border border-2"
                  placeholder="Password"
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
              <div className="text-start d-flex justify-content-between">
                <div>
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />{" "}
                  <span>Remember me</span>
                </div>
                <div className="text-end">
                  <button 
                    type="button" 
                    className="btn btn-primary me-2" 
                    onClick={handleOpenModal}
                  >
                    Forgotten Password
                  </button>
                  <Forbidden 
                    showF={showModal} 
                    handleCloseF={handleCloseModal} 
                  />
                </div>
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
                    'Login'
                  )}
                </button>
              </div>
              <div>
                <p>
                Don't have an account?
                  <Link to={'/registration'} className="sub-login">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
            <div className="container reg-con">
              <img src={img2} alt="" className="img-fluid vh-100 img-reg-1" />
              <img src={img3} alt="" className="img-fluid img-reg-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
