"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebaseConfig ";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import moment from "moment";

const ProjectDetails = () => {
  const [projects, setProjects] = useState(null);
  const [project, setProject] = useState(null);
  const params = useParams();
  const { id } = params;

  const getProject = async () => {
    const projectsRef = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsRef);
    const projectList = projectsSnapshot.docs.map((doc) => doc.data());
    setProjects(projectList);
    //  (projectList);
    const project =
      projects && projects.find((project) => project.id.toString() === id);
    setProject(project);
  };

  useEffect(() => {
    const user = Cookies.get("user");

    if (!user) {
      redirect("/signin");
    }
  }, []);

  getProject();

  if (project) {
    return (
      <div className="mx-auto my-[3rem] tab:w-[60%] h-auto w-[90%] lg:w-[60%]  rounded-md  p-[1rem] bg-white">
        <div className="z-0 pb-8 border-b">
          <span className="text-[18px]">{project.title}</span>
          <p className="mt-1 text-[13px]  text-gray-700">{project.content}</p>
        </div>

        <div className="text-gray-500 pt-4 text-[11px]">
          <div>
            Posted by {project.authorFirstName} {project.authorLastName}
          </div>
          <div>{moment(project.createdAt.toDate()).calendar()}</div>
        </div>
      </div>
    );
  } else {
    return <div className="mt-12 text-center text-white">Loading...</div>;
  }
};

export default ProjectDetails;
