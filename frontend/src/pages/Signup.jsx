import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice";
import { useEffect } from "react";


// Validation Schema
const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  emailId: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});


const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated , navigate]);


  const onSubmit = (data) => {
    dispatch(registerUser(data)); 
  };


  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl">

        <div className="card-body">

          {/* Heading */}
          <div className="text-center mb-4">

            <h1 className="text-4xl font-bold text-primary">
              LeetCode
            </h1>

            <p className="text-base-content/60 mt-2">
              Create your account
            </p>

          </div>


          {/* Signup Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* First Name */}
            <div>

              <label className="label">
                <span className="label-text font-semibold">
                  First Name
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter your first name"
                className={`input input-bordered w-full ${
                  errors.firstName ? "input-error" : ""
                }`}
                {...register("firstName")}
              />

              {errors.firstName && (
                <p className="text-error text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}

            </div>


            {/* Email */}
            <div>

              <label className="label">
                <span className="label-text font-semibold">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                className={`input input-bordered w-full ${
                  errors.emailId ? "input-error" : ""
                }`}
                {...register("emailId")}
              />

              {errors.emailId && (
                <p className="text-error text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}

            </div>


            {/* Password */}
            <div>

              <label className="label">
                <span className="label-text font-semibold">
                  Password
                </span>
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password")}
              />

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>


            {/* Signup Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Sign Up
            </button>

          </form>


          {/* Login Navigation */}
          <div className="text-center mt-5">

            <p className="text-sm text-base-content/60">
              Already have an account?{" "}

              <span
                onClick={() => navigate("/login")}
                className="text-primary font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


export default Signup;

