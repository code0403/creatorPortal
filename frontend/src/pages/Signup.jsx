import "../App.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({ name: "", email: "", password: "",  role: "viewer", });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await signup(formData);
    toast.success("Account created successfully!");
    navigate("/login");
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error?.response?.data?.message || "Signup failed! Please try again.");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="bg-base-100 shadow-lg p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Admin Account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={handleChange}
          />

          <select
            name="role"
            className="select select-bordered w-full"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button type="primary" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
