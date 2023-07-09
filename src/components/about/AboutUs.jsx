import React from "react";
import Teamates from "./Teamates";

const AboutUs = () => {
  return (
    <>
    <div className="pt-5 pb-8 bg-gray-200">
      <h2 className="flex font-sans justify-center font-bold text-5xl mt-7 mb-5">About</h2>
      <div className="flex max-w-2xl mx-auto justify-center text-center text-sm py-2 text-zinc-500">
        This Project was made for the Google Cloud Vertex AI Hackathon held by Lab Lab AI.
      </div>
      <div className="flex max-w-md mx-auto justify-center text-center py-4">
        We are a highly enthusiastic team of 5 students from National Institute of Technology, Karnataka who have come together with a common goal of building innovative products that push the boundaries of what's possible.
      </div>
    </div>
    <div className="my-16">
        <div className="flex justify-center font-bold text-4xl my-5">Tech Stack</div>
        <div className="flex flex-row max-w-3xl justify-between mx-auto mb-5">
          <img className="w-28" src="/react.png"/>
          <img className="w-28" src="/firebase.png"/>
          <img className="w-28" src="/tailwind.png"/>
          <img className="w-28" src="/gcp.png"/>
          <img className="w-28" src="/vertex.png"/>
        </div>
      </div>
      <div className="flex justify-center font-bold text-4xl mt-12 mb-3">The Team</div>
      <div className="flex flex-wrap justify-around">
        <Teamates
          name="Harshit Gupta"
          linkedin="https://www.linkedin.com/in/harshit-gupta-174806229/"
          github="https://github.com/hgupta12"
        />
        <Teamates
          name="Devaansh Kumar"
          linkedin="https://www.linkedin.com/in/devaansh-kumar/"
          github="https://github.com/Devaansh-Kumar/"
        />
        <Teamates
          name="Bharadwaja Meher"
          linkedin="https://www.linkedin.com/in/bharadwaja-m-ch/"
          github="https://github.com/MeherRushi"
        />
        <Teamates
          name="Chinmaya Sahu"
          linkedin="https://www.linkedin.com/in/chinmaya-s/"
          github="https://github.com/csking101"
        />
        <Teamates
          name="Ankit Dash"
          linkedin="https://www.linkedin.com/in/ankitdash/"
          github="https://github.com/helios2003"
        />
      </div>
      
    </>
  );
};

export default AboutUs;
