import React from "react";
//styles
import styles from "./style/style.module.scss";

const Advertisement = (props) => {
  const { data } = props;
  return (
    <a href={data?.linkAD}>
      <div className={`${styles.containerDesktop} container`}>
        <div
          className={`${styles.containerDesktopImage} background-image`}
          style={{
            backgroundImage: `url(${
              data?.imageDesktop?.data?.attributes?.url || "/images/img-ad.png"
            })`,
          }}
        />
      </div>
      <div className={`${styles.containerMobile} container`}>
        <div
          className={`${styles.containerMobileImage} background-image`}
          style={{
            backgroundImage: `url(${
              data?.imageMobile?.data?.attributes?.url ||
              "/images/img-ad-mobile.png"
            })`,
          }}
        />
      </div>
    </a>
  );
};

export default Advertisement;
