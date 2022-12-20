import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import styles from "./style/style.module.scss";
const BannerContact = () => {
  const breadcrumb = [
    {
      href: "/lien-he",
      title: "Liên hệ",
    },
  ];
  return (
    <div className={styles.background}>
      <div className="container">
        <Breadcrumb breadcrumb={breadcrumb} />
        <h1 className={styles.titleBanner}>LIÊN HỆ</h1>
      </div>
    </div>
  );
};

export default BannerContact;
