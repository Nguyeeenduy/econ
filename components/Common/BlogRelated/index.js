import React from "react";
import Slider from "react-slick";
import styles from "./style/style.module.scss";
import moment from "moment";
import router from "next/router";

const BlogRelated = (props) => {
  const { data, title, isDark, category } = props;
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
    slidesToShow: data?.length < 3 ? data?.length : 3,
    slidesToScroll: 3,
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
      className={`${styles.wrapper}`}
      style={{
        backgroundImage: isDark
          ? `url('/images/bg-our-services-dark.webp')`
          : `url('/images/bg-our-services.webp')`,
      }}
    >
      <div className={`container`}>
        <div className="position-relative">
          <h2 className={styles.wrapperText}>{title}</h2>
          <div
            className={styles.seeMore}
            onClick={() => router.push(`/danh-muc/${category}`)}
          >
            Xem nhiều hơn
            <div
              className={`background-image`}
              style={{
                backgroundImage: `url('/icons/ic-arrow-right-2.svg')`,
                height: "24px",
                width: "24px",
              }}
            />
          </div>
        </div>

        <div
          className={`slider-desktop equal-slider show-pagination ${styles.containerSlider}`}
        >
          <Slider {...settings}>
            {data?.map((item, index) => {
              return (
                <div key={index} style={{ background: "#FFFFFF" }}>
                  <div className={styles.containerBlog}>
                    <div
                      className={styles.containerBlogItem}
                      onClick={() =>
                        router.push(`/tin-tuc/${item?.attributes?.slug}`)
                      }
                    >
                      <div
                        className={`${styles.containerBlogImage} background-image`}
                        style={{
                          backgroundImage: `url(${
                            item?.attributes.image?.data?.attributes?.url ||
                            "/images/img-no-image.png"
                          })`,
                        }}
                      />
                      <div className={styles.containerBlogText}>
                        <div>
                          <div className={styles.containerBlogTitle}>
                            {item?.attributes?.title}
                          </div>
                          <div
                            className={`d-flex ${styles.containerBlogTextInfo}`}
                          >
                            <span style={{ marginRight: "12px" }}>
                              {item?.attributes?.category_lists?.data?.[0]
                                ?.attributes?.categoryName || category}
                            </span>
                            <span style={{ marginRight: "12px" }}>
                              {moment(item?.attributes?.createdAt).format(
                                "DD/MM/YYYY"
                              )}
                            </span>
                            <img
                              src={"/icons/ic-text-chat.svg"}
                              style={{
                                width: "16px",
                                height: "16px",
                                marginRight: "4px",
                              }}
                            />
                            {item.attributes.views}
                          </div>
                          <div className={styles.containerBlogDescription}>
                            {item.attributes.subTitle}
                          </div>
                        </div>

                        <div className={styles.containerBlogSeeDetail}>
                          <span className={styles.containerBlogSeeDetailText}>
                            Xem chi tiết
                          </span>{" "}
                          <span className={styles.arrowRight} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div
          className={styles.seeMoreMobile}
          onClick={() => router.push(`/danh-muc/${category}`)}
        >
          Xem nhiều hơn
          <div
            className={`background-image`}
            style={{
              backgroundImage: `url('/icons/ic-arrow-right-2.svg')`,
              height: "24px",
              width: "24px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogRelated;
