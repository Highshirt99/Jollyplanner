"use client";
import React, { useEffect } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { collection } from "firebase/firestore";
import { db } from "@config/firebaseConfig ";
import { getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@redux/projectSlice ";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const user = Cookies.get("user");
  const retrieveProjets = async () => {
    const projectsRef = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsRef);
    const projectsList = projectsSnapshot.docs.map((doc) => doc.data());
    projectsList.sort((a, b) => b.createdAt - a.createdAt);

    dispatch(setProjects(projectsList));
  };

  useEffect(() => {
    retrieveProjets();
    if (!user) {
      redirect("/signin");
    }
  }, [user]);

  return (
    <div className="flex flex-col  lg:flex-row midi:flex-row">
      <div className="lg:grow-[1] midi:grow-[1]">
        <ProjectList projects={projects} />
      </div>
      <div className="text-[14px] lg:grow-[3] midi:grow-[2] lg:mx-0 mx-auto tab:mx-0 midi:mx-0">
        <Notifications />
      </div>
    </div>
  );
};

export default Dashboard;
