"use client";
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@config/firebaseConfig ";
import { useDispatch } from "react-redux";
import { setNewUser } from "@redux/projectSlice ";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const SignUp = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const route = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      Cookies.remove("user");
    }
  }, []);
  const auth = getAuth();
  const handleChange = (e) => {
    const userInput = { ...userData };
    userInput[e.target.id] = e.target.value;
    setUserData(userInput);
    setError(null);
  };

  const createNotification = async () => {
    const notificationsRef = collection(db, "notifications");
    const newNotificationRef = await addDoc(notificationsRef, {
      content: "joined the party!",
      user: `${userData.firstName} ${userData.lastName}`,
      time: new Date(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          firstName: userData.firstName,
          lastName: userData.lastName,
          initials: userData.firstName[0] + userData.lastName[0],
          id: user.uid,
        });
        createNotification();
      })
      .then(() => {
        dispatch(setNewUser(userData));
        route.replace("/signin");
        getUserDetails(user);

        setError(null);
      })
      .catch((error) => {
        const errorCode = error.code;

        errorCode === "auth/email-already-in-use"
          ? setError("Email already exists.")
          : errorCode === "auth/invalid-email"
          ? setError("Invalid e-mail format.")
          : errorCode === "auth/weak-password"
          ? setError("Weak password, password should be at least 6 characters.")
          : setError("Something went wrong, please try again.");
      });
  };

  return (
    <div className="w-[90%] mt-[20%] tab:mt-[12%] tab:w-[60%] mx-auto lg:mt-[10%] bg-white px-[2rem] py-[2rem] lg:px-[7rem]  lg:w-[50%]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:w-[100%]">
        <h5>Sign Up</h5>
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-gray-600">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="focus:outline-none bg-transparent border-b border-b-gray-900 w-[100%] "
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-gray-600">
            Last Name
          </label>
          <input
            required
            type="text"
            id="lastName"
            className="focus:outline-none bg-transparent border-b border-b-gray-900 w-[100%]"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="focus:outline-none bg-transparent border-b border-b-gray-900 w-[100%] "
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="focus:outline-none bg-transparent border-b border-b-gray-900 w-[100%]"
            onChange={handleChange}
          />
        </div>

        <div>
          <button className="bg-pink-600  rounded-lg p-1 w-[100px] text-white z-0 hover:bg-pink-300 cursor-pointer">
            Sign up
          </button>
        </div>
      </form>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default SignUp;
