import router from "next/router";
import React from "react";
import { getFilterBlog } from "stores/blog";
import { getFilterProduct } from "stores/product";

//styles
import styles from "./style/style.module.scss";

const ModalSearch = (props) => {
  const [dataSearch, setDataSearch] = React.useState([]);
  const [activeSearch, setActiveSearch] = React.useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
    props.closeModal();
    router.push(`/tim-kiem/${e.target.search.value}`);
  };
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
    <div className={styles.container}>
      <div className={styles.closeModal} onClick={() => props.closeModal()} />
      <div className={styles.containerMobile}>
        <div className="d-flex justify-content-end">
          <div
            className={`${styles.containerClose} background-image`}
            style={{ backgroundImage: "url('/icons/ic-close.svg')" }}
            onClick={() => props.closeModal()}
          />
        </div>

        <form onSubmit={(e) => handleSearch(e)}>
          <div className={styles.containerMobileSearch}>
            <div
              className={`${styles.containerMobileSearchImage} background-image`}
              style={{ backgroundImage: `url('/icons/ic-search.svg')` }}
            />
            <div style={{ flex: "1" }}>
              <input
                type={"text"}
                placeholder={"Nhập từ khóa tìm kiếm"}
                className={styles.containerMobileInput}
                name={"search"}
                onInvalid={(e) =>
                  e.target.setCustomValidity("Vui lòng nhập nội dung tìm kiếm")
                }
                onInput={(e) => e.target.setCustomValidity("")}
                onChange={(e) => {
                  handleGetDataSearch(e);
                }}
                required
              />
            </div>
          </div>
          <button type={"submit"} className={styles.containerMobileButton}>
            Tìm kiếm
          </button>
        </form>
        {activeSearch &&
          (dataSearch.length ? (
            <div className={styles.formResultMobile}>
              {dataSearch?.slice(0, 5).map((item, index) => {
                return (
                  <a key={index} onClick={() => handleClickSearch(item)}>
                    <h2>
                      {item?.attributes?.title || item?.attributes?.name || ""}
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
            <div className={styles.formResultMobile}>
              <p>Không tìm thấy kết quả</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModalSearch;
