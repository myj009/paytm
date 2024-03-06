import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });

      if (res.status != 200) {
        throw new Error(res.data.error);
      }

      console.log(res.data.token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg flex flex-col p-8 space-y-8 justify-center min-w-[400px]">
          <div className="flex flex-col spac-y-4 items-center">
            <p className="font-bold text-2xl">Sign Up</p>
            <p className="text-gray-600">
              Enter your information to create an account
            </p>
          </div>
          <div className="flex flex-col space-y-6 items-start text-lg">
            <div className="flex flex-col space-y-2 w-full">
              <label className="font-bold ">First Name</label>
              <input
                className="rounded-md border-gray-600 border py-1 px-2"
                type="text"
                name="firstName"
                {...register("firstName", { required: true })}
              />
              {errors.firstName?.type === "required" && (
                <p role="alert">First name is required</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="font-bold ">Last Name</label>
              <input
                className="rounded-md border-gray-600 border py-1 px-2"
                type="text"
                name="lastName"
                {...register("lastName", { required: true })}
              />
              {errors.lastName?.type === "required" && (
                <p role="alert">Last name is required</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="font-bold ">Email</label>
              <input
                className="rounded-md border-gray-600 border py-1 px-2"
                type="text"
                name="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && <p role="alert">Not an email</p>}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="font-bold ">Password</label>
              <input
                className="rounded-md border-gray-600 border py-1 px-2"
                type="password"
                name="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p role="alert">Password should be atleast 6 characters</p>
              )}
            </div>
          </div>
          <button
            className="w-full flex items-center justify-center py-2 text-lg rounded-lg bg-black text-white"
            // onClick={() => console.log("Clicked")}
            type="submit"
          >
            Sign Up
          </button>
          <div className="flex justify-center w-full">
            <p className="">
              Already have an account?{" "}
              <span className="underline">
                <Link to="/signin">Login</Link>{" "}
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
