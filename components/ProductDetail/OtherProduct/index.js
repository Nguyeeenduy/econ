import CheckBox from "@/components/Common/Checkbox";
import Rating from "@/components/Common/Rating";
import router from "next/router";
import React from "react";
import Slider from "react-slick";
import ReactTooltip from "react-tooltip";
import styles from "./style/style.module.scss";

const OtherProduct = ({ data, handleCheck, handleAddCompare }) => {
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
    slidesToShow: data?.length > 8 ? 4 : data?.length <= 4 ? data?.length : 5,
    slidesToScroll: 4,
    rows: data?.length > 5 ? 2 : 1,
    dots: true,
    customPaging: function () {
      return <div className="custom-paging"></div>;
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          rows: 1,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          rows: 1,
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url('images/bg-our-services.png')` }}
    >
      <h2 className={styles.wrapperTitle}>
        Các sản phẩm khác có thể bạn quan tâm
      </h2>
      <div className={`container`}>
        <div
          className={`slider-desktop custom-slick-list-credit ${styles.serviceList}`}
        >
          <Slider {...settings}>
            {data?.map((item, index) => {
              return (
                <div key={index}>
                  <div className={styles.containerSlider}>
                    <div href={"#"} className={styles.serviceItemContainer}>
                      <div className={`${styles.serviceItemCredit}`}>
                        <div className={styles.serviceItemCreditHead}>
                          <p className={styles.serviceItemCreditHeadText}>
                            {item?.attributes?.parent}
                          </p>
                          <CheckBox
                            id={`item${index}`}
                            defaultChecked={handleCheck(item)}
                            onChange={(e) => handleAddCompare(e, item)}
                          />
                        </div>
                        <span
                          className={styles.serviceItemCreditTitle}
                          onClick={() =>
                            router.push(
                              `/chi-tiet-san-pham/${item?.attributes?.slug}`
                            )
                          }
                        >
                          {item?.attributes?.name}
                          <img
                            data-tip={
                              item?.attributes?.confirm
                                ? "Sản phẩm được nhà nước công nhận"
                                : "Sản phẩm chưa được nhà nước công nhận"
                            }
                            onMouseEnter={() => {
                              ReactTooltip.rebuild();
                            }}
                            src={
                              item?.attributes?.confirm
                                ? "/icons/ic-check-circle.svg"
                                : "/icons/ic-check-circle-grey.svg"
                            }
                            alt="check"
                            className={styles.serviceItemCreditIcon}
                          />
                          <img
                            data-tip={
                              item?.attributes?.favourite >= 1000
                                ? "Sản phẩm được nhiều người ưa thích"
                                : "Sản phẩm chưa có nhiều lượt thích"
                            }
                            onMouseEnter={() => {
                              ReactTooltip.rebuild();
                            }}
                            src={
                              item?.attributes?.favourite >= 1000
                                ? "/icons/ic-heart.svg"
                                : "/icons/ic-heart-grey.svg"
                            }
                            alt="heart"
                            className={styles.serviceItemCreditIcon}
                          />
                        </span>
                        <div className={styles.serviceItemCreditContent}>
                          <div className={styles.serviceItemCreditContentLeft}>
                            <img
                              src={
                                item?.attributes?.image?.data?.attributes?.url
                              }
                              alt={"service"}
                              className={styles.serviceItemCreditContentLeftImg}
                              onClick={() =>
                                router.push(
                                  `/chi-tiet-san-pham/${item?.attributes?.slug}`
                                )
                              }
                            />
                            <div
                              className={
                                styles.serviceItemCreditContentLeftSponsor
                              }
                            >
                              Tài trợ
                            </div>
                          </div>

                          <div className={styles.serviceItemCreditContentRight}>
                            <div
                              className={styles.serviceItemCreditContentRating}
                            >
                              Đánh giá
                            </div>
                            <Rating
                              start={item?.attributes?.rating}
                              size={20}
                            />
                            <div
                              className={styles.serviceItemCreditContentReview}
                              onClick={() =>
                                router.push(
                                  `/chi-tiet-san-pham/${item?.attributes?.slug}`
                                )
                              }
                            >
                              Review
                            </div>
                          </div>
                        </div>
                        <div
                          className={styles.serviceItemCreditButton}
                          onClick={() =>
                            router.push(
                              item?.attributes?.link ||
                                "https://portal.vietcombank.com.vn/"
                            )
                          }
                        >
                          Mở thẻ ngay
                        </div>
                        <p className={styles.serviceItemCreditText}>
                          {item?.attributes?.openAt}
                        </p>
                        <div
                          className={styles.serviceItemCreditSeemore}
                          onClick={() =>
                            router.push(
                              `/chi-tiet-san-pham/${item?.attributes?.slug}`
                            )
                          }
                        >
                          Xem chi tiết{" "}
                          <span
                            className={
                              styles.serviceItemCreditSeemoreArrowRight
                            }
                          />
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
      <ReactTooltip
        className="tooltip"
        theme="light"
        border={true}
        borderColor="#F0F0F0"
        textColor="#000"
        backgroundColor={"#fff"}
      />
    </div>
  );
};

export default OtherProduct;
