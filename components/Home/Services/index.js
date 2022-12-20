import React, { useEffect } from "react";
import Slider from "react-slick";

import styles from "./style/style.module.scss";
import Image from "next/image";
import router from "next/router";

const Services = React.memo(function Services(props) {
  const { data } = props;
  const [isDark, setIsDark] = React.useState(false);
  useEffect(() => {
    const onStorage = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundImage: `url('/images/img-next.png')`,
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundImage: `url('/images/img-pre.png')`,
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 3,
    dots: true,
    customPaging: function () {
      return <div className="custom-paging"></div>;
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <React.StrictMode>
      <div className={styles.wrapper}>
        <div className={`d-flex justify-content-center align-items-center`}>
          <div className={styles.wrapperLine} />
          <span className={styles.wrapperTitle}>OUR SERVICE</span>
          <div className={styles.wrapperLine} />
        </div>
        <div
          className={`d-flex justify-content-center align-items-center ${styles.wrapperText}`}
        >
          Bạn đang quan tâm
        </div>
        <div className={`container`}>
          <div
            className={`slider-desktop custom-slick-list ${styles.serviceList}`}
          >
            <Slider {...settings}>
              {data?.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className={styles.containerSlider}
                      onClick={() => router.push(item?.url || "/")}
                    >
                      <div className={styles.serviceItemContainer}>
                        <div
                          className={`d-flex align-items-center flex-column ${styles.serviceItemWrapper}`}
                        >
                          <div
                            className={`${styles.serviceItemIcon} background-image position-relative`}
                          >
                            {item?.image?.data?.attributes?.url && (
                              <Image
                                src={item?.image?.data?.attributes?.url}
                                alt="icon"
                                layout="fill"
                              />
                            )}
                          </div>
                          <div
                            className={`d-flex align-items-center ${styles.serviceItemText}`}
                          >
                            <h6 className={styles.serviceItemName}>
                              {item?.title}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
});

export default React.memo(Services);
