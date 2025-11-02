import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import CreatorCard from "../components/CreatorCard";
import api from "../lib/api";
import { Link, useNavigate } from "react-router";
import { Heart } from "lucide-react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to view favorites");
            navigate("/login");
            return;
        }
      const res = await api.get("/favorites");
      console.log(res.data);
      setFavorites(res.data);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
            toast.error("Please login to view favorites");
            navigate("/login");
        } else {
            toast.error("Failed to load favorites");
        }
    }
  };


  const handleRemoveFavorite = async (creatorId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to manage favorites");
        return;
      }

      await api.delete("/favorites", {
        headers: { Authorization: `Bearer ${token}` },
        data: { creatorId }, 
      });

      toast.success("Removed from favorites");
      setFavorites((prev) => prev.filter((fav) => fav._id !== creatorId));
    } catch (error) {
      toast.error("Failed to remove from favorites");
      console.error("Remove favorite error:", error);
    }
  };


  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {favorites.map((creator) => (

            <div className="card shadow-md hover:shadow-lg transition" key={creator._id}>
              <figure>
                <img
                  src={creator.images}
                  alt={creator.name}
                  className="h-48 w-full object-cover"
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
                    onClick={() => handleRemoveFavorite(creator._id)}
                  >
                    Remove
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;
