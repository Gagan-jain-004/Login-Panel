import React from "react";
import DepartmentPage from "../Components/DepartmentPage";
 

const IT = () => (
  <DepartmentPage title="IT Users" endpoint="/api/admin/users/it" department="it" />
  
);

export default IT;
