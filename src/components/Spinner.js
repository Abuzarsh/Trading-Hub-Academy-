import React from "react";
const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black bg-opacity-50 z-50 fixed inset-0">
      <div className="flex items-center space-x-4">
        <h1 className="text-8xl font-bold">
          <span className="animate-thick-to-thin-1">T</span>
          <span className="animate-thick-to-thin-2">H</span>
          <span className="animate-thick-to-thin-3">A</span>
        </h1>
      </div>
    </div>
  );
};

export default Spinner;
