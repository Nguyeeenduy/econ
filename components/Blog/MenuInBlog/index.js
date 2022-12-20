import { convertSlug } from "@/utils/convertSlug";
import React, { useState } from "react";

//styles
import styles from "./style/style.module.scss";

const MenuInBlog = (props) => {
  const { data } = props;
  const [showChild, setShowChild] = React.useState([]);
  const handleShowChild = (index) => {
    showChild[index] = !showChild[index];
    setShowChild([...showChild]);
  };
  return (
    <div className={`${styles.containerMenu}`}>
      <div className={styles.containerMenuList}>
        <span>Mục lục</span>
        {data?.map((item, index) => {
          return (
            <div key={index} className={styles.containerMenuListElement}>
              <div className={styles.containerMenuListItem}>
                <span
                  onClick={() =>
                    window.scrollTo(
                      0,
                      parseInt(
                        document.getElementById(
                          `${convertSlug(item.title)}-${item?.id}`
                        ).offsetTop
                      ) - 115
                    )
                  }
                >
                  {item.title}
                </span>
                {item?.contentChilds.length !== 0 && (
                  <div
                    className={`${styles.containerMenuImage} background-image ${
                      showChild[index] ? "rotate-image" : ""
                    }`}
                    style={{
                      backgroundImage: `url("/icons/ic-arrow-down-green.svg")`,
                    }}
                    onClick={() => handleShowChild(index)}
                  />
                )}
              </div>
              <div
                className={`${styles.containerMenuListElementChild} ${
                  showChild[index]
                    ? styles.containerMenuListElementChildActive
                    : ""
                }`}
              >
                {item?.contentChilds?.map((child, indexChild) => {
                  return (
                    <span
                      className={styles.containerMenuListItemChild}
                      key={indexChild}
                      onClick={() =>
                        window.scrollTo(
                          0,
                          parseInt(
                            document.getElementById(
                              `${convertSlug(child.title)}-child-${child?.id}`
                            ).offsetTop
                          ) - 115
                        )
                      }
                    >
                      <div>{child.title}</div>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuInBlog;
