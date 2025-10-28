import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router';
import api from '../lib/api';
import { motion as Motion} from "framer-motion";
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const AddCreator = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    about: "",
    price: "",
    images: [""],
  });

   const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.designation.trim()) {
      setError("Name and Designation are required fields.");
      return;
    }
    if (formData.price && formData.price < 0) {
      setError("Price cannot be negative.");
      return;
    }

    try {
      await api.post("/creators", formData);
      toast.success("Creator added successfully!");
      navigate("/");
    } catch {
      toast.success("Creator added successfully!");
      setError("Something went wrong while adding the creator.");
    }
  };
  return (
<div className="max-w-screen-md mx-auto p-4 sm:p-6 md:p-10">
      <Motion.div
        className="bg-base-100 shadow-lg rounded-2xl p-6 md:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Add New Creator
        </h2>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error mb-4 p-3 rounded-lg text-white bg-rose-500/90">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              className="input input-bordered focus:outline-none p-2 rounded w-full"
              onChange={handleChange}
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block font-medium mb-1">Designation *</label>
            <input
              type="text"
              name="designation"
              placeholder="e.g. UI/UX Designer, Influencer"
              className="input input-bordered focus:outline-none p-2 rounded w-full"
              onChange={handleChange}
            />
          </div>

          {/* About */}
          <div>
            <label className="block font-medium mb-1">About</label>
            <textarea
              name="about"
              rows="3"
              placeholder="Short bio or description"
              className="textarea textarea-bordered focus:outline-none w-full resize-none"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price (in USD)</label>
            <input
              type="number"
              name="price"
              placeholder="e.g. 500"
              className="input input-bordered focus:outline-none w-full"
              onChange={handleChange}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="images"
              placeholder="Paste image link (optional)"
              className="input input-bordered focus:outline-none w-full"
              onChange={(e) =>
                setFormData({ ...formData, images: [e.target.value] })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <Link to="/" className="w-full sm:w-auto">
              <button type="outline" className="btn btn-active btn-accent p-4 w-full sm:w-auto">
                {" "}
                <ArrowLeft size={16} /> 
                Back
              </button>
            </Link>

            <button
              type="primary submit"
              className="btn btn-active btn-accent w-full p-4 sm:w-auto"
            >
              Add Creator
            </button>
          </div>
        </form>
      </Motion.div>
    </div>
  )
}

export default AddCreator
