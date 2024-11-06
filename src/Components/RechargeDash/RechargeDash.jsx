import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RechargeDash.css";
import { Link } from "react-router-dom";

const RechargeDash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating a function that checks user authentication and type
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");


    if (!(user_type === "admin" && token)) {
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);
  
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [rechargeData, setRechargeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingId, setLoadingId] = useState(null); // State to track which button is loading
  const [isApprovecd, setIsApproved] = useState(null); // State to track which button is loading

  useEffect(() => {
    fetchRechargeData(currentPage);
  }, [currentPage]);

  const fetchRechargeData = async (page) => {
    try {
      const response = await axios.get(`${djangoHostname}/api/recharge/recharges/`);
      //console.log("API response:", response.data); // Log entire response data

      if (Array.isArray(response.data)) {
        setRechargeData(response.data);


        // Assuming you get totalPages from elsewhere or set it to a default value
        setTotalPages(1); // Set this appropriately based on your pagination logic
      } else {
        console.error("Unexpected data format:", response.data);
        setRechargeData([]);
      }
    } catch (error) {
      console.error("Error fetching recharge data", error);
    }
  };

  const handleDownloadReceipt = async (receiptUrl, name) => {
    try {
      const response = await axios.get(receiptUrl, {
        responseType: 'blob', // Ensure the response is treated as a Blob
      });
  
      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
  
      link.href = url;
      link.setAttribute('download', name); // Specify the file name
      document.body.appendChild(link);
      link.click();
  
      // Clean up the URL object and link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
    }
  };
  
  
  

  const handlePromoteUser = async (userId, amount_top_up, itemId) => {
    setLoadingId(userId); // Set loading state for the clicked button
    try {
      const token = localStorage.getItem("token");

      // Fetch the current user data to get the current balance
      const userResponse = await axios.get(`${djangoHostname}/api/accounts/users/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const currentBalance = userResponse.data.balance;

      // Calculate the new balance
      const newBalance = (parseFloat(currentBalance) + parseFloat(amount_top_up)).toFixed(1);

      await fetch(`${djangoHostname}/api/accounts/users/${userId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            balance: newBalance,
          }),
        }
      );
      
   
      await fetch(`${djangoHostname}/api/recharge/recharges/${itemId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_approved: true,
          }),
        }
      );
      fetchRechargeData(currentPage);
    } catch (error) {
      console.error("Error promoting user", error);
    } finally {
      setLoadingId(null); // Reset loading state after the request is finished
    }
  };

  const handleDemoteUser = async (userId) => {
    try {
      await axios.post(`${djangoHostname}/api/recharge/${userId}/demote`);
      fetchRechargeData(currentPage);
    } catch (error) {
      console.error("Error demoting user", error);
    }
  };

  const handleDeleteRecharge = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this recharge data?");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${djangoHostname}/api/recharge/recharges/${userId}`);
      fetchRechargeData(currentPage);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="my-3">
        <h3 className="text-light">
          <Link to={"/admin-dashboard"} className="text-light">
            <i className="bi bi-chevron-left me-4"></i>
          </Link>
          ADMIN DASHBOARD
        </h3>
      </div>
      <div className="container bg-light rounded">
        <div className="row align-items-center">
          <div className="table-responsive">
            <table className="table caption-top text-center">
              <caption className="text-center fs-2 fw-bold text-dark py-3">
                Recharge Account
              </caption>
              <thead>
                <tr className="tablehead-bg">
                  <th scope="col">Recharge Method</th>
                  <th scope="col">Name</th>
                  <th scope="col">Payment Name</th>
                  <th scope="col">Payment No</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Amount Top-up</th>
                  <th scope="col">Receipt</th>
                  <th scope="col">Control Panel</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rechargeData) && rechargeData.length > 0 ? (
                  rechargeData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.recharge_method}</td>
                      <td>{item.user_firstName}</td>
                      <td>{item.payment_name}</td>
                      <td>{item.payment_id}</td>
                      <td>{item.user_balance}</td>
                      <td>{item.amount_top_up}</td>
                      <td>
                        {item.receipt_image && (
                          <button
                            className="btn w-100 text-light px-2 py-1 rounded mx-1 dwload"
                            onClick={() => handleDownloadReceipt(item.receipt_image, `${item.user_firstName}  $${item.amount_top_up} Receipt` )}
                          >
                            Download
                          </button>
                        )}
                      </td>
                      <td className="d-flex">
                      <button
                          className={`w-100 btn text-light px-2 py-1 rounded mx-1 ${
                            item.is_approved ? "btn-secondary" : "btn-success"
                          }`}
                          onClick={() => handlePromoteUser(item.user, item.amount_top_up, item.id)}
                          disabled={loadingId === item.user || item.is_approved} // Disable button if approved or loading
                        >
                          {item.is_approved ? "Approved" : loadingId === item.user ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          ) : (
                            "Approve"
                          )}
                        </button>
                        <button
                          className="btn btn-danger w-100 border-0 text-light px-2 py-1 rounded"
                          onClick={() => handleDemoteUser(item.user)}
                        >
                          Decline
                        </button>
                        <button
                          className="btn border-0 text-light px-2 mx-1 py-1 rounded"
                          onClick={() => handleDeleteRecharge(item.id)}
                        >
                          <i className="bi bi-trash3 text-dark"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No recharge data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  disabled={currentPage === index + 1}
                  className="page-link"
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RechargeDash;
