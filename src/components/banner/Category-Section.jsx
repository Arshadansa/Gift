// components/CategorySection.js
import Image from "next/image";
import logo5 from "../../../public/assets/img/banner/Category/5.png";
import logo2 from "../../../public/assets/img/banner/Category/2.png";
import logo1 from "../../../public/assets/img/banner/Category/1.png";
import logo3 from "../../../public/assets/img/banner/Category/3.png";
import logo4 from "../../../public/assets/img/banner/Category/4.png";
import logo6 from "../../../public/assets/img/banner/Category/6.png";
import { useRouter } from "next/router"; // Import useRouter from next/router

const categories = [
  { id: 23, label: "THE SURPRISE BOX", icon: logo1 },
  { id: 27, label: "THE TEDDY MADDY", icon: logo2 },
  { id: 28, label: "THE HAPPY CARDS", icon: logo3 },
  { id: 32, label: "THE WALL PAINTINGS", icon: logo4 },
  { id: 30, label: "DIWALI GIFTS", icon: logo5 },
  { id: 31, label: "Personalised", icon: logo6 },
];

export default function CategorySection() {
  const router = useRouter(); // Initialize useRouter

  const handleCategoryClick = (id) => {
    // Navigate to the shop with the selected category ID
    router.push(`/shop?category=${id}`); // Updated route
  };

  return (
    <div className="container">
      <div
        className="panel panel-default"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", // Responsive grid
          gap: "26px", // Space between grid items
          border: "1px solid #ddd",
          padding: "16px",
          maxWidth: "1200px",
          margin: "auto", // Maximum width of the grid container
        }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)} // Call the function on click
            style={{
              textAlign: "center",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px", // Optional: To make the boxes look nicer
              backgroundColor: "#fff", // Optional: Add background color
              cursor: "pointer", // Change cursor to pointer
              transition: "transform 0.2s", // Smooth transition for scale
            }}
            className="category-item" // Optional class for hover effects
          >
            <Image
              src={category.icon}
              alt={category.label}
              width={64}
              height={64}
            />
            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "black", // Default text color
                transition: "color 0.2s", // Smooth transition for color change
              }}
              className="category-label" // Optional class for hover effects
            >
              {category.label}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .category-item:hover {
          transform: scale(1.05); // Scale up the item on hover
        }

        .category-item:hover .category-label {
          color: #990100; // Change label color on hover
        }
      `}</style>
    </div>
  );
}
