import React, { useEffect } from "react";
import moment from "moment";
import Image from "next/image";

//styles
import styles from "./style/style.module.scss";
import router from "next/router";
import AdvertisementInfo from "@/components/Common/AdvertisementInfo";

const BlogList = (props) => {
  const { data, title, slug, isDark, advertisement } = props;
  return (
    <div
      className={`${styles.backgroundBlog} background-image position-relative`}
      style={{
        backgroundImage: isDark
          ? `url('/images/bg-our-services-dark.webp')`
          : `url('/images/bg-our-services.webp')`,
      }}
    >
      <div id={slug} className={styles.blogScroll} />
      <div className={`${styles.container}`}>
        <div
          className={`container d-flex justify-content-center align-items-center ${styles.wrapperText} position-relative`}
        >
          {title}
          <div
            className={styles.seeMore}
            onClick={() => router.push(`/danh-muc/${slug}`)}
          >
            Xem nhiều hơn
            <div
              className={`bacckgroup-image`}
              style={{
                backgroundImage: `url('/icons/ic-arrow-right-2.svg')`,
                height: "24px",
                width: "24px",
              }}
            />
          </div>
        </div>
        <div className={`${styles.containerBlog} container`}>
          <div
            className={`d-flex justify-content-center ${styles.containerBlogFull}`}
          >
            <div
              className={styles.containerBlogLeft}
              onClick={() =>
                router.push(`/tin-tuc/${data?.[0]?.attributes?.slug}`)
              }
            >
              <div
                className={`${styles.containerBlogLeftImage} background-image position-relative`}
              >
                <Image
                  src={
                    data?.[0]?.attributes?.image?.data?.attributes?.url ||
                    "/images/img-no-image.png"
                  }
                  alt="image-blog"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={styles.containerBlogLeftText}>
                <div>
                  <div className={styles.containerBlogLeftTitle}>
                    {data?.[0]?.attributes?.title}
                  </div>
                  <div className={`d-flex ${styles.TextInfo}`}>
                    <span style={{ marginRight: "12px" }}>
                      {data?.[0]?.attributes?.category_lists?.data?.[0]
                        ?.attributes?.categoryName || title}
                    </span>
                    <span style={{ marginRight: "12px" }}>
                      {moment(data?.[0]?.attributes?.createdAt).format(
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
                    {data?.[0]?.attributes?.views || 0}
                  </div>
                  <p className={styles.containerBlogLeftDescription}>
                    {data?.[0]?.attributes?.subTitle}
                  </p>
                </div>

                <div className={styles.containerBlogLeftSeeDetail}>
                  <span className={styles.containerBlogLeftSeeDetailText}>
                    Xem chi tiết
                  </span>
                  <span className={styles.arrowRight} />
                </div>
              </div>
            </div>
            <div className={styles.containerBlogRight}>
              {data?.slice(1, 5).map((data, index) => (
                <div
                  key={index}
                  className={`d-flex ${styles.containerBlogRightElement}`}
                  style={{ marginBottom: index === 3 ? "0" : "32px" }}
                  onClick={() =>
                    router.push(`/tin-tuc/${data?.attributes?.slug}`)
                  }
                >
                  <div className={styles.containerBlogRightContainerImage}>
                    <div
                      className={`${styles.containerBlogRightImage} background-image`}
                      style={{
                        backgroundImage: `url(${
                          data?.attributes?.image?.data?.attributes?.url ||
                          "/images/img-no-image.png"
                        })`,
                      }}
                    />
                  </div>
                  <div className={styles.containerBlogRightText}>
                    <div className={styles.containerBlogRightTitle}>
                      {data?.attributes?.title}
                    </div>
                    <div className={`d-flex ${styles.TextInfo}`}>
                      <span style={{ marginRight: "12px" }}>
                        {data?.attributes?.category_lists?.data?.[0]?.attributes
                          ?.categoryName || title}
                      </span>
                      <span style={{ marginRight: "12px" }}>
                        {moment(data?.attributes?.createdAt).format(
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
                      {data?.attributes?.views || 0}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.seeMoreMobile}>
          <span onClick={() => router.push(`/danh-muc/${slug}`)}>
            {" "}
            Xem thêm
          </span>
          <div
            className={`bacckgroup-image`}
            onClick={() => router.push("/danh-muc")}
            style={{
              backgroundImage: `url('/icons/ic-chevrons-down.svg')`,
              height: "20px",
              width: "20px",
            }}
          />
        </div>
        {advertisement && <AdvertisementInfo data={advertisement} />}
      </div>
    </div>
  );
};

export default BlogList;
