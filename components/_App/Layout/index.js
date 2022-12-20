import React from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";
import FooterMobile from "../FooterMobile";
import Fixed from "../Fixed";
import ModalCompare from "@/components/Modal/ModalCompare";
import { addScrollBar, removeScrollBar } from "@/utils/scrollBar";
import { getListTop10Ezchoices } from "stores/pageSetting";
const Layout = ({
  children,
  title,
  activeFooter,
  dataCompares,
  setDataCompares,
  seo,
}) => {
  const [modalCompare, setModalCompare] = React.useState(false);
  const [dataCompare, setDataCompare] = React.useState([]);
  const [active, setActive] = React.useState(activeFooter);
  const [menu, setMenu] = React.useState(0);
  const [top10s, setTop10s] = React.useState();
  React.useEffect(async () => {
    function getNumberCompare() {
      const compare = JSON.parse(localStorage.getItem("compare"));
      if (compare) {
        setDataCompare(compare);
      }
    }
    getNumberCompare();
    const result = await getListTop10Ezchoices();
    setTop10s(result?.data?.data);
  }, []);
  const handleOpenModalCompare = () => {
    if (modalCompare) removeScrollBar();
    else addScrollBar();
    setModalCompare(!modalCompare);
  };
  const metaFacebook = seo?.metaSocial?.find(
    (item) => item.socialNetwork === "Facebook"
  );
  const metaTwitter = seo?.metaSocial?.find(
    (item) => item.socialNetwork === "Twitter"
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content={`${
            seo?.metaViewport
              ? seo?.metaViewport
              : "width=device-width, initial-scale=1"
          }`}
        />
        <meta
          name="keywords"
          content={`${seo?.keywords ? seo?.keywords : "ezmoney"}`}
        />
        <meta
          name="title"
          content={`${seo?.metaTitle ? seo?.metaTitle : "ezmoney"}`}
        />
        <meta
          name="description"
          content={`${
            seo?.metaDescription ? seo?.metaDescription : "this is a page blog"
          }`}
        />
        {/* <meta
          name="AdsBot-Google"
          content={`${seo?.metaRobots ? seo?.metaRobots : "noindex"}`}
        ></meta> */}
        <meta
          property="og:title"
          content={`${metaFacebook ? metaFacebook?.title : "Ezmoney"}`}
        />
        <meta
          property="og:description"
          content={`${metaFacebook ? metaFacebook?.description : "Ezmoney"}`}
        />
        <meta
          property="og:image"
          content={`${
            metaFacebook ? metaFacebook?.image?.data?.attributes?.url : ""
          }`}
        />
        <meta
          name="twitter:title"
          content={`${metaTwitter ? metaTwitter?.title : "Ezmoney"}`}
        />
        <meta
          name="twitter:description"
          content={`${metaTwitter ? metaTwitter?.description : "Ezmoney"}`}
        />
        <meta
          name="twitter:image"
          content={`${
            metaTwitter ? metaTwitter?.image?.data?.attributes?.url : ""
          }`}
        />
        <title>{title}</title>
      </Head>
      <Header
        modalCompare={modalCompare}
        setModalCompare={() => handleOpenModalCompare()}
        setActive={setActive}
        numberCompare={
          dataCompares?.length === 0
            ? 0
            : dataCompares?.length || dataCompare?.length || 0
        }
        menu={menu}
        setMenu={setMenu}
        top10s={top10s}
      />
      {children}
      <Footer />
      <FooterMobile
        active={active}
        setActive={setActive}
        menu={menu}
        setMenu={setMenu}
        top10s={top10s}
      />
      <Fixed
        active={activeFooter}
        modalCompare={modalCompare}
        setModalCompare={() => handleOpenModalCompare()}
        numberCompare={
          dataCompares?.length === 0
            ? 0
            : dataCompares?.length || dataCompare?.length || 0
        }
      />
      <ModalCompare
        active={modalCompare}
        closeModal={() => handleOpenModalCompare()}
        dataCompare={dataCompares || dataCompare}
        setDataCompare={dataCompares ? setDataCompares : setDataCompare}
      />
    </>
  );
};

export default Layout;
