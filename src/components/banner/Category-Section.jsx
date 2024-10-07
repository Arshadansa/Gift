// components/CategorySection.js
import Image from "next/image";
import logo5 from "../../../public/assets/img/banner/Category/5.png";
import logo2 from "../../../public/assets/img/banner/Category/2.png";
import logo1 from "../../../public/assets/img/banner/Category/1.png";
import logo3 from "../../../public/assets/img/banner/Category/3.png";
import logo4 from "../../../public/assets/img/banner/Category/4.png";
import logo6 from "../../../public/assets/img/banner/Category/6.png";

const categories = [
  { label: "THE SURPRISE BOX", icon: logo1 },
  { label: "THE TEDDY MADDY", icon: logo2 },
  { label: "THE HAPPY CARDS", icon: logo3 },
  { label: "THE WALL PAINTINGS", icon: logo4 },
  { label: "DIWALI GIFTS", icon: logo5 },
  { label: "Personalised", icon: logo6 },
];

export default function CategorySection() {
  return (
    <div className="container">
      <div
        className="panel panel-default"
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid #ddd",
          padding: "10px",
          flexWrap: "nowrap", // Prevent wrapping to ensure one row
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              textAlign: "center",
              borderRight:
                index !== categories.length - 1 ? "1px solid #ddd" : "none",
              padding: "10px",
            }}
          >
            <Image
              src={category.icon}
              alt={category.label}
              width={64}
              height={64}
            />
            <p style={{ marginTop: "8px", fontSize: "14px" }}>
              {category.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
