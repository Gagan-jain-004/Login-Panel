import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import { Eye, Trash2, Plus } from "lucide-react";

const DepartmentPage = ({ title, endpoint, department }) => {
  const [users, setUsers] = useState([]);
  const [popupUser, setPopupUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", city: "", address: "", mobile: "",organizationCode:"", });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
const [filterMonth, setFilterMonth] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(endpoint, {
        params: {
          search: searchTerm,
          page,
          limit: entriesPerPage,
          month: filterMonth,
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
    
  }, [searchTerm, entriesPerPage, page,filterMonth]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(endpoint, { ...newUser, department });
      setShowFormPopup(false);
      setNewUser({ name: "", email: "", password: "", city: "", address: "", mobile: "",organizationCode:"" });
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

      <div className="flex justify-between items-center mb-4">
  <div className="flex items-center gap-2">
    <input
      type="search"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search by name"
      className="px-4 py-2 rounded border focus:outline-none"
    />
    <select
      value={filterMonth}
      onChange={(e) => { setFilterMonth(e.target.value); setPage(1); }}
      className="px-3 py-2 rounded border focus:outline-none"
    >
      <option value="">All Months</option>
      {Array.from({ length: 12 }).map((_, i) => {
        const month = (i + 1).toString().padStart(2, '0');
        const year = new Date().getFullYear();
        return (
          <option key={i} value={`${year}-${month}`}>
            {new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' })} {year}
          </option>
        );
      })}
    </select>
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
              {["Org.Code","Name", "City", "Address", "Created At", "Actions"].map(h => <th key={h} className="px-4 py-2">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.length === 0
              ? <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-600">No records</td></tr>
              : users.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{user.organizationCode||"11011"}</td>
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
            )) }
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

      {/* View User Popup */}
      {popupUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">User Details</h3>
            <ul className="space-y-2">
              {["name","email","mobile","city","address","role","department","organizationCode",].map(k => {
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

      {/* Add User Popup */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md space-y-4">
            <h3 className="text-xl font-bold mb-4">Add {department} User</h3>
            {["name","email","password","mobile","city","address","organizationCode"].map(field => (
              <input
                key={field}
                type={field === "email"? "email" : field === "password"? "password" : "text"}
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
