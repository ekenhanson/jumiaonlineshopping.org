import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashInfoCard.css";
import active from "../assets/active.png";
import balance from "../assets/userbalance.png";
import deposite from "../assets/deposit.png";
import withd from "../assets/with.png";

const DashInfoCard = () => {

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
  const [dashboardData, setDashboardData] = useState({
    activeUsers: 0,
    userBalance: 0,
    deposit: 0,
    withdrawals: 0,
    totalAmountTopUp: 0, 
    totalAmountWithdraw: 0 // New state for total withdrawals amount
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
    
        // Fetch account users data
        const usersResponse = await fetch(`${djangoHostname}/api/accounts/users/`);
        const usersData = await usersResponse.json();
        // console.log("Users data:", usersData);
    
        // Check if results exist in the response
        if (!Array.isArray(usersData.results)) {
          throw new Error("Expected an array in usersData.results but got:", usersData.results);
        }
    
        // Fetch recharge data
        const rechargeResponse = await fetch(`${djangoHostname}/api/recharge/recharges/`);
        const rechargeData = await rechargeResponse.json();
    
        // Fetch withdrawal data
        const withdrawalResponse = await fetch(`${djangoHostname}/api/withdrws/withdraw/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const withdrawData = await withdrawalResponse.json();
    
        // Calculate the total number of users
        const totalUsers = usersData.count;
    
        // Calculate the total top-up amount
        const totalAmountTopUp = Array.isArray(rechargeData)
          ? rechargeData.reduce((sum, recharge) => sum + parseFloat(recharge.amount_top_up), 0)
          : 0;
    
        // Calculate the total withdrawal amount
        const totalAmountWithdraw = Array.isArray(withdrawData)
          ? withdrawData.reduce((sum, withdraw) => sum + parseFloat(withdraw.amount), 0)
          : 0;
    
        // Use usersData.results for the user data calculations
        setDashboardData({
          activeUsers: totalUsers,
          userBalance: usersData.results.reduce((sum, user) => sum + parseFloat(user.balance), 0),
          deposit: usersData.results.reduce((sum, user) => sum + parseFloat(user.commission1), 0),
          withdrawals: usersData.results.reduce((sum, user) => sum + parseFloat(user.commission2), 0),
          totalAmountTopUp: totalAmountTopUp,
          totalAmountWithdraw: totalAmountWithdraw,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    
    // const fetchData = async () => {
    //   try {
    //     const token = localStorage.getItem("token");

    //     // Fetch account users data
    //     const usersResponse = await fetch(`${djangoHostname}/api/accounts/users/`);
    //     const usersData = await usersResponse.json();
    //     console.log("Users data:", usersData);

    //     // Fetch recharge data
    //     const rechargeResponse = await fetch(`${djangoHostname}/api/recharge/recharges/`);
    //     const rechargeData = await rechargeResponse.json();

    //     // Fetch withdrawal data
    //     const withdrawalResponse = await fetch(`${djangoHostname}/api/withdrws/withdraw/`, {
    //       headers: {
    //         Authorization: `Token ${token}`,
    //       },
    //     });
    //     const withdrawData = await withdrawalResponse.json();

    //     // Calculate the total number of users
    //     const totalUsers = usersData.length;

    //     // Calculate the total top-up amount
    //     const totalAmountTopUp = rechargeData.reduce(
    //       (sum, recharge) => sum + parseFloat(recharge.amount_top_up),
    //       0
    //     );

    //     // Calculate the total withdrawal amount
    //     const totalAmountWithdraw = withdrawData.reduce(
    //       (sum, withdraw) => sum + parseFloat(withdraw.amount),
    //       0
    //     );

    //     setDashboardData({
    //       activeUsers: totalUsers,
    //       userBalance: usersData.reduce((sum, user) => sum + parseFloat(user.balance), 0),
    //       deposit: usersData.reduce((sum, user) => sum + parseFloat(user.commission1), 0), 
    //       withdrawals: usersData.reduce((sum, user) => sum + parseFloat(user.commission2), 0),
    //       totalAmountTopUp: totalAmountTopUp,
    //       totalAmountWithdraw: totalAmountWithdraw // Update with total withdrawal amount
    //     });
    //   } catch (error) {
    //     console.error("Error fetching dashboard data:", error);
    //   }
    // };

    fetchData();
  }, [djangoHostname]);


  return (
    <div>
      <div className="container">
        <h3 className="text-light my-4">ADMIN DASHBOARD</h3>
        <div className="row gy-3">
          <div className="col-lg-3 col-md-6 col-sm-12 h-50">
            <div className="rounded-3 px-3 py-4 active-user">
              <div>
                <img src={active} alt="Active Users" className="img-fluid" />
              </div>
              <h5 className="fw-bold mt-3">{dashboardData.activeUsers}</h5>
              <span>Active Users</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="rounded-3 px-3 py-4 user-bal">
              <div>
                <img src={balance} alt="Users Balance" className="img-fluid" />
              </div>
              <h5 className="fw-bold mt-3">KSh {dashboardData.userBalance}</h5>
              <span>Users Balance</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="rounded-3 px-3 py-4 depo">
              <div>
                <img src={deposite} alt="Deposit" className="img-fluid" />
              </div>
              <h5 className="fw-bold mt-3">KSh {dashboardData.totalAmountTopUp}</h5>
              <span>Deposit</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="rounded-3 px-3 py-4 take w-100">
              <div>
                <img src={withd} alt="Withdrawals" className="img-fluid" />
              </div>
              <h5 className="fw-bold mt-3">KSh {dashboardData.totalAmountWithdraw}</h5>
              <span>Withdrawals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashInfoCard;
