import React from "react";
import DepartmentPage from "../Components/DepartmentPage.jsx";

const Accounts = () => (
  <DepartmentPage title="Accounts Users" endpoint="/api/admin/users/accounts" department="accounts" />
);

export default Accounts;
