import React from "react";
import styles from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
function Banner(props) {
  const { title } = props;
  const breadcrumb = [
    {
      href: "/tin-tuc",
      title: "Chỉ dẫn và Tips",
    },
    {
      href: `#`,
      // title: router.query.slug,
      title: title,
    },
  ];
  return (
    <div id="BannerBlog" className={styles.BannerBlog}>
      <div style={{ backgroundColor: "#E8F3F3" }}>
        <div className={`container`}>
          <div className={styles.breadcrumb}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </div>
          <h1 className={styles.title}>{title || "Bài viết mới"}</h1>
        </div>
      </div>
    </div>
  );
}
export default Banner;
