import React from "react";
import DepartmentPage from "../Components/DepartmentPage";

const Dispatch = () => (
  <DepartmentPage title="Dispatch Users" endpoint="/api/admin/users/dispatch" department="dispatch" />
);

export default Dispatch;
