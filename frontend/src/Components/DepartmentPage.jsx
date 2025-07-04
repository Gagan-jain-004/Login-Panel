import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { Eye, Trash2, Pencil } from "lucide-react";

const DepartmentPage = ({ title, endpoint, department }) => {
  const [users, setUsers] = useState([]);
  const [popupUser, setPopupUser] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterDate, setFilterDate] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const requiredFields = [
    "name","email","password", "address","organizationCode", "city", "district", "state", "pincode",
    "principalName", "principalMobile", "coordinatorName", "coordinatorMobile",
    "schoolBoard", "schoolMedium", "schoolType", "schoolAffiliation"
  ];

  const defaultForm = {
    name: "", email: "", password: "", mobile: "", city: "", address: "", district: "", state: "", pincode: "", organizationCode: "",
    principalName: "", principalMobile: "", coordinatorName: "", coordinatorMobile: "", landline: "",
    schoolBoard: "", schoolMedium: "", schoolType: "", schoolAffiliation: "",
    physicsTeacherName: "", chemistryTeacherName: "", mathsTeacherName: "", biologyTeacherName: "",
    physicsTeacherContact: "", chemistryTeacherContact: "", mathsTeacherContact: "", biologyTeacherContact: ""
  };

  const [newUser, setNewUser] = useState(defaultForm);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(endpoint, {
        params: { search: searchTerm, page, limit: entriesPerPage, date: filterDate || "" }
      });
      setUsers(res.data.users);
      setTotalCount(res.data.total);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => { fetchUsers(); }, [searchTerm, entriesPerPage, page, filterDate]);

  const handleSearch = (e) => { setSearchTerm(e.target.value); setPage(1); };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!editingUserId) {
      const missingFields = requiredFields.filter(field => !newUser[field]?.trim());
      if (missingFields.length > 0) {
        const readable = missingFields.map(field =>
          field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
        ).join(", ");
        alert(`Please fill the required fields:\n\n${readable}`);
        return;
      }
    }

    try {
      const payload = { ...newUser, department };
      if (editingUserId) {
        await axios.put(`/api/admin/users/${editingUserId}`, payload);
      } else {
        await axios.post(endpoint, payload);
      }

      setShowFormPopup(false);
      setNewUser(defaultForm);
      setEditingUserId(null);
      setFormSubmitted(false);
      fetchUsers();
    } catch (err) {
      console.error("Add/Edit user error:", err.response?.data || err.message);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete user?")) {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers();
    }
  };

  const totalPages = Math.ceil(totalCount / entriesPerPage);

  const openEditPopup = (user) => {
    setNewUser({ ...user, password: "" });
    setEditingUserId(user._id);
    setFormSubmitted(false);
    setShowFormPopup(true);
  };

  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-20">
        {title}
        <button onClick={() => { setShowFormPopup(true); setFormSubmitted(false); }} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-20">
          Add {department}
        </button>
      </h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search " className="px-4 py-2 rounded border" />
          <input type="date" value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} className="px-3 py-2 rounded border" />
        </div>
        <select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(+e.target.value); setPage(1); }} className="px-3 py-2 rounded border">
          {[10, 20, 50].map(n => <option key={n} value={n}>{n} per page</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>{["Org.Code", "Name", "City", "Address", "Created At", "Actions"].map(h => <th key={h} className="px-4 py-2">{h}</th>)}</tr>
          </thead>
          <tbody>
            {users.length === 0
              ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-600">No records</td></tr>
              : users.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.organizationCode || "—"}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.city}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => setPopupUser(user)} className="text-blue-600 hover:text-blue-800"><Eye /></button>
                    <button onClick={() => openEditPopup(user)} className="text-green-600 hover:text-green-800"><Pencil /></button>
                    <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:text-red-800"><Trash2 /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center py-4">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
      </div>

      {popupUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">School Details</h3>
            <ul className="grid grid-cols-2 gap-4">
             {Object.entries(popupUser).map(([key, value]) => {
  if (["password", "__v", "_id", "approved"].includes(key)) return null;
  return <li key={key}><strong>{key}:</strong> {value || "—"}</li>;
})}

            </ul>
            <div className="text-right mt-6">
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => setPopupUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold">{editingUserId ? "Edit School" : "Add School"}</h3>

            {Object.entries(defaultForm).map(([key]) => {
              if (editingUserId && key === "password") return null;
              const isRequired = requiredFields.includes(key);
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()) + (isRequired ? " *" : "");
              const showRed = formSubmitted && !editingUserId && isRequired && !newUser[key]?.trim();

              if (["schoolBoard", "schoolMedium", "schoolType", "schoolAffiliation"].includes(key)) {
                const options = {
                  schoolBoard: ["CBSE", "ICSE", "STATE"],
                  schoolMedium: ["English", "Hindi", "Both"],
                  schoolType: ["Government", "Private"],
                  schoolAffiliation: ["Primary", "Secondary", "Senior Secondary"]
                }[key];

                return (
                  <div key={key}>
                    <label className="block font-semibold">{label}</label>
                    <select
                      value={newUser[key]}
                      onChange={(e) => setNewUser(n => ({ ...n, [key]: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded ${showRed ? "border-red-500" : ""}`}
                    >
                      <option value="">Select {label}</option>
                      {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                );
              }

              return (
                <div key={key}>
                  <label className="block font-semibold">{label}</label>
                  <input
                    type="text"
                    value={newUser[key]}
                    onChange={(e) => setNewUser(n => ({ ...n, [key]: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded ${showRed ? "border-red-500" : ""}`}
                  />
                </div>
              );
            })}

            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => {
                setShowFormPopup(false);
                setEditingUserId(null);
                setNewUser(defaultForm);
                setFormSubmitted(false);
              }}>Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editingUserId ? "Update" : "Save"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;

























/*
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { Eye, Trash2, Plus, Pencil } from "lucide-react";

const DepartmentPage = ({ title, endpoint, department }) => {
  const [users, setUsers] = useState([]);
  const [popupUser, setPopupUser] = useState(null);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterDate, setFilterDate] = useState("");

  const defaultForm = {
  name: "",
  email: "",
  password: "",
  mobile: "",
  city: "",
  address: "",
  organizationCode: "",
  principalName: "",
  principalMobile: "",
  coordinatorName: "",
  coordinatorMobile: "",
  landline: "",

  schoolBoard: "",
  schoolMedium: "",
  schoolType: "",
  schoolAffiliation: "",

  physicsTeacherName: "",
  chemistryTeacherName: "",
  mathsTeacherName: "",
  biologyTeacherName: "",

  physicsTeacherContact: "",
  chemistryTeacherContact: "",
  mathsTeacherContact: "",
  biologyTeacherContact: ""
};

  const [newUser, setNewUser] = useState(defaultForm);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(endpoint, {
        params: {
          search: searchTerm,
          page,
          limit: entriesPerPage,
          date: filterDate || "",
        }
      });
      setUsers(res.data.users);
      setTotalCount(res.data.total);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, entriesPerPage, page, filterDate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newUser, department };
      if (editingUserId) {
        await axios.put(`/api/admin/users/${editingUserId}`, payload);
      } else {
        await axios.post(endpoint, payload);
      }

      setShowFormPopup(false);
      setNewUser(defaultForm);
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Add/Edit user error:", err.response?.data || err.message);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete user?")) {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers();
    }
  };

  const totalPages = Math.ceil(totalCount / entriesPerPage);

  const openEditPopup = (user) => {
    setNewUser({ ...user, password: "" });
    setEditingUserId(user._id);
    setShowFormPopup(true);
  };

  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-20">
        {title}
        <button onClick={() => setShowFormPopup(true)} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-20">
          Add {department}
        </button>
      </h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search by name" className="px-4 py-2 rounded border" />
          <input type="date" value={filterDate} onChange={(e) => { setFilterDate(e.target.value); setPage(1); }} className="px-3 py-2 rounded border" />
        </div>
        <select value={entriesPerPage} onChange={(e) => { setEntriesPerPage(+e.target.value); setPage(1); }} className="px-3 py-2 rounded border">
          {[10, 20, 50].map(n => <option key={n} value={n}>{n} per page</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              {["Org.Code", "Name", "City", "Address", "Created At", "Actions"].map(h => <th key={h} className="px-4 py-2">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.length === 0
              ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-600">No records</td></tr>
              : users.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.organizationCode || "—"}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.city}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => setPopupUser(user)} className="text-blue-600 hover:text-blue-800"><Eye /></button>
                    <button onClick={() => openEditPopup(user)} className="text-green-600 hover:text-green-800"><Pencil /></button>
                    <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:text-red-800"><Trash2 /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center py-4">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
      </div>

      {/* View Popup }
      {popupUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">School Details</h3>
            <ul className="grid grid-cols-2 gap-4">
             {Object.entries(popupUser).map(([key, value]) => {
  if (key === "password" || key === "__v" || key === "_id") return null;
  return <li key={key}><strong>{key}:</strong> {value || "—"}</li>;
})}

            </ul>
            <div className="text-right mt-6">
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => setPopupUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form Popup }
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold">{editingUserId ? "Edit School " : "Add School "}</h3>

           {Object.entries(defaultForm).map(([key, _]) => {
  // Skip password field if editing
  if (editingUserId && key === "password") return null;

  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

 if (["schoolBoard", "schoolMedium", "schoolType", "schoolAffiliation"].includes(key)) {
  const options = {
    schoolBoard: ["CBSE", "ICSE", "STATE"],
    schoolMedium: ["English", "Hindi", "Both"],
    schoolType: ["Government", "Private"],
    schoolAffiliation: ["Primary", "Secondary", "Senior Secondary"]
  }[key];


    return (
      <div key={key}>
        <label className="block font-semibold">{label}</label>
        <select
          value={newUser[key]}
          onChange={(e) => setNewUser(n => ({ ...n, [key]: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select {label}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div key={key}>
      <label className="block font-semibold">{label}</label>
      <input
        type="text"
        value={newUser[key]}
        onChange={(e) => setNewUser(n => ({ ...n, [key]: e.target.value }))}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );
})}


            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => { setShowFormPopup(false); setEditingUserId(null); setNewUser(defaultForm); }}>Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{editingUserId ? "Update" : "Save"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;

*/







































/*
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { Eye, Trash2, Plus } from "lucide-react";

const DepartmentPage = ({ title, endpoint, department }) => {
  const [users, setUsers] = useState([]);
  const [popupUser, setPopupUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", city: "", address: "", mobile: "", organizationCode: "" });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filterDate, setFilterDate] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(endpoint, {
        params: {
          search: searchTerm,
          page,
          limit: entriesPerPage,
        date: filterDate || "",  
        }
      });
      setUsers(res.data.users);
      setTotalCount(res.data.total);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, entriesPerPage, page, filterDate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(endpoint, { ...newUser, department });
      setShowFormPopup(false);
      setNewUser({ name: "", email: "", password: "", city: "", address: "", mobile: "", organizationCode: "" });
      fetchUsers();
    } catch (err) {
      console.error("Add user error:", err.response?.data || err.message);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete user?")) {
      await axios.delete(`/api/admin/users/${id}`);
      fetchUsers();
    }
  };

  const totalPages = Math.ceil(totalCount / entriesPerPage);

  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-10">
        {title}
        <button onClick={() => setShowFormPopup(true)} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-10">
          Add {department}
        </button>
      </h2>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name"
            className="px-4 py-2 rounded border focus:outline-none"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => { setFilterDate(e.target.value); setPage(1); }}
            className="px-3 py-2 rounded border focus:outline-none"
          />
        </div>
        <select
          value={entriesPerPage}
          onChange={(e) => { setEntriesPerPage(+e.target.value); setPage(1); }}
          className="px-3 py-2 rounded border focus:outline-none"
        >
          {[10, 20, 50].map(n => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              {["Org.Code", "Name", "City", "Address", "Created At", "Actions"].map(h => <th key={h} className="px-4 py-2">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.length === 0
              ? <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-600">No records</td></tr>
              : users.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.organizationCode || "11011"}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.city}</td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => setPopupUser(user)} className="text-blue-600 hover:text-blue-800">
                      <Eye />
                    </button>
                    <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center py-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {popupUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <ul className="space-y-2">
              {["name", "email", "mobile", "city", "address", "role", "department", "organizationCode"].map(k => {
                const v = popupUser[k];
                const label = `${k.charAt(0).toUpperCase()}${k.slice(1)}`;
                return <li key={k}><strong>{label}:</strong> {typeof v === "boolean" ? (v ? "Yes" : "No") : v}</li>;
              })}
              <li><strong>Created At:</strong> {new Date(popupUser.createdAt).toLocaleString()}</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded" onClick={() => setPopupUser(null)}>Close</button>
          </div>
        </div>
      )}

      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-xl font-bold mb-4">Add {department} User</h3>
            {["name", "email", "password", "mobile", "city", "address", "organizationCode"].map(field => (
              <input
                key={field}
                type={field === "email" ? "email" : field === "password" ? "password" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newUser[field]}
                onChange={(e) => setNewUser(n => ({ ...n, [field]: e.target.value }))}
                className="w-full px-3 py-2 border rounded focus:outline-none"
                required
              />
            ))}
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowFormPopup(false)}>Cancel</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
*/