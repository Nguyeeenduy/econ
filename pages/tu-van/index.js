import React from "react";
import styles from "./style/style.module.scss";
import Layout from "@/components/_App/Layout";
import Breadcrumb from "@/components/Common/Breadcrumb";

const Category = () => {
  const breadcrumb = [
    {
      href: "/tu-van",
      title: "Tư vấn",
    },
  ];
  return (
    <Layout title={"Ezmoney - Tư -vấn"}>
      <div className={styles.banner}>
        <div style={{ backgroundColor: "#E8F3F3" }}>
          <div className={`container`}>
            <div className={styles.breadcrumb}>
              <Breadcrumb breadcrumb={breadcrumb} />
            </div>
            <h1 className={styles.title}>Tư vấn</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
