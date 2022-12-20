import router from "next/router";
import React from "react";
import styles from "./style/style.module.scss";

const Breadcrumb = (props) => {
  const { breadcrumb } = props;

  return (
    <div className="d-flex breadcrumb">
      <div
        className={`background-image ${styles.breadcrumbImage}`}
        style={{
          backgroundImage: `url("/icons/ic-home-green.svg")`,
        }}
        onClick={() => router.push("/")}
      />
      {breadcrumb.map((data, index) => {
        return (
          <div key={index} className={"d-flex"}>
            <div
              className={`background-image ${styles.breadcrumbImageRight}`}
              style={{
                backgroundImage: `url("/icons/ic-arrow-right-black.svg")`,
              }}
            />
            <span
              className={`${
                index === breadcrumb.length - 1
                  ? styles.breadcrumbTextBlack
                  : styles.breadcrumbText
              }`}
              onClick={() => router.push(data.href)}
            >
              {data.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
