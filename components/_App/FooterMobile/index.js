import router from "next/router";
import React, { useState, useEffect } from "react";

//styles
import styles from "./style/style.module.scss";

const FooterMobile = (props) => {
  const { active, setActive, menu, setMenu, top10s } = props;
  const [activeCollapse, setActiveCollapse] = useState(null);
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

  const collapseList = [
    {
      id: 1,
      title: "Top 10 Thẻ tín dụng title",
      subContent: [
        {
          content: "Top 10 Thẻ tín dụng subContent",
          url: "/san-pham/top-10-enchoices",
        },
        {
          content: "Top 10 Thẻ tín dụng subContent",
          url: "/san-pham/top-10-enchoices",
        },
        {
          content: "Top 10 Thẻ tín dụng subContent",
          url: "/san-pham/top-10-enchoices",
        },
        {
          content: "Top 10 Thẻ tín dụng subContent",
          url: "/san-pham/top-10-enchoices",
        },
      ],
    },
    {
      id: 2,
      title: "Top 10 Thẻ tín dụng title",
      subContent: [
        {
          content: "Top 10 Thẻ tín dụng subContent",
          url: "/san-pham/top-10-enchoices",
        },
      ],
    },
    {
      id: 3,
      title: "Top 10 Thẻ tín dụng title",
      subContent: [
        {
          content: "Top 10 Thẻ tín dụng subContent",
          url: "/san-pham/top-10-enchoices",
        },
      ],
    },
  ];

  const handleActiveCollapse = (id) => {
    if (activeCollapse !== id) {
      setActiveCollapse(id);
    } else {
      setActiveCollapse(null);
    }
  };
  const handleX = () => {
    setActive("");
    if (menu == 2) setMenu(1);
    else setMenu(0);
  };
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.containerElement}
          onClick={() => {
            setActive("home");
            router.push("/");
          }}
        >
          <div
            className={`${styles.imageFooter} background-image`}
            style={{
              backgroundImage: isDark
                ? `url(${
                    active === "home"
                      ? "/icons/ic-home-filled-dark.svg"
                      : "/icons/ic-home-outlined-dark.svg"
                  })`
                : `url(${
                    active === "home"
                      ? "/icons/ic-home-filled.svg"
                      : "/icons/ic-home-outlined.svg"
                  })`,
            }}
          />
          <div
            className={styles.textFooter}
            style={{ fontWeight: `${active === "home" ? 700 : 400}` }}
          >
            Trang chủ
          </div>
        </div>
        <div
          className={styles.containerElement}
          onClick={() => {
            setActive("tip");
            router.push("/tin-tuc");
          }}
        >
          <div
            className={`${styles.imageFooter} background-image`}
            style={{
              backgroundImage: isDark
                ? `url(${
                    active === "tip"
                      ? "/icons/ic-tips-filled-dark.svg"
                      : "/icons/ic-tips-outlined-dark.svg"
                  })`
                : `url(${
                    active === "tip"
                      ? "/icons/ic-tips-filled.svg"
                      : "/icons/ic-tips-outlined.svg"
                  })`,
            }}
          />
          <div
            className={styles.textFooter}
            style={{ fontWeight: `${active === "tip" ? 700 : 400}` }}
          >
            Tips
          </div>
        </div>
        <div
          className={styles.containerElementCenter}
          onClick={() => {
            setActive("top10");
            setMenu(3);
          }}
        >
          <div className={`${styles.footerPosition}`}>
            <div className={styles.footerAbsolute}>
              <div className={styles.footerAbsoluteBackground}>
                <div
                  className={styles.footerAbsoluteImage}
                  style={{
                    backgroundImage: `url('/icons/ic-award-ribbon-outline.svg')`,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={styles.textFooter}
            style={{ fontWeight: `${active === "top10" ? 700 : 400}` }}
          >
            Top 10 Ezchoices
          </div>
        </div>
        <div
          className={styles.containerElement}
          onClick={() => {
            setActive("tool");
            setMenu(3);
          }}
        >
          <div
            className={`${styles.imageFooter} background-image`}
            style={{
              backgroundImage: isDark
                ? `url(${
                    active === "tool"
                      ? "/icons/ic-setting-filled-dark.svg"
                      : "/icons/ic-setting-outlined-dark.svg"
                  })`
                : `url(${
                    active === "tool"
                      ? "/icons/ic-setting-filled.svg"
                      : "/icons/ic-setting-outlined.svg"
                  })`,
            }}
          />
          <div
            className={styles.textFooter}
            style={{ fontWeight: `${active === "tool" ? 700 : 400}` }}
          >
            Công cụ
          </div>
        </div>
        <div
          className={styles.containerElement}
          onClick={() => {
            setActive("myself");
            setMenu(true);
          }}
        >
          <div
            className={`${styles.imageFooter} background-image`}
            style={{
              backgroundImage: isDark
                ? `url(${
                    active === "myself"
                      ? "/icons/ic-user-filled-dark.svg"
                      : "/icons/ic-user-outlined-dark.svg"
                  })`
                : `url(${
                    active === "myself"
                      ? "/icons/ic-user-filled.svg"
                      : "/icons/ic-user-outlined.svg"
                  })`,
            }}
          />
          <div
            className={styles.textFooter}
            style={{ fontWeight: `${active === "myself" ? 700 : 400}` }}
          >
            Tôi
          </div>
        </div>
      </div>

      <div
        className={`${styles.menuTool}  ${
          active === "top10" ? styles.menuToolActive : ""
        }`}
      >
        <div className={`${styles.titleTool}`}>
          <div className={`${styles.titleToolText}`}>Top 10 Ezchoices</div>
          <div
            className={`${styles.logo} background-image`}
            style={{ backgroundImage: "url('/icons/ic-close-X.svg')" }}
            onClick={() => handleX()}
          />
        </div>
        <div style={{ paddingTop: "4px" }}>
          {top10s?.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className={`${styles.containerToolTop10}  ${
                    activeCollapse === item?.id
                      ? styles.containerToolTop10Active
                      : ""
                  }`}
                >
                  <div
                    className={`${styles.containerToolTop10Collapse} ${
                      activeCollapse === item?.id
                        ? styles.containerToolTop10CollapseActive
                        : ""
                    }`}
                    onClick={() => {
                      handleActiveCollapse(item?.id);
                    }}
                  >
                    <div>{item?.attributes?.name}</div>
                    {item?.attributes?.child_subcates && (
                      <div
                        className={`${styles.logo} background-image`}
                        style={{
                          backgroundImage: `url(${
                            activeCollapse === item?.id
                              ? "/icons/ic-arrow-up-green.svg"
                              : "/icons/ic-arrow-down-black.svg"
                          })`,
                        }}
                      />
                    )}
                  </div>
                </div>
                {item?.attributes?.child_subcates?.data?.map(
                  (subItem, subIndex) => {
                    return (
                      <div
                        key={subIndex}
                        className={`${styles.subCollapse} ${
                          activeCollapse === item?.id
                            ? styles.subCollapseActive
                            : ""
                        }`}
                        onClick={() =>
                          router.push(`/san-pham/${subItem?.attributes?.Slug}`)
                        }
                      >
                        <div
                          className={`${styles.subCollapseText}`}
                          style={{
                            borderBottom:
                              subIndex ===
                              item?.attributes?.child_subcates?.data.length - 1
                                ? "none"
                                : "1px solid var(--greyD9Color",
                          }}
                        >
                          {subItem?.attributes?.name}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`${styles.menuTool}  ${
          active === "tool" ? styles.menuToolActive : ""
        }`}
      >
        <div className={`${styles.titleTool}`}>
          <div className={`${styles.titleToolText}`}>Công cụ</div>
          <div
            className={`${styles.logo} background-image`}
            style={{ backgroundImage: "url('/icons/ic-close-X.svg')" }}
            onClick={() => handleX()}
          />
        </div>
        <div className={`${styles.containerTool}`}>
          {/* <div className={`${styles.contentTool}`}>
            Tìm Ngân hàng/Tổ chức tài chính
          </div>
          <div className={`${styles.contentTool}`}>
            Tính lãi tiền gửi tiết kiệm
          </div> */}
          <div
            className={`${styles.contentTool}`}
            onClick={() => router.push("/cong-cu/tinh-lai-khoan-vay")}
          >
            Ước tính số tiền có thể vay
          </div>
          {/* <div className={`${styles.contentTool}`}>
            Ước tính số tiền vay phải trả hàng tháng
          </div> */}
          <div
            className={`${styles.contentTool}`}
            onClick={() => router.push("/cong-cu/tim-kiem-atm")}
          >
            Tìm ATM
          </div>
          <div
            className={`${styles.contentTool}`}
            onClick={() => router.push("/cong-cu/gia-vang")}
          >
            Giá vàng
          </div>
          <div
            className={`${styles.contentTool}`}
            onClick={() => router.push("/cong-cu/ti-gia-ngoai-te")}
          >
            Tính tỷ giá ngoại tệ
          </div>
          {/* <div className={`${styles.contentTool}`}>Công ty bảo hiểm</div> */}
        </div>
      </div>
    </>
  );
};

export default FooterMobile;
