import React from "react";
import styles from "./style/style.module.scss";
import router from "next/router";
import { getInfoContact, sendInfoContact } from "stores/contact";

const aboutUSs = {
  name: "Về chúng tôi",
  values: [
    {
      label: "Câu chuyện đằng sau ezmoney.vn",
      link_url: "/gioi-thieu",
    },
    {
      label: "Sứ mệnh và tầm nhìn",
      link_url: "/gioi-thieu/#MissionIntroduce",
    },
    {
      label: "Đội ngũ",
      link_url: "/gioi-thieu/#OurTeamIntroduce",
    },
    // {
    //   label: "Cơ hội nghề nghiệp",
    //   link_url: "#",
    // },
    // {
    //   label: "Phương châm hoạt động",
    //   link_url: "#",
    // },

    // {
    //   label: " Thỏa thuận sử dụng",
    //   link_url: "#",
    // },
    // {
    //   label: "Chính sách bảo mật",
    //   link_url: "#",
    // },
    {
      label: "Danh sách đối tác, nhà đầu tư",
      link_url: "/gioi-thieu/#OurPartners",
    },
  ],
};
const license = {
  name: "Giấy phép hoạt động",
  values: [
    {
      label:
        "Đăng kí kinh doanh tại: Thôn Cầu Giữa, Xã Yên Phụ, Huyện Yên Phong, Tỉnh Bắc Ninh",
    },
    {
      label: "Giấy phép kinh doanh: 2301214432",
    },
    {
      label: "Lĩnh vực: Cổng thông tin",
    },
    {
      label: "Giấy phép hoạt động số ......",
    },
    {
      label: "Nội dung trên ezmoney.vn được bảo vệ bởi",
      image: "/images/dcma.png",
    },
  ],
};
const contact = {
  name: "Liên hệ",
  values: [
    {
      label: "Công ty cổ phần Econ 101",
    },
    {
      label:
        "VP đại diện: Thôn Cầu Giữa, Xã Yên Phụ, Huyện Yên Phong, Tỉnh Bắc Ninh",
    },
    {
      label: "Liên hệ đối tác: business@ezmoney.vn",
    },
    {
      label: "Giải đáp thắc mắc: infor@ezmoney.vn",
    },
  ],
};
const Footer = () => {
  const [aboutUs, setAboutUs] = React.useState(true);
  const [contactNow, setContactNow] = React.useState(true);
  const [info, setInfo] = React.useState();
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (/\S+@\S+\.\S+/.test(e.target.email.value))
      await sendInfoContact({
        data: {
          email: e.target.email.value,
        },
      });
  };
  React.useEffect(async () => {
    const result = await getInfoContact();
    setInfo(result);
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.containerElementDesktop}>
          <span className={styles.containerTitle}>VỀ CHÚNG TÔI</span>
          <div>
            {aboutUSs.values.map((item, index) => {
              return (
                <a
                  href={item.link_url || '/'}
                  key={index}
                  className={`d-flex ${styles.textFooter}`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.containerElementMobile}>
          <div
            className={styles.titleMobile}
            onClick={() => setAboutUs(!aboutUs)}
          >
            <span className={styles.containerTitle}>Về chúng tôi</span>
            <div
              className={`${styles.imageDown} ${
                aboutUs && "rotate-image"
              } background-image`}
              style={{
                backgroundImage: `url("/icons/ic-down-white.svg")`,
              }}
            />
          </div>
          <div
            className={`${styles.containerElementDetailMobile}  ${
              aboutUs ? styles.active : ""
            }`}
          >
            {aboutUSs.values.map((item, index) => {
              return (
                <a
                  onClick={() => router.push(item.link_url)}
                  key={index}
                  className={`d-flex ${styles.textFooter}`}
                  href={'#'}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.containerElement}>
          <span className={styles.containerTitle}>GIẤY PHÉP HOẠT ĐỘNG</span>
          {license.values.map((item, index) => {
            return (
              <div key={index}>
                <p className={`d-flex ${styles.textFooter}`}>{item.label}</p>
                {item?.image && (
                  <div
                    className={`${styles.imageLisence} background-image`}
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.containerElementDesktop}>
          <span className={styles.containerTitle}>LIÊN HỆ</span>
          {contact.values.map((item, index) => {
            return (
              <p key={index} className={`d-flex ${styles.textFooter}`}>
                {item.label}
              </p>
            );
          })}
        </div>
        <div className={styles.containerElementMobile}>
          <div
            className={styles.titleMobile}
            onClick={() => setContactNow(!contactNow)}
          >
            <span className={styles.containerTitle}>Liên hệ</span>
            <div
              className={`${styles.imageDown} ${
                contactNow && "rotate-image"
              } background-image`}
              style={{
                backgroundImage: `url("/icons/ic-down-white.svg")`,
              }}
            />
          </div>
          <div
            className={`${styles.containerElementDetailMobile}  ${
              contactNow ? styles.active : ""
            }`}
          >
            {contact.values.map((item, index) => {
              return (
                <p key={index} className={`d-flex ${styles.textFooter}`}>
                  {item.label}
                </p>
              );
            })}
          </div>
        </div>
        <div className={styles.containerElement}>
          <span
            className={`${styles.containerTitle} ${styles.containerTitleSmall}`}
          >
            TRỢ GIÚP
          </span>
          <p
            className={`d-flex ${styles.textFooter} ${styles.textFooterSmall}`}
          >
            Hotline: 0969430499
          </p>
          <p
            className={`d-flex ${styles.textFooter} ${styles.textFooterSmall}`}
          >
            Chat now
          </p>
          <div
            className={`d-flex align-items-center `}
            style={{ marginTop: "10px" }}
          >
            <p
              className={`d-flex ${styles.textFooterSmall}`}
              style={{
                color: "#FFFFFF",
                marginRight: "18px",
              }}
            >
              Cộng đồng:
            </p>
            <a
              href={info?.data?.attributes?.facebook || "https://facebook.com"}
            >
              <div
                className={`${styles.logoContact} background-image`}
                style={{
                  backgroundImage: "url('/icons/ic-facebook.svg')",
                }}
              />
            </a>
            <a href={info?.data?.attributes?.youtube || "https://youtube.com"}>
              <div
                className={`${styles.logoContact} background-image`}
                style={{
                  backgroundImage: "url('/icons/ic-youtube.svg')",
                }}
              />
            </a>
            <a href={info?.data?.attributes?.twitter || "https://twitter.com"}>
              <div
                className={`${styles.logoContact} background-image`}
                style={{
                  backgroundImage: "url('/icons/ic-twitter.svg')",
                }}
              />
            </a>
            <a
              href={info?.data?.attributes?.tiktok || "https://www.tiktok.com"}
            >
              <div
                className={`${styles.logoContact} background-image`}
                style={{
                  backgroundImage: "url('/icons/ic-tiktok.svg')",
                }}
              />
            </a>
          </div>
          <div className={`${styles.containerDownloadApp} ${styles.onMobile}`}>
            <span className={styles.containerDownloadAppText}>
              TẢI ỨNG DỤNG
            </span>
            <div
              className={`${styles.containerDownloadAppImage} background-image`}
              style={{
                backgroundImage: "url('/images/down-appstore.png')",
              }}
            />
            <div
              className={`${styles.containerDownloadAppImage} background-image`}
              style={{
                backgroundImage: "url('/images/down-google.png')",
              }}
            />
          </div>
          <div className={styles.textContact}>
            Đăng ký nhận tin tức mới nhất
          </div>
          <form
            className={styles.contactForm}
            onSubmit={(e) => handleSubmitContact(e)}
          >
            <div style={{ flex: "1" }}>
              <label htmlFor="email">
                <input
                  id="email"
                  placeholder={"Email của bạn"}
                  type="text"
                  className={styles.textPlaceholder}
                  required
                />
              </label>
            </div>
            <button type="submit" className={styles.buttonSubmit}>
              <div
                className={`${styles.logoTelegram} background-image`}
                style={{
                  backgroundImage: "url('/icons/ic-telegram.svg')",
                }}
              />
            </button>
          </form>
        </div>
      </div>
      <div className={`${styles.containerLine} on-desktop`} />
      <div className={`${styles.containerDownloadApp} on-desktop`}>
        <span className={styles.containerDownloadAppText}>
          Tải ứng dụng EZMONEY
        </span>
        <a href="https://play.google.com/">
          <div
            className={`${styles.containerDownloadAppImage} background-image`}
            style={{
              backgroundImage: "url('/images/down-appstore.png')",
            }}
          />
        </a>
        <a href="https://www.apple.com/app-store/">
          <div
            className={`${styles.containerDownloadAppImage} background-image`}
            style={{
              backgroundImage: "url('/images/down-google.png')",
            }}
          />
        </a>
      </div>
      <div
        className={`${styles.containerCopyright} d-flex align-items-center justify-content-between`}
      >
        <p className={styles.copyright}>@Bản quyền thuộc về ezmoney.vn </p>
      </div>
    </footer>
  );
};

export default Footer;
