import React from "react";

const Teamates = ({name, github, linkedin}) => {
  return (
    <div class="w-full max-w-sm my-5 transition duration-300 hover:scale-110 bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 pt-8">
      <div class="flex flex-col items-center pb-10">
        <img
          class="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="public/harshitgupta.jpg"
          alt=""
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          NITK CSE'25
        </span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <a
            href={github}
            class="inline-flex items-center px-4 py-2 text-sm"
            target="_blank" rel="noopener noreferrer"
          >
            <img src="public/github.png"/>
          </a>
          <a
            href={linkedin}
            class="inline-flex items-center px-4 py-2 text-sm"
            target="_blank" rel="noopener noreferrer"
          >
            <img src="public/linkedin.png"/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Teamates;
