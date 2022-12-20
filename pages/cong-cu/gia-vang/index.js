import React from "react";
import Layout from "@/components/_App/Layout";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getFilterBlogByCategory } from "stores/blog";
import BlogRelated from "@/components/Common/BlogRelated";
import Advertisement from "@/components/Common/Advertisement";
import moment from "moment";
import { getGoldPrice } from "stores/tools";
import { getHomePageSetting } from "stores/pageSetting";

const GoldPrice = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Công cụ",
    },
    {
      href: "#",
      title: "Giá vàng",
    },
  ];
  const [dataGold, setDataGold] = React.useState([]);
  const [dataAdv, setDataAdv] = React.useState([]);
  const [dataBlog, setDataBlog] = React.useState([]);
  const [consciousActive, setConsciousActive] = React.useState(false);
  const [conscious, setConscious] = React.useState("");
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const getData = async () => {
      const result = await getHomePageSetting(
        "image_ad, image_ad.imageDesktop, image_ad.imageMobile"
      );

      const response = await getFilterBlogByCategory(
        "Giá vàng",
        0,
        5,
        "image%2Ccategory_lists"
      );
      setDataAdv(result?.data?.data);
      setDataBlog(response?.data?.data);
    };
    const getGoldPrices = async () => {
      const response = await getGoldPrice();
      setDataGold(response?.data?.data);
    };
    getGoldPrices();
    getData();
    const onStorage = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const dataConscious = ["Hồ Chí Minh", "Hà Nội"];
  return (
    <Layout title={"Ezmoney - Công cụ"}>
      <div className={styles.container}>
        <div className="container">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h1 className={styles.containerTitle}>Giá vàng</h1>
          <p className={styles.containerText}>
            Công cụ giúp bạn tra cứu giá vàng
          </p>
          <div className={styles.containerTextTime}>
            Cập nhật lúc <b>{moment(new Date()).format("DD/MM/YYYY HH:mm")}</b>
          </div>
          <div className={styles.containerMenu}>
            <div className={styles.containerMenuSelect}>
              <div
                className={styles.containerMenuSelectButton}
                onClick={() => {
                  setConsciousActive(!consciousActive);
                }}
              >
                <span className={styles.containerMenuSelectText}>
                  {conscious || "Chọn tỉnh/thành phố"}
                </span>
                <div
                  className={`${styles.containerMenuSelectIcon} backgroundImage`}
                  style={{
                    backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
                  }}
                />
              </div>
              {consciousActive && (
                <div className={styles.containerSeeMore}>
                  {dataConscious.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.containerSeeMoreElement}
                        onClick={() => {
                          setConscious(item);
                          setConsciousActive(false);
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={styles.containerMenuButton}>Tìm kiếm</div>
          </div>
          <table className={styles.containerTable}>
            <tr className={styles.containerTableHead}>
              <th>Loại vàng | ĐVT: 1.000đ/chỉ</th>
              <th>Giá mua</th>
              <th>Giá bán</th>
            </tr>
            {dataGold?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Title}</td>
                  <td>{item.Buy}</td>
                  <td>{item.Sell}</td>
                </tr>
              );
            })}
          </table>
          <p className={styles.containerTextSource}>Nguồn:...</p>
        </div>
      </div>
      <BlogRelated
        title={"Blog về Giá vàng"}
        category={"gia-vang"}
        data={dataBlog}
        isDark={isDark}
      />
      <Advertisement
        data={dataAdv?.attributes?.image_ad}
        paddingDesktop={"31px 10.5px 66px"}
        paddingMobile={"20px 16px"}
      />
    </Layout>
  );
};
export default GoldPrice;
