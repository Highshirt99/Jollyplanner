"use client";
import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebaseConfig ";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";

const CreateProject = () => {
  const currentUser = Cookies.get("user");

  const route = useRouter();

  const [userDetails, setUserDetails] = useState({});
  const getUserDetails = async () => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    const userFromDb = usersList.find((user) => user.id === currentUser);
    setUserDetails(userFromDb);

  };

  useEffect(() => {
    getUserDetails();
    if (!currentUser) redirect("/signin");

  }, [currentUser]);

  const createNotification = async () => {
    const notificationsRef = collection(db, "notifications");
    const newNotificationRef = await addDoc(notificationsRef, {
      content: "added a new project!",
      user: `${userDetails.firstName} ${userDetails.lastName}`,
      time: new Date(),
    });
    
  };

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    content: "",
    id: Math.round(Math.random() * 10000000000000),
  });
  const handleChange = (e) => {
    const userInput = { ...projectDetails };
    userInput[e.target.id] = e.target.value;
    setProjectDetails(userInput);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    route.replace("/");


    try {
      await addDoc(collection(db, "projects"), {
        ...projectDetails,
        authorFirstName: userDetails.firstName,
        authorLastName: userDetails.lastName,
        authorId: userDetails.id,
        createdAt: new Date(),
      });
      createNotification();
   
    } catch (err) {
      err;
    }
  };

  return (
    <div className=" mt-[20%] w-[90%] lg:mt-[15%] h-[300px] tab:w-[60%]  tab:mt-[12%] mx-auto  lg:w-[50%] bg-white px-[2rem] py-[2rem] lg:px-[7rem] ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h5>Create Project</h5>
        <div className="flex flex-col mt-4">
          <label htmlFor="title" className="text-gray-600 mt-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="focus:outline-none bg-transparent border-b border-b-gray-900  w-[100%]"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-gray-600 mt-2">
            Project Content
          </label>
          <textarea
            type="text"
            id="content"
            required
            className="focus:outline-none bg-transparent border-b scrollbar-hide border-b-gray-900  w-[100%]"
            onChange={handleChange}
          />
        </div>

        <div className = "mt-1">
          <button className="bg-pink-600  rounded-lg p-1 w-[100px] text-white z-0 hover:bg-pink-300 cursor-pointer">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
