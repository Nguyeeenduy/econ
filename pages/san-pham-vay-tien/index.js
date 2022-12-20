import React, { useRef } from "react";
import Layout from "@/components/_App/Layout";
import Breadcrumb from "@/components/Common/Breadcrumb";
import styles from "./style/style.module.scss";
import Advertiser from "@/components/Common/Advertiser";
import { currencyFormatMoney, currencyFormatNew } from "@/utils/formatMoney";
import Image from "next/image";
import Slider from "react-slick";
import Pagination from "@/components/Common/Pagination";
import { useRouter } from "next/router";
import { Chart } from "chart.js/auto";
import { pmt } from "@/utils/calculator";
import Advertisement from "@/components/Common/Advertisement";
import ReactTooltip from "react-tooltip";
import Rating from "@/components/Common/Rating";
import { getListBlogs } from "stores/blog";
import BlogRelated from "@/components/Common/BlogRelated";
const LoanPoducts = () => {
  const breadcrumb = [
    {
      href: "#",
      title: "Vay tiền",
    },
  ];
  const datas = [
    {
      title: "Bước 1",
      description:
        "The body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work. \nThe body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work.",
    },
    {
      title: "Bước 2",
      description:
        "The body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work. \nThe body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work.",
    },
    {
      title: "Bước 3",
      description:
        "The body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work. \nThe body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work.",
    },
    {
      title: "Bước 4",
      description:
        "The body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work. \nThe body text or body copy is the text forming the main content of a book, magazine, web page, or any other printed or digital work.",
    },
    {
      title: "Bước 5",
      description:
        "The body text or body copy is the text forming the main content of a book, magazine",
    },
  ];
  const data = [
    {
      id: 1,
      title: "Tìm Ngân hàng/Tổ chức tài chính",
      url: null,
      image: {
        data: {
          id: 77,
          attributes: {
            name: "ic_bank_building_6c2df639f5.svg",
            alternativeText: "ic_bank_building_6c2df639f5.svg",
            caption: "ic_bank_building_6c2df639f5.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "ic_bank_building_6c2df639f5_64187f6325",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 1.56,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/ic_bank_building_6c2df639f5_64187f6325.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T11:53:48.825Z",
            updatedAt: "2022-11-16T12:32:05.938Z",
          },
        },
      },
    },
    {
      id: 5,
      title: "Tìm ATM",
      url: "/cong-cu/tim-kiem-atm",
      image: {
        data: {
          id: 89,
          attributes: {
            name: "fluent-emoji-high-contrast_atm-sign.svg",
            alternativeText: "fluent-emoji-high-contrast_atm-sign.svg",
            caption: "fluent-emoji-high-contrast_atm-sign.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "fluent_emoji_high_contrast_atm_sign_2e7763f2dd",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 3.29,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/fluent_emoji_high_contrast_atm_sign_2e7763f2dd.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:55.507Z",
            updatedAt: "2022-11-08T14:05:55.507Z",
          },
        },
      },
    },
    {
      id: 2,
      title: "Tính lãi tiền gửi tiết kiệm",
      url: null,
      image: {
        data: {
          id: 80,
          attributes: {
            name: "simple-line-icons_calculator.svg",
            alternativeText: "simple-line-icons_calculator.svg",
            caption: "simple-line-icons_calculator.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "simple_line_icons_calculator_99b9ebf630",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 2.01,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/simple_line_icons_calculator_99b9ebf630.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:54.782Z",
            updatedAt: "2022-11-08T14:05:54.782Z",
          },
        },
      },
    },
    {
      id: 4,
      title: "Giá vàng",
      url: "/cong-cu/gia-vang",
      image: {
        data: {
          id: 87,
          attributes: {
            name: "uit_gold.svg",
            alternativeText: "uit_gold.svg",
            caption: "uit_gold.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "uit_gold_632fdf6202",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 1.12,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/uit_gold_632fdf6202.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:55.448Z",
            updatedAt: "2022-11-08T14:05:55.448Z",
          },
        },
      },
    },
    {
      id: 3,
      title: "Ước tính số tiền có thể vay",
      url: "/cong-cu/tinh-lai-khoan-vay",
      image: {
        data: {
          id: 92,
          attributes: {
            name: "fluent_money-calculator-20-regular.svg",
            alternativeText: "fluent_money-calculator-20-regular.svg",
            caption: "fluent_money-calculator-20-regular.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "fluent_money_calculator_20_regular_8c4da5d7f0",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 4.97,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/fluent_money_calculator_20_regular_8c4da5d7f0.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:56.160Z",
            updatedAt: "2022-11-08T14:05:56.160Z",
          },
        },
      },
    },
    {
      id: 8,
      title: "Tỉnh tỷ giá ngoại tệ",
      url: "/cong-cu/ti-gia-ngoai-te",
      image: {
        data: {
          id: 88,
          attributes: {
            name: "fluent_currency-dollar-euro-24-regular.svg",
            alternativeText: "fluent_currency-dollar-euro-24-regular.svg",
            caption: "fluent_currency-dollar-euro-24-regular.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "fluent_currency_dollar_euro_24_regular_ce7ff38968",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 4.73,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/fluent_currency_dollar_euro_24_regular_ce7ff38968.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:55.464Z",
            updatedAt: "2022-11-08T14:05:55.464Z",
          },
        },
      },
    },
    {
      id: 6,
      title: "Ước tính số tiền vay phải trả hàng tháng",
      url: "/cong-cu/tinh-lai-khoan-vay",
      image: {
        data: {
          id: 91,
          attributes: {
            name: "fluent_money-hand-20-regular.svg",
            alternativeText: "fluent_money-hand-20-regular.svg",
            caption: "fluent_money-hand-20-regular.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "fluent_money_hand_20_regular_4bf63b02bb",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 3.85,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/fluent_money_hand_20_regular_4bf63b02bb.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:56.041Z",
            updatedAt: "2022-11-08T14:05:56.041Z",
          },
        },
      },
    },
    {
      id: 7,
      title: "Công ty bảo hiểm",
      url: null,
      image: {
        data: {
          id: 86,
          attributes: {
            name: "icon-park-outline_protect.svg",
            alternativeText: "icon-park-outline_protect.svg",
            caption: "icon-park-outline_protect.svg",
            width: 70,
            height: 70,
            formats: null,
            hash: "icon_park_outline_protect_dd5e8ea5e0",
            ext: ".svg",
            mime: "image/svg+xml",
            size: 0.56,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/icon_park_outline_protect_dd5e8ea5e0.svg",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-08T14:05:55.414Z",
            updatedAt: "2022-11-12T11:36:58.362Z",
          },
        },
      },
    },
  ];
  const dataProduct = {
    id: 9,
    attributes: {
      name: "Thẻ tín dụng Vietcombank Visa Chuẩn",
      confirm: false,
      favourite: 600,
      rating: 4,
      endow: "<p>Giảm giá 10% khi đăng ký ở Ezmoney</p>",
      createdAt: "2022-11-22T07:05:20.776Z",
      updatedAt: "2022-12-13T10:32:12.972Z",
      publishedAt: "2022-11-22T07:05:23.117Z",
      slug: "the-tin-dung-vietcombank-visa-chuan-1",
      review: "Good",
      parent:
        "Best for: Long-term value: 0% periods for transfers and purchases + bonus cash back",
      comments: null,
      advantages: "<p>Giảm giá 10% khi đăng ký ở Ezmoney</p>",
      details: "<p>Giảm giá 10% khi đăng ký ở Ezmoney</p>",
      openAt: "Trên trang chủ Vietcombank",
      link: "https://vietcombank.com",
      image: {
        data: {
          id: 184,
          attributes: {
            name: "image 42 (1).png",
            alternativeText: "image 42 (1).png",
            caption: "image 42 (1).png",
            width: 237,
            height: 148,
            formats: null,
            hash: "image_42_1_dae7f51aaa",
            ext: ".png",
            mime: "image/png",
            size: 38.89,
            url: "https://econ101-storage.s3.ap-southeast-1.amazonaws.com/image_42_1_dae7f51aaa.png",
            previewUrl: null,
            provider: "aws-s3",
            provider_metadata: null,
            createdAt: "2022-11-22T07:05:00.149Z",
            updatedAt: "2022-11-22T07:05:00.149Z",
          },
        },
      },
      Criterias: [
        {
          id: 21,
          criteriaName: "TIÊU CHÍ 1",
          suggestion: "TIÊU CHÍ 1",
          value:
            "Lorem ipsum dolor sit amet consectetur. Ipsum ac nunc adipiscing sodales ipsum neque magna lacus.",
        },
        {
          id: 22,
          criteriaName: "TIÊU CHÍ 1",
          suggestion: "TIÊU CHÍ 1",
          value:
            "Lorem ipsum dolor sit amet consectetur. Ipsum ac nunc adipiscing sodales ipsum neque magna lacus.",
        },
        {
          id: 23,
          criteriaName: "TIÊU CHÍ 1",
          suggestion: "TIÊU CHÍ 1",
          value:
            "Lorem ipsum dolor sit amet consectetur. Ipsum ac nunc adipiscing sodales ipsum neque magna lacus.",
        },
        {
          id: 24,
          criteriaName: "TIÊU CHÍ 1",
          suggestion: "TIÊU CHÍ 1",
          value:
            "Lorem ipsum dolor sit amet consectetur. Ipsum ac nunc adipiscing sodales ipsum neque magna lacus.",
        },
      ],
    },
  };
  const fakeData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundImage: `url('/images/img-next.png')`,
        }}
        onClick={onClick}
      />
    );
  }
  const [activeDescription, setActiveDescription] = React.useState(null);
  const [activeProduct, setActiveProduct] = React.useState(null);
  const [dataCompares, setDataCompares] = React.useState([]);
  const [dataBlog, setDataBlog] = React.useState();
  const handleCheck = (val) => {
    return dataCompares.some((item) => item?.id === val?.id);
  };
  React.useEffect(async () => {
    ReactTooltip.rebuild();
    let data = JSON.parse(localStorage.getItem("compare"));
    if (data) setDataCompares(data);
    const result = await getListBlogs(0, 4, "image, category_lists");
    setDataBlog(result?.data?.data);
  }, []);
  const contents = [
    {
      id: 1,
      title: "Ưu nhược điểm sản phẩm",
      label: "advantages",
    },
    {
      id: 2,
      title: "Chi tiết [sản phẩm]",
      label: "details",
    },
    {
      id: 3,
      title: "Ưu đãi khi đăng ký ở Ezmoney",
      label: "endow",
    },
  ];
  const handleActiveDescription = (idProduct, idDescription) => {
    if (activeProduct !== idProduct) {
      setActiveProduct(idProduct);
      if (activeDescription !== idDescription) {
        setActiveDescription(idDescription);
      }
    } else {
      if (activeDescription !== idDescription) {
        setActiveDescription(idDescription);
      } else {
        setActiveDescription(null);
        setActiveProduct(null);
      }
    }
  };
  const handleAddCompare = (e, item) => {
    let data = JSON.parse(localStorage.getItem("compare"));
    if (e.target.checked) {
      if (data) {
        data.push(item);
      } else data = [item];
      setDataCompares([...data]);
      localStorage.setItem("compare", JSON.stringify(data));
    } else if (data) {
      let datas = data.filter((d) => d.id != item.id);
      setDataCompares([...datas]);
      localStorage.setItem("compare", JSON.stringify(datas));
    }
  };
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          backgroundImage: `url('/images/img-pre.png')`,
        }}
        onClick={onClick}
      />
    );
  }
  const settingCares = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    dots: true,
    customPaging: function () {
      return <div className="custom-paging"></div>;
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    customPaging: function () {
      return <div className="custom-paging"></div>;
    },
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
        customPaging: function () {
          return <div className="custom-paging"></div>;
        },
      },
    ],
  };
  const [amount, setAmount] = React.useState(0);
  const [period, setPeriod] = React.useState(0);
  const [loan, setLoan] = React.useState(0);
  const [month, setMonth] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const [method, setMethod] = React.useState(1);
  const [interestResult, setInterestResult] = React.useState();
  const canvasEl = useRef(null);
  const router = useRouter();
  const [page, setPage] = React.useState(0);
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
  const handleOnChangeAmount = (e) => {
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
  const handleOnChangePeriod = (e) => {
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
  return (
    <Layout
      title={"Ezmoney - Sản phẩm vay tiền"}
      dataCompares={dataCompares}
      setDataCompares={setDataCompares}
    >
      <div className={`container ${styles.head}`}>
        <Breadcrumb breadcrumb={breadcrumb} />
        <Advertiser />
        <h1 className={styles.headTitle}>
          Top những ngân hàng cho vay sản xuất - kinh doanh tháng 11, 2022
        </h1>
      </div>
      <div className={`container ${styles.menu}`}>
        <div className={styles.menuContainer}>
          <a className={styles.menuElement} href={"#tim-khoan-vay-phu-hop"}>
            Tìm khoản vay phù hợp
          </a>
          <a className={styles.menuElement} href={"#thu-tuc-vay-tien"}>
            Thủ tục vay tiền
          </a>
          <a className={styles.menuElement} href={"#tinh-lai-vay"}>
            Tính lãi vay
          </a>
        </div>
      </div>
      <div className={`container`}>
        <div className={styles.filter}>
          <div className={styles.filterContainer}>
            <div className={styles.filterContainerElement}>
              <div className={styles.filterContainerHead}>
                <p className={styles.filterContainerTitle}>Số tiền vay: </p>
                <input
                  className={styles.filterContainerMoney}
                  type={"text"}
                  value={currencyFormatNew(amount) || 0}
                  onChange={(e) => handleOnChangeAmount(e)}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
                <p className={styles.filterContainerTitle}>VND</p>
              </div>
              <div className={styles.filterContainerLine}>
                <input
                  type="range"
                  min="0"
                  max="2000000000"
                  step="500000"
                  value={amount}
                  className={styles.filterContainerRanger}
                  onChange={(e) => setAmount(e.target.value)}
                  id="myRangeLoan"
                />
                <div className={styles.filterContainerLineNotActive} />
                <div
                  className={styles.filterContainerLineActive}
                  style={{
                    width: `${
                      amount <= 0
                        ? 0
                        : amount >= 2000000000
                        ? 100
                        : amount / 20000000
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className={styles.filterContainerElement}>
              <div className={styles.filterContainerHead}>
                <p className={styles.filterContainerTitle}>Kỳ hạn: </p>
                <input
                  className={styles.filterContainerMoney}
                  type={"text"}
                  value={currencyFormatNew(period) || 0}
                  onChange={(e) => handleOnChangePeriod(e)}
                  onKeyDown={(e) =>
                    exceptThisSymbols.includes(e.key) && e.preventDefault()
                  }
                />
                <p className={styles.filterContainerTitle}>tháng</p>
              </div>
              <div className={styles.filterContainerLine}>
                <input
                  type="range"
                  min="0"
                  max="300"
                  value={period}
                  className={styles.filterContainerRanger}
                  onChange={(e) => setPeriod(e.target.value)}
                  id="myRangeLoan"
                />
                <div className={styles.filterContainerLineNotActive} />
                <div
                  className={styles.filterContainerLineActive}
                  style={{
                    width: `${
                      period <= 0 ? 0 : period >= 300 ? 100 : period / 3
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className={styles.filterContainerButton}>
              <button className={styles.filterContainerButtonIn}>
                Tìm kiếm
              </button>
              <button className={styles.filterContainerButtonOut}>
                Chọn lại
              </button>
            </div>
          </div>
          <div className={styles.filterAdvance}>
            <p>Nâng cao</p>
            <div
              className={`${styles.filterAdvanceIcon} backgroundImage`}
              style={{
                backgroundImage: "url('/icons/ic-arrow-down-black.svg')",
              }}
            />
          </div>
        </div>
        <div className={styles.survey}>
          <div className={`${styles.surveyContent}`}>
            <div className={`${styles.surveyImage}`}>
              <div
                className={`${styles.image} background-image`}
                style={{
                  backgroundImage: `url("/images/img-credit.png")`,
                }}
              />
            </div>
            <div className={styles.surveyText}>
              <h2 className={styles.title}>Tìm sản phẩm phù hợp với bạn</h2>
              <p className={styles.subTitle}>
                Hãy trả lời những câu hỏi sau đây, để Ezmoney giúp bạn tìm sản
                phẩm phù hợp nhất nhé
              </p>
            </div>
          </div>
          <button
            className={`button ${styles.surveyStart}`}
            onClick={() => router.push("/tu-van")}
          >
            Bắt đầu ngay
          </button>
        </div>
        <div className={styles.sort}>
          <p className={styles.sortLeft}>Có xxx sản phẩm</p>
          <div className={styles.sortRight}>
            <span className={styles.sortRightText}>Sắp xếp</span>
            <div
              className={`${styles.sortRightIcon} background-image`}
              style={{
                backgroundImage: `url("/icons/ic-sort.svg")`,
              }}
            />
          </div>
        </div>
        {fakeData?.map((item, index) => {
          return (
            <div className={styles.containerCredit} key={index}>
              <div className={styles.containerCreditHead}>
                <p className={styles.containerCreditHeadText}>
                  {dataProduct?.attributes?.parent}
                </p>
                <div className={`${styles.containerCheckbox}`}>
                  <div className={styles.checkboxInput}>
                    <input
                      type="checkbox"
                      className="checkbox-input"
                      id={`checkbox${index}`}
                      defaultChecked={handleCheck(dataProduct)}
                      onChange={(e) => handleAddCompare(e, dataProduct)}
                    />
                    <label htmlFor={`checkbox${index}`}>
                      <span className="checkbox"></span>
                    </label>
                  </div>
                  <p className={styles.checkboxContent}> Thêm vào so sánh</p>
                </div>
              </div>
              <div
                className={styles.onMobile}
                onClick={() =>
                  router.push(
                    `/chi-tiet-san-pham/${dataProduct?.attributes?.slug}`
                  )
                }
              >
                <h2>{dataProduct?.attributes?.name}</h2>
                <div className={`d-flex ${styles.containerIcon}`}>
                  <div
                    data-tip={
                      dataProduct?.attributes?.confirm
                        ? "Sản phẩm được nhà nước công nhận"
                        : "Sản phẩm chưa được nhà nước công nhận"
                    }
                    onMouseEnter={() => {
                      ReactTooltip.rebuild();
                    }}
                    className="background-image"
                    style={{
                      backgroundImage: `${
                        dataProduct?.attributes?.confirm
                          ? "url('/icons/ic-check-circle.svg')"
                          : "url('/icons/ic-check-circle-grey.svg')"
                      }`,
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <div
                    data-tip={
                      dataProduct?.attributes?.favourite >= 1000
                        ? "Sản phẩm được nhiều người ưa thích"
                        : "Sản phẩm chưa có nhiều lượt thích"
                    }
                    onMouseEnter={() => {
                      ReactTooltip.rebuild();
                    }}
                    className="background-image"
                    style={{
                      backgroundImage: `${
                        dataProduct?.attributes?.favourite >= 1000
                          ? "url('/icons/ic-heart.svg')"
                          : "url('/icons/ic-heart-grey.svg')"
                      }`,
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </div>
              </div>
              <div className={styles.containerCreditContent}>
                <div className={styles.containerCreditContentLeft}>
                  <div className={styles.containerCreditContentLeftCreate}>
                    <div
                      className="position-relative"
                      onClick={() =>
                        router.push(
                          `/chi-tiet-san-pham/${dataProduct?.attributes?.slug}`
                        )
                      }
                    >
                      <div
                        className={`background-image ${styles.containerCreditImage}`}
                        style={{
                          backgroundImage: `url(${dataProduct?.attributes?.image?.data?.attributes?.url})`,
                        }}
                      ></div>
                      <div className={styles.containerCreditContentSponsor}>
                        Tài trợ
                      </div>
                    </div>
                    <div className="on-desktop">
                      <button
                        className={`button ${styles.containerCreditContentButton}`}
                        onClick={() =>
                          router.push(
                            dataProduct?.attributes?.link ||
                              "https://portal.vietcombank.com.vn/"
                          )
                        }
                      >
                        Mở thẻ ngay
                      </button>
                      <p
                        className={styles.containerCreditContentLeftCreateText}
                      >
                        {dataProduct?.attributes?.openAt}
                      </p>
                    </div>
                  </div>
                  <div className={styles.containerCreditContentLeftInfo}>
                    <div className="on-desktop">
                      <h2
                        onClick={() =>
                          router.push(
                            `/chi-tiet-san-pham/${dataProduct?.attributes?.slug}`
                          )
                        }
                      >
                        {dataProduct?.attributes?.name}
                      </h2>
                      <div className="d-flex" style={{ gap: "12px" }}>
                        <div
                          data-tip={
                            dataProduct?.attributes?.confirm
                              ? "Sản phẩm được nhà nước công nhận"
                              : "Sản phẩm chưa được nhà nước công nhận"
                          }
                          onMouseEnter={() => {
                            ReactTooltip.rebuild();
                          }}
                          style={{
                            backgroundImage: `${
                              dataProduct?.attributes?.confirm
                                ? "url('/icons/ic-check-circle.svg')"
                                : "url('/icons/ic-check-circle-grey.svg')"
                            }`,
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <div
                          data-tip={
                            dataProduct?.attributes?.favourite >= 1000
                              ? "Sản phẩm được nhiều người ưa thích"
                              : "Sản phẩm chưa có nhiều lượt thích"
                          }
                          onMouseEnter={() => {
                            ReactTooltip.rebuild();
                          }}
                          style={{
                            backgroundImage: `${
                              dataProduct?.attributes?.favourite >= 1000
                                ? "url('/icons/ic-heart.svg')"
                                : "url('/icons/ic-heart-grey.svg')"
                            }`,
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </div>

                    <div className={styles.textRating}>Đánh giá</div>
                    <div className="on-desktop">
                      <Rating
                        size={24}
                        start={dataProduct?.attributes?.rating}
                      />
                    </div>
                    <div className="on-phone">
                      <Rating
                        size={18}
                        start={dataProduct?.attributes?.rating}
                      />
                    </div>

                    <div
                      className={styles.textReview}
                      onClick={() =>
                        router.push(
                          `/chi-tiet-san-pham/${dataProduct?.attributes?.slug}`
                        )
                      }
                    >
                      Review
                    </div>
                  </div>
                </div>
                <div className={styles.onMobileButton}>
                  <button
                    className={`button ${styles.containerCreditContentButton}`}
                    onClick={() =>
                      router.push(
                        item?.attributes?.link ||
                          "https://portal.vietcombank.com.vn/"
                      )
                    }
                  >
                    Mở thẻ ngay
                  </button>
                  <p className={styles.containerCreditContentLeftCreateText}>
                    {dataProduct?.attributes?.openAt}
                  </p>
                </div>
                <div className={styles.containerCreditContentRight}>
                  {dataProduct?.attributes?.Criterias?.map((criteria) => {
                    return (
                      <div
                        className={styles.containerCreditContentRightElement}
                        key={`item_${criteria.id}`}
                      >
                        <div
                          className={styles.containerCreditContentRightElement1}
                        >
                          <div className={styles.textCriteria}>
                            {criteria.criteriaName}
                          </div>
                          <p
                            data-tip={criteria.suggestion}
                            className={`background-image`}
                            style={{
                              backgroundImage:
                                "url('/icons/ic-question-grey.svg')",
                              minWidth: "14px",
                              height: "14px",
                              cursor: "pointer",
                            }}
                            onMouseEnter={() => {
                              ReactTooltip.rebuild();
                            }}
                          />
                        </div>
                        <div
                          className={styles.containerCreditContentRightElement2}
                        >
                          {criteria?.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {contents.map((content, indexContent) => {
                return (
                  <div
                    className={styles.containerCreditOption}
                    key={indexContent}
                    onClick={() => {
                      handleActiveDescription(dataProduct?.id, content?.id);
                    }}
                  >
                    <div className={styles.containerCreditOptionContent}>
                      <span>{content?.title}</span>
                      <div
                        className={`${styles.iconArrowContent} ${
                          activeProduct === dataProduct?.id &&
                          activeDescription === content?.id
                            ? styles.iconArrowContentActive
                            : ""
                        }`}
                        style={{
                          backgroundImage:
                            "url('/icons/ic-arrow-down-black.svg')",
                        }}
                      />
                    </div>
                    <div
                      className={`${styles.creditContent} ${
                        activeProduct === dataProduct?.id &&
                        activeDescription === content.id
                          ? styles.creditContentActive
                          : ""
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: dataProduct?.attributes?.[content.label],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div style={{ backgroundImage: "url('/images/bg-our-services.webp')" }}>
        <div className={`container`}>
          <h2 className={styles.guideTitle}>Hướng dẫn thủ tục vay tiền</h2>
          <div className={styles.guide}>
            {datas?.map((item, index) => {
              return (
                <>
                  <div className={styles.guideElement} key={index}>
                    <h3>{item?.title}</h3>
                    <p>{item?.description}</p>
                  </div>
                  {index !== datas?.length - 1 && (
                    <div className={styles.guideContainImage}>
                      <div
                        className={`${styles.guideImage} background-image`}
                        style={{
                          backgroundImage: "url('/icons/ic-caret.svg')",
                        }}
                      />
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className={`${styles.guideMobile} slider-customer equal-slider`}>
            <Slider {...settings}>
              {datas?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.guideMobileElement} key={index}>
                      <h3>{item?.title}</h3>
                      <p>{item?.description}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className={`container ${styles.care}`}>
        <h2 className={styles.careTitle}>Có thể bạn quan tâm</h2>
        <div className={`container custom-slick-list ${styles.careContainer}`}>
          <div className={`slider-desktop`}>
            <Slider {...settingCares}>
              {data?.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className={styles.careElement}
                      onClick={() => router.push(item?.url || "/")}
                    >
                      <div
                        className={`d-flex align-items-center flex-column ${styles.careWrapper}`}
                      >
                        <div
                          className={`${styles.careIcon} background-image position-relative`}
                        >
                          {item?.image?.data?.attributes?.url && (
                            <Image
                              src={item?.image?.data?.attributes?.url}
                              alt="icon"
                              layout="fill"
                              objectFit="contain"
                            />
                          )}
                        </div>
                        <div
                          className={`d-flex align-items-center ${styles.careText}`}
                        >
                          <h6 className={styles.careName}>{item?.title}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className={styles.containerTitle}>Tính tiền lãi vay</h2>
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
              <p className={styles.containerInputLeftTitle}>Thời gian vay: </p>
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
                  width: `${month <= 0 ? 0 : month >= 300 ? 100 : month / 3}%`,
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
                      interestResult.interest[index + parseInt(page) * 10] || 0,
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
                      interestResult.moneyPay[index + parseInt(page) * 10] || 0,
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
                        interestResult.interest[index + parseInt(page) * 10] ||
                          0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Gốc phải trả</span>
                    <span>
                      {currencyFormatMoney(
                        interestResult.origin[index + parseInt(page) * 10] || 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Số tiền phải trả</span>
                    <span>
                      {currencyFormatMoney(
                        interestResult.moneyPay[index + parseInt(page) * 10] ||
                          0,
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
      </div>
      <h2 className={styles.programTitle}>
        Các chương trình cho sản phẩm nổi bật
      </h2>
      <Advertisement
        // data={dataAdv?.attributes?.image_ad}
        paddingDesktop={"0px 0px 32px 0px"}
        paddingMobile={"0 16px 20px"}
      />
      <BlogRelated
        title={"Những lưu ý khi vay"}
        category={"vay-tien"}
        data={dataBlog}
      />
    </Layout>
  );
};

export default LoanPoducts;
