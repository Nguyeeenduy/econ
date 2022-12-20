import React from "react";
import Slider from "react-slick";
import styles from "./style/style.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  slidesPerRow: 3,
  rows: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  customPaging: function () {
    return <div className="custom-paging"></div>;
  },
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        slidesPerRow: 1,
        rows: 1,
      },
      customPaging: function () {
        return <div className="custom-paging"></div>;
      },
    },
  ],
};
const OurTeamIntroduce = ({ data }) => {
  return (
    <div id="OurTeamIntroduce">
      <div
        className={styles.ourTeamIntroduce}
        style={{ backgroundImage: `url('/images/bg-our-team.png')`}}
      >
        <div className="container">
          <div className={styles.ourTeamContainer}>
            <div className={styles.ourTeamHeader}>
              <div className={styles.ourTeamHeaderIntro}>
                <div className={styles.ourTeamHeaderBar} />
                <span>OUR TEAM</span>
                <div className={styles.ourTeamHeaderBar} />
              </div>
              <h2 className={styles.ourTeamHeaderTitle}>Đội ngũ tiên phong</h2>
            </div>
            <div className={`slider-desktop ${styles.ourTeamSlider}`}>
              <Slider {...settings}>
                {data?.members?.map((item, index) => {
                  return (
                    <div className={styles.ourTeamSliderItem} key={index}>
                      <div className={styles.ourTeamSliderItemContent}>
                        <div
                          className={`${styles.ourTeamSliderItemContentImage} background-image`}
                          style={{
                            backgroundImage: `url(${
                              item?.avatar?.data?.attributes?.url ||
                              "/images/avatar-default.png"
                            })`,
                          }}
                        />
                        <p className={styles.ourTeamSliderItemContentName}>
                          {item?.name}
                        </p>
                        <p className={styles.ourTeamSliderItemContentPosition}>
                          {item?.position}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.discription,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeamIntroduce;
