import router, { useRouter } from "next/router";
import React from "react";
import { getFilterBlog } from "stores/blog";
import { getFilterProduct } from "stores/product";

//styles
import styles from "./style/style.module.scss";

const languageList = [
  {
    name: "English",
    image_url: "/images/im-en.webp",
  },
  {
    name: "Việt Nam",
    image_url: "/images/im-vi.png",
  },
];

const TopBar = (props) => {
  const {
    handleLogOut,
    tools,
    top10s,
    dataUser,
    handleChangeTheme,
    storedTheme,
  } = props;
  const [popup, setPopup] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [activeSearch, setActiveSearch] = React.useState(false);
  const [dataSearch, setDataSearch] = React.useState([]);
  const router = useRouter();
  const ref = React.useRef();
  const eventHandler = (event) => {
    if (!ref.current?.contains(event.target)) {
      setPopup(false);
      setActiveSearch(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", eventHandler);
    return () => document.removeEventListener("click", eventHandler);
  }, [ref]);
  const handleGetDataSearch = async (e) => {
    if (e.target.value) {
      setActiveSearch(true);
      const resultBlog = await getFilterBlog(e.target.value, 0, 5);
      const resultTop = await getFilterProduct(e.target.value, 0, 5);
      setDataSearch([
        ...resultTop?.data?.data,
        ...props.tools.filter((item) =>
          item.attributes.title.includes(e.target.value)
        ),
        ...resultBlog?.data?.data,
      ]);
    } else setActiveSearch(false);
  };
  const handleClickSearch = (item) => {
    if (!item?.id) router.push(item?.attributes?.slug);
    else if (item?.attributes?.name)
      router.push(`/chi-tiet-san-pham/${item?.attributes?.slug}`);
    else router.push(`/tin-tuc/${item?.attributes?.slug}`);
  };
  return (
    <>
      <div className={styles.borderBottom}>
        <div
          className={`container ${styles.container} d-flex align-items-center`}
        >
          <div className={styles.logoContainer}>
            <div
              className={`${styles.logo} background-image`}
              style={{
                backgroundImage: storedTheme
                  ? "url('/images/Ezmoney_Logo-dark.svg')"
                  : "url('/images/Ezmoney_Logo.svg')",
              }}
              onClick={() => router.push("/")}
            />
          </div>
          <form
            className={styles.formGroup}
            onSubmit={(e) => props.handleSearch(e)}
          >
            <label htmlFor="search" className="w-100">
              <input
                className={styles.formControl}
                type={"text"}
                placeholder="Tìm kiếm"
                name="search"
                id="search"
                onInvalid={(e) =>
                  e.target.setCustomValidity("Vui lòng nhập nội dung tìm kiếm")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                onChange={(e) => {
                  handleGetDataSearch(e);
                }}
                required
              />
            </label>
            {activeSearch &&
              (dataSearch.length ? (
                <div className={styles.formResult}>
                  {dataSearch?.slice(0, 5).map((item, index) => {
                    return (
                      <a key={index} onClick={() => handleClickSearch(item)}>
                        <h2>
                          {item?.attributes?.title ||
                            item?.attributes?.name ||
                            ""}
                        </h2>
                        <span>
                          {item?.attributes?.subTitle ||
                            item?.attributes?.parent ||
                            ""}
                        </span>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.formResult}>
                  <p>Không tìm thấy kết quả</p>
                </div>
              ))}
            <button className={styles.btnSearch} type={"submit"}>
              <div style={{ width: "16px", height: "16px" }}>
                <img
                  src="/icons/ic-search.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
            </button>
          </form>
          <div className={`d-flex align-items-center ${styles.avatar}`}>
            <div className={`${styles.hoverTop10s}`}>
              <div
                className={`${styles.avatarText} ${
                  router?.pathname === "/san-pham/[slug]"
                    ? styles.avatarTextActive
                    : ""
                }`}
                onMouseEnter={() => setActiveSearch(false)}
              >
                Top 10 Ezchoices
              </div>
              <div className={styles.top10s} onMouseLeave={() => setActive(-1)}>
                {active !== -1 && <div className={styles.top10sWhite} />}

                <div className={`container ${styles.top10sContainer}`}>
                  <div className={styles.top10sContainerLeft}>
                    {top10s?.map((item, index) => {
                      return (
                        <p
                          className={
                            active === index
                              ? styles.top10sContainerLeftElementActive
                              : styles.top10sContainerLeftElement
                          }
                          key={index}
                          onMouseEnter={() => setActive(index)}
                          // onMouseLeave={() => setActive(-1)}
                        >
                          {item?.attributes?.name}
                        </p>
                      );
                    })}
                  </div>
                  {active !== -1 && (
                    <div className={styles.top10sChilds}>
                      {top10s?.[active]?.attributes?.child_subcates?.data?.map(
                        (item, index) => {
                          return (
                            <p
                              className={styles.top10sChildsElement}
                              key={index}
                              onClick={() =>
                                router.push(
                                  `/san-pham/${item?.attributes?.Slug}`
                                )
                              }
                            >
                              {item?.attributes?.name}
                            </p>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`${styles.avatarText} ${
                router?.pathname?.split("/")?.[1] === "tin-tuc"
                  ? styles.avatarTextActive
                  : ""
              }`}
              onClick={() => router.push("/tin-tuc")}
            >
              Chỉ dẫn và Tips
            </div>
            <div className={`${styles.hoverTools}`}>
              <div
                className={`${styles.avatarText} ${
                  router?.pathname?.split("/")?.[1] === "cong-cu"
                    ? styles.avatarTextActive
                    : ""
                }`}
                onMouseEnter={() => setActiveSearch(false)}
              >
                Công cụ
              </div>
              <div className={styles.tools}>
                <div className={`container ${styles.toolsContainer}`}>
                  {tools.map((item, index) => {
                    return (
                      <p
                        className={styles.toolsContainerElement}
                        key={index}
                        onClick={() => router.push(item.attributes.slug)}
                      >
                        {item.attributes.title}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={storedTheme}
                onChange={(e) => handleChangeTheme(e)}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
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
            {props?.dataUser ? (
              <div
                className={`${styles.avatarImage} background-image position-relative`}
                style={{
                  backgroundImage: `url(${
                    dataUser?.avatar?.url || "/icons/ic-user-2.svg"
                  })`,
                }}
                onClick={() => setPopup(!popup)}
                ref={ref}
              >
                {popup && (
                  <div className={styles.popup}>
                    <span>
                      Xin chào, <strong>{dataUser?.username}</strong>
                    </span>
                    <div
                      className={styles.popupText}
                      onClick={() => handleLogOut()}
                    >
                      Đăng xuất
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.containerBtn}>
                <div
                  className={`${styles.btnRegister}`}
                  onClick={() => router.push("/dang-ky")}
                >
                  Đăng ký
                </div>
                <div
                  className={`${styles.btnLogin}`}
                  onClick={() => router.push("/dang-nhap")}
                >
                  Đăng nhập
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
