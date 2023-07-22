import React from "react";
import ProjectSummary from "./ProjectSummary";
import Link from "next/link";

const ProjectList = ({ projects }) => {
  return (
    <div className="flex flex-col gap-[1rem] px-[2rem] lg:px-[7em] py-8">
      {projects &&
        projects.map((project) => (
          <Link key={project.id}  href = {`/project/${project.id}`} >
            <ProjectSummary project={project} />
          </Link>
        )) }
    </div>
  );
};

export default ProjectList;
