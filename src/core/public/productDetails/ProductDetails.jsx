import axios from "axios";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { MdLocalShipping, MdOutlineBookmarkAdd } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { UserContext } from "../../../context/UserContext";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { userInfo } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("description");
  const { bookId } = useParams();

  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/book/get-book-by-id/${bookId}`
        );
        const productData = response?.data;

        setProduct(productData);
        setMainImage(productData.images[0]); // Set initial main image
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchbooks();
  }, [bookId]);

  const formatMemberSince = (dateString) => {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="flex lg:flex-row flex-col lg:items-start md:items-center md:px-8 px-5 lg:mt-3 md:mt-3 pb-6">
        <div className="lg:w-1/3 md:w-1/2">
          <div className="flex justify-center rounded-lg pt-4 md:pb-8 pb-4">
            <img
              src={`http://localhost:5000/product_images/${mainImage}`}
              alt="book"
              className="rounded-lg object-cover md:w-80 w-44 md:h-96 h-56"
            />
          </div>
          <div className="flex justify-start gap-3 md:pl-10 pl-16">
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/product_images/${image}`}
                alt={`Book Image ${index + 1}`}
                className={`rounded-lg object-cover md:w-16 w-10 md:h-16 h-10 cursor-pointer ${
                  mainImage === image ? "border-2 border-gray-500" : "" // Highlight selected image
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-2/3 w-full lg:pl-8 lg:pr-2 lg:mt-0 mt-6">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-xl font-ppMori text-gray-900">
              {product?.title}
            </h1>
            <h1 className="md:text-xl font-gilroyMedium text-gray-500 mt-1 pl-1">
              रू. {product?.price}
            </h1>
          </div>

          <div className="border-t border-b border-gray-200 py-3 my-3">
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-full object-cover shadow"
                src={
                  userInfo?.avatar
                    ? `http://localhost:5000/product_images/${userInfo.avatar}`
                    : "http://localhost:5000/product_images/default_avatar.png"
                }
                alt="Seller profile"
              />
              <div>
                <h3 className="text-sm text-gray-900">
                  Sold by <b className="font-ppMori"> {userInfo?.name}</b>
                </h3>

                <p className="text-xs text-gray-500">
                  Member since: {formatMemberSince(userInfo?.createdAt)} •{" "}
                  {userInfo?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="text-xl font-gilroySemiBold text-gray-900">
              Book Details
            </h2>
            <div className="grid grid-cols-2 md:gap-x-4 gap-x-0 gap-y-3 font-gilroyMedium mt-1">
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="text-sm font-medium text-gray-900">
                  {product?.condition}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Genre</p>
                <p className="text-sm font-medium text-gray-900">
                  {" "}
                  {product?.genre}
                </p>
              </div>
              {/* <div>
                <p className="text-sm text-gray-500">Publication Year</p>
                <p className="text-sm font-medium text-gray-900">1925</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ISBN</p>
                <p className="text-sm font-medium text-gray-900">
                  978-0743273565
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pages</p>
                <p className="text-sm font-medium text-gray-900">180</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Publisher</p>
                <p className="text-sm font-medium text-gray-900">
                  Charles Scribner's Sons
                </p>
              </div> */}
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6 lg:pr-14">
            <button className="rounded-lg shadow-lg flex items-center justify-center w-1/2 bg-black text-white py-3">
              <MdOutlineBookmarkAdd className="md:text-xl  mr-1" />
              Save
            </button>
            <button className="rounded-lg shadow-lg flex items-center justify-center w-1/2 bg-green-600 text-white py-3">
              <RiMessage3Line className="md:text-xl  mr-1" />
              Chat Now
            </button>
          </div>

          <div className="text-sm mt-3 font-gilroyMedium text-gray-500">
            <span className="flex items-center">
              <GoClockFill />
              <h1 className="pl-1">
                {product?.createdAt
                  ? `Posted ${formatDistanceToNowStrict(
                      parseISO(product.createdAt)
                    )} ago`
                  : "Posted just now"}
              </h1>
            </span>
            <span className="flex items-center">
              <MdLocalShipping />
              <h1 className="pl-1">
                {product?.delivery
                  ? "Shipping: रू. 60 • Delivery in 1-3 business days"
                  : "No delivery available"}
              </h1>
            </span>
          </div>

          <div className="flex border-b mt-4 mb-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`mr-4 pb-2 text-lg font-gilroyMedium ${
                activeTab === "description"
                  ? "text-gray-900 font-gilroySemiBold border-b-2 border-gray-900"
                  : "text-gray-700 border-b-2 border-transparent"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`pb-2 text-lg font-gilroyMedium ${
                activeTab === "location"
                  ? "text-gray-900 font-gilroySemiBold border-b-2 border-gray-900"
                  : "text-gray-700 border-b-2 border-transparent"
              }`}
            >
              Location
            </button>
          </div>

          {activeTab === "description" && (
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">{product?.description}</p>
            </div>
          )}

          {activeTab === "location" && (
            <div className="md:p-6 rounded-lg border border-gray-200">
              <div className="relative md:h-48 h-28 rounded-lg overflow-hidden cursor-pointer">
                <img
                  src="https://ai-public.creatie.ai/gen_page/map_placeholder_1280x720.png"
                  alt="Location Map"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="absolute flex items-center bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm">
                  <FaLocationDot className="mr-1" />
                  {userInfo?.address}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
