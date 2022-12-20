import router from "next/router";
import React from "react";
import styles from "./style/style.module.scss";

const Menu = ({ data, tab, handleChangeTab }) => {
  return (
    <div className={`${styles.container} container`}>
      {data.slice(0, 4).map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleChangeTab(index)}
            className={`${styles.containerButton} ${
              tab === index ? styles.containerButtonActive : ""
            }`}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
