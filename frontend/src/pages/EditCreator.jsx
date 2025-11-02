import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Link, useNavigate, useParams } from "react-router";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fectCreator = async () => {
      try {
        const res = await api.get(`/creators/${id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching creator:", error);
      }
    }

    fectCreator();
    // api.get(`/api/creators/${id}`).then((res) => setFormData(res.data));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.designation.trim()) {
      setError("Name and Designation are required fields.");
      return;
    }

    try {
      await api.put(`/creators/${id}`, formData);
      toast.success("Creator added successfully!");
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      }, 600);
    } catch {
      toast.error("Update failed!");
      setError("Error updating creator details. Please try again.");
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading creator data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-4 sm:p-6 md:p-10">
      <Motion.div
        className="bg-base-100 shadow-lg rounded-2xl p-6 md:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Edit Creator Profile
        </h2>

        {/* Error / Success Messages */}
        {error && (
          <div className="alert alert-error mb-4 p-3 rounded-lg text-white bg-rose-500/90">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success mb-4 p-3 rounded-lg text-white bg-green-500/90">
            Changes saved successfully!
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Email  */}
          <div>
            <label className="label">
              <span className="label-text">Email (for notifications)</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter creator email"
              className="input input-bordered w-full"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block font-medium mb-1">Designation *</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* About */}
          <div>
            <label className="block font-medium mb-1">About</label>
            <textarea
              name="about"
              rows="3"
              value={formData.about}
              onChange={handleChange}
              className="textarea textarea-bordered w-full resize-none"
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price (in USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="images"
              value={formData.images?.[0] || ""}
              onChange={(e) =>
                setFormData({ ...formData, images: [e.target.value] })
              }
              className="input input-bordered w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Link to="/" className="w-full sm:w-auto">
              <button
                type="outline"
                className="btn btn-accent w-full p-4 sm:w-auto"
              >
                {" "} <ArrowLeft /> Cancel
              </button>
            </Link>

            <button
              type="warning submit"
              className="btn btn-success w-full p-4 sm:w-auto"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Motion.div>
    </div>
  );
};

export default EditCreator;
