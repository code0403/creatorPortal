import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../lib/api";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const CreatorDetails = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const res = await api.get(`/creators/${id}`);
        setCreator(res.data);
      } catch (err) {
        console.error("Error fetching creator:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-gray-500 text-lg animate-pulse">
          Creator not found 😔
        </p>

        <Link to="/">
          <button type="outline" className="mt-4">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-screen-lg mx-auto p-4 sm:p-6 md:p-10">
      <Motion.div
        className="bg-base-100 shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-10 items-center md:items-start"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5">
          <img
            src={creator.images?.[0] || "https://placehold.co/600x400"}
            alt={creator.name}
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold">{creator.name}</h1>

          <p className="text-indigo-600 font-medium text-sm md:text-base">
            {creator.designation}
          </p>

          <p className="leading-relaxed text-sm md:text-base">
            {creator.about}
          </p>

          <div className="mt-2">
            <p className="font-semibold text-lg">
              💰 Price:{" "}
              <span className="text-indigo-600">${creator.price}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Link to={`/edit/${creator._id}`}>
              <button type="warning" className="btn btn-secondary p-4">
                Edit Profile
              </button>
            </Link>
            <Link to="/">
              <button type="outline" className="btn btn-success p-4">
                {" "}
                <ArrowLeft size={16} />
                Back to List
              </button>
            </Link>
          </div>
        </div>
      </Motion.div>
    </div>
  );
};

export default CreatorDetails;
