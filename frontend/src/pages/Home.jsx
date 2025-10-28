import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../lib/api";
import { motion as Motion } from "framer-motion";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const [creators, setCreators] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const creatorsPerPage = 6;

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const res = await api.get("/api/creators");
      setCreators(res.data);
    } catch (err) {
      console.error("Error fetching creators:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this creator?")) {
      try {
        await api.delete(`/api/creators/${id}`);
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

  const filteredCreators = creators.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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

                <div className="card-actions justify-end mt-3 flex-wrap gap-2">
                  <Link
                    to={`/creator/${creator._id}`}
                    className="btn btn-outline btn-md"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${creator._id}`}
                    className="btn btn-warning btn-md"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-error btn-md p-4 md:p-2"
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
