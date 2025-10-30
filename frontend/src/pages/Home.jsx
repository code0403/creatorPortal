import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import api from "../lib/api";
import { motion as Motion } from "framer-motion";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [recentLogins, setRecentLogins] = useState([]);
  const [showActivity, setShowActivity] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const creatorsPerPage = 6;

  const navigate = useNavigate();

  const fetchCreators = async () => {
    try {
      const res = await api.get("/creators");
      console.log("Fetched data:", res.data);
      setCreators(res.data);
    } catch (err) {
      console.error("Error fetching creators:", err);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      const res = await api.get(`/auth/recent-logins`);
      setRecentLogins(res.data);
      setShowActivity(true);
    } catch (error) {
      console.error(`Error while fetching recent logins: ${error}`);

      if(error.response){
        const status = error.response.status;

        if(status === 401){
          toast.error(`You musted logged in to view recent logins`);
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        if(status === 403){
          toast.error(`You don't have permission to view recent logins`);
          setTimeout(() => navigate("/"), 2000);
          return;
        }
      }

      // Fallback error messsage.
      toast.error(`Something went wrong while fetching recent logins.`);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this creator?")) {
      try {
        await api.delete(`/creators/${id}`);
        toast.success("Creator deleted successfully!");

        fetchCreators();
      } catch (error) {
        console.error("Error deleting creator:", error);
        toast.error(
          error?.response?.data?.message || "Unexpected error occurred!"
        );
      }
    }
  };

  const handleSort = () => {
    const sorted = [...creators].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    console.log(sorted);
    setCreators(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredCreators = Array.isArray(creators)
    ? creators.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const indexOfLast = currentPage * creatorsPerPage;
  const indexOfFirst = indexOfLast - creatorsPerPage;
  const currentCreators = filteredCreators.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredCreators.length / creatorsPerPage);

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4 sm:px-8 md:px-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Creator Profiles
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search creator..."
              className="input input-bordered focus:outline-none border border-gray-300 p-2 rounded sw:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link to="/add" className="btn btn-primary w-full sm:w-auto">
            + Add Creator
          </Link>

          <button onClick={handleSort} className="btn btn-success p-4">
            Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"}
            )
          </button>

          <button onClick={fetchRecentActivity} className="btn btn-info p-4">View Recent Activity</button>
        </div>
      </div>

      {currentCreators.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No creators found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {currentCreators.map((creator) => (
            <Motion.div
              key={creator._id}
              className="card bg-base-100 shadow-xl 
            hover:shadow-2xl hover:shadow-gray-400 transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <figure className="relative h-48 w-full overflow-hidden">
                <img
                  src={creator.images?.[0] || "https://placehold.co/300x200"}
                  alt={creator.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg md:text-xl truncate">
                  {creator.name}
                </h2>
                <p className="text-gray-500 text-md">{creator.designation}</p>
                <p className="text-sm mt-2 line-clamp-2">{creator.about}</p>
                <p className="font-semibold mt-2 text-sm">
                  💰 Price: ${creator.price}
                </p>

                <div className="card-actions flex flex-row flex-wrap gap-2 mt-3 justify-center sm:justify-end">
                  <Link
                    to={`/creator/${creator._id}`}
                    className="btn btn-outline btn-md p-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${creator._id}`}
                    className="btn btn-warning btn-md p-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-error btn-md p-2"
                    onClick={() => handleDelete(creator._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}

      {/* Recent Activity */}
      {showActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center text-slate-900">Recent Activity</h2>
            {recentLogins.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentLogins.map((user) => (
                  <li key={user._id} className="py-2">
                    <p className="font-semibold text-emerald-950">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Last Login: {new Date(user.lastLogin).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No recent activity found.</p>
            )}
            <div className="flex justify-center mt-4">
              <button className="btn btn-warning p-2 bg-red-500 text-white-900" onClick={() => setShowActivity(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 flex-wrap gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm p-2 outline outline-gray-300 outline-1 ${
                currentPage === i + 1 ? "btn-active" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
