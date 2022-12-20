import router from "next/router";
import React from "react";
import Rating from "../Rating";
import styles from "./style/style.module.scss";

const Author = (props) => {
  const { data } = props;
  return (
    <div className={styles.containerAuthorInfo}>
      <div className={styles.containerAuthorInfo1}>
        <div
          className={`${styles.containerAuthorInfoImage} background-image`}
          style={{
            backgroundImage: `url('${
              data?.data?.data[0]?.attributes?.author?.avatar?.data?.attributes
                ?.url || "/images/avatar-default.png"
            }')`,
          }}
        />
        <span className={styles.containerAuthorInfoWriteBy}>Được viết bởi</span>
        <span className={styles.containerAuthorInfoName}>
          {data?.data?.data[0]?.attributes?.author?.authorName || "Ẩn danh"}
        </span>
      </div>
      <div className={styles.containerAuthorInfo2}>
        <span className={styles.containerAuthorInfoRating}>Đánh giá</span>
        <Rating
          size={20}
          start={data?.data?.data[0]?.attributes?.author?.rating || 0}
        />
        <span
          className={styles.containerAuthorInfoRating}
          style={{ marginTop: "2px" }}
        >
          Số lượng bài viết:{" "}
          {data?.data?.data[0]?.attributes?.author?.posts || 0}
        </span>
        <p className={styles.containerAuthorInfoDescription}>
          {data?.data?.data[0]?.attributes?.author?.description}
        </p>
      </div>
    </div>
  );
};

export default Author;
