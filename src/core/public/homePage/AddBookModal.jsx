import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const AddBookModal = ({ showModal, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    description: "",
    price: "",
    condition: "",
    delivery: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Add new files to the existing images
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...Array.from(files)],
      }));
    }
  };

  // Remove selected image
  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  // Create a reference for the file input
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {     // Handle button click to trigger file input
    fileInputRef.current.click();
  };

  // Access token and user ID from localStorage
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("genre", formData.genre);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("condition", formData.condition);
    form.append("delivery", formData.delivery);
    // Append all images
    formData.images.forEach((image) => {
      form.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/book/post-book",
        form,
        { headers }
      );
      console.log(response);
      toast.success("Book posted successfully");
      // **Reset the form fields**
      setFormData({
        title: "",
        genre: "",
        description: "",
        price: "",
        condition: "",
        delivery: false,
        images: [],
      });
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Error posting book");
    }
  };

  if (!showModal) return null;

  const genres = [
    "Arts & Photography",
    "Fiction",
    "Non Fiction & Biography",
    "Educational Textbook",
    "Magazines & Comics",
    "Technology",
    "Romance",
    "Other",
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-[700px] h-[600px]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Post Your Book</h2>
          <button
            onClick={closeModal}
            className="text-black font-bold text-2xl border w-8 h-8 rounded-full hover:bg-slate-200"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="">
            <label htmlFor="title" className="block text-sm font-semibold">
              Book Title
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter the book title"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold"
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Enter a description of the book"
              required
            />
          </div>

          <div className="mt-4 flex justify-between md:gap-4">
            <div className="w-full">
              <label htmlFor="genre" className="block text-sm font-semibold">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select a genre
                </option>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="condition"
                className="block text-sm font-semibold"
              >
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Condition
                </option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Used">Used</option>
                <option value="Acceptable">Acceptable</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-end md:gap-6">
            <div className="w-full">
              <label htmlFor="price" className="block text-sm font-semibold">
                Price
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md no-arrows"
                placeholder="Enter the price"
                required
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "+" || e.key === "e") {
                    e.preventDefault(); // Prevents typing +, -, and 'e' (scientific notation)
                  }
                }}
              />
            </div>
            <div className="w-full">
              <label htmlFor="delivery" className="block text-sm font-semibold">
                Delivery Available
              </label>
              <input
                id="delivery"
                name="delivery"
                type="checkbox"
                checked={formData.delivery}
                onChange={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    delivery: !prevData.delivery,
                  }))
                }
                className="mr-2"
              />
              Yes, I offer delivery
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="images" className="block text-sm font-semibold">
              Upload Images
            </label>

            <div className="flex md:gap-4 mt-2">
              {/* Display selected images */}
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.images.map((image, index) => (
                <div key={index} className="w-32 h-28 relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className="w-32 h-28 object-cover rounded-md"
                  />
                  {/* Remove button for each image */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 text-black bg-white px-1 py-0.5 rounded-full shadow opacity-0 group-hover:opacity-100 hover:bg-gray-400 hover:text-black transition-opacity"
                  >
                    <RxCross2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Input to add more images */}
            <input
              type="file"
              name="images"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div onClick={handleButtonClick} className="w-32 h-28 border-dashed border-2 border-gray-400 rounded-lg p-2 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition duration-300">
              <FaCloudUploadAlt className="text-5xl text-gray-700" />
              <h1 className="text-gray-500 text-sm font-gilroyMedium">Click to upload</h1>
              <h1 className="text-gray-400 text-[10px] ">Maximum 3 images</h1>
            </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-black text-white py-2 rounded-md"
          >
            Post Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
