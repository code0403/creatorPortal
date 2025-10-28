import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const success = await login(formData);
    if (success) {
      toast.success("Account created successfully!");
      navigate("/"); 
    }
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error?.response?.data?.message || "Signup failed! Please try again.");
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="bg-base-100 shadow-lg p-8 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
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
          <button type="primary" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
