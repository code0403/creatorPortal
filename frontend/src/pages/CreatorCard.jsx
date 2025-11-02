import toast from "react-hot-toast";
import api from "../lib/api";


const CreatorCard = ({ creator }) => {
    console.log(creator);
  const handleAddFavorite = async () => {
    try {
      const res = await api.post("/favorites", { creatorId: creator._id });
      toast.success("Added to favorites!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Please login to add favorites");
    }
  }
  
  const handleDelete = async (id) => {
      if (confirm("Are you sure you want to delete this creator?")) {
        try {
          await api.delete(`/creators/${id}`);
          toast.success("Creator deleted successfully!");
  
        //   fetchCreators();
        } catch (error) {
          console.error("Error deleting creator:", error);
          toast.error(
            error?.response?.data?.message || "Unexpected error occurred!"
          );
        }
      }
    };
  return (
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
        <p className="font-semibold mt-2 text-sm">💰 Price: ${creator.price}</p>

        <div className="card-actions flex flex-row justify-between">
          <button
            onClick={handleAddFavorite}
            className="btn btn-outline btn-sm gap-2 mt-4 p-4"
          >
            <Heart className="mr-2" />
          </button>

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
      </div>
    </Motion.div>
  );
};

export default CreatorCard;
