import React from "react";

//styles
import styles from "./style/style.module.scss";

const banners = [
  {
    image_url: "/images/im-banner1.png",
    link_url: "#",
  },
  {
    image_url: "/images/im-banner2.jpg",
    link_url: "#",
  },
];

const MainBanner =  (props) => {
  const { data } = props;
  const options = {
    nav: false,
    margin: 15,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    items: 1,
  };

  return (
    <div className="position-relative overflow-hidden">
      <div
        className={`${styles.ImageBanner} background-image`}
        style={{ backgroundImage: "url('/images/banner-home.webp')" }}
      />
      <div className={`container ${styles.container}`}>
        <div className={styles.containerTextBanner}>
          <h1 className={styles.containerTextBannerHead}>{data?.title}</h1>
          <p className={styles.containerTextBannerDecrease}>{data?.subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainBanner);
