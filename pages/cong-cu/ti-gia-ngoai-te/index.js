import React, { useRef } from "react";
import Layout from "@/components/_App/Layout";
import OurCustomers from "@/components/Home/OurCustomers";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getFilterBlogByCategory } from "stores/blog";
import BlogRelated from "@/components/Common/BlogRelated";
import moment from "moment";
import Chart from "chart.js/auto";
import { getExchangeRate, getNation } from "stores/tools";
import { currencyFormat } from "@/utils/formatMoney";
import { convertTimestamp } from "@/utils/converdate";
import { getHomePageSetting } from "stores/pageSetting";
import Advertisement from "@/components/Common/Advertisement";

const ExchangeRate = () => {
  const fixDataChart = (data) => {
    let temp = 0;
    const newData = data?.map((item, index) => {
      if (item === null) return temp;
      else {
        temp = item;
        return item;
      }
    });
    return newData;
  };
  const fixNumberChart = (data) => {
    return data?.map((item) => {
      return parseFloat(item?.toFixed(3));
    });
  };
  const breadcrumb = [
    {
      href: "#",
      title: "Công cụ",
    },
    {
      href: "#",
      title: "Tỷ giá ngoại tệ",
    },
  ];
  const [dataCurrency, setDataCurrency] = React.useState();
  const [dataCustomer, setDataCustomer] = React.useState();
  const [dataBlog, setDataBlog] = React.useState([]);
  const [active, setActive] = React.useState(1);
  const [showFrom, setShowFrom] = React.useState(false);
  const [showTo, setShowTo] = React.useState(false);
  const [fromValue, setFromValue] = React.useState(0);
  const [toValue, setToValue] = React.useState(1);
  const refFrom = React.useRef();
  const refTo = React.useRef();
  const [quantity, setQuantity] = React.useState(1);
  const [rate, setRate] = React.useState(0);
  const [dataExchange, setDataExchange] = React.useState();
  const [dataExchangeTable, setDataExchangeTable] = React.useState([]);
  const [isDark, setIsDark] = React.useState(false);
  const eventHandlerFrom = (event) => {
    if (!refFrom.current?.contains(event.target)) {
      setShowFrom(false);
    }
  };
  const eventHandlerTo = (event) => {
    if (!refTo.current?.contains(event.target)) {
      setShowTo(false);
    }
  };
  React.useEffect(async () => {
    const result = await getNation();
    const resultCustomer = await getHomePageSetting(
      "our_customers, our_customers.avatar, image_ad, image_ad.imageDesktop, image_ad.imageMobile"
    );
    setDataCustomer(resultCustomer?.data?.data);
    setDataCurrency(result?.data?.data);
  }, []);
  React.useEffect(() => {
    document.addEventListener("click", eventHandlerFrom);
    return () => document.removeEventListener("click", eventHandlerFrom);
  }, [refFrom]);
  React.useEffect(() => {
    document.addEventListener("click", eventHandlerTo);
    return () => document.removeEventListener("click", eventHandlerTo);
  }, [refTo]);
  React.useEffect(async () => {
    if (dataCurrency) {
      const result = await getExchangeRate(
        dataCurrency?.[fromValue]?.attributes?.code,
        dataCurrency?.[toValue]?.attributes?.code
      );
      setDataExchange(result?.data);
      setRate(
        result?.data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.slice(
          -1
        )[0] || 0
      );
      dataCurrency?.map((item, index) => {
        if (index !== fromValue) {
          const getData = async () => {
            const res = await getExchangeRate(
              item?.attributes?.code,
              dataCurrency?.[fromValue]?.attributes?.code
            );
            dataExchangeTable[index] = res?.data;
            setDataExchangeTable([...dataExchangeTable]);
          };
          getData();
        } else {
          dataExchangeTable[index] = { name: "nodata" };
          setDataExchangeTable(...dataExchangeTable);
        }
      });
    }
  }, [fromValue, toValue, dataCurrency]);
  React.useEffect(() => {
    const getData = async () => {
      const response = await getFilterBlogByCategory(
        "Tỷ giá",
        0,
        5,
        "image%2Ccategory_lists"
      );
      setDataBlog(response?.data?.data);
    };
    getData();
    const onStorage = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const handleChangeFromTo = () => {
    setFromValue(toValue);
    setToValue(fromValue);
  };
  const canvasEl = useRef(null);
  React.useEffect(() => {
    if (dataCurrency && dataExchange) {
      const ctx = canvasEl.current.getContext("2d");
      const labels = convertTimestamp(
        dataExchange?.chart?.result?.[0]?.timestamp
      );
      const data = {
        labels: labels,
        datasets: [
          {
            // backgroundColor: gradient,
            label: "",
            data: fixNumberChart(
              fixDataChart(
                dataExchange?.chart?.result?.[0]?.indicators?.quote?.[0]?.close
              )
            ),
            // fill: true,
            // borderWidth: 2,
            borderColor: "#067655",
            backdropColor: "#FFFFFF",
            color: "#FFFFFF",
            // lineTension: 0.2,
            textStrokeColor: "#FFFFFF",
            // pointBackgroundColor: colors.purple.default,
            // pointRadius: 3,
          },
        ],
      };

      const config = {
        type: "line",
        data: data,
        options: {
          elements: {
            point: {
              // radius: 10,
              borderWidth: 0,
              hitRadius: 100,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              border: {
                dash: [5, 5],
              },
            },
          },
        },
      };
      const myLineChart = new Chart(ctx, config);

      return function cleanup() {
        myLineChart.destroy();
      };
    }
  }, [dataExchange, dataCurrency]);
  React.useEffect(() => {
    if (dataCurrency && dataExchangeTable) {
      dataCurrency?.map((item, index) => {
        if (index !== fromValue) {
          const ctx = document.getElementById(`Chart${index}`);
          let chartStatus = Chart.getChart(`Chart${index}`);
          if (chartStatus != undefined) {
            chartStatus.destroy();
          }
          new Chart(ctx, {
            type: "line",
            data: {
              labels: dataExchangeTable?.[index]?.chart?.result?.[0]?.timestamp,
              datasets: [
                {
                  data: fixDataChart(
                    dataExchangeTable?.[index]?.chart?.result?.[0]?.indicators
                      ?.quote?.[0]?.close
                  ),
                  lineTension: 0.2,
                  borderWidth: 1,
                  borderColor:
                    dataExchangeTable?.[index]?.chart?.result?.[0]?.indicators
                      ?.quote?.[0]?.close?.[0] <
                    dataExchangeTable?.[
                      index
                    ]?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.slice(
                      -1
                    )[0]
                      ? "#389E0D"
                      : "#CF1322",
                },
              ],
            },
            options: {
              elements: {
                point: {
                  radius: 0,
                  borderWidth: 0,
                  hitRadius: 0,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
            },
          });
        }
      });
    }
  }, [dataExchangeTable, dataCurrency]);
  const handleChangeQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  return (
    <Layout title={"Ezmoney - Công cụ"}>
      <div className={styles.container}>
        <div className="container">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h1 className={styles.containerTitle}>Công cụ tỷ giá ngoại tệ</h1>
          <p className={styles.containerText}>
            Công cụ giúp bạn tra cứu tỷ giá ngoại tệ
          </p>
          <div className={styles.containerTextTime}>
            Cập nhật lúc <b>{moment(new Date()).format("DD/MM/YYYY HH:mm")}</b>
          </div>
          <div className={styles.containerMenu}>
            <div
              className={
                active === 1
                  ? styles.containerMenuSelectActive
                  : styles.containerMenuSelect
              }
              onClick={() => setActive(1)}
            >
              Chuyển đổi
            </div>
            <div
              className={
                active === 2
                  ? styles.containerMenuSelectActive
                  : styles.containerMenuSelect
              }
              onClick={() => setActive(2)}
            >
              Biểu đồ
            </div>
          </div>
          <div className={styles.containerExchange}>
            <div className={styles.containerExchangeHead}>
              <div
                className={styles.containerExchangeHeadElement}
                style={{ display: active === 1 ? "block" : "none" }}
              >
                <p className={styles.containerExchangeHeadElementText}>
                  Số lượng
                </p>
                <div className={styles.containerExchangeHeadElementInput}>
                  <span>đ</span>
                  <div>
                    <input
                      type={"number"}
                      defaultValue={1}
                      onChange={(e) => handleChangeQuantity(e)}
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
              <div
                className={
                  active === 1
                    ? styles.containerExchangeHeadElement
                    : styles.containerExchangeHeadElementChart
                }
              >
                <p className={styles.containerExchangeHeadElementText}>Từ</p>
                <div
                  ref={refFrom}
                  className="position-relative"
                  onClick={() => {
                    setShowFrom(!showFrom);
                    setShowTo(false);
                  }}
                >
                  <div className={styles.containerExchangeSelect}>
                    <div className="d-flex">
                      <div
                        className={`background-image`}
                        style={{
                          backgroundImage: `url(${dataCurrency?.[fromValue]?.attributes?.image?.data?.attributes?.url})`,
                          height: "24px",
                          minWidth: "24px",
                        }}
                      />
                      <p>{dataCurrency?.[fromValue]?.attributes?.name}</p>
                    </div>
                    <div
                      className={`background-image`}
                      style={{
                        backgroundImage: `url('/icons/ic-arrow-down-black.svg')`,
                        height: "24px",
                        minWidth: "24px",
                      }}
                    />
                  </div>
                  {showFrom && (
                    <div className={styles.containerExchangeOption}>
                      {dataCurrency?.map((item, index) => {
                        if (index !== toValue)
                          return (
                            <div
                              key={index}
                              className={styles.containerExchangeOptionElement}
                              onClick={() => setFromValue(index)}
                            >
                              <div
                                className={`background-image`}
                                style={{
                                  backgroundImage: `url(${item.attributes?.image?.data?.attributes?.url})`,
                                  height: "24px",
                                  minWidth: "24px",
                                }}
                              />
                              <p>{item?.attributes?.name}</p>
                            </div>
                          );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`background-image`}
                style={{
                  backgroundImage: `url('/icons/ic-change.svg')`,
                  height: "48px",
                  minWidth: "48px",
                  cursor: "pointer",
                }}
                onClick={() => handleChangeFromTo()}
              />
              <div
                className={
                  active === 1
                    ? styles.containerExchangeHeadElement
                    : styles.containerExchangeHeadElementChart
                }
              >
                <p className={styles.containerExchangeHeadElementText}>Sang</p>
                <div
                  ref={refTo}
                  className="position-relative"
                  onClick={() => {
                    setShowFrom(false);
                    setShowTo(!showTo);
                  }}
                >
                  <div className={styles.containerExchangeSelect}>
                    <div className="d-flex">
                      <div
                        className={`background-image`}
                        style={{
                          backgroundImage: `url(${dataCurrency?.[toValue]?.attributes?.image?.data?.attributes?.url})`,
                          height: "24px",
                          minWidth: "24px",
                        }}
                      />
                      <p>{dataCurrency?.[toValue]?.attributes?.name}</p>
                    </div>
                    <div
                      className={`background-image`}
                      style={{
                        backgroundImage: `url('/icons/ic-arrow-down-black.svg')`,
                        height: "24px",
                        minWidth: "24px",
                      }}
                    />
                  </div>
                  {showTo && (
                    <div className={styles.containerExchangeOption}>
                      {dataCurrency?.map((item, index) => {
                        if (index !== fromValue)
                          return (
                            <div
                              key={index}
                              className={styles.containerExchangeOptionElement}
                              onClick={() => setToValue(index)}
                            >
                              <div
                                className={`background-image`}
                                style={{
                                  backgroundImage: `url(${item.attributes?.image?.data?.attributes?.url})`,
                                  height: "24px",
                                  minWidth: "24px",
                                }}
                              />
                              <p>{item?.attributes?.name}</p>
                            </div>
                          );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.containerExchangeHeadButton}>
                {active === 1 ? "Chuyển đổi" : "Xem biểu đồ"}
              </div>
            </div>
            {active === 1 ? (
              <>
                <p className={styles.containerExchangeChange}>
                  {currencyFormat(quantity || 1, 0)}{" "}
                  {dataCurrency?.[fromValue]?.attributes?.subName} =
                </p>
                <p className={styles.containerExchangeChanged}>
                  {currencyFormat((quantity || 1) * rate, 6)}{" "}
                  {dataCurrency?.[toValue]?.attributes?.subName}
                </p>
                <p className={styles.containerExchangeRatio}>
                  {`1 ${
                    dataCurrency?.[fromValue]?.attributes?.code
                  } = ${currencyFormat((quantity || 1) * rate, 6)} ${
                    dataCurrency?.[toValue]?.attributes?.code
                  }`}
                </p>
                <p className={styles.containerExchangeRatio}>
                  {`1 ${
                    dataCurrency?.[toValue]?.attributes?.code
                  } = ${currencyFormat((quantity || 1) / rate, 6)} ${
                    dataCurrency?.[fromValue]?.attributes?.code
                  }`}
                </p>
              </>
            ) : (
              <div className={styles.containerExchangeOne}>
                <span style={{ fontWeight: "700", marginRight: "12px" }}>
                  {`1 ${
                    dataCurrency?.[fromValue]?.attributes?.code
                  } = ${currencyFormat((quantity || 1) * rate, 6)} ${
                    dataCurrency?.[toValue]?.attributes?.code
                  }`}
                </span>
                <span>
                  {moment.utc(new Date()).format("MMM DD, YYYY, HH:mm UTC")}
                </span>
              </div>
            )}
          </div>
          <div style={{ display: active === 1 ? "block" : "none" }}>
            <h2 className={styles.containerTextRatio}>Tỷ giá ngoại tệ</h2>
            <p className={styles.containerTextSource}>Nguồn:...</p>
            <table className={styles.containerTable}>
              <tr className={styles.containerTableHead}>
                <th></th>
                <th>Giá</th>
                <th>Biến động 24h</th>
                <th>Biểu đồ 24h</th>
              </tr>
              {dataCurrency?.slice(0, 10)?.map((item, index) => {
                if (index !== fromValue)
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div
                            className={`background-image`}
                            style={{
                              backgroundImage: `url(${item.attributes?.image?.data?.attributes?.url})`,
                              height: "35px",
                              minWidth: "35px",
                              marginRight: "8px",
                            }}
                          />
                          <span className={styles.containerTableHide}>
                            {item?.attributes?.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        {currencyFormat(
                          dataExchangeTable?.[
                            index
                          ]?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.slice(
                            -1
                          )[0] || 0,
                          3
                        ) +
                          " " +
                          dataCurrency?.[fromValue]?.attributes?.code}
                      </td>
                      <td
                        style={{
                          color:
                            (dataExchangeTable?.[
                              index
                            ]?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.slice(
                              -1
                            )[0] -
                              dataExchangeTable?.[index]?.chart?.result?.[0]
                                ?.indicators?.quote?.[0]?.close?.[0]) /
                              dataExchangeTable?.[index]?.chart?.result?.[0]
                                ?.indicators?.quote?.[0]?.close?.[0] >
                            0
                              ? "#389E0D"
                              : "#CF1322",
                        }}
                      >
                        {dataExchangeTable?.[index]?.chart?.result
                          ? `${
                              (dataExchangeTable?.[
                                index
                              ]?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.slice(
                                -1
                              )[0] -
                                dataExchangeTable?.[index]?.chart?.result?.[0]
                                  ?.indicators?.quote?.[0]?.close?.[0]) /
                                dataExchangeTable?.[index]?.chart?.result?.[0]
                                  ?.indicators?.quote?.[0]?.close?.[0] >
                              0
                                ? "+"
                                : ""
                            }${(
                              (dataExchangeTable?.[
                                index
                              ]?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.slice(
                                -1
                              )[0] -
                                dataExchangeTable?.[index]?.chart?.result?.[0]
                                  ?.indicators?.quote?.[0]?.close?.[0]) /
                              dataExchangeTable?.[index]?.chart?.result?.[0]
                                ?.indicators?.quote?.[0]?.close?.[0]
                            ).toFixed(2)}%`
                          : ""}
                      </td>
                      <td style={{ padding: "16px 0" }}>
                        <div className={styles.containerCanvas}>
                          <canvas id={`Chart${index}`} />
                        </div>
                      </td>
                    </tr>
                  );
              })}
            </table>
          </div>
          <div style={{ display: active === 2 ? "block" : "none" }}>
            <h2 className={styles.containerTextRatio}>
              Biểu đồ từ {dataCurrency?.[fromValue]?.attributes?.code} sang{" "}
              {dataCurrency?.[toValue]?.attributes?.code}
            </h2>
            <canvas id="myChart" ref={canvasEl} height="100" />
          </div>
        </div>
      </div>
      {dataCustomer && (
        <OurCustomers data={dataCustomer?.attributes?.our_customers} />
      )}
      <BlogRelated
        title={"Blog về Tỷ giá"}
        category={"ty-gia"}
        data={dataBlog}
        isDark={isDark}
      />
      <Advertisement
        data={dataCustomer?.attributes?.image_ad}
        paddingDesktop={"31px 10.5px 66px"}
        paddingMobile={"20px 16px"}
      />
    </Layout>
  );
};
export default ExchangeRate;
