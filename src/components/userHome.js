import React from "react";
import Sun from "../assets/sun.png"
import Logout from "../assets/logout.png"
import Add from "../assets/add.png"
import Progress from "../assets/progress.png"
import Create from "../assets/create.png"

export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const handleSubmit = () => {
    window.location.href = "https://todoaayu3.netlify.app/";
  };

  const workInfoData = [
    {
      image: Create,
      title: "Create Your Task Lists",
      text: "Start by creating separate lists for different projects, goals, or categories.",
    },
    {
      image: Progress,
      title: "Categorize and Tag Tasks",
      text: "Use categories and tags to classify tasks further. ",
    },
    {
      image: Add,
      title: "Track Progress",
      text: "Monitor your progress over time and stay motivated. ",
    },
  ];

  return (
    <div className="home-wrapper">
      <div className="logoutBtn">
          <img src={Logout} onClick={logOut}/>
      </div>
      <h1>
        Welcome,&nbsp;
        <b style={{ color: "#00308F" }}>
          {userData.fname}&nbsp;{userData.lname}
        </b>
      </h1>
      <h2>Start Managing Your Tasks</h2>
      <img src={Sun}/>
      <button className="get-started" onClick={handleSubmit}>
        Get Started
      </button>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
