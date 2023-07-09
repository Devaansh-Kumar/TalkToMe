import React from "react";
import Teamates from "./Teamates";

const AboutUs = () => {
  return (
    <>
      <div className="flex justify-center font-bold text-3xl my-3">About</div>
      <div className="flex justify-center py-2">
        This Project was made for the Google Cloud Vertex AI Hackathon held by Lab Lab AI.
      </div>
      <div className="flex justify-center text-center py-4">
        We are a highly enthusiastic team of 5 students from National Institute of Technology, Karnataka who have come together with a common goal of building innovative products that push the boundaries of what's possible.
      </div>
      <div className="flex justify-center font-bold text-2xl my-3">The Team</div>
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
          name="Bharadwaja Meher Chittapragada"
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
