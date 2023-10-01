import React from "react";

const Button = ({ children, primary,handler,className }) => {
  return (
    <>
      {primary ? (
        <button
        onClick={handler}
          type="button"
          className={`text-white text-xl font-bold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
        >
          {children}
        </button>
      ) : (
        <button
        onClick={handler}
          type="button"
          className={`text-white text-xl bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ${className}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
