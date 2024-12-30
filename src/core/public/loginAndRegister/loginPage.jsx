import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import * as yup from "yup";
import useLogin from "../../../hooks/useLogin"; // Import the custom hook
import wallpaper from "/BG/wallpaper.jpg";
import logo2 from "/Logos/Logo2.png";

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login } = useLogin(); // Use the custom hook
  const submit = async (data) => {
    await login(data);
  };

  return (
    <>
      <div
        className={"flex w-full h-screen mx-auto max-w-[1300px] pt-8 px-6 pb-4"}
      >
        <div className="w-full lg:w-6/12">
          <Link to={"/"} className="-mt-2">
            <img
              src={logo2}
              alt="Logo"
              className="cursor-pointer md:w-44 w-28"
            />
          </Link>
          <form
            onSubmit={handleSubmit(submit)}
            className={
              "flex justify-center items-center flex-col md:mt-14 mt-20"
            }
          >
            <h1 className={"text-2xl md:text-3xl font-ppMori mb-1 flex"}>
              Welcome to ReviveReads
            </h1>
            <h3>Please enter your credentials.</h3>
            <div
              className={
                "md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-14 flex items-center pl-4 pr-2"
              }
            >
              <MdEmail
                style={{
                  fontSize: "1.4rem",
                  marginRight: "0.5rem",
                  color: "gray",
                }}
              />
              <input
                type={"email"}
                placeholder={"Email"}
                className={"w-full outline-none appearance-none"}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <h6 className="md:w-5/12 w-11/12 text-red-500 text-xs">
                {errors.email.message}
              </h6>
            )}
            <div
              className={
                "md:w-6/12 w-11/12 h-12 border-solid border rounded-3xl border-gray-300 mt-4 flex items-center pl-4 pr-2"
              }
            >
              <IoMdLock
                style={{
                  fontSize: "1.4rem",
                  marginRight: "0.5rem",
                  color: "gray",
                }}
              />
              <input
                type={"password"}
                placeholder={"Password"}
                className={"w-full outline-none"}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <h6 className="md:w-5/12 w-11/12 text-red-500 text-xs">
                {errors.password.message}
              </h6>
            )}

            <div className={"md:w-6/12 w-11/12 flex justify-end pt-3 pr-1"}>
              <Link to={"/ForgetPassword"}>
                <h3
                  className={
                    "text-gray-500 cursor-pointer transition-all hover:text-black"
                  }
                >
                  Forgot password?
                </h3>
              </Link>
            </div>
            <button
              className={
                "mt-8 md:w-6/12 w-11/12 rounded-3xl h-12 bg-black text-white text-lg font-normal transition duration-200 ease-in-out hover:bg-[#403a4f] hover:font-semibold"
              }
              type={"submit"}
            >
              Login
            </button>
            <div className={"md:w-6/12 w-11/12 flex justify-center pt-3 pr-1"}>
              <h3 className={"text-gray-500"}>Don`t have an account? </h3>
              <Link to={"/Signup"}>
                <h3
                  className={
                    "text-purple-700 ml-1 cursor-pointer transition-all underline"
                  }
                >
                  Sign up
                </h3>
              </Link>
            </div>
          </form>
        </div>
        <div
          className="lg:w-6/12 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${wallpaper})`, borderRadius: "15%" }}
        ></div>
      </div>
    </>
  );
};

export default LoginPage;
