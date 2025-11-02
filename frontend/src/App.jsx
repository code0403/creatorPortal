import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreatorDetails from "./pages/CreatorDetails";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/creator/:id" element={<CreatorDetails />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute adminOnly>
                <AddCreator />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <EditCreator />
              </ProtectedRoute>
            }
          />
        <Route path="/favorites" element={<Favorites />} />
        </Routes>


        <Toaster />
      </div>
    </>
  );
}

export default App;
