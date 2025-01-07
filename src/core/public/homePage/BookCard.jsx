import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useConversation from "../../../zustand/useConverstaion";

const BookCard = ({ products, userId }) => {
  const authenticateToken = localStorage.getItem("token");
  const { selectedConversation, setSelectedConversation } = useConversation();

  const navigate = useNavigate();

  const handleChatNow = async (chatUserId) => {
    if (authenticateToken) {
      try {
        // Fetch seller details using the seller ID
        const res = await axios.get(
          `/api/user/get-user-by-id/${chatUserId}` // Adjust endpoint
        );

        // Set the selected conversation with the fetched user data
        setSelectedConversation(res.data);

        // Navigate to the messages page
        navigate("/messages");
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message;
        toast.error(errorMessage);
      }
    } else {
      toast.error("Please login to chat with the seller.");
    }
  };

  const handleSaveBook = async (bookId) => {
    if (authenticateToken) {
      try {
        const response = await axios.post(
          "/api/user/add-to-favorites",
          {
            bookId,
          },
          {
            headers: {
              Authorization: `Bearer ${authenticateToken}`,
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please login to save the book.");
    }
  };

  return (
    <div
      className={`grid grid-cols-1 gap-x-10 md:gap-y-8 gap-y-5 mt-6 ${
        userId
          ? "grid-cols-1 xl:grid-cols-2 lg:px-8"
          : "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {products.map((product) => (
        <div
          key={product?._id}
          className="flex items-center max-w-96 gap-x-2 lg:w-96 border rounded-lg p-3 hover:shadow-lg hover:bg-blue-50 hover:bg-opacity-50 hover:border-gray-300 transition-all delay-75"
        >
          <Link to={`/products/${product?._id}`}>
            <img
              src={`/api/product_images/${product?.images[0]}`}
              alt={product.title}
              className="rounded-lg lg:w-36 md:w-40 w-32 md:h-44 h-36 object-cover hover:scale-105 transition-all delay-75 hover:cursor-pointer"
            />
          </Link>
          <div className="info-div flex flex-col px-2 pb-2">
            <div className="hover:cursor-pointer">
              <h1
                className="font-gilroySemiBold md:text-lg "
                style={{ lineHeight: "1" }}
              >
                {product?.title}
              </h1>
              <h1
                className="md:text-xs text-[10px] text-gray-600 mt-1 md:mb-0 mb-1"
                style={{ lineHeight: "1" }}
              >
                {product.description.length > 50 // Adjust '50' for desired length
                  ? `${product?.description.substring(0, 50)}...` // Truncate text
                  : product?.description}
              </h1>
            </div>
            <div className="flex items-center justify-between md:mt-3 mt-1">
              <h1 className="font-gilroySemiBold text-gray-700 md:text-lg text-sm">
                NPR {""}
                {product?.price}
              </h1>
              <h1
                className={`text-[10px] rounded-full px-[6px] py-[2px] bg-opacity-80 ${
                  product.condition === "Like New"
                    ? "bg-blue-200"
                    : product.condition === "Used"
                    ? "bg-yellow-200"
                    : product.condition === "Brand New"
                    ? "bg-green-200"
                    : product.condition === "Acceptable"
                    ? "bg-purple-200"
                    : "bg-gray-200 bg-opacity-80" // Default for other conditions
                }`}
              >
                {product?.condition}
              </h1>
            </div>
            <div className="flex md:text-xs text-[11px] justify-between border-b md:pb-2 pb-1">
              <h1 className="">{product.seller?.address} </h1>
              <h1 className="pr-1 text-gray-600">
                {formatDistanceToNowStrict(new Date(product?.updatedAt))} ago
              </h1>
            </div>
            <div className="flex md:mt-3 mt-2 text-gray-600">
              <button
                onClick={() => handleSaveBook(product?._id)}
                className="flex items-center w-1/2 hover:text-yellow-600"
              >
                <MdOutlineBookmarkAdd className="md:text-2xl" />
                <h1 className="text-sm">Save</h1>
              </button>
              <button
                onClick={() => handleChatNow(product?.seller?._id)}
                className="flex items-center w-1/2 hover:text-green-700"
              >
                <RiMessage3Line className="md:text-2xl" />
                <h1 className="text-sm pl-1">Chat now</h1>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;
