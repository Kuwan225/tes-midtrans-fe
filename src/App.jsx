import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import TopUp from "./pages/TopUp";
import History from "./pages/History";

const App = () => {
  return (
      <Routes>
        <Route path="/topup/:nama/:id/:harga" element={<TopUp />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<h1>Error</h1>} />
      </Routes>
  );
};

export default App;
