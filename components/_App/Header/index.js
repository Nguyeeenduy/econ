import React from "react";
import TopBar from "@/components/_App/Header/components/TopBar";

//styles
import styles from "./style/style.module.scss";
import router from "next/router";
import { addScrollBar, removeScrollBar } from "@/utils/scrollBar";
import ModalSearch from "@/components/Modal/ModalSearch";

const menus = [
  {
    label: "Top 10 Ezchoices",
    link_url: "/",
  },
  {
    label: "Chỉ dẫn và Tips",
    link_url: "#",
  },
  {
    label: "Công cụ",
    link_url: "#",
  },
];

const Header = (props) => {
  // Menu
  const [modalSearch, setModalSearch] = React.useState(false);
  const [dataUser, setDataUser] = React.useState();
  const [storedTheme, setStoredTheme] = React.useState("");
  const [showHead, setShowHead] = React.useState(true);
  let showScroll = 0;
  // if (storedTheme)
  //     document.documentElement.setAttribute('data-theme', storedTheme)
  const toggleNavbar = () => {
    props.setMenu(1);
    setModalSearch(false);
    addScrollBar();
  };
  const toggleSearch = () => {
    setModalSearch(!modalSearch);
    props.setMenu(0);
  };
  const handleClickX = () => {
    props.setMenu(0);
    removeScrollBar();
  };
  const handleClickBack = () => {
    props.setMenu(2);
    removeScrollBar();
  };
  const handleLogOut = () => {
    if (dataUser) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      window.location.reload(false);
    } else {
      router.push("/dang-nhap");
      handleClickX();
    }
  };
  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setDataUser(foundUser);
    }
    setStoredTheme(
      localStorage.getItem("theme") === "dark"
        ? true
        : localStorage.getItem("theme") === "light"
        ? false
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false
    );
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );
  }, []);
  React.useEffect(() => {
    window.dispatchEvent(new Event("storage"));
  }, [storedTheme]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/tim-kiem/${e.target.search.value}`);
  };
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
  const handleChangeTheme = (e) => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let targetTheme = "light";

    if (currentTheme === "light") {
      setStoredTheme(true);
      targetTheme = "dark";
    } else {
      setStoredTheme(false);
    }

    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.removeItem("theme");
    localStorage.setItem("theme", targetTheme);
  };
  React.useEffect(() => {
    const listener = () => {
      const scr = window.pageYOffset;
      if (showScroll < 80 || showScroll > scr) setShowHead(false);
      else setShowHead(true);
      showScroll = scr;
    };
    listener();
    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <div className={styles.container}>
      <TopBar
        handleLogOut={handleLogOut}
        handleSearch={handleSearch}
        dataUser={dataUser}
        tools={tools}
        top10s={props?.top10s}
        handleChangeTheme={(e) => handleChangeTheme(e)}
        storedTheme={storedTheme}
      />
      <div
        id="navbar"
        className={`navbar-area ${styles.navbarArea}`}
        style={{ top: showHead ? "-80px" : "0" }}
      >
        <div className="texap-nav">
          <div className="container">
            <nav className={`navbar navbar-expand-md`}>
              <div className={styles.navButton}>
                <div
                  className={`${styles.logoHome} background-image`}
                  style={{
                    backgroundImage: storedTheme
                      ? "url('/images/Ezmoney_Logo-dark.svg')"
                      : "url('/images/Ezmoney_Logo.svg')",
                  }}
                  onClick={() => router.push("/")}
                />
                <div className="d-flex flex-row-reverse">
                  <button
                    onClick={toggleNavbar}
                    className={styles.classTwo}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <div
                      className={`${styles.logo} background-image`}
                      style={{
                        backgroundImage: storedTheme
                          ? "url('/icons/ic-menu-dark.svg')"
                          : "url('/icons/ic-menu.svg')",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => router.push("/lien-he")}
                    className={styles.classTwo}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <div
                      className={`${styles.logo} background-image`}
                      style={{
                        backgroundImage: storedTheme
                          ? "url('/icons/ic-chat-dark.svg')"
                          : "url('/icons/ic-chat.svg')",
                      }}
                    />
                  </button>
                  <button
                    className={styles.classTwo}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <div
                      className={`${styles.logo} background-image position-relative`}
                      style={{
                        backgroundImage: storedTheme
                          ? "url('/icons/ic-balance-scale-dark.svg')"
                          : "url('/icons/ic-balance-scale.svg')",
                        // backgroundImage: "url('/icons/ic-cart.svg')",
                      }}
                      onClick={() => props.setModalCompare(!props.modalCompare)}
                    >
                      {props?.numberCompare !== 0 && (
                        <p className={styles.numberCompare}>
                          {props?.numberCompare}
                        </p>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={toggleSearch}
                    className={styles.classTwo}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <div
                      className={`${styles.logo} background-image`}
                      style={{
                        backgroundImage: storedTheme
                          ? "url('/icons/ic-search-mobile-dark.svg')"
                          : "url('/icons/ic-search-mobile.svg')",
                      }}
                    />
                  </button>
                </div>
              </div>
              {
                <div
                  className={`${styles.navMain} ${
                    props.menu === 1 ? styles.navMainActive : ""
                  } `}
                >
                  <div className={`${styles.iconX}`} onClick={handleClickX}>
                    <div className={styles.containerCollapseDarkMode}>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={storedTheme}
                          onChange={() => handleChangeTheme()}
                        />
                        <span
                          className={`${styles.slider} ${styles.round}`}
                        ></span>
                        <span
                          className={`${styles.sliderLeft} background-image`}
                          style={{
                            backgroundImage: storedTheme
                              ? "url('/icons/ic-light-dark.svg')"
                              : "url('/icons/ic-light.svg')",
                          }}
                        ></span>
                        <span
                          className={`${styles.sliderRight} background-image`}
                          style={{
                            backgroundImage: storedTheme
                              ? "url('/icons/ic-dark-dark.svg')"
                              : "url('/icons/ic-dark.svg')",
                          }}
                        ></span>
                      </label>
                    </div>
                    <div
                      className={`${styles.logo} background-image`}
                      style={{
                        backgroundImage: "url('/icons/ic-close-X.svg')",
                      }}
                    />
                  </div>
                  <div className={`${styles.textWelcomRight}`}>
                    <div
                      className={`${styles.avatarCustomer} background-image`}
                      style={{
                        backgroundImage: `url(${
                          dataUser?.avatar?.url || "/icons/ic-avatar.svg"
                        } )`,
                      }}
                    />
                    <div className={`${styles.welcome}`}>
                      <div className={`${styles.hello}`}>Xin chào!</div>
                      <div className={`${styles.nameCustomer}`}>
                        {dataUser?.username || "Khách"}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.containerCollapse}`}
                    onClick={() => router.push("/")}
                  >
                    <div className={`${styles.containerCollapseItem}`}>
                      <div className={`${styles.containerCollapseItemText}`}>
                        Trang chủ
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.containerCollapse}`}>
                    <div className={`${styles.containerCollapseItem}`}>
                      <div
                        className={`${styles.containerCollapseItemText}`}
                        onClick={() => router.push("/tin-tuc")}
                      >
                        Chỉ dẫn & Tips
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${styles.containerCollapse}`}
                    onClick={() => {
                      props.setActive("top10");
                      handleClickBack();
                    }}
                  >
                    <div className={`${styles.containerCollapseItem}`}>
                      <div className={`${styles.containerCollapseItemText}`}>
                        Top 10 Ezchoices
                      </div>
                      <div
                        className={`${styles.logo} background-image`}
                        style={{
                          backgroundImage:
                            "url('/icons/ic-arrow-down-black.svg')",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={`${styles.containerCollapse}`}
                    onClick={() => {
                      props.setActive("tool");
                      handleClickBack();
                    }}
                  >
                    <div className={`${styles.containerCollapseItem}`}>
                      <div className={`${styles.containerCollapseItemText}`}>
                        Công cụ
                      </div>
                      <div
                        className={`${styles.logo} background-image`}
                        style={{
                          backgroundImage:
                            "url('/icons/ic-arrow-down-black.svg')",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={`${styles.containerCollapse}`}
                    onClick={() => router.push("/gioi-thieu")}
                  >
                    <div className={`${styles.containerCollapseItem}`}>
                      <div className={`${styles.containerCollapseItemText}`}>
                        Về chúng tôi
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.containerCollapse}`}
                    onClick={() => handleLogOut()}
                  >
                    <div className={`${styles.containerCollapseItem}`}>
                      <div className={`${styles.containerCollapseItemText}`}>
                        {dataUser ? "Đăng xuất" : "Đăng nhập"}
                      </div>
                    </div>
                  </div>
                </div>
              }
            </nav>
          </div>
        </div>
      </div>
      <div
        className={`${styles.overlay} ${
          props?.menu === 1 ? styles.overlayActive : ""
        }`}
        onClick={handleClickX}
      />
      {modalSearch && (
        <ModalSearch closeModal={() => setModalSearch(false)} tools={tools} />
      )}
    </div>
  );
};

export default Header;
