import React, { useEffect } from "react";
import Slider, { Settings } from "react-slick";
//styles
import styles from "./style/style.module.scss";
import Image from "next/image";
const starts = (number) => {
  const newArray = [];
  for (let i = 1; i <= parseInt(number).toFixed(0); i++) {
    newArray.push(i);
  }
  return newArray;
};
const OurCustomers = React.memo(function OurCustomers(props) {
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
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={`${styles.wrapper} position-relative`}>
      <Image
        src={
          isDark
            ? "/images/bg-our-services-dark.webp"
            : "/images/bg-our-services.webp"
        }
        alt="our-service"
        layout="fill"
      />
      <div
        className={`position-relative d-flex justify-content-center align-items-center`}
      >
        <div className={styles.wrapperLine} />
        <span className={styles.wrapperTitle}>OUR CUSTOMERS</span>
        <div className={styles.wrapperLine} />
      </div>
      <div
        className={`position-relative d-flex justify-content-center align-items-center ${styles.wrapperText}`}
      >
        Cảm nhận khách hàng
      </div>
      <div className={`container slider-customer equal-slider`}>
        <Slider {...settings}>
          {data?.map((item, index) => {
            return (
              <div key={index}>
                <div className={styles.serviceItemContainer}>
                  <a
                    className={`d-flex align-items-center flex-column ${styles.serviceItemWrapper}`}
                    href={item?.url || "#"}
                  >
                    <div className={styles.serviceItemContainerImage}>
                      <div
                        className={`${styles.serviceItemImage} background-image position-relative`}
                      >
                        <Image
                          src={
                            item?.avatar?.data?.attributes?.url
                              ? item?.avatar?.data?.attributes?.url
                              : "/images/avatar-default.png"
                          }
                          alt="customer"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>

                    <h6 className={styles.serviceItemName}>{item?.userName}</h6>
                    <div className={styles.serviceItemPosition}>
                      {item?.position}
                    </div>
                    <div className={styles.serviceItemRating}>
                      {starts(item.rating).map((start) => (
                        <img
                          key={start}
                          alt="start"
                          src="/icons/ic-start.svg"
                          width={28}
                          height={28}
                          style={{
                            marginRight:
                              start < starts(item.rating).length
                                ? "8px"
                                : "0px",
                          }}
                        />
                      ))}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        background: "#F0F0F0",
                        margin: "16px 0",
                      }}
                    />
                    <div className={styles.serviceItemRating}>
                      {item.content}
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
});

export default React.memo(OurCustomers);
