import React from "react";
import styles from "./style/style.module.scss";
const SecurityIntroduce = ({ data }) => {
  const listSecurity = [
    {
      image: "/images/img-security-1.png",
      description: "256-bit Secure Sockets Layer",
    },
    {
      image: "/images/img-security-2.png",
      description: "Ngăn chặn thông tin thay đổi",
    },
    {
      image: "/images/img-security-3.png",
      description: "Mã hoá dữ liệu",
    },
    {
      image: "/images/img-security-4.png",
      description: "Cấu trúc DMZ phòng tránh tấn công",
    },
    {
      image: "/images/img-security-5.png",
      description: "Kiểm tra tính bảo mật của hệ thống bởi CMC",
    },
  ];
  return (
    <div id="SecurityIntroduce">
      <div className={styles.securityIntroduce}>
        <div className="container">
          <div className={styles.securityContainer}>
            <div className={styles.securityHeader}>
              <div className={styles.securityHeaderIntro}>
                <div className={styles.securityHeaderBar} />
                <span>OUR PARTNERS</span>
                <div className={styles.securityHeaderBar} />
              </div>
              <h2 className={styles.securityHeaderTitle}>
                Thông tin của bạn sẽ luôn được bảo vệ
              </h2>
            </div>
            <div className={styles.securityBody}>
              {data?.guards?.map((item, index) => (
                <div className={styles.securityBodyItem} key={index}>
                  <div
                    className={`${styles.securityBodyItemImage} background-image`}
                    style={{
                      backgroundImage: `url("${item?.image?.data?.attributes?.url}")`,
                    }}
                  />
                  <span className={styles.securityBodyItemDescription}>
                    {item?.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIntroduce;
