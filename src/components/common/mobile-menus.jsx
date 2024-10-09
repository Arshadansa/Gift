import React, { useState } from "react";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");

  // handleOpenSubMenu to toggle submenu on click
  const handleOpenSubMenu = (title) => {
    setIsActiveMenu((prevMenu) => (prevMenu === title ? "" : title));
  };

  return (
    <>
      <nav className="tp-main-menu-content">
        <ul className="menu">
          {mobile_menu.map((menu) =>
            menu.sub_menu ? (
              // Menu with submenus
              <li
                key={menu.id}
                className={`menu-item has-sub-menu ${
                  isActiveMenu === menu.title ? "active" : ""
                }`}
              >
                {/* Ensure the menu.link exists, otherwise set a fallback */}
                <Link href={menu.link || "#"}>
                  <span
                    style={{
                      color: isActiveMenu === menu.title ? "black" : "white", // Change color based on active state
                    }}
                    onClick={() => handleOpenSubMenu(menu.title)}
                  >
                    {menu.title}
                  </span>
                </Link>

                {/* Render Submenu */}
                {isActiveMenu === menu.title && menu.sub_menus && (
                  <ul className="sub-menu">
                    {menu.sub_menus.map((sub, index) => (
                      <li key={index}>
                        {/* Ensure sub.link exists */}
                        <Link href={sub.link || "#"}>
                          <span
                            style={{
                              color:
                                isActiveMenu === menu.title ? "black" : "white", // Change color based on active state
                            }}
                          >
                            {sub.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              // Single link item
              <li key={menu.id} className="menu-item">
                <Link href={menu.link || "#"}>
                  <span
                    style={{
                      color: isActiveMenu === menu.title ? "black" : "white", // Change color based on active state
                    }}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  );
};

export default MobileMenus;
