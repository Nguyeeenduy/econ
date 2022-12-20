import React from "react";
import styles from "./style/style.module.scss";
import Slider from "react-slick";
import Image from "next/image";

const OurPartNers = (props) => {
  const { data } = props;
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
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 2,
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
    <div
      id={"OurPartners"}
      className={styles.wrapper}
      style={{ backgroundImage: `url('/images/bg-our-partnes.png')` }}
    >
      <div className={`d-flex justify-content-center align-items-center`}>
        <div className={styles.wrapperLine} />
        <span className={styles.wrapperTitle}>OUR PARTNERS</span>
        <div className={styles.wrapperLine} />
      </div>
      <h2
        className={`d-flex justify-content-center align-items-center ${styles.wrapperText}`}
      >
        Đối tác liên kết
      </h2>
      <div className={`container`}>
        {data?.length > 0 && typeof window !== "undefined" && (
          <div
            className={`${styles.serviceList} custom-slick-list slider-desktop`}
          >
            <Slider {...settings}>
              {data?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.serviceItemContainer}>
                      <a
                        className={`d-flex align-items-center flex-column`}
                        href={item?.url || "#"}
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
                      </a>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurPartNers;
