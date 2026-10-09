import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";


// Validation Schema
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});


const Login = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = (data) => {
    console.log(data);
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
              Welcome back! Login to your account
            </p>

          </div>


          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

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
                  errors.email ? "input-error" : ""
                }`}
                {...register("email")}
              />

              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
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


            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Login
            </button>

          </form>


          {/* Signup Navigation */}
          <div className="text-center mt-5">

            <p className="text-sm text-base-content/60">
              Don't have an account?{" "}

              <span
                onClick={() => navigate("/signup")}
                className="text-primary font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


export default Login;

