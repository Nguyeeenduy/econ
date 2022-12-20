import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./style/style.module.scss";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  rows: 1,
  dots: true,
  customPaging: function () {
    return <div className="custom-paging"></div>;
  },
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      customPaging: function () {
        return <div className="custom-paging"></div>;
      },
    },
  ],
};
const ValueIntroduce = ({ data }) => {
  return (
    <div id="ValueIntroduce">
      <div className={styles.valueIntroduce}>
        <div className="container">
          <div className={styles.valueContainer}>
            <div className={styles.valueHeader}>
              <div className={styles.valueHeaderIntro}>
                <div className={styles.valueHeaderBar} />
                <span>OUR VALUE</span>
                <div className={styles.valueHeaderBar} />
              </div>
              <h2 className={styles.valueHeaderTitle}>
                Giá trị Ezmoney.vn Theo Đuổi
              </h2>
            </div>
            <div className={styles.valueBody}>
              <div className={styles.valueBodyDesktop}>
                <div
                  className={`${styles.valueBodyDesktopItem} ${styles.equal} ${styles.green}`}
                >
                  <h4 className={styles.valueBodyDesktopItemTitle}>
                    {data?.worths?.[0]?.title}
                  </h4>
                  <span className={styles.valueBodyDesktopItemContent}>
                    {data?.worths?.[0]?.description}
                  </span>
                </div>
                <div
                  className={`${styles.valueBodyDesktopItem} ${styles.equal} ${styles.blue}`}
                >
                  <h4 className={styles.valueBodyDesktopItemTitle}>
                    {data?.worths?.[1]?.title}
                  </h4>
                  <span className={styles.valueBodyDesktopItemContent}>
                    {data?.worths?.[1]?.description}
                  </span>
                </div>

                <div
                  className={`${styles.valueBodyDesktopItem} ${styles.small} ${styles.yellow}`}
                >
                  <h4 className={styles.valueBodyDesktopItemTitle}>
                    {data?.worths?.[2]?.title}
                  </h4>
                  <span className={styles.valueBodyDesktopItemContent}>
                    {data?.worths?.[2]?.description}
                  </span>
                </div>
                <div
                  className={`background-image`}
                  style={{
                    backgroundImage: `url(${data?.image?.data?.attributes?.url})`,
                    width: "calc(60% - 16px)",
                  }}
                />

                <div
                  className={`${styles.valueBodyDesktopItem} ${styles.equal} ${styles.blue}`}
                >
                  <h4 className={styles.valueBodyDesktopItemTitle}>
                    {data?.worths?.[3]?.title}
                  </h4>
                  <span className={styles.valueBodyDesktopItemContent}>
                    {data?.worths?.[3]?.description}
                  </span>
                </div>
                <div
                  className={`${styles.valueBodyDesktopItem} ${styles.equal} ${styles.green}`}
                >
                  <h4 className={styles.valueBodyDesktopItemTitle}>
                    {data?.worths?.[4]?.title}
                  </h4>
                  <span className={styles.valueBodyDesktopItemContent}>
                    {data?.worths?.[4]?.description}
                  </span>
                </div>
              </div>
              <div className={styles.valueBodyMobile}>
                <div className="slider-desktop show-pagination">
                  <Slider {...settings}>
                    <div>
                      <div
                        className={`${styles.valueBodyDesktopItem} ${styles.green}`}
                      >
                        <h4 className={styles.valueBodyDesktopItemTitle}>
                          {data?.worths?.[0]?.title}
                        </h4>
                        <span className={styles.valueBodyDesktopItemContent}>
                          {data?.worths?.[0]?.description}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${styles.valueBodyDesktopItem} ${styles.blue}`}
                      >
                        <h4 className={styles.valueBodyDesktopItemTitle}>
                          {data?.worths?.[1]?.title}
                        </h4>
                        <span className={styles.valueBodyDesktopItemContent}>
                          {data?.worths?.[1]?.description}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${styles.valueBodyDesktopItem} ${styles.green}`}
                      >
                        <h4 className={styles.valueBodyDesktopItemTitle}>
                          {data?.worths?.[2]?.title}
                        </h4>
                        <span className={styles.valueBodyDesktopItemContent}>
                          {data?.worths?.[2]?.description}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${styles.valueBodyDesktopItem} ${styles.green}`}
                      >
                        <h4 className={styles.valueBodyDesktopItemTitle}>
                          {data?.worths?.[3]?.title}
                        </h4>
                        <span className={styles.valueBodyDesktopItemContent}>
                          {data?.worths?.[3]?.description}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${styles.valueBodyDesktopItem} ${styles.green}`}
                      >
                        <h4 className={styles.valueBodyDesktopItemTitle}>
                          {data?.worths?.[4]?.title}
                        </h4>
                        <span className={styles.valueBodyDesktopItemContent}>
                          {data?.worths?.[4]?.description}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`${styles.valueBodyDesktopItem} ${styles.green}`}
                      >
                        <h4 className={styles.valueBodyDesktopItemTitle}>
                          {data?.worths?.[5]?.title}
                        </h4>
                        <span className={styles.valueBodyDesktopItemContent}>
                          {data?.worths?.[5]?.description}
                        </span>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueIntroduce;
