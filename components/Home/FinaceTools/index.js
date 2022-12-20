import React, { useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

import styles from "./style/style.module.scss";
import router from "next/router";
const FinaceTools = React.memo(function FinaceTools(props) {
  const [isDark, setIsDark] = React.useState(false);
  const { data } = props;

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
    rows: 2,
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
  return data?.length ? (
    <div className={`${styles.wrapper} position-relative`}>
      <Image
        src={
          isDark
            ? "/images/bg-our-services-dark.webp"
            : "/images/bg-our-services.webp"
        }
        alt="bg-our-services"
        layout="fill"
      />
      <div
        className={`position-relative d-flex justify-content-center align-items-center`}
      >
        <div className={styles.wrapperLine} />
        <span className={styles.wrapperTitle}>FINANCE TOOLS</span>
        <div className={styles.wrapperLine} />
      </div>
      <h2
        className={`position-relative d-flex justify-content-center align-items-center ${styles.wrapperText}`}
      >
        Công cụ tài chính
      </h2>
      <div className={`container custom-slick-list ${styles.container}`}>
        <div className={`slider-desktop`}>
          <Slider {...settings}>
            {data?.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    className={styles.serviceItemContainer}
                    onClick={() => router.push(item?.url || "/")}
                  >
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
                            objectFit="contain"
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
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
});

export default React.memo(FinaceTools);
