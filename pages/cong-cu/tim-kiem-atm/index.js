import React from "react";
import Layout from "@/components/_App/Layout";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getFilterBlogByCategory } from "stores/blog";
import BlogRelated from "@/components/Common/BlogRelated";
import Advertisement from "@/components/Common/Advertisement";
import {
  getATMLocation,
  getATMName,
  getConsciousName,
  getDistrictByConscious,
} from "stores/tools";
import { getHomePageSetting } from "stores/pageSetting";

const ATM = () => {
  const ref = React.useRef();
  const breadcrumb = [
    {
      href: "#",
      title: "Công cụ",
    },
    {
      href: "#",
      title: "Tìm kiếm ATM",
    },
  ];
  const [dataBlog, setDataBlog] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const [atm, setAtm] = React.useState();
  const [conscious, setConscious] = React.useState();
  const [district, setDistrict] = React.useState();
  const [isDark, setIsDark] = React.useState(false);
  const [dataATM, setDataATM] = React.useState([]);
  const [dataConscious, setDataConscious] = React.useState([]);
  const [dataDistrict, setDataDistrict] = React.useState([]);
  const [error, setError] = React.useState("");
  const [datas, setDatas] = React.useState([]);
  const [dataAdv, setDataAdv] = React.useState([]);
  React.useEffect(async () => {
    const result = await getHomePageSetting(
      "image_ad, image_ad.imageDesktop, image_ad.imageMobile"
    );
    setDataAdv(result?.data?.data);
    const getData = async () => {
      const response = await getFilterBlogByCategory(
        "ATM",
        0,
        5,
        "image%2Ccategory_lists"
      );
      setDataBlog(response?.data?.data);
    };
    getData();
    const getDataATM = async () => {
      const response = await getATMName();
      setDataATM(response?.data?.data);
    };
    getDataATM();
    const getDataConscious = async () => {
      const response = await getConsciousName();
      setDataConscious(response?.data?.data);
    };
    getDataConscious();
    const onStorage = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  React.useEffect(() => {
    if (conscious) {
      const getDataDistrict = async () => {
        const response = await getDistrictByConscious(conscious);
        setDataDistrict(response?.data?.data);
      };
      getDataDistrict();
    }
  }, [conscious]);
  const eventHandler = () => {
    if (!ref.current?.contains(event.target)) setActive(0);
  };
  React.useEffect(() => {
    if (active) {
      document.addEventListener("click", eventHandler);
      return () => document.removeEventListener("click", eventHandler);
    }
  }, [active]);
  const handleSearch = async () => {
    if (!atm || !district || !conscious) {
      setError("*Vui lòng chọn đầy đủ thông tin");
      return;
    }
    setError("");
    const result = await getATMLocation(atm, district);
    setDatas(result?.data?.data);
  };
  return (
    <Layout title={"Ezmoney - Công cụ"}>
      <div className={styles.container}>
        <div className="container">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h1 className={styles.containerTitle}>
            Điểm đặt cây ATM các ngân hàng trên toàn quốc
          </h1>
          <p className={styles.containerText}>
            Công cụ giúp bạn tìm vị trí cây ATM gần nhất một cách nhanh nhất với
            hướng dẫn chỉ đường ngắn nhất.
          </p>
          <div className={styles.containerMenu} ref={ref}>
            <div className={styles.containerMenuSelect}>
              <div
                className={styles.containerMenuSelectButton}
                onClick={() => {
                  setActive(active === 1 ? 0 : 1);
                }}
              >
                <span className={styles.containerMenuSelectText}>
                  {atm || "Chọn ngân hàng"}
                </span>
                <div
                  className={`${
                    active === 1
                      ? styles.containerMenuSelectIconActive
                      : styles.containerMenuSelectIcon
                  } backgroundImage`}
                  style={{
                    backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
                  }}
                />
              </div>

              {active === 1 && (
                <div className={styles.containerSeeMore}>
                  {dataATM?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.containerSeeMoreElement}
                        onClick={() => {
                          setAtm(item?.attributes?.name);
                          setActive(0);
                        }}
                      >
                        {item?.attributes?.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={styles.containerMenuSelect}>
              <div
                className={styles.containerMenuSelectButton}
                onClick={() => {
                  setActive(active === 2 ? 0 : 2);
                }}
              >
                <span className={styles.containerMenuSelectText}>
                  {conscious || "Chọn tỉnh/thành phố"}
                </span>
                <div
                  className={`${
                    active === 2
                      ? styles.containerMenuSelectIconActive
                      : styles.containerMenuSelectIcon
                  } backgroundImage`}
                  style={{
                    backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
                  }}
                />
              </div>
              {active === 2 && (
                <div className={styles.containerSeeMore}>
                  {dataConscious?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.containerSeeMoreElement}
                        onClick={() => {
                          setConscious(item?.attributes?.name);
                          setActive(0);
                        }}
                      >
                        {item?.attributes?.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className={styles.containerMenuSelect}>
              <div
                className={styles.containerMenuSelectButton}
                onClick={() => {
                  setActive(active === 3 ? 0 : 3);
                }}
              >
                <span className={styles.containerMenuSelectText}>
                  {district || "Chọn quận/huyện"}
                </span>
                <div
                  className={`${
                    active === 3
                      ? styles.containerMenuSelectIconActive
                      : styles.containerMenuSelectIcon
                  } backgroundImage`}
                  style={{
                    backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
                  }}
                />
              </div>
              {active === 3 && (
                <div className={styles.containerSeeMore}>
                  {dataDistrict?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.containerSeeMoreElement}
                        onClick={() => {
                          setDistrict(item?.attributes?.name);
                          setActive(0);
                        }}
                      >
                        {item?.attributes?.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div
              className={styles.containerMenuButton}
              onClick={() => handleSearch()}
            >
              Tìm kiếm
            </div>
          </div>
          {error && <p className={styles.containerError}>{error}</p>}

          <table className={styles.containerTable}>
            <tr className={styles.containerTableHead}>
              <th>#</th>
              <th className="on-desktop">Điểm đặt máy ATM</th>
              <th>Địa chỉ</th>
              <th>Thời gian mở cửa</th>
              <th>Tìm đường đi</th>
            </tr>
            {datas?.length ? (
              datas?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="on-desktop">{atm}</td>
                    <td>{item?.attributes?.location}</td>
                    <td>{item?.attributes?.timeOpen}</td>
                    <td>
                      <a href={item?.attributes?.linkMap} target="_blank">
                        <div
                          className={`${styles.containerTableIcon} backgroundImage`}
                          style={{
                            backgroundImage: "url('/icons/ic-map.svg')",
                          }}
                        />
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </table>
        </div>
      </div>
      <BlogRelated
        title={"Blog về ATM"}
        category={"atm"}
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
export default ATM;
