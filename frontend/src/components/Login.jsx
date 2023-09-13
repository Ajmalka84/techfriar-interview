import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contextapi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setauth} =  useContext(AuthContext);
  const navigate = useNavigate()
  const onSubmit = (data) => {
    axios.post("http://localhost:4000/admin/login" , data).then((res)=>{
        setauth({token : res.data})
        navigate('/admin/home' )
    }).catch((error)=>{
        console.log(error)  
    })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-3xl font-semibold text-gray-600 mb-4">
          Admin Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-md"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username should not exceed 20 characters",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <p className="text-blue-500 text-sm cursor-pointer text-center">
            Forgot password
          </p>
          <button className="w-full bg-blue-500 text-white rounded-md py-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
