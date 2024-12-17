import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { products } from "/src/dummyData/dummyBooks";

const RecommendSection = () => {
  return (
    <>
      <div className="md:px-8 px-4 lg:mt-0 md:mt-6 mt-10 pb-20">
        <h1 className="md:text-2xl text-lg font-ppMori ">
          Recommended for you
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-y-8 gap-y-5 mt-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-div flex items-center gap-x-2 lg:w-96 border rounded-lg p-3 hover:shadow-lg hover:bg-blue-50 hover:bg-opacity-50 hover:border-gray-300 transition-all delay-75"
            >
              <Link to={"/ProductDetails"} className="image-div">
                <img
                  src={product.imageUrl}
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
                    {product.title}
                  </h1>
                  <h1
                    className="md:text-xs text-[10px] text-gray-600 mt-1  md:mb-0 mb-1"
                    style={{ lineHeight: "1" }}
                  >
                    {product.description}
                  </h1>
                </div>
                <div className="flex items-center justify-between md:mt-3 mt-1">
                  <h1 className="font-gilroySemiBold text-gray-700 md:text-lg text-sm">
                    {product.price}
                  </h1>
                  <h1
                    className={`text-[10px] rounded-full px-[6px] py-[2px] bg-opacity-80 ${
                      product.condition === "Like new"
                        ? "bg-blue-200"
                        : product.condition === "Used"
                        ? "bg-yellow-200"
                        : product.condition === "Brand new"
                        ? "bg-green-200"
                        : product.condition === "Refurbished"
                        ? "bg-purple-200"
                        : "bg-gray-200 bg-opacity-80" // Default for other conditions
                    }`}
                  >
                    {product.condition}
                  </h1>
                </div>
                <div className="flex md:text-xs text-[11px] justify-between border-b md:pb-2 pb-1">
                  <h1 className="">{product.location}</h1>
                  <h1 className="pr-2">{product.time}</h1>
                </div>
                <div className="flex md:mt-3 mt-2 text-gray-600">
                  <button className="flex items-center w-1/2 hover:text-black">
                    <MdOutlineBookmarkAdd className="md:text-2xl" />
                    <h1 className="text-sm">Save</h1>
                  </button>
                  <button className="flex items-center w-1/2 hover:text-black">
                    <RiMessage3Line className="md:text-2xl" />
                    <h1 className="text-sm pl-1">Chat now</h1>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendSection;
