import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";

const StatusFilter = ({ setCurrPage, shop_right = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const status = ["On sale", "In Stock"];

  const handleStatusRoute = (status) => {
    setCurrPage(1);

    const currentStatuses = router.query.status?.split(",") || [];
    const updatedStatuses = currentStatuses.includes(status.toLowerCase())
      ? currentStatuses.filter((s) => s !== status.toLowerCase())
      : [...currentStatuses, status.toLowerCase()];

    router.push({
      pathname: `/${shop_right ? 'shop-right-sidebar' : 'shop'}`,
      query: {
        ...router.query,
        status: updatedStatuses.join(",") || undefined,
      },
    });

    dispatch(handleFilterSidebarClose());
  };

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Product Status</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-checkbox">
          <ul className="filter-items filter-checkbox">
            {status.map((s, i) => (
              <li key={i} className="filter-item checkbox">
                <input
                  id={s}
                  type="checkbox"
                  checked={router.query.status?.includes(s.toLowerCase()) || false}
                  readOnly
                />
                <label onClick={() => handleStatusRoute(s)} htmlFor={s}>
                  {s}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatusFilter;


