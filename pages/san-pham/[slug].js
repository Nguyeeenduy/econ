import React, { useState } from "react";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Advertiser from "@/components/Common/Advertiser";
import MenuSubCate from "@/components/Top/MenuSubCate";
import Rating from "@/components/Common/Rating";
import ReactTooltip from "react-tooltip";
import { getListProduct, getListSubcateBySlug } from "stores/product";
import moment from "moment";
import Layout from "@/components/_App/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { getListBlogs } from "stores/blog";

const Tops = () => {
  const router = useRouter();
  const [dataProduct, setDataProduct] = React.useState([]);
  const [activeDescription, setActiveDescription] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [dataCompares, setDataCompares] = React.useState([]);
  const [dataMenu, setDataMenu] = React.useState();
  const [dataBlog, setDataBlog] = React.useState();
  const handleCheck = (val) => {
    return dataCompares.some((item) => item?.id === val?.id);
  };
  React.useEffect(async () => {
    ReactTooltip.rebuild();
    let data = JSON.parse(localStorage.getItem("compare"));
    if (data) setDataCompares(data);
    const result = await getListBlogs(0, 4, "image, category_lists");
    setDataBlog(result?.data?.data);
  }, []);
  const breadcrumb = [
    {
      href: "#",
      title: "Tốt nhất",
    },
    {
      href: "#",
      title: "Top 10 loại thẻ Tín dụng tốt nhất",
    },
  ];
  const contents = [
    {
      id: 1,
      title: "Ưu nhược điểm sản phẩm",
      label: "advantages",
    },
    {
      id: 2,
      title: "Chi tiết [sản phẩm]",
      label: "details",
    },
    {
      id: 3,
      title: "Ưu đãi khi đăng ký ở Ezmoney",
      label: "endow",
    },
  ];
  React.useEffect(async () => {
    if (router.query.slug) {
      const result = await getListSubcateBySlug(router.query.slug);
      const response = await getListProduct(
        0,
        10,
        "image, Criterias",
        `&filters[child_subcates][Slug]=${router.query.slug}`
      );
      setDataMenu(result?.data?.data);
      setDataProduct(response?.data?.data);
    }
  }, [router.query.slug]);
  const handleActiveDescription = (idProduct, idDescription) => {
    if (activeProduct !== idProduct) {
      setActiveProduct(idProduct);
      if (activeDescription !== idDescription) {
        setActiveDescription(idDescription);
      }
    } else {
      if (activeDescription !== idDescription) {
        setActiveDescription(idDescription);
      } else {
        setActiveDescription(null);
        setActiveProduct(null);
      }
    }
  };
  const handleAddCompare = (e, item) => {
    let data = JSON.parse(localStorage.getItem("compare"));
    if (e.target.checked) {
      let products = document.getElementById(`products${item.id}`);
      let product = document.getElementById(`product${item.id}`);
      product.classList.add(styles.containerImageCreditAnimation);
      product.style.transform =
        window.innerWidth > 768
          ? `translate(calc(100vw - ${
              products.offsetLeft + 70
            }px), calc(100vh - ${
              products.offsetTop - window.pageYOffset + 150
            }px))`
          : `translate(calc(100vw - ${products.offsetLeft + 84}px), ${
              window.pageYOffset - products.offsetTop + 60
            }px)`;
      if (data) {
        data.push(item);
      } else data = [item];
      setTimeout(() => {
        product.classList.remove(styles.containerImageCreditAnimation);
        product.style.removeProperty("transform");
        setDataCompares([...data]);
      }, 2500);
      localStorage.setItem("compare", JSON.stringify(data));
    } else {
      if (data) {
        let datas = data.filter((d) => d.id != item.id);
        setDataCompares([...datas]);
        localStorage.setItem("compare", JSON.stringify(datas));
      }
    }
  };
  const dataTitle = dataMenu?.[0]?.attributes?.child_subcates?.data?.find(
    (item) => item?.attributes?.Slug === router.query.slug
  );
  return (
    <Layout
      title={"Ezmoney - top 10 enchoices"}
      dataCompares={dataCompares}
      setDataCompares={setDataCompares}
    >
      <div className={`container ${styles.container}`}>
        <Breadcrumb breadcrumb={breadcrumb} />
        <Advertiser />
        <h1 className={styles.containerTitle}>
          {dataTitle?.attributes?.title}
        </h1>
        <p className={styles.containerSubTitle}>
          {dataTitle?.attributes?.subTitle}
        </p>
        <div className={styles.containerSurvey}>
          <div className={`${styles.containerSurveyContent}`}>
            <div className={`${styles.containerSurveyImage}`}>
              <div
                className={`${styles.image} background-image`}
                style={{
                  backgroundImage: `url("/images/img-credit.png")`,
                }}
              />
            </div>
            <div className={styles.containerSurveyText}>
              <h2 className={styles.title}>Tìm sản phẩm phù hợp với bạn</h2>
              <p className={styles.subTitle}>
                Hãy trả lời những câu hỏi sau đây, để Ezmoney giúp bạn tìm sản
                phẩm phù hợp nhất nhé
              </p>
            </div>
          </div>
          <button
            className={`button ${styles.buttonStart}`}
            onClick={() => router.push("/tu-van")}
          >
            Bắt đầu ngay
          </button>
        </div>
        <MenuSubCate data={dataMenu?.[0]?.attributes?.child_subcates?.data} />
        {dataProduct.length ? (
          dataProduct?.map((item, index) => {
            return (
              <div className={styles.containerCredit} key={index}>
                <div className={styles.containerCreditHead}>
                  <p className={styles.containerCreditHeadText}>
                    {item?.attributes?.parent}
                  </p>
                  <div className={`${styles.containerCheckbox}`}>
                    <div className={styles.checkboxInput}>
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        id={`checkbox${index}`}
                        defaultChecked={handleCheck(item)}
                        onChange={(e) => handleAddCompare(e, item)}
                      />
                      <label htmlFor={`checkbox${index}`}>
                        <span className="checkbox"></span>
                      </label>
                    </div>
                    <p className={styles.checkboxContent}> Thêm vào so sánh</p>
                  </div>
                </div>
                <div
                  className={styles.onMobile}
                  onClick={() =>
                    router.push(`/chi-tiet-san-pham/${item?.attributes?.slug}`)
                  }
                >
                  <h2>{item?.attributes?.name}</h2>
                  <div className={`d-flex ${styles.containerIcon}`}>
                    <div
                      data-tip={
                        item?.attributes?.confirm
                          ? "Sản phẩm được nhà nước công nhận"
                          : "Sản phẩm chưa được nhà nước công nhận"
                      }
                      onMouseEnter={() => {
                        ReactTooltip.rebuild();
                      }}
                      className="background-image"
                      style={{
                        backgroundImage: `${
                          item?.attributes?.confirm
                            ? "url('/icons/ic-check-circle.svg')"
                            : "url('/icons/ic-check-circle-grey.svg')"
                        }`,
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    <div
                      data-tip={
                        item?.attributes?.favourite >= 1000
                          ? "Sản phẩm được nhiều người ưa thích"
                          : "Sản phẩm chưa có nhiều lượt thích"
                      }
                      onMouseEnter={() => {
                        ReactTooltip.rebuild();
                      }}
                      className="background-image"
                      style={{
                        backgroundImage: `${
                          item?.attributes?.favourite >= 1000
                            ? "url('/icons/ic-heart.svg')"
                            : "url('/icons/ic-heart-grey.svg')"
                        }`,
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </div>
                </div>
                <div className={styles.containerCreditContent}>
                  <div
                    id={`products${item?.id}`}
                    className={styles.containerCreditContentLeft}
                  >
                    <div className={styles.containerCreditContentLeftCreate}>
                      <div
                        className="position-relative"
                        onClick={() =>
                          router.push(
                            `/chi-tiet-san-pham/${item?.attributes?.slug}`
                          )
                        }
                      >
                        <div
                          className={`background-image ${styles.containerImageCredit}`}
                          style={{
                            backgroundImage: `url(${item?.attributes?.image?.data?.attributes?.url})`,
                          }}
                        ></div>
                        <div
                          id={`product${item?.id}`}
                          className={`background-image`}
                          style={{
                            backgroundImage: `url(${item?.attributes?.image?.data?.attributes?.url})`,
                          }}
                        ></div>
                        <div className={styles.containerCreditContentSponsor}>
                          Tài trợ
                        </div>
                      </div>
                      <div className="on-desktop">
                        <button
                          className={`button ${styles.containerCreditContentButton}`}
                          onClick={() =>
                            router.push(
                              item?.attributes?.link ||
                                "https://portal.vietcombank.com.vn/"
                            )
                          }
                        >
                          Mở thẻ ngay
                        </button>
                        <p
                          className={
                            styles.containerCreditContentLeftCreateText
                          }
                        >
                          {item?.attributes?.openAt}
                        </p>
                      </div>
                    </div>
                    <div className={styles.containerCreditContentLeftInfo}>
                      <div className="on-desktop">
                        <h2
                          onClick={() =>
                            router.push(
                              `/chi-tiet-san-pham/${item?.attributes?.slug}`
                            )
                          }
                        >
                          {item?.attributes?.name}
                        </h2>
                        <div className="d-flex" style={{ gap: "12px" }}>
                          <div
                            data-tip={
                              item?.attributes?.confirm
                                ? "Sản phẩm được nhà nước công nhận"
                                : "Sản phẩm chưa được nhà nước công nhận"
                            }
                            onMouseEnter={() => {
                              ReactTooltip.rebuild();
                            }}
                            style={{
                              backgroundImage: `${
                                item?.attributes?.confirm
                                  ? "url('/icons/ic-check-circle.svg')"
                                  : "url('/icons/ic-check-circle-grey.svg')"
                              }`,
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <div
                            data-tip={
                              item?.attributes?.favourite >= 1000
                                ? "Sản phẩm được nhiều người ưa thích"
                                : "Sản phẩm chưa có nhiều lượt thích"
                            }
                            onMouseEnter={() => {
                              ReactTooltip.rebuild();
                            }}
                            style={{
                              backgroundImage: `${
                                item?.attributes?.favourite >= 1000
                                  ? "url('/icons/ic-heart.svg')"
                                  : "url('/icons/ic-heart-grey.svg')"
                              }`,
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.textRating}>Đánh giá</div>
                      <div className="on-desktop">
                        <Rating size={24} start={item?.attributes?.rating} />
                      </div>
                      <div className="on-phone">
                        <Rating size={18} start={item?.attributes?.rating} />
                      </div>

                      <div
                        className={styles.textReview}
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
                  <div className={styles.onMobileButton}>
                    <button
                      className={`button ${styles.containerCreditContentButton}`}
                      onClick={() =>
                        router.push(
                          item?.attributes?.link ||
                            "https://portal.vietcombank.com.vn/"
                        )
                      }
                    >
                      Mở thẻ ngay
                    </button>
                    <p className={styles.containerCreditContentLeftCreateText}>
                      {item?.attributes?.openAt}
                    </p>
                  </div>
                  <div className={styles.containerCreditContentRight}>
                    {item?.attributes?.Criterias?.map((criteria) => {
                      return (
                        <div
                          className={styles.containerCreditContentRightElement}
                          key={`item_${criteria.id}`}
                        >
                          <div
                            className={
                              styles.containerCreditContentRightElement1
                            }
                          >
                            <div className={styles.textCriteria}>
                              {criteria.criteriaName}
                            </div>
                            <p
                              data-tip={criteria.suggestion}
                              className={`background-image`}
                              style={{
                                backgroundImage:
                                  "url('/icons/ic-question-grey.svg')",
                                minWidth: "14px",
                                height: "14px",
                                cursor: "pointer",
                              }}
                              onMouseEnter={() => {
                                ReactTooltip.rebuild();
                              }}
                            />
                          </div>
                          <div
                            className={
                              styles.containerCreditContentRightElement2
                            }
                          >
                            {criteria?.value}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {contents.map((content, indexContent) => {
                  return (
                    <div
                      className={styles.containerCreditOption}
                      key={indexContent}
                      onClick={() => {
                        handleActiveDescription(item?.id, content?.id);
                      }}
                    >
                      <div className={styles.containerCreditOptionContent}>
                        <span>{content?.title}</span>
                        <div
                          className={`${styles.iconArrowContent} ${
                            activeProduct === item?.id &&
                            activeDescription === content?.id
                              ? styles.iconArrowContentActive
                              : ""
                          }`}
                          style={{
                            backgroundImage:
                              "url('/icons/ic-arrow-down-black.svg')",
                          }}
                        />
                      </div>
                      <div
                        className={`${styles.creditContent} ${
                          activeProduct === item?.id &&
                          activeDescription === content.id
                            ? styles.creditContentActive
                            : ""
                        }`}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.attributes?.[content.label],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <p className={styles.containerNoProduct}>
            Không có sản phẩm nào trong danh sách
          </p>
        )}
        <ReactTooltip
          className="tooltip"
          theme="light"
          border={true}
          borderColor="#F0F0F0"
          textColor="#000"
          backgroundColor={"#fff"}
        />
      </div>
      <div className={`container ${styles.containerBlog}`}>
        <h2>Có Thể Bạn Quan Tâm</h2>
        <div className={styles.containerBlogList}>
          {dataBlog?.map((item, index) => {
            return (
              <div className={styles.containerBlogListElement} key={index}>
                <div
                  className={`${styles.containerBlogListElementImage} background-image position-relative`}
                >
                  <Image
                    src={
                      item?.attributes?.image?.data?.attributes?.url ||
                      "/images/img-no-image.png"
                    }
                    alt="image blog"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={styles.containerBlogListElementContent}>
                  <div className={styles.containerBlogListElementContentText}>
                    <div>
                      <h3>{item?.attributes?.title}</h3>
                      <div
                        className={styles.containerBlogListElementContentInfo}
                      >
                        <span
                          className={styles.onDesktop}
                          style={{ marginRight: "12px" }}
                        >
                          Tên danh mục
                        </span>
                        <span style={{ marginRight: "12px" }}>
                          {moment().format("DD/MM/YYYY")}
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
                        {30}
                      </div>
                      <p>{item?.attributes?.subTitle}</p>
                    </div>
                    <div
                      className={
                        styles.containerBlogListElementContentSeeDetail
                      }
                    >
                      Xem chi tiết <span className={styles.arrowRight} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Tops;
