import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import DashboardBreadcrumb from "./BreadCrumb";
import { Tabs, Tab, Box } from "@mui/material";
import PaymentDetails from "./PaymentDetails";
import apiUrl from "../../apiMethods/apiurl";

export default function AdminDashboard() {
  const [value, setValue] = useState(0);
  const [paymentData, setPaymentData] = useState([]);
  const [users, setUsers] = useState([]);

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString("en-GB", options).replace(",", "");
  };

  const PaymentDetailsApi = async () => {
    const res = await apiUrl.post("/payment/getAllPaymentList", { id: 1 });
    const payments = res.data;
    console.log(res.data);
    const formattedData = payments.map((payment) => ({
      ...payment,
      created_at: formatDate(payment.created_at),
      amount: (Number(payment.amount) / 100).toFixed(2),
    }));
    setPaymentData(formattedData);
  };

  const fetchUserDetailsApi = async () => {
    const res = await apiUrl.get("/admin/getAllUsersList");
    const users = res.data;
    const formattedData = users.map((user) => ({
      ...user,
      created_at: formatDate(user.created_at),
    }));
    setUsers(formattedData);
  };

  useEffect(() => {
    fetchUserDetailsApi();
    PaymentDetailsApi();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({ children, value, index, ...other }) => {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3, width: "100%" }}>
            <div className="mt-6 bg-gray-100 shadow-lg rounded-lg p-6">
              {children}
            </div>
          </Box>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Dashboard Container */}
      <div className="max-w-10xl mx-auto p-4">
        {/* Breadcrumb Section */}
        <DashboardBreadcrumb />

        {/* Main Content */}
        <div className="mt-6 bg-gray-100 shadow-lg rounded-lg p-3">
          {/* User Details Section */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="user tabs"
              centered
              TabIndicatorProps={{
                style: {
                  height: "4px",
                  backgroundColor: "#00796b", // Primary teal indicator
                },
              }}
              sx={{
                "& .MuiTabs-flexContainer": {
                  display: "flex",
                  justifyContent: "center",
                },
                "& .MuiTab-root": {
                  width: "100%",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                  color: "#37474f", // Subtle modern gray text color
                  borderBottom: "2px solid transparent",
                  transition: "all 0.3s ease",
                },
                "& .Mui-selected": {
                  color: "#00796b", // Active teal text color
                  borderBottom: "2px solid #00796b", // Active teal indicator color
                },
                "& .MuiTab-root:hover": {
                  color: "#004d40", // Darker teal on hover for better interaction
                },
              }}
            >
              <Tab label="User Information" />
              <Tab label="Payment" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* User Details Section */}
            <UserDetails users={users} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Payment Details Section */}
            <PaymentDetails paymentData={paymentData} />
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
