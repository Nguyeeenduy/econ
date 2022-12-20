import React from "react";
import Slider from "react-slick";
import styles from "./style/style.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopBreadcrumb from "../TopBreadcrumb";

const SliderIntroduce = ({ data, isDark }) => {
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
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <div
      id="sliderIntroduce"
      className="background-image"
      style={{ backgroundImage: isDark ? `url('/images/bg-our-services-dark.webp')` : `url('/images/bg-our-services.webp')`}}
    >
      <div className={`container ${styles.sliderIntroduce}`}>
        <TopBreadcrumb />
        <div
          className={`slider-desktop show-pagination slick-dots-80 ${styles.sliderContain}`}
        >
          <Slider {...settings}>
            {data?.map((item, index) => (
              <div className={styles.sliderItem} key={index}>
                <div className={styles.sliderItemContain}>
                  <div className={styles.sliderItemContainLeft}>
                    <div className={styles.sliderItemContainLeftIntro}>
                      <div className={styles.sliderItemContainLeftBar} />
                      <span>OUR VALUE</span>
                      <div className={styles.sliderItemContainLeftBar} />
                    </div>
                    <h2 className={styles.sliderItemContainLeftTitle}>
                      {item?.title}
                    </h2>
                    <span className={styles.sliderItemContainLeftContent}>
                      {item?.discription}
                    </span>
                  </div>
                  <div className={styles.sliderItemContainRight}>
                    <div
                      className={`background-image ${styles.sliderItemContainRightImage}`}
                      style={{
                        backgroundImage: `url(${item?.image?.data?.attributes?.url})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderIntroduce;
