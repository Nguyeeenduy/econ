import React, { useState } from "react";

//styles
import styles from "./style/style.module.scss";
import Slider from "react-slick";

const MenuCategory = (props) => {
  const { data, active } = props;
  const [showMore, setShowMore] = React.useState(false);
  const eventHandler = () => {
    setShowMore(false);
  };
  React.useEffect(() => {
    if (showMore) {
      document.addEventListener("click", eventHandler);
      return () => document.removeEventListener("click", eventHandler);
    }
  }, [showMore]);
  React.useEffect(() => {
    let elementId = document.getElementById("menu");
    let elementFixed = document.getElementById("fixed");
    document.addEventListener("scroll", () => {
      if (window.scrollY > elementId.offsetTop - 80) {
        elementFixed.classList.add(styles.container);
      } else {
        elementFixed.classList.remove(styles.container);
      }
    });
  }, []);
  let showScroll = 0;
  React.useEffect(() => {
    const listener = () => {
      if (window.innerWidth < 769) {
        const scr = window.pageYOffset;
        if (showScroll < 80 || showScroll > scr) {
          document
            .getElementById("fixed")
            .classList.remove(styles.containerMobile);
        } else
          document
            .getElementById("fixed")
            .classList.add(styles.containerMobile);
        showScroll = scr;
      }
    };
    listener();
    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, []);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: data?.length > 2 ? 2.5 : data?.length,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: data?.length > 4 ? 4 : data?.length,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: data?.length > 2 ? 2.5 : data?.length,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div id="menu">
      <div id="fixed">
        <div className={`container overflow-hidden`}>
          <div className={`${styles.containerBorder}`}>
            <Slider {...settings}>
              <div>
                <div className={styles.containerButton}>
                  <a
                    href={`#baivietmoi`}
                    className={`${
                      active === "baivietmoi"
                        ? styles.containerButtonClickActive
                        : styles.containerButtonClick
                    }`}
                  >
                    <div className={styles.containerButtonText}>
                      Bài viết mới
                    </div>
                  </a>
                </div>
              </div>
              {data?.map((item, index) => {
                if (
                  (item?.attributes?.blog_lists?.data?.length &&
                    item?.attributes?.isShowCategory) ||
                  !item?.attributes?.isShowCategory
                )
                  return (
                    <div key={index}>
                      <div className={styles.containerButton}>
                        <a
                          href={`${
                            item?.attributes?.isShowCategory
                              ? "#"
                              : "/danh-muc/"
                          }${item?.attributes?.slug}`}
                          className={`${
                            active === item?.attributes?.slug
                              ? styles.containerButtonClickActive
                              : styles.containerButtonClick
                          }`}
                        >
                          <div className={styles.containerButtonText}>
                            {item?.attributes?.categoryName}
                          </div>
                        </a>
                      </div>
                    </div>
                  );
              })}
            </Slider>
          </div>
        </div>
        <div className="container">
          <div className={`${styles.containerDesktop} on-desktop`}>
            <a
              href={`#baivietmoi`}
              className={`${styles.containerDesktopButton} ${
                active === "baivietmoi"
                  ? styles.containerDesktopButtonActive
                  : styles.containerDesktopButton
              }`}
            >
              Bài viết mới
            </a>
            {data?.slice(0, 4).map((item, index) => {
              if (
                (item?.attributes?.blog_lists?.data?.length &&
                  item?.attributes?.isShowCategory) ||
                !item?.attributes?.isShowCategory
              )
                return (
                  <a
                    key={index}
                    href={`${
                      item?.attributes?.isShowCategory ? "#" : "/danh-muc/"
                    }${item?.attributes?.slug}`}
                    className={`${
                      active === item?.attributes?.slug
                        ? styles.containerDesktopButtonActive
                        : styles.containerDesktopButton
                    }`}
                  >
                    {item?.attributes?.categoryName}
                  </a>
                );
            })}
            {data?.length > 4 && (
              <div
                className={`d-flex justify-content-center ${
                  styles.containerDesktopButton
                } ${showMore ? styles.containerDesktopButtonActive : ""}`}
                onClick={() => setShowMore(!showMore)}
              >
                <span>Xem thêm</span>{" "}
                <div
                  style={{
                    backgroundImage: `url('${
                      showMore
                        ? "/icons/ic-arrow-down-white.svg"
                        : "/icons/ic-arrow-down-black.svg"
                    }')`,
                    width: "24px",
                    height: "24px",
                    marginLeft: "4px",
                  }}
                />
                {showMore && (
                  <div className={styles.containerDesktopSeeMore}>
                    {data?.slice(4).map((item, index) => {
                      return (
                        <a
                          key={index}
                          className={styles.containerDesktopSeeMoreElement}
                          href={`${
                            item?.attributes?.isShowCategory
                              ? "#"
                              : "/danh-muc/"
                          }${item?.attributes?.slug}`}
                        >
                          {item?.attributes?.categoryName}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCategory;
