import React from "react";

import social_data from "@/data/social-data";
function SocialMedia() {
  return (
    <>
      {social_data.map((s) => (
        <a
          href={s.link}
          key={s.id}
          target="_blank"
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
            margin: "5px",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "15px",
            paddingRight: "15px",
            borderRadius: "50%",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#990100";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#000000";
          }}
        >
          <i className={s.icon}></i>
        </a>
      ))}
    </>
  );
}

export default SocialMedia;
