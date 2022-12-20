import React, { useRef } from "react";
import Layout from "@/components/_App/Layout";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getFilterBlogByCategory, getListBlogs } from "stores/blog";
import BlogRelated from "@/components/Common/BlogRelated";
import Advertisement from "@/components/Common/Advertisement";
import { currencyFormatMoney, currencyFormatNew } from "@/utils/formatMoney";
import { Chart, Filler } from "chart.js/auto";
import { useRouter } from "next/router";
import { pmt } from "@/utils/calculator";
import Pagination from "@/components/Common/Pagination";
import { getHomePageSetting } from "stores/pageSetting";
import {
  getConsciousName,
  getCreditScore,
  getDebtPurpose,
  getFilterLoanCompanie,
  getLoanCompanie,
} from "stores/tools";
const CalculateInterest = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Công cụ",
    },
    {
      href: "#",
      title: "Công cụ tính lãi phải trả cho khoản vay",
    },
  ];
  const [datas, setDatas] = React.useState();
  const [dataBlog, setDataBlog] = React.useState([]);
  const [dataAdv, setDataAdv] = React.useState();
  const [loan, setLoan] = React.useState(0);
  const [month, setMonth] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [loanPurpose, setLoanPurpose] = React.useState("");
  const [loanAmount, setLoanAmount] = React.useState(0);
  const [conscious, setConscious] = React.useState("");
  const [creditScore, setCreditScore] = React.useState(0);
  const [method, setMethod] = React.useState(1);
  const [interestResult, setInterestResult] = React.useState();
  const canvasEl = useRef(null);
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [isDark, setIsDark] = React.useState(false);
  const ref = React.useRef();
  const [dataLoanPurpose, setDataLoanPurpose] = React.useState();
  const [dataConscious, setDataConscious] = React.useState();
  const [dataCreditScore, setDataCreditScore] = React.useState();
  React.useEffect(() => {
    const getData = async () => {
      const result = await getHomePageSetting(
        "image_ad, image_ad.imageDesktop, image_ad.imageMobile"
      );
      const response = await getFilterBlogByCategory(
        "Vay tiền",
        0,
        5,
        "image%2Ccategory_lists"
      );
      const resultConscious = await getConsciousName();
      const resultLoanPurpose = await getDebtPurpose();
      const resultCreditScore = await getCreditScore();
      const resultLoancompany = await getLoanCompanie(0, 10, "image");
      setDataConscious(resultConscious?.data?.data);
      setDataLoanPurpose(resultLoanPurpose?.data?.data);
      setDataCreditScore(resultCreditScore?.data?.data);
      setDatas(resultLoancompany?.data?.data);
      setDataAdv(result?.data?.data);
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
  const eventHandler = () => {
    if (!ref.current?.contains(event.target)) setActive(0);
  };
  React.useEffect(() => {
    if (active) {
      document.addEventListener("click", eventHandler);
      return () => document.removeEventListener("click", eventHandler);
    }
  }, [active]);
  const handleCalculator = () => {
    let totalIterest = 0;
    let fistMonth = 0;
    const arr = new Array();
    const arrInterest = new Array();
    const arrOrigin = new Array();
    const arrRemainingAmount = new Array();
    const arrMoneyPay = new Array();
    if (month != 0) {
      if (method == 1) {
        for (let i = 0; i < parseInt(month); i++) {
          arr[i] = i + 1;
          arrInterest[i] = parseInt(
            (((loan - (loan / month) * i) * interest) / 100 / 12).toFixed(0)
          );
          totalIterest += ((loan - (loan / month) * i) * interest) / 100 / 12;
          arrOrigin[i] = loan / month;
          arrRemainingAmount[i] = loan - (loan / month) * (i + 1);
          arrMoneyPay[i] = parseInt(
            (
              ((loan - (loan / month) * i) * interest) / 100 / 12 +
              loan / month
            ).toFixed(0)
          );
        }
        fistMonth = ((loan * interest) / 100 / 12 + loan / month).toFixed(0);
      } else {
        let tmp = parseInt(loan);
        for (let i = 0; i < parseInt(month); i++) {
          arr[i] = i + 1;
          arrInterest[i] = parseInt(((tmp * interest) / 100 / 12).toFixed(0));
          totalIterest += arrInterest[i];
          arrRemainingAmount[i] =
            tmp +
            parseInt(pmt(interest / 100 / 12, month, loan).toFixed(0)) +
            arrInterest[i];
          arrMoneyPay[i] = -parseInt(
            pmt(interest / 100 / 12, month, loan).toFixed(0)
          );
          arrOrigin[i] = arrMoneyPay[i] - arrInterest[i];
          tmp =
            tmp +
            parseInt(pmt(interest / 100 / 12, month, loan).toFixed(0)) +
            arrInterest[i];
        }
        fistMonth = -parseInt(pmt(interest / 100 / 12, month, loan).toFixed(0));
      }
      const obj = {
        month: arr,
        interest: arrInterest,
        origin: arrOrigin,
        remainingAmount: arrRemainingAmount,
        moneyPay: arrMoneyPay,
        totalIterest: parseInt(totalIterest.toFixed(0)),
        fistMonth: fistMonth,
        total: parseInt(loan) + parseInt(totalIterest.toFixed(0)),
      };
      setInterestResult(obj);
    } else setInterestResult(0);
    const ctx = canvasEl.current.getContext("2d");
    let chartStatus = Chart.getChart(`myChart`);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    const data = {
      labels: arr || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      datasets: [
        {
          label: "",
          data: arrMoneyPay,
          borderColor: "#067655",
          backdropColor: "#FFFFFF",
          color: "#FFFFFF",
          textStrokeColor: "#FFFFFF",
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        elements: {
          point: {
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
    setPage(0);
  };
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const handleOnChangeLoan = (e) => {
    if (e.target.value)
      setLoan(parseInt(e.target.value.replaceAll(".", "")).toString());
    else setLoan(0);
  };
  const handleOnChangeMonth = (e) => {
    if (e.target.value > 300) {
      setMonth(300);
    } else if (e.target.value) setMonth(parseInt(e.target.value).toString());
    else setMonth(0);
  };
  const handleOnChangeInterest = (e) => {
    if (e.target.value > 100) {
      setInterest(100);
    } else if (e.target.value) setInterest(parseInt(e.target.value).toString());
    else setInterest(0);
  };
  const handleOnChangeMethod = (e) => {
    setMethod(e.target.value);
  };
  const handleSearch = async () => {
    if (!loanAmount && !loanPurpose && !creditScore && !conscious) return;
    const str = `&${loanAmount ? `filters[maximum][$lte]=${loanAmount}` : ""}&${
      loanPurpose ? `filters[debt_purposes][name][$eq]=${loanPurpose}` : ""
    }&${creditScore ? `filters[credit_score][name][$eq]=${creditScore}` : ""}&${
      conscious ? `filters[conscious_lists][name][$eq]=${conscious}` : ""
    }`;

    const result = await getFilterLoanCompanie(str.substring(1), "image");
    setDatas(result?.data?.data);
  };
  return (
    <Layout title={"Ezmoney - Công cụ"}>
      <div className={styles.container}>
        <div className="container">
          <Breadcrumb breadcrumb={breadcrumb} />
          <h1 className={styles.containerTitle}>
            Công cụ tính lãi phải trả cho khoản vay
          </h1>
          <p className={styles.containerText}>
            Công cụ giúp bạn tính lãi phải trả cho khoản vay
          </p>
          <div className={styles.containerInput}>
            <div className={styles.containerInputLeft}>
              <div className={styles.containerInputLeftElement}>
                <p className={styles.containerInputLeftTitle}>Số tiền vay: </p>
                <input
                  className={styles.containerInputLeftMoney}
                  type={"text"}
                  value={currencyFormatNew(loan) || 0}
                  onChange={(e) => handleOnChangeLoan(e)}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
                <p className={styles.containerInputLeftTitle}>VND</p>
              </div>
              <div className={styles.containerInputLeftLine}>
                <input
                  type="range"
                  min="0"
                  max="2000000000"
                  step="500000"
                  value={loan}
                  className={styles.containerInputLeftRanger}
                  onChange={(e) => setLoan(e.target.value)}
                  id="myRangeLoan"
                />
                <div className={styles.containerInputLeftLineNotActive} />
                <div
                  className={styles.containerInputLeftLineActive}
                  style={{
                    width: `${
                      loan <= 0 ? 0 : loan >= 2000000000 ? 100 : loan / 20000000
                    }%`,
                  }}
                />
              </div>

              <div className={styles.containerInputLeftElement}>
                <p className={styles.containerInputLeftTitle}>
                  Thời gian vay:{" "}
                </p>
                <input
                  className={styles.containerInputLeftMoney}
                  value={month}
                  onChange={(e) => handleOnChangeMonth(e)}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
                <p className={styles.containerInputLeftTitle}>tháng</p>
              </div>
              <div className={styles.containerInputLeftLine}>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className={styles.containerInputLeftRanger}
                  id="myRangeMonth"
                />
                <div className={styles.containerInputLeftLineNotActive} />
                <div
                  className={styles.containerInputLeftLineActive}
                  style={{
                    width: `${
                      month <= 0 ? 0 : month >= 300 ? 100 : month / 3
                    }%`,
                  }}
                />
              </div>
              <div className={styles.containerInputLeftElement}>
                <p className={styles.containerInputLeftTitle}>Lãi suất: </p>
                <input
                  className={styles.containerInputLeftMoney}
                  value={interest}
                  onChange={(e) => handleOnChangeInterest(e)}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
                <p className={styles.containerInputLeftTitle}>%</p>
              </div>
              <div className={styles.containerInputLeftLine}>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={styles.containerInputLeftRanger}
                  id="myRangeInterest"
                />
                <div className={styles.containerInputLeftLineNotActive} />
                <div
                  className={styles.containerInputLeftLineActive}
                  style={{
                    width: `${
                      interest <= 0
                        ? 0
                        : interest >= 20
                        ? 100
                        : (interest * 100) / 20
                    }%`,
                  }}
                />
              </div>
              <p className={styles.containerInputLeftCalc}>Phương pháp tính</p>
              <div
                className={styles.containerInputLeftRadio}
                onChange={(e) => handleOnChangeMethod(e)}
              >
                <div className={styles.containerInputLeftRadioElement}>
                  <input
                    type="radio"
                    id="1"
                    name="method"
                    value="1"
                    defaultChecked
                  />
                  <label for="1">Gốc cố định, lãi giảm dần</label>
                </div>
                <div className={styles.containerInputLeftRadioElement}>
                  <input type="radio" id="2" name="method" value="2" />
                  <label for="2">Gốc, lãi chia đều hàng tháng</label>
                </div>
              </div>

              <button
                className={styles.containerInputLeftButton}
                onClick={() => handleCalculator()}
              >
                Tính toán
              </button>
            </div>
            <div className={styles.containerInputRight}>
              <div className={styles.containerInputRightElement}>
                <p className={styles.containerInputRightElementTitle}>
                  Số tiền trả tháng đầu
                </p>
                <p className={styles.containerInputRightElementValue}>
                  {`${currencyFormatMoney(
                    interestResult?.fistMonth || 0,
                    0
                  )} VND`}
                </p>
              </div>
              <div className={styles.containerInputRightElement}>
                <p className={styles.containerInputRightElementTitle}>
                  Tổng lãi phải trả
                </p>
                <p className={styles.containerInputRightElementValue}>
                  {`${currencyFormatMoney(
                    interestResult?.totalIterest || 0,
                    0
                  )} VND`}
                </p>
              </div>
              <div className={styles.containerInputRightElement}>
                <p className={styles.containerInputRightElementTitle}>
                  Tổng số tiền gốc và lãi phải trả
                </p>
                <p className={styles.containerInputRightElementValue}>
                  {`${currencyFormatMoney(interestResult?.total || 0, 0)} VND`}
                </p>
              </div>
            </div>
          </div>
          <h2 className={styles.containerTextResult}>Kết quả lãi vay</h2>
          {<canvas id="myChart" ref={canvasEl} height="100" />}

          <table className={`${styles.containerTable} on-desktop`}>
            <tr className={styles.containerTableHead}>
              <th>Kỳ hạn</th>
              <th>Lãi phải trả</th>
              <th>Gốc phải trả</th>
              <th>Số tiền phải trả</th>
              <th>Số tiền còn lại</th>
            </tr>
            {interestResult?.month
              ?.slice(parseInt(page) * 10, parseInt(page) * 10 + 10)
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      {currencyFormatMoney(
                        interestResult.interest[index + parseInt(page) * 10] ||
                          0,
                        0
                      )}
                    </td>
                    <td>
                      {currencyFormatMoney(
                        interestResult.origin[index + parseInt(page) * 10] || 0,
                        0
                      )}
                    </td>
                    <td>
                      {currencyFormatMoney(
                        interestResult.moneyPay[index + parseInt(page) * 10] ||
                          0,
                        0
                      )}
                    </td>
                    <td>
                      {currencyFormatMoney(
                        interestResult.remainingAmount[
                          index + parseInt(page) * 10
                        ] || 0,
                        0
                      )}
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className={styles.containerMobile}>
            {interestResult?.month
              ?.slice(parseInt(page) * 10, parseInt(page) * 10 + 10)
              .map((item, index) => {
                return (
                  <div className={styles.containerMobileElement} key={index}>
                    <div className="d-flex justify-content-between">
                      <span>Kỳ hạn</span>
                      <span>{item}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Lãi phải trả</span>
                      <span>
                        {currencyFormatMoney(
                          interestResult.interest[
                            index + parseInt(page) * 10
                          ] || 0,
                          0
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Gốc phải trả</span>
                      <span>
                        {currencyFormatMoney(
                          interestResult.origin[index + parseInt(page) * 10] ||
                            0,
                          0
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Số tiền phải trả</span>
                      <span>
                        {currencyFormatMoney(
                          interestResult.moneyPay[
                            index + parseInt(page) * 10
                          ] || 0,
                          0
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Số tiền còn lại</span>
                      <span>
                        {currencyFormatMoney(
                          interestResult.remainingAmount[
                            index + parseInt(page) * 10
                          ] || 0,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.containerPagination}>
            <Pagination
              page={page}
              total={interestResult?.month?.length || 0}
              perPage={10}
              setPage={setPage}
            />
          </div>

          <h2 className={styles.containerTextFind}>
            Tìm khoản vay tốt nhất cho bạn
          </h2>
          <div className={styles.containerMenu} ref={ref}>
            <div className={styles.containerMenuSelect}>
              <div
                className={styles.containerMenuSelectButton}
                onClick={() => {
                  setActive(active === 1 ? 0 : 1);
                }}
              >
                <span className={styles.containerMenuSelectText}>
                  {loanPurpose || "Mục đích vay vốn"}
                </span>
                <div
                  className={`${
                    active === 1
                      ? styles.containerMenuSelectIcon
                      : styles.containerMenuSelectIconActive
                  } backgroundImage`}
                  style={{
                    backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
                  }}
                />
              </div>

              {active === 1 && (
                <div className={styles.containerSeeMore}>
                  {dataLoanPurpose.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.containerSeeMoreElement}
                        onClick={() => {
                          setLoanPurpose(item?.attributes?.name);
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
                      ? styles.containerMenuSelectIcon
                      : styles.containerMenuSelectIconActive
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
              <div className={styles.containerMenuSelectButton}>
                <input
                  type={"number"}
                  placeholder={"Số lượng vay"}
                  className={styles.containerMenuSelectInput}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
                {/* <span className={styles.containerMenuSelectText}>
                  {loanAmount || "Số lượng vay"}
                </span> */}
              </div>
            </div>
            <div className={styles.containerMenuSelect}>
              <div
                className={styles.containerMenuSelectButton}
                onClick={() => {
                  setActive(active === 3 ? 0 : 3);
                }}
              >
                <span className={styles.containerMenuSelectText}>
                  {creditScore || "Điểm tín dụng"}
                </span>
                <div
                  className={`${
                    active === 3
                      ? styles.containerMenuSelectIcon
                      : styles.containerMenuSelectIconActive
                  } backgroundImage`}
                  style={{
                    backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
                  }}
                />
              </div>
              {active === 3 && (
                <div className={styles.containerSeeMore}>
                  {dataCreditScore.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.containerSeeMoreElement}
                        onClick={() => {
                          setCreditScore(item?.attributes?.name);
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
          <table className={styles.containerTableNew}>
            <tr className={styles.containerTableNewHead}>
              <th>Đối tác cho vay</th>
              <th>Lãi suất hàng năm</th>
              <th>Thời gian</th>
              <th className={styles.containerTableNewBorder}>Hạn mức tối đa</th>
              <th className="on-desktop"></th>
            </tr>
            {datas?.map((item, index) => {
              return (
                <>
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? styles.containerTableNewWhite
                        : styles.containerTableNewGrey
                    }
                  >
                    <td>
                      <img
                        src={item?.attributes?.image?.data?.attributes?.url}
                        alt={item?.attributes?.image?.data?.attributes?.name}
                        className={styles.containerTableNewImage}
                      />
                    </td>
                    <td>{item?.attributes?.annualInterest}%</td>
                    <td>{item?.attributes?.time}</td>
                    <td>{currencyFormatNew(item?.attributes?.maximum)}</td>
                    <td className="on-desktop">
                      <a
                        className={styles.containerTableNewButton}
                        href={item?.attributes?.link}
                        target="_blank"
                      >
                        Xem chi tiết
                      </a>
                    </td>
                  </tr>
                  <tr
                    className={`${
                      index % 2 === 0
                        ? styles.containerTableNewWhite
                        : styles.containerTableNewGrey
                    } ${styles.containerTableNewMobile}`}
                  >
                    <td colSpan={4}>
                      <a
                        className={styles.containerTableNewButton}
                        href={item?.attributes?.link}
                        target="_blank"
                      >
                        Xem chi tiết
                      </a>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </div>
      <BlogRelated
        title={"Blog về vay tiền"}
        category={"vay-tien"}
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
export default CalculateInterest;
