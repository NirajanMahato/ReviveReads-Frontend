import playStore from "/Logos/app-store-png-logo-33123.png";

const Footer = () => {
  return (
    <>
      <div
        className={
          "w-full md:h-52 h-0 text-white flex items-center justify-end md:px-10 px-3"
        }
        style={{ backgroundColor: "#222222" }}
      >
        <div className="">
          <h1 className="lg:text-base font-gilroySemiBold">CONTACTS</h1>
          <h2 className="lg:text-sm text-xs text-gray-200 mt-1">
            +977 9820002202 <br />
            Dellibazar, Kathmandu
          </h2>

          <h1 className="font-gilroySemiBold lg:mt-6 mt-2">INQUIRES</h1>
          <h2 className="lg:text-sm text-xs text-gray-200">
            revive-reads@gmail.com
          </h2>
        </div>
        <div className={"md:w-40 w-3/12"}>
          <a
            href={
              "https://play.google.com/store/apps/category/COMICS?hl=en&gl=US&pli=1"
            }
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <img
              src={playStore}
              alt={"playstore"}
              className={"md:w-40 w-32 cursor-pointer"}
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
