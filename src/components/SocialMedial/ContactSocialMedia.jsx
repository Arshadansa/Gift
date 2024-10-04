import React from "react";

import social_data from "@/data/social-data";

function ContactSocialMedia() {
  return (
    <>
      {social_data.map((s, index) => (
        <a
          href={s.link}
          key={s.id}
          target="_blank"
          style={{
            color: "#FFFFFF",
            backgroundColor: "#990100", // Set initial background color to #990100
            border: "2px solid #990100", // Set initial border color to #990100
            margin: "5px",
      
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "50%",
            transition: "background-color 0.3s, color 0.3s, border-color 0.3s", // Include border-color in transition
            marginRight: index < social_data.length - 1 ? "10px" : "0", // Add right margin except for the last icon
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#000000"; // Change background to black on hover
            e.target.style.borderColor = "#000000"; // Change border color to black on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#990100"; // Revert background to #990100
            e.target.style.borderColor = "#990100"; // Revert border color to #990100
          }}
        >
          <i className={s.icon}></i>
        </a>
      ))}
    </>
  );
}

export default ContactSocialMedia;
