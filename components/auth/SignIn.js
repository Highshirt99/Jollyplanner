"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "@redux/projectSlice ";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { app } from "@config/firebaseConfig ";

const SignIn = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const auth = getAuth(app);
  const route = useRouter();
  const handleChange = (e) => {
    const userInput = { ...userData };
    userInput[e.target.id] = e.target.value;
    setUserData(userInput);
    setError(null);
  };

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      Cookies.remove("user");
    }
  }, []);

   const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
      
        const user = userCredential.user.uid;
        dispatch(setUser(userCredential.user.providerData[0]));
        setError(null);
        Cookies.set("user", user, { expires: 30 });
        route.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        errorCode === "auth/invalid-email"
          ? setError("Invalid e-mail format.")
          : errorCode === "auth/user-not-found"
          ? setError("User not found.")
          : errorCode === "auth/wrong-password"
          ? setError("Wrong password.")
          : setError("Something went wrong, please try again.");
      });
  };

  return (
    <div className=" mt-[20%] w-[90%] lg:mt-[15%] tab:mt-[12%] h-[300px] tab:w-[60%] mx-auto lg:w-[60%] bg-white px-[2rem] py-[2rem] lg:px-[7rem] ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h5>Sign In</h5>
        <div className="flex flex-col mt-4">
          <label htmlFor="email" className="text-gray-600 mt-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="focus:outline-none bg-transparent border-b border-b-gray-900  w-[100%]"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-600 mt-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="focus:outline-none bg-transparent border-b border-b-gray-900  w-[100%]"
            onChange={handleChange}
            required
          />
        </div>

        <div className = "mt-2">
          <button className="bg-pink-600  rounded-lg p-1 w-[100px] text-white z-0 hover:bg-pink-300 cursor-pointer">
            Login
          </button>
        </div>
      </form>
      {error && <p className="mt-3 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;
