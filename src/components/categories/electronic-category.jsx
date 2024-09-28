import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// internal
import ErrorMsg from "../common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import HomeCateLoader from "../loader/home/home-cate-loader";

const ElectronicCategory = () => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery(); // Fetch categories
  const router = useRouter();

  // Handle category route
  const handleCategoryRoute = (name) => {
    router.push(
      `/shop?category=${name
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
  };

  // Decide what to render
  let content = null;

  if (isLoading) {
    content = <HomeCateLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.length > 0) {
    content = categories.map((item) => (
      <div className="col border" key={item.id}>
        <div className="tp-product-category-item text-center mb-40">
          <div className="tp-product-category-thumb fix">
            <a
              className="cursor-pointer"
              onClick={() => handleCategoryRoute(item.name)}
            >
              <Image
                style={{ objectFit: "contain" }} // Apply object-contain style here
                src={item.image}
                alt={item.name}
                className="cover"
                width={100}
                height={100}
              />
            </a>
          </div>
          <div className="tp-product-category-content">
            <h3 className="tp-product-category-title">
              <a
                className="cursor-pointer"
                onClick={() => handleCategoryRoute(item.name)}
              >
                {item.name}
              </a>
            </h3>
            {/* Assuming you have a 'products' property in the category data */}
            <p>
              {item.products
                ? `${item.products.length} Product`
                : "No Products"}
            </p>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <section className="tp-product-category pt-60 pb-15">
      <div className="container">
        <div className="row row-cols-xl-5 row-cols-lg-5 row-cols-md-4">
          {content}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;
