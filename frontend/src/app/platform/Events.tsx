"use client";
import React, { useRef } from "react";

const Events = () => {
  const events = [
    {
      name: "HackElite 2.0",
      date: "October 20",
      description: "An inter-university buildathon with a focus on AI.",
      time: "16:00",
      location: "Physical",
      registerLink: "https://hackelite.com/register",
    },
    {
      name: "Duothan 5.0",
      date: "July 16",
      description: "An inter-university algothan / buildathon.",
      time: "16:00",
      location: "Physical",
      registerLink: "https://hackelite.com/register",
    },
    {
      name: "NBQSA",
      date: "October 20",
      description: "The greatest inter-university hackathon in Sri Lanka.",
      time: "09:00",
      location: "Physical",
      registerLink: "https://hackelite.com/register",
    },
  ];

  return (
    <div id="events" className="flex flex-col bg-black text-white py-20">
      <div className="text-8xl m-4">Events</div>
      <div className="text-4xl ml-2 mb-2 max-w-3xl">
        These are the ongoing events we are currently invested in.
      </div>
      <div className="text-4xl ml-2 mb-2 max-w-3xl">
        Our team leads will guide you through the process of participating in
        these events.
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {events.map((event, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white text-black" : ""
            } p-4 text-3xl relative border-2 border-white !h-[300px]`}
          >
            <div className="absolute right-4 text-5xl">{event.date}</div>
            <div className="text-6xl">{event.name}</div>
            <div className="text-xl">{event.description}</div>
            <div className="absolute bottom-4 left-4">
              <div>{event.time}</div>
              <div>{event.location}</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute right-4 bottom-4 w-8 h-8"
            >
              <path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
