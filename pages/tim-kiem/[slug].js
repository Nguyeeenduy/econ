import React from "react";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useRouter } from "next/router";
import Menu from "@/components/Common/Menu";
import Layout from "@/components/_App/Layout";
import { getFilterBlog } from "stores/blog";
import { getFilterProduct } from "stores/product";

const Tops = () => {
  const router = useRouter();
  const menuSearch = [
    {
      title: "Tất cả",
      href: "#tatca",
    },
    {
      title: "Top 10 Ezchoices",
      href: "#subcate1",
    },
    {
      title: "Công cụ",
      href: "#subcate2",
    },
    {
      title: "Chỉ dẫn & Tips",
      href: "#subcate3",
    },
  ];
  const breadcrumb = [
    {
      href: "/tim-kiem",
      title: "Tìm kiếm",
    },
  ];
  const tools = [
    {
      attributes: {
        title: "Ước tính số tiền vay phải trả hàng tháng",
        subTitle: "Công cụ giúp bạn tính lãi phải trả cho khoản vay",
        slug: "/cong-cu/tinh-lai-khoan-vay",
      },
    },
    {
      attributes: {
        title: "Tìm ATM",
        subTitle:
          "Công cụ giúp bạn tìm vị trí cây ATM gần nhất một cách nhanh nhất với hướng dẫn chỉ đường ngắn nhất.",
        slug: "/cong-cu/tim-kiem-atm",
      },
    },
    {
      attributes: {
        title: "Giá vàng",
        subTitle: "Công cụ giúp bạn tra cứu giá vàng",
        slug: "/cong-cu/gia-vang",
      },
    },
    {
      attributes: {
        title: "Tính tỷ giá ngoại tệ",
        subTitle: "Công cụ giúp bạn tra cứu tỷ giá ngoại tệ ",
        slug: "/cong-cu/ti-gia-ngoai-te",
      },
    },
  ];
  const [page, setPage] = React.useState(0);
  const [tab, setTab] = React.useState(0);
  const [dataSearchAll, setDataSearchAll] = React.useState();
  const [dataSearchTop, setDataSearchTop] = React.useState();
  const [dataSearchTool, setDataSearchTool] = React.useState();
  const [dataSearchBlog, setDataSearchBlog] = React.useState();
  const handleSeeMore = () => {
    setPage(page + 1);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/tim-kiem/${e.target.search.value}`);
  };
  React.useEffect(async () => {
    if (router.query.slug) {
      const resultBlog = await getFilterBlog(router.query.slug);
      const resultTop = await getFilterProduct(router.query.slug);
      setDataSearchBlog(resultBlog);
      setDataSearchTop(resultTop);
      setDataSearchTool(
        tools.filter((item) =>
          item.attributes.title.includes(router.query.slug)
        )
      );
      setDataSearchAll([
        ...resultTop?.data?.data,
        ...tools.filter((item) =>
          item.attributes.title.includes(router.query.slug)
        ),
        ...resultBlog?.data?.data,
      ]);
    }
  }, [router.query.slug]);
  const handleChangeTab = (item) => {
    setTab(item);
    setPage(0);
    switch (item) {
      case 0:
        setDataSearchAll([
          ...dataSearchTop?.data?.data,
          ...dataSearchTool,
          ...dataSearchBlog?.data?.data,
        ]);
        break;
      case 1:
        setDataSearchAll(dataSearchTop?.data?.data);
        break;
      case 2:
        setDataSearchAll(dataSearchTool);
        break;
      case 3:
        setDataSearchAll(dataSearchBlog?.data?.data);
        break;
    }
  };
  const handleClickSearch = (item) => {
    if (!item?.id) router.push(item?.attributes?.slug);
    else if (item?.attributes?.name)
      router.push(`/chi-tiet-san-pham/${item?.attributes?.slug}`);
    else router.push(`/tin-tuc/${item?.attributes?.slug}`);
  };
  return (
    <Layout title={"Ezmoney - Tìm kiếm"}>
      <div className={`container ${styles.containerBanner}`}>
        <div id="1" />
        <div className="on-desktop">
          <Breadcrumb breadcrumb={breadcrumb} />

          <h1 className={styles.containerHead}>
            Từ khóa tìm kiếm: “{router.query.slug}”
          </h1>
        </div>
        <div className={styles.containerMobile}>
          <form onSubmit={(e) => handleSearch(e)}>
            <div className={styles.containerMobileSearch}>
              <div
                className={`${styles.containerMobileSearchImage} background-image`}
                style={{ backgroundImage: `url('/icons/ic-search.svg')` }}
              />
              <div>
                <input
                  type={"text"}
                  placeholder={"Nhập từ khóa tìm kiếm"}
                  defaultValue={router.query.slug}
                  className={styles.containerMobileInput}
                  name={"search"}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Vui lòng nhập nội dung tìm kiếm"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  required
                />
              </div>
            </div>
            <button type={"submit"} className={styles.containerMobileButton}>
              Tìm kiếm
            </button>
          </form>
        </div>
        {dataSearchAll?.length ? (
          <p className={styles.containerText}>
            Xem kết quả{" "}
            <strong>{`1 đến ${
              (page + 1) * 10 > dataSearchAll?.length
                ? dataSearchAll.length
                : (page + 1) * 10
            }`}</strong>{" "}
            trong số <strong>{dataSearchAll?.length}</strong> Kết quả
          </p>
        ) : (
          <p className={styles.containerText}>Không tìm thấy kết quả</p>
        )}
      </div>
      <div className={`container ${styles.container}`}>
        <Menu data={menuSearch} tab={tab} handleChangeTab={handleChangeTab} />
        {dataSearchAll?.length ? (
          <div className={styles.containerSearch}>
            {dataSearchAll
              ?.slice(0, parseInt(page) * 10 + 10)
              ?.map((item, index) => {
                return (
                  <div key={index} className={styles.containerSearchResult}>
                    <a
                      className={styles.containerSearchResultTitle}
                      onClick={() => handleClickSearch(item)}
                    >
                      {item?.attributes?.title || item?.attributes?.name || ""}
                    </a>
                    <p className={styles.containerSearchResultSubTitle}>
                      {item?.attributes?.subTitle ||
                        item?.attributes?.parent ||
                        ""}
                    </p>
                  </div>
                );
              })}
            {(page + 1) * 10 < dataSearchAll?.length && (
              <div
                className={styles.btnSeeMore}
                onClick={() => handleSeeMore()}
              >
                Xem thêm{" "}
                <img
                  src="/icons/ic-chevrons-down.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        ) : (
          <div className={styles.containerSearchEmpty}>
            Không tìm thấy kết quả
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tops;
