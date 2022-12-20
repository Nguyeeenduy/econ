import { useRouter } from "next/router";
import React from "react";
import styles from "./style/style.module.scss";

const MenuSubCate = ({ data }) => {
  const [showMore, setShowMore] = React.useState(false);
  const router = useRouter();
  const handleSeeMore = () => {
    setShowMore(!showMore);
  };
  const eventHandler = () => {
    setShowMore(false);
  };
  React.useEffect(() => {
    if (showMore) {
      document.addEventListener("click", eventHandler);
      return () => document.removeEventListener("click", eventHandler);
    }
  }, [showMore]);
  return (
    <div className={`${styles.container} container`}>
      {data?.slice(0, 4).map((item, index) => {
        return (
          <a
            key={index}
            onClick={() => router.push(`/san-pham/${item?.attributes?.Slug}`)}
            className={`${styles.containerButton} ${
              item?.attributes?.Slug === router.query.slug
                ? styles.containerButtonActive
                : ""
            }`}
          >
            {item?.attributes?.name}
          </a>
        );
      })}
      {data?.length > 4 && (
        <div
          className={`d-flex justify-content-center ${styles.containerButton} ${
            showMore ? styles.containerButtonActive : ""
          }`}
          onClick={() => handleSeeMore()}
        >
          <span>Xem thêm</span>{" "}
          <div
            style={{
              backgroundImage: `url('${
                showMore
                  ? "/icons/ic-arrow-down-white.svg"
                  : "/icons/ic-arrow-down-black.svg"
              }')`,
              width: "24px",
              height: "24px",
              marginLeft: "4px",
            }}
          />
          {showMore && (
            <div className={styles.containerSeeMore}>
              {data?.slice(4).map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.containerSeeMoreElement}
                    onClick={() =>
                      router.push(`/san-pham/${item?.attributes?.Slug}`)
                    }
                  >
                    {item?.attributes?.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuSubCate;
