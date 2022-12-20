import React from "react";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Advertiser from "@/components/Common/Advertiser";
import MenuFixed from "@/components/Common/MenuFixed";
import Author from "@/components/Common/Author";
import Slider from "react-slick";
import CheckBox from "@/components/Common/Checkbox";
import { getProductBySlug, getProductByType } from "stores/product";
import { useRouter } from "next/router";
import Layout from "@/components/_App/Layout";
import OtherProduct from "@/components/ProductDetail/OtherProduct";
import ReactTooltip from "react-tooltip";

const ProductDetail = () => {
  const router = useRouter();
  const [dataProductDetail, setDataProductDetail] = React.useState([]);
  const [dataOtherProduct, setDataOtherProduct] = React.useState([]);
  const [dataCompares, setDataCompares] = React.useState([]);

  const breadcrumb = [
    {
      href: "/san-pham/top-10-enchoices",
      title: "Thẻ tín dụng ",
    },
    {
      href: "#",
      title: dataProductDetail?.[0]?.attributes?.name,
    },
  ];
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
    rows: 1,
    dots: true,
    customPaging: function () {
      return <div className="custom-paging" />;
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const handleCheck = (val) => {
    return dataCompares.some((item) => item?.id === val?.id);
  };
  const handleAddCompare = (e, item) => {
    let data = JSON.parse(localStorage.getItem("compare"));
    if (e.target.checked) {
      let products = document.getElementById(`products${item.id}`);
      let product = document.getElementById(`product${item.id}`);
      product.classList.add(styles.containerCreditAnimation);
      product.style.transform =
        window.innerWidth > 768
          ? `translate(calc(100vw - ${
              products.offsetLeft + 70
            }px), calc(100vh - ${
              products.offsetTop - window.pageYOffset + 185
            }px))`
          : `translate(calc(50vw + 40px), ${
              window.pageYOffset - products.offsetTop + 60
            }px)`;
      if (data) {
        data.push(item);
      } else data = [item];
      setTimeout(() => {
        product.classList.remove(styles.containerCreditAnimation);
        product.style.removeProperty("transform");
        setDataCompares([...data]);
      }, 2500);
      localStorage.setItem("compare", JSON.stringify(data));
    } else if (data) {
      let datas = data.filter((d) => d.id != item.id);
      setDataCompares([...datas]);
      localStorage.setItem("compare", JSON.stringify(datas));
    }
  };
  React.useEffect(() => {
    if (router.query.slug) {
      const getDataProductDetail = async () => {
        const response = await getProductBySlug(
          router.query.slug,
          "image, Criterias, contents, protype"
        );
        if (!response.error) {
          setDataProductDetail(response?.data.data);
          const other = await getProductByType(
            response?.data?.data?.[0]?.attributes?.protype?.data?.id,
            0,
            16,
            "products, products.image, products.Criterias"
          );
          setDataOtherProduct(other.data.data);
        }
      };
      getDataProductDetail();
    }
  }, [router.query.slug]);
  React.useEffect(() => {
    let data = JSON.parse(localStorage.getItem("compare"));
    if (data) setDataCompares(data);
  }, []);
  const dataa = [
    {
      title: "Bảo hiểm",
      url: "/icons/icon-park-outline.svg",
    },
    {
      title: "Vay thế chấp",
      url: "/icons/icon-park-outline.svg",
    },
    {
      title: "Đầu tư",
      url: "/icons/ic-fluent-receipt-money.svg",
    },
    {
      title: "Gửi tiết kiệm",
      url: "/icons/ic-clarity-piggy-bank-line.svg",
    },
    {
      title: "Thẻ tín dụng",
      url: "/icons/ic-credit-card.svg",
    },
  ];
  return (
    <Layout
      title={"Ezmoney- Sản phẩm"}
      dataCompares={dataCompares}
      setDataCompares={setDataCompares}
    >
      <div style={{ backgroundImage: "url('/images/bg-our-services.webp')" }}>
        <div className={`container  ${styles.container}`}>
          <Breadcrumb breadcrumb={breadcrumb} />
          <Advertiser />
          <div className={styles.containerCredit}>
            <div className={styles.onMobile}>
              <h2>{dataProductDetail?.[0]?.attributes?.name}</h2>
            </div>
            <div
              className={styles.containerCreditContent}
              id={`products${dataProductDetail?.[0]?.id}`}
            >
              <div className={styles.containerCartInfor}>
                <div className={styles.containerCreditContentLeft}>
                  <div className={styles.containerCreditContentLeftCreate}>
                    <div className="position-relative">
                      <img
                        src={
                          dataProductDetail?.[0]?.attributes?.image?.data
                            ?.attributes?.url
                        }
                        alt=""
                        className={styles.containerCreditContentImage}
                      />
                      <div
                        id={`product${dataProductDetail?.[0]?.id}`}
                        className={`background-image`}
                        style={{
                          backgroundImage: `url(${dataProductDetail?.[0]?.attributes?.image?.data?.attributes?.url})`,
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
                            dataProductDetail?.[0]?.attributes?.link ||
                              "https://portal.vietcombank.com.vn/"
                          )
                        }
                      >
                        Mở thẻ ngay
                      </button>
                      <p
                        className={styles.containerCreditContentLeftCreateText}
                      >
                        {dataProductDetail?.[0]?.attributes?.openAt}
                      </p>
                    </div>
                  </div>
                  <div className={styles.containerCreditContentLeftInfo}>
                    <div className="on-desktop">
                      <h2>{dataProductDetail?.[0]?.attributes?.name}</h2>
                      <div className="d-flex" style={{ gap: "12px" }}>
                        <div
                          data-tip={
                            dataProductDetail?.[0]?.attributes?.confirm
                              ? "Sản phẩm được nhà nước công nhận"
                              : "Sản phẩm chưa được nhà nước công nhận"
                          }
                          onMouseEnter={() => {
                            ReactTooltip.rebuild();
                          }}
                          className="background-image"
                          style={{
                            backgroundImage: `${
                              dataProductDetail?.[0]?.attributes?.confirm
                                ? "url('/icons/ic-check-circle.svg')"
                                : "url('/icons/ic-check-circle-grey.svg')"
                            }`,
                            width: "16px",
                            height: "16px",
                          }}
                        />
                        <div
                          data-tip={
                            dataProductDetail?.[0]?.attributes?.favourite >=
                            1000
                              ? "Sản phẩm được nhiều người ưa thích"
                              : "Sản phẩm chưa có nhiều lượt thích"
                          }
                          onMouseEnter={() => {
                            ReactTooltip.rebuild();
                          }}
                          className="background-image"
                          style={{
                            backgroundImage: `${
                              dataProductDetail?.[0]?.attributes?.favourite >=
                              1000
                                ? "url('/icons/ic-heart.svg')"
                                : "url('/icons/ic-heart-grey.svg')"
                            }`,
                            width: "16px",
                            height: "16px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.containerCreditHeadRight}>
                  <CheckBox
                    id={"1"}
                    defaultChecked={handleCheck(dataProductDetail?.[0])}
                    onChange={(e) =>
                      handleAddCompare(e, dataProductDetail?.[0])
                    }
                  />
                  <span className={styles.containerCreditHeadText1}>
                    Thêm vào so sánh
                  </span>
                </div>
              </div>
              <div className={styles.onMobile1}>
                <div className={`d-flex ${styles.checkMobile}`}>
                  <CheckBox
                    id={`mobile-${1}`}
                    defaultChecked={handleCheck(dataProductDetail?.[0])}
                    onChange={(e) =>
                      handleAddCompare(e, dataProductDetail?.[0])
                    }
                  />
                  <span className={styles.checkMobileText}>
                    Thêm vào so sánh
                  </span>
                </div>
                <div
                  className={`button ${styles.containerCreditContentButton}`}
                  onClick={() =>
                    router.push(
                      dataProductDetail?.[0]?.attributes?.link ||
                        "https://portal.vietcombank.com.vn/"
                    )
                  }
                >
                  Mở thẻ ngay
                </div>
                <p className={styles.containerCreditContentLeftCreateText}>
                  {dataProductDetail?.[0]?.attributes?.openAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container`}>
        <div className={styles.containerContent}>
          <MenuFixed
            datas={dataProductDetail?.[0]?.attributes?.contents}
            showDesktop={
              dataProductDetail?.[0]?.attributes?.contents?.length > 6
                ? 6
                : dataProductDetail?.[0]?.attributes?.contents?.length
            }
            showIpad={
              dataProductDetail?.[0]?.attributes?.contents?.length > 4
                ? 4
                : dataProductDetail?.[0]?.attributes?.contents?.length
            }
            showMobile={
              dataProductDetail?.[0]?.attributes?.contents?.length > 2
                ? 2.5
                : dataProductDetail?.[0]?.attributes?.contents?.length
            }
          />
          {dataProductDetail?.[0]?.attributes?.contents?.map((item, index) => {
            return (
              <div key={index} className="position-relative">
                <div id={item?.id} className={styles.containerContentHead} />
                <h2 className={styles.containerContentTitle}>{item?.title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.description,
                  }}
                />
              </div>
            );
          })}
          <Author />
        </div>
      </div>
      <div
        className={styles.containerOther}
        style={{ backgroundImage: "url('/images/bg-our-services.webp')" }}
      >
        <div className={`container`}>
          <h2 className={styles.containerOtherTitle}>
            Các sản phẩm khác của nhà cung cấp
          </h2>
          <div className={styles.containerOtherSlider}>
            <div
              className={`slider-desktop custom-slick-list ${styles.serviceList}`}
            >
              <Slider {...settings}>
                {dataa?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className={styles.containerOtherSliderContainer}>
                        <div
                          className={`d-flex align-items-center flex-column ${styles.containerOtherSliderWrapper}`}
                        >
                          <div
                            className={`${styles.containerOtherSliderIcon} background-image`}
                            style={{
                              backgroundImage: `url('${item?.url}')`,
                            }}
                          />
                          <h6 className={styles.containerOtherSliderName}>
                            {item?.title}
                          </h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <OtherProduct
        data={dataOtherProduct?.[0]?.attributes?.products?.data}
        dataCompares={dataCompares}
        setDataCompares={setDataCompares}
        handleCheck={handleCheck}
        handleAddCompare={handleAddCompare}
      />
      <ReactTooltip
        className="tooltip"
        theme="light"
        border={true}
        borderColor="#F0F0F0"
        textColor="#000"
        backgroundColor={"#fff"}
      />
    </Layout>
  );
};

export default ProductDetail;
