import React from "react";
import moment from "moment";

const ProjectSummary = ({ project }) => {

  return (
    <div className="cursor-pointer z-0 mb-4 bg-white rounded-md min-h-[120px] h-auto p-4">
      <div className="flex flex-col gap-3 text-grey-500">
        <span className="text-[15px]">{project.title}</span>
        <div>
          <p className="text-[10px] mt-1 mb-[2px] border-b pb-4">
            Posted by {project.authorFirstName} {project.authorLastName}
          </p>
          <p className="text-[9px] text-gray-400 pt-2">
            {moment(project.createdAt.toDate()).calendar()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
