import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { products } from "/src/dummyData/dummyBooks";

const RecommendSection = () => {

  return (
    <>
      <div className="md:px-8 px-6 lg:mt-0 md:mt-6 mt-10 pb-20">
        <h1 className="md:text-2xl text-lg font-gilroyBold ">
          Recommended for you
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-y-16 md:gap-y-10 gap-y-8 mt-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-div flex items-center gap-2 lg:w-96"
            >
              <div className="image-div">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="rounded-lg lg:w-36 md:w-40 w-28 md:h-44 h-36 hover:scale-105 transition-all delay-75 hover:cursor-pointer"
                />
              </div>
              <div className="info-div flex flex-col px-2 pb-2">
                <h1 className="font-gilroySemiBold md:text-lg " style={{ lineHeight: '1' }}>{product.title}</h1>
                <h1 className="md:text-xs text-[10px] text-gray-600 mt-1  md:mb-0 mb-1" style={{ lineHeight: '1' }}  >{product.description}</h1>
                <div className="flex items-center md:mt-3 mt-1">
                  <h1 className="font-gilroySemiBold text-gray-700 md:text-lg text-sm">
                    {product.price}
                  </h1>
                  <span className="border-l border-gray-700 mx-2 h-4"></span>
                  <h1 className="text-sm">{product.condition}</h1>
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
