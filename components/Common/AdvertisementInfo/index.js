import React from "react";
import styles from "./styles/styles.module.scss";
const AdvertisementInfo = ({ data }) => {
  return (
    <div id="Advertisement">
      <div className={styles.advertisement}>
        <div className="container">
          <div className={styles.containerAd}>
            <h2 className={styles.title}>{data?.title}</h2>
            <p className={styles.description}>{data?.subTitle}</p>
            <div className={styles.buttonGroup}>
              {data?.advertisement_button?.map((item, index) => {
                return (
                  <a
                    key={index}
                    className={styles.buttonItem}
                    href={item?.link}
                  >
                    {item?.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdvertisementInfo;
