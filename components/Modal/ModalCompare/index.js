import Rating from "@/components/Common/Rating";
import router from "next/router";
import React from "react";
import { getFilterProduct } from "stores/product";
import ReactTooltip from "react-tooltip";
import styles from "./style/style.module.scss";

const ModalCompare = (props) => {
  const { dataCompare, setDataCompare, active } = props;
  const [addOption, setAddOption] = React.useState(false);
  const [dataSearch, setDataSearch] = React.useState([]);
  const handleDeleteCreadit = (index) => {
    dataCompare.splice(index, 1);
    setDataCompare([...dataCompare]);
    localStorage.setItem("compare", JSON.stringify(dataCompare));
  };
  const handleAddCreadit = (item) => {
    let data = JSON.parse(localStorage.getItem("compare"));
    if (data) {
      data.push(item);
      setDataCompare([...data]);
    } else {
      data = [item];
      setDataCompare([item]);
    }
    setAddOption(false);
    localStorage.setItem("compare", JSON.stringify(data));
  };
  const handleSearch = async (e) => {
    if (e.target.value) {
      const result = await getFilterProduct(e.target.value, 0, 10, "deep");
      if (result) setDataSearch(result.data.data);
    } else setDataSearch([]);
  };
  return (
    <>
      <div
        className={
          active === true ? styles.closeModalActive : styles.closeModal
        }
        onClick={() => props.closeModal()}
      />
      <div
        className={active === true ? styles.containerActive : styles.container}
      >
        <div className={styles.containerTitle}>
          <div
            className={styles.containerClose}
            onClick={() => props.closeModal()}
          >
            <div
              className={`${styles.containerCloseImage} background-image`}
              style={{ backgroundImage: `url('/icons/ic-close-grey.svg` }}
            />
          </div>
          <h1 className={styles.containerTitleText}>
            So sánh các sản phẩm đã chọn
          </h1>
        </div>
        <div className="position-relative" style={{ flex: "1" }}>
          <div className={styles.containerProduct} id={styles.scrollBar}>
            <div className={styles.containerProductElementCredit}>
              {dataCompare?.map((item, index) => {
                return (
                  <div className={styles.serviceItemContainer} key={index}>
                    <div className={`${styles.serviceItemCredit}`}>
                      <div className={styles.serviceItemCreditHead}>
                        <div>
                          <span
                            className={`${styles.serviceItemCreditTitle} on-desktop`}
                          >
                            {item?.attributes?.name}
                            {item?.attributes?.confirm && (
                              <img
                                data-tip={"Sản phẩm được nhà nước công nhận"}
                                onMouseEnter={() => {
                                  ReactTooltip.rebuild();
                                }}
                                src="/icons/ic-check-circle.svg"
                                alt="check"
                                className={styles.serviceItemCreditIcon}
                              />
                            )}
                            {item?.attributes?.favourite >= 1000 && (
                              <img
                                data-tip={"Sản phẩm được nhiều người ưa thích"}
                                onMouseEnter={() => {
                                  ReactTooltip.rebuild();
                                }}
                                src="/icons/ic-heart.svg"
                                alt="heart"
                                className={styles.serviceItemCreditIcon}
                              />
                            )}
                          </span>
                        </div>

                        <div
                          className={`${styles.containerCloseImage} background-image`}
                          style={{
                            backgroundImage: `url('/icons/ic-close-grey.svg`,
                          }}
                          onClick={() => handleDeleteCreadit(index)}
                        />
                      </div>
                      <div className={styles.serviceItemCreditContent}>
                        <div className={styles.serviceItemCreditContentLeft}>
                          <div className="position-relative">
                            <img
                              src={
                                item?.attributes?.image?.data?.attributes?.url
                              }
                              alt="service"
                              className={styles.serviceItemCreditContentLeftImg}
                            />
                            <div
                              className={
                                styles.serviceItemCreditContentLeftSponsor
                              }
                            >
                              Tài trợ
                            </div>
                          </div>
                        </div>

                        <div className={styles.serviceItemCreditContentRight}>
                          <div
                            className={styles.serviceItemCreditContentRating}
                          >
                            Đánh giá
                          </div>
                          <Rating start={item?.attributes?.rating} size={16} />
                          <div
                            className={styles.serviceItemCreditContentReview}
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
                      <div className={styles.serviceItemCreditTitleMobile}>
                        <span>
                          {item?.attributes?.name}

                          {item?.attributes?.confirm && (
                            <img
                              data-tip={"Sản phẩm được nhà nước công nhận"}
                              onMouseEnter={() => {
                                ReactTooltip.rebuild();
                              }}
                              src="/icons/ic-check-circle.svg"
                              alt="check"
                              className={styles.serviceItemCreditIcon}
                            />
                          )}
                          {item?.attributes?.favourite >= 1000 && (
                            <img
                              data-tip={"Sản phẩm được nhiều người ưa thích"}
                              onMouseEnter={() => {
                                ReactTooltip.rebuild();
                              }}
                              src="/icons/ic-heart.svg"
                              alt="heart"
                              className={styles.serviceItemCreditIcon}
                            />
                          )}
                        </span>
                      </div>
                      <div
                        className={styles.serviceItemCreditButton}
                        onClick={() =>
                          router.push(
                            item?.attributes?.link ||
                              "https://portal.vietcombank.com.vn/"
                          )
                        }
                      >
                        Mở thẻ ngay
                      </div>
                      <p className={styles.serviceItemCreditText}>
                        {item?.attributes?.openAt}
                      </p>
                    </div>
                  </div>
                );
              })}
              {addOption ? (
                <div className={styles.containerPlush}>
                  <p className={styles.containerPlushText}>
                    Nhập tên sản phẩm bạn cần so sánh
                  </p>
                  <div
                    className={"position-relative"}
                    style={{ margin: "16px 0" }}
                  >
                    <input
                      type="text"
                      className={styles.containerPlushInput}
                      placeholder={"Tìm kiếm"}
                      onChange={(e) => handleSearch(e)}
                    />
                    {dataSearch?.length !== 0 && (
                      <div className={styles.containerPlushFixedResult}>
                        {dataSearch.map((item, index) => {
                          return (
                            <div
                              className={
                                styles.containerPlushFixedResultElement
                              }
                              key={index}
                              onClick={() => handleAddCreadit(item)}
                            >
                              <div style={{ width: "60px" }}>
                                <div
                                  className={`${styles.containerPlushFixedResultImage} background-image`}
                                  style={{
                                    backgroundImage: `url(${item?.attributes?.image?.data?.attributes?.url})`,
                                  }}
                                />
                              </div>

                              <p
                                className={styles.containerPlushFixedResultText}
                              >
                                {item?.attributes?.name}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <p
                    className={styles.containerPlushTextClose}
                    onClick={() => setAddOption(false)}
                  >
                    Hủy
                  </p>
                </div>
              ) : (
                <div className={styles.containerPlush}>
                  <div
                    className={`${styles.containerPlushImage} background-image`}
                    style={{ backgroundImage: `url('/icons/ic-plus.svg')` }}
                    onClick={() => setAddOption(true)}
                  />
                  <p className={styles.containerPlushText}>Thêm lựa chọn</p>
                </div>
              )}
            </div>
            {dataCompare[0]?.attributes?.Criterias?.map((item, index) => {
              return (
                <div key={index}>
                  <h2 className={styles.containerCriteriaTitle}>
                    {item?.criteriaName}
                  </h2>
                  <div className={styles.containerProductElement}>
                    {dataCompare?.map((item1, index1) => {
                      return (
                        <p className={styles.containerCriteria} key={index1}>
                          {item1?.attributes?.Criterias?.[index]?.value}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {addOption && (
        <div className={styles.containerPlushFixed}>
          <h1 className={styles.containerPlushFixedTitle}>
            So sánh các sản phẩm đã chọn
          </h1>
          <p className={styles.containerPlushFixedText}>
            Nhập tên sản phẩm bạn cần so sánh
          </p>
          <div className={"position-relative"} style={{ margin: "16px 0" }}>
            <input
              type="text"
              className={styles.containerPlushFixedInput}
              placeholder={"Tìm kiếm"}
              onChange={(e) => handleSearch(e)}
            />
            {dataSearch?.length !== 0 && (
              <div className={styles.containerPlushFixedResult}>
                {dataSearch?.map((item, index) => {
                  return (
                    <div
                      className={styles.containerPlushFixedResultElement}
                      key={index}
                      onClick={() => handleAddCreadit(item)}
                    >
                      <div style={{ width: "60px" }}>
                        <div
                          className={`${styles.containerPlushFixedResultImage} background-image`}
                          style={{
                            backgroundImage: `url(${item?.attributes?.image?.data?.attributes?.url})`,
                          }}
                        />
                      </div>

                      <p className={styles.containerPlushFixedResultText}>
                        {item?.attributes?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <p
            className={styles.containerPlushFixedTextClose}
            onClick={() => setAddOption(false)}
          >
            Hủy
          </p>
        </div>
      )}
      <ReactTooltip
        className="tooltip"
        theme="light"
        border={true}
        borderColor="#F0F0F0"
        textColor="#000"
        backgroundColor={"#fff"}
      />
    </>
  );
};

export default ModalCompare;
