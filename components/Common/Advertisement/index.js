import React from "react";
import Image from "next/image";
//styles
import styles from "./style/style.module.scss";

const Advertisement = (props) => {
  const { data, paddingDesktop, paddingMobile } = props;
  return (
    <a className={styles.container} target="_blank" href={data?.linkAD || "#"}>
      <div
        className={`${styles.containerDesktop} container`}
        style={{ padding: paddingDesktop || "38px 0 46px" }}
      >
        <div
          className={`${styles.containerDesktopImage} background-image position-relative`}
        >
          <Image
            src={
              data?.imageDesktop?.data?.attributes?.url || "/images/img-ad.png"
            }
            alt="banner"
            layout={"fill"}
            objectFit="cover"
          />
        </div>
      </div>
      <div
        className={`${styles.containerMobile} container`}
        style={{ padding: paddingMobile || "0 16px" }}
      >
        <div
          className={`${styles.containerMobileImage} background-image position-relative`}
        >
          <Image
            src={
              data?.imageMobile?.data?.attributes?.url || "/images/img-ad.png"
            }
            alt="banner moblie"
            layout={"fill"}
          />
        </div>
      </div>
    </a>
  );
};

export default Advertisement;
