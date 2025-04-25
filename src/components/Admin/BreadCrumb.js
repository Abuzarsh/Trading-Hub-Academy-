import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

const DashboardBreadcrumb = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 shadow-lg rounded-lg p-4 mt-4">
      <h1 className="text-2xl text-start">Welcome to Your Dashboard</h1>
      {/* Breadcrumb container */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="›"
        className="text-gray-700 h-20 flex justify-start items-center"
      >
        {/* Home breadcrumb */}
        <Link
          href="/"
          className="flex items-center text-blue-500 hover:text-blue-700 transition-all duration-200"
        >
          <HomeIcon className="mr-2 text-lg" />
          Home
        </Link>
        {/* Dashboard breadcrumb */}
        <Link
          href="/dashboard"
          className="text-blue-500 hover:text-blue-700 transition-all duration-200"
        >
          Dashboard
        </Link>
        {/* Current Page */}
        <span className="text-gray-500">Dashboard Page</span>
      </Breadcrumbs>
    </div>
  );
};

export default DashboardBreadcrumb;
