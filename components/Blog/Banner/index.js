import React from "react";
import style from "./style/style.module.scss";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getHomePageSetting } from "stores/pageSetting";
function Banner() {
  const breadcrumb = [
    {
      href: "/tin-tuc",
      title: "Chỉ dẫn và Tips",
    },
  ];
  const [dataBanner, setDataBanner] = React.useState();
  React.useEffect(async () => {
    const result = await getHomePageSetting();
    setDataBanner(result?.data?.data);
  }, []);
  return (
    <div id="BannerBlog" className={style.BannerBlog}>
      <div style={{ backgroundColor: "#E8F3F3" }}>
        <div className={`container ${style.container}`}>
          <div className={style.breadcrumb}>
            <Breadcrumb breadcrumb={breadcrumb} />
          </div>
          <h2 className={style.title}>{dataBanner?.attributes?.title}</h2>
          <p className={style.description}>
            {dataBanner?.attributes?.subTitle}
          </p>
        </div>
      </div>
      <div className={style.mobileBreadcrumb}>
        <Breadcrumb breadcrumb={breadcrumb} />
      </div>
      <h1 className={style.mainTitle}>Bạn quan tâm</h1>
    </div>
  );
}
export default Banner;
