import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WithdrawDash.css";
import { Link } from "react-router-dom";

const WithdrawDash = () => {

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
  const [withdrawData, setWithdrawData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isApproved, setIsApproved] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchWithdrawData(currentPage);
  }, [currentPage]);

  const fetchWithdrawData = async (page) => {
  try {
    const token = localStorage.getItem("token");
        const response = await axios.get(`${djangoHostname}/api/withdrws/withdraw/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
    const { data, totalEntries, totalPages } = response.data;

    // setRechargeData(Array.isArray(data) ? data : []);
    setWithdrawData(response.data);

    setIsApproved(response.data[0].is_approved)
      
    setTotalPages(totalPages > 0 ? totalPages : 1);
  } catch (error) {
    console.error("Error fetching withdraw data", error);
  }
};


  

  const handleApproveWithdrawal = async (withdrawId, withdraw_top_up, userId) => {
    setIsLoading(true); // Start loading
    try {
      const token = localStorage.getItem("token");
  
      // Fetch the current user data to get the current balance
      const userResponse = await axios.get(`${djangoHostname}/api/accounts/users/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      const currentBalance = userResponse.data.unsettle;
  
      // Calculate the new balance

      if((parseFloat(currentBalance)  > parseFloat(withdraw_top_up) || parseFloat(currentBalance)  === parseFloat(withdraw_top_up))){
        const newUnsettle = (parseFloat(currentBalance) - parseFloat(withdraw_top_up)).toFixed(1);
   
      // PATCH request to update user's unsettle balance
      await fetch(`${djangoHostname}/api/accounts/users/${userId}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unsettle: newUnsettle,
        }),
      });

            // After updating unsettle balance, approve the withdrawal
            await fetch(`${djangoHostname}/api/withdrws/withdraw/${withdrawId}/`, {
              method: "PATCH",
              headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                is_approved: true,
              }),
            });
      }else{
        alert("Unsettle Account too low")
      }
      

  

  
      // Refresh data after approval
      fetchWithdrawData(currentPage);
    } catch (error) {
      console.error("Error approving the withdrawal", error);
      alert("Error approving the withdrawal", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  

  const handleDeclineUser = async (userId) => {
    try {
      await axios.post(`/api/withdraw/${userId}/decline`);
      fetchWithdrawData(currentPage);
    } catch (error) {
      console.error("Error declining user", error);
    }
  };

  const handleDeleteUser = async (withdrawalID) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this withdrawal data?");
    if (!isConfirmed) {
      return; // If the user cancels, exit the function
    }
 
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${djangoHostname}/api/withdrws/withdraw/${withdrawalID}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    fetchWithdrawData(currentPage);
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
                Withdraw 
              </caption>
              <thead>
                <tr className="tablehead-bg">
                  <th scope="col">Recharge Method</th>
                  <th scope="col">Name</th>
                  <th scope="col">Payment Name</th>
                  <th scope="col">Payment (No)</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Amount Withdrawn</th>
                  {/* <th scope="col">Receipt</th> */}
                  <th scope="col">Control Panel</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(withdrawData) && withdrawData.length > 0 ? (
                  withdrawData.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.selectedMethod}</th>
                      <td>{item.bankName}</td>
                      <td>{item.user_firstName}</td>
                      <td>{item.bankAccountNumber}</td>
                      <td>{item.user_balance}</td>
                      <td>{item.amount}</td>
                      {/* <td>
                        <button
                          className="btn w-100 text-light px-2 py-1 rounded mx-1 dwload"
                          onClick={() => handleDownloadReceipt(item.receiptUrl)}
                        >
                          Download
                        </button>
                      </td> */}
                      <td className="d-flex">
                      <button
                        className={`w-100 btn text-light px-2 py-1 rounded mx-1 ${
                          item.is_approved ? "btn-secondary" : "btn-success"
                        }`}
                        onClick={() => handleApproveWithdrawal(item.id, item.amount, item.user)}
                        disabled={item.is_approved || isLoading} // Disable button if already approved or loading
                      >
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          item.is_approved ? "Approved" : "Approve"
                        )}
                      </button>
                        <button
                          className="btn btn-danger w-100 border-0 text-light px-2 py-1 rounded"
                          onClick={() => handleDeclineUser(item.id)}
                        >
                          Decline
                        </button>
                        <button
                          className="btn border-0 text-light px-2 mx-1 py-1 rounded"
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          <i className="bi bi-trash3 text-dark"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No withdraw data available.</td>
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

export default WithdrawDash;