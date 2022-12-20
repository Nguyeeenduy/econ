import Image from "next/image";
import React from "react";
import styles from "./style/style.module.scss";

const Pagination = (props) => {
  const pages = [...Array(Math.ceil(props?.total / props?.perPage)).keys()].map(
    (i) => i
  );
  const handlePre = () => {
    if (props?.page !== 0) props.setPage(props?.page - 1);
  };
  const handleNext = () => {
    if (props?.page !== pages.length - 1) props.setPage(props?.page + 1);
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerButtonPre} onClick={() => handlePre()}>
        <div
          className={`${styles.containerImg} background-image`}
          style={{
            backgroundImage: `url(${
              props?.page === 0
                ? "/icons/ic-arrow-right-grey.svg"
                : "/icons/ic-arrow-right.svg"
            })`,
          }}
        />
      </div>

      {pages.map((item) => {
        if (
          (item <= props?.page + 2 && item >= props?.page - 2) ||
          (item < 5 && props?.page < 2) ||
          (item > pages.length - 6 && props?.page > pages.length - 3)
        )
          return (
            <div
              className={
                props?.page === item
                  ? styles.containerButtonActive
                  : styles.containerButton
              }
              onClick={() => props?.setPage(item)}
            >
              {item + 1}
            </div>
          );
      })}
      <div className={styles.containerButtonNext} onClick={() => handleNext()}>
        <div
          className={`${styles.containerImg} background-image`}
          style={{
            backgroundImage: `url(${
              props?.page === pages.length - 1
                ? "/icons/ic-arrow-right-grey.svg"
                : "/icons/ic-arrow-right.svg"
            })`,
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
