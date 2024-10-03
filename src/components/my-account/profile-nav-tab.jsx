import React from "react";

function SingleNav({ active = false, id, title, icon }) {
  return (
    <button 
      style={{backgroundColor:active?"#990100":"",color:active?"white":""}}
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      <span>
        <i style={{color:"black"}} className={icon}></i>
      </span>
     <span style={{color:"black"}}>{title}</span> 
    </button>
  );
}

const ProfileNavTab = () => {
  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
         style={{backgroundColor:"#990100",color:"white"}}
      >
        <SingleNav
          active={true}
          id="profile"
          title="Profile"
          icon="fa-regular fa-user-pen"
        />
        <SingleNav
          id="information"
          title="Information"
          icon="fa-regular fa-circle-info"
        />
        <SingleNav
          id="order"
          title="My Orders"
          icon="fa-light fa-clipboard-list-check"
        />
        <SingleNav
          id="password"
          title="Change Password"
          icon="fa-regular fa-lock"
        />
      </div>
    </nav>
  );
};

export default ProfileNavTab;
