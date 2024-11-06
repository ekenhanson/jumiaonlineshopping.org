import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import logout from '../assets/logout.png';
import vip1 from "../assets/vip1.png";
import vip2 from "../assets/vip2.png";
import vip3 from "../assets/vip3.png";
import topup from "../assets/topup.png";
import walletdark from '../assets/walletdark.png';
import invitationdark from '../assets/invitationdark.png';
import bankdetailsdak from '../assets/bankdetailsdak.png';
import withdraw from "../assets/withdraw.png";
import DashInfoCard from "../DashInfoCard/DashInfoCard";
import LastJoined from "../LastJoined/LastJoined";
import DashNav from "../DashNav/DashNav";
import Vip1Details from "../Vip1Details/Vip1Details";
import Vip2Details from "../Vip2Details/Vip2Details";
import Vip3Details from "../Vip3Details/Vip3Details";
import RechargeDash from "../RechargeDash/RechargeDash";
import WithdrawDash from "../WithdrawDash/WithdrawDash";
import InvitationModal from "../InvitationModal/InvitationModal";
import BankDetailsModal from "../BankDetailsModal/BankDetailsModal";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");


    if (!(user_type === "admin" && token)) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

     // Modal state
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [showBankDetailsModal, setShowBankDetailsModal] = useState(false);
  const [showWalletDetailsModal, setShowWalletDetailsModal] = useState(false);

  const [openSections, setOpenSections] = useState({
    user: false,
    finance: false,
    settings: false,
  });

  const toggleSidebar = () => {
    console.log("sidebarOpen: ", sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  const handleSectionToggle = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const handleLinkClick = (view) => {
    setCurrentView(view);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Close the sidebar on mobile screens
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "vip1":
        return <Vip1Details />;
      case "vip2":
        return <Vip2Details />;
      case "vip3":
        return <Vip3Details />;
      case "topup":
        return <RechargeDash />;
      case "withdraw":
        return <WithdrawDash />;
      case "lastJoined":
        return <LastJoined />;
      default:
        return (
          <>
            <DashInfoCard />
            <LastJoined />
          </>
        );
    }
  };

 
  return (
    <div className="container-fluid">
      <div className="pb-5 mb-5">
        <DashNav toggleSidebar={toggleSidebar} />
      </div>
      <div className="row">
        <div
          className={`col-lg-3 col-md-4 pl-4 sidebar ${
            sidebarOpen ? "open" : ""
          }`}
        >
          <div className="col-lg-2 col-md-3 col-sm-12">
            <div className="flex-shrink-0 p-3" style={{ width: "400px" }}>
              <a
                href="#"
                className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
                onClick={() => handleLinkClick("dashboard")}
              >
                <span className="fs-5 fw-semibold">Home</span>
              </a>
              <ul className="list-unstyled ps-0">
                <li className="mb-1">
                  <button
                    className="btn btn-toggle d-inline-flex align-items-center rounded fs-5 border-0"
                    onClick={() => handleSectionToggle("user")}
                  >
                    <i className="bi bi-person me-2"></i> User
                    <i
                      className={`bi ms-auto toggle-icon ${
                        openSections.user ? "bi-chevron-down" : "bi-chevron-right"
                      }`}
                    ></i>
                  </button>
                  <div className={`collapse ${openSections.user ? "show" : ""}`}>
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 list-li">
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => handleLinkClick("vip1")}
                        >
                          <img src={vip1} alt="VIP 1" />
                          VIP 1
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => handleLinkClick("vip2")}
                        >
                          <img src={vip2} alt="VIP 2" />
                          VIP 2
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => handleLinkClick("vip3")}
                        >
                          <img src={vip3} alt="VIP 3" />
                          VIP 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="mb-1">
                  <button
                    className="btn btn-toggle d-inline-flex align-items-center rounded fs-5 border-0"
                    onClick={() => handleSectionToggle("finance")}
                  >
                    <i className="bi bi-bar-chart-line me-2"></i> Finance
                    <i
                      className={`bi ms-auto toggle-icon ${
                        openSections.finance ? "bi-chevron-down" : "bi-chevron-right"
                      }`}
                    ></i>
                  </button>
                  <div className={`collapse ${openSections.finance ? "show" : ""}`}>
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 list-li">
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => handleLinkClick("topup")}
                        >
                          <img src={topup} alt="Top Up" />
                          Top Up
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => handleLinkClick("withdraw")}
                        >
                          <img src={withdraw} alt="Withdrawal" />
                          Withdrawal
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="mb-1">
                  <button
                    className="btn btn-toggle d-inline-flex align-items-center rounded fs-5 border-0"
                    onClick={() => handleSectionToggle("settings")}
                  >
                    <i className="bi bi-gear me-2"></i> Settings
                    <i
                      className={`bi ms-auto toggle-icon ${
                        openSections.settings ? "bi-chevron-down" : "bi-chevron-right"
                      }`}
                    ></i>
                  </button>
                  <div className={`collapse ${openSections.settings ? "show" : ""}`}>
                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 list-li">
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => setShowInvitationModal(true)}
                        >
                          <img src={invitationdark} alt="Invitation Link" className="me-1 invy" />
                          Invitation Link
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => setShowBankDetailsModal(true)}
                        >
                          <img src={bankdetailsdak} alt="Bank Details" className="me-1 bnk" />
                          Bank Details
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="link-body-emphasis d-inline-flex align-items-center text-decoration-none rounded"
                          onClick={() => setShowWalletDetailsModal(true)}
                        >
                          <img src={walletdark} alt="Wallet Details" className="me-1 wall" />
                          Wallet Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              <hr />
              <div>
                <Link to={"/login"} className="text-decoration-none text-dark">
                  <img src={logout} alt="logout" />
                  Log out
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-lg-9 col-md-9 col-sm-12 dash">
          <div className="container-fluid">{renderContent()}</div>
        </div>
      </div>

      {/* Modals */}
      <InvitationModal
        show={showInvitationModal}
        handleClose={() => setShowInvitationModal(false)}
      />
      <BankDetailsModal
        show={showBankDetailsModal}
        handleClose={() => setShowBankDetailsModal(false)}
      />
      
    </div>
  );
};

export default AdminDashboard;
