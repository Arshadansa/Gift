import React from "react";

const Legal = ({ terms }) => {
  return (
    <div className="legal-content rounded-lg mt-30 pt-30 pb-30 mb-30 shadow-lg bg-white transition-transform transform hover:scale-105 duration-300 container mx-auto px-4 py-8 ">
      {Object.values(terms).map((section, index) => (
        <div
          key={index}
          className="section mb-10 p-6 "
        >
          <h2 style={{fontSize:"18px"}} className=" font-bold mb-4 text-purple-700">
            {section.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Legal;
