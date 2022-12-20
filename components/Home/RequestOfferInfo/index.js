import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";

//styles
import styles from "./style/style.module.scss";
import baseApiUrl from "@/utils/baseApiUrl";
import router from "next/router";

const RequestOfferInfo = React.memo(function RequestOfferInfo() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);
  const [dataBlog, setDataBlog] = React.useState();
  const handleResize = useCallback(() => {
    setWidth(elementRef?.current?.offsetWidth);
  }, [elementRef]);
  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [elementRef, handleResize]);

  React.useEffect(() => {
    const getDataBlog = async () => {
      const response = await axios.get(
        `${baseApiUrl}/blog-lists?pagination%5Bpage%5D=0&pagination%5BpageSize%5D=5&populate=image%2Ccategory_lists`
      );
      setDataBlog(response.data.data);
    };

    getDataBlog();
  }, []);
  React.useEffect(() => {
    setWidth(elementRef?.current?.getBoundingClientRect().width);
  }, []);
  return dataBlog?.length > 0 ? (
    <div
      ref={elementRef}
      className={`${styles.backgroundBlog} background-image`}
      style={{ backgroundImage: `url('images/background-blog.webp')` }}
    >
      <div className={`${styles.container}`}>
        <div className={`d-flex justify-content-center align-items-center`}>
          <div className={styles.wrapperLine} />
          <span className={styles.wrapperTitle}>BLOG POSTS</span>
          <div className={styles.wrapperLine} />
        </div>
        <div
          className={`d-flex justify-content-center align-items-center ${styles.wrapperText}`}
        >
          Bài viết mới
        </div>
        <div className={`${styles.containerBlog} container`}>
          <div
            className={`d-flex justify-content-center ${styles.containerBlogFull}`}
          >
            <div
              className={styles.containerBlogLeft}
              onClick={() =>
                router.push(`/tin-tuc/${dataBlog[0]?.attributes?.slug}`)
              }
            >
              <div
                className={`${styles.containerBlogLeftImage} background-image position-relative`}
              >
                <Image
                  src={
                    dataBlog[0]?.attributes.image?.data?.attributes?.url ||
                    "/images/img-no-image.png"
                  }
                  alt="image blog"
                  layout="fill"
                />
              </div>

              <div className={styles.containerBlogLeftText}>
                <div>
                  <div className={styles.containerBlogLeftTitle}>
                    {dataBlog[0]?.attributes?.title}
                  </div>
                  <div className={`d-flex ${styles.TextInfo}`}>
                    <span style={{ marginRight: "12px" }}>
                      {
                        dataBlog[0]?.attributes?.category_lists?.data?.[0]
                          ?.attributes?.categoryName
                      }
                    </span>
                    <span style={{ marginRight: "12px" }}>
                      {moment(dataBlog[0]?.attributes?.date).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                    <img
                      src={"/icons/ic-text-chat.svg"}
                      alt="icon"
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "4px",
                      }}
                    />
                    {dataBlog[0]?.attributes?.views || 0}
                  </div>
                  <p className={styles.containerBlogLeftDescription}>
                    {dataBlog[0]?.attributes?.subTitle}
                  </p>
                </div>

                <div className={styles.containerBlogLeftSeeDetail}>
                  Xem chi tiết <span className={styles.arrowRight} />
                </div>
              </div>
            </div>
            <div className={styles.containerBlogRight}>
              {dataBlog.slice(1).map((data, index) => (
                <div
                  key={index}
                  className={`d-flex ${styles.containerBlogRightElement}`}
                  style={{
                    marginBottom:
                      index === 3 ? "0" : `${width < 1441 ? "24px" : "32px"}`,
                  }}
                  onClick={() =>
                    router.push(`/tin-tuc/${data?.attributes?.slug}`)
                  }
                >
                  <div className={styles.containerBlogRightContainerImage}>
                    <div
                      className={`${styles.containerBlogRightImage} background-image position-relative`}
                    >
                      <Image
                        src={
                          data?.attributes?.image?.data?.attributes?.url ||
                          "/images/img-no-image.png"
                        }
                        alt="image blog"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div className={styles.containerBlogRightText}>
                    <div className={styles.containerBlogRightTitle}>
                      {data?.attributes?.title}
                    </div>
                    <div className={`d-flex ${styles.TextInfo}`}>
                      <span style={{ marginRight: "12px" }}>
                        {
                          data?.attributes?.category_lists?.data?.[0]
                            ?.attributes?.categoryName
                        }
                      </span>
                      <span style={{ marginRight: "12px" }}>
                        {moment(data?.attributes?.date).format("DD/MM/YYYY")}
                      </span>
                      <img
                        src={"/icons/ic-text-chat.svg"}
                        alt="icon"
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
          <div className="d-flex justify-content-center">
            <div
              className={styles.buttonSeeMoreBlog}
              onClick={() => router.push("/tin-tuc")}
            >
              Xem thêm Chỉ dẫn và Tips hay
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
});

export default React.memo(RequestOfferInfo);
