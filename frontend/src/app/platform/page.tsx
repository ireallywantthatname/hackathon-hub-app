"use client";
import { useState } from "react";
import Editors from "./Editors";
import Events from "./Events";
import Testimonials from "./Testimonials";

const NavMenu = () => {
  const tabs = [
    {
      name: "Editors",
      icon: "M7.24264 17.9967H3V13.754L14.435 2.319C14.8256 1.92848 15.4587 1.92848 15.8492 2.319L18.6777 5.14743C19.0682 5.53795 19.0682 6.17112 18.6777 6.56164L7.24264 17.9967ZM3 19.9967H21V21.9967H3V19.9967Z",
    },
    {
      name: "Events",
      icon: "M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 13H11V17H6V13Z",
    },
    {
      name: "Testimonials",
      icon: "M21 3C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.455L2 22.5V4C2 3.44772 2.44772 3 3 3H21ZM10.5153 7.4116C8.72825 8.18684 7.5 9.75543 7.5 11.5052C7.5 12.5 7.77658 13.1137 8.29171 13.6605C8.61598 14.0048 9.12905 14.25 9.66558 14.25C10.6321 14.25 11.4156 13.4665 11.4156 12.5C11.4156 11.5795 10.7045 10.8389 9.80236 10.7553C9.64107 10.7403 9.47827 10.7431 9.32317 10.7645L9.32344 10.6729C9.32873 10.2322 9.4223 8.9333 10.9616 8.1004L10.5153 7.4116ZM15.5153 7.4116C13.7283 8.18684 12.5 9.75543 12.5 11.5052C12.5 12.5 12.7766 13.1137 13.2917 13.6605C13.616 14.0048 14.1291 14.25 14.6656 14.25C15.6321 14.25 16.4156 13.4665 16.4156 12.5C16.4156 11.5795 15.7045 10.8389 14.8024 10.7553C14.6411 10.7403 14.4783 10.7431 14.3232 10.7645L14.3234 10.6729C14.3287 10.2322 14.4223 8.9333 15.9616 8.1004L15.5153 7.4116Z",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute top-4 left-4 text-5xl text-center font-bold">
        Hackathon Hub
      </div>
      <div className="absolute bottom-2 left-2 text-white bg-black h-20 w-[240px]">
        <div className="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex m-2 cursor-pointer hover:border-1 hover:border-white transition-all duration-300 ${
                activeTab === tab.name ? "bg-white text-black" : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 m-4"
              >
                <path d={tab.icon}></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
      <div className="p-8 overflow-y-auto">
        {activeTab === "Editors" && <Editors />}
        {activeTab === "Events" && <Events />}
        {activeTab === "Testimonials" && <Testimonials />}
      </div>
    </div>
  );
};

export default NavMenu;
