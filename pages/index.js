import React from "react";
import dynamic from "next/dynamic";
import axiosClient from "stores/clientAxios";
import baseApiUrl from "@/utils/baseApiUrl";
const MainBanner = dynamic(() => import("@/components/Home/MainBanner"), {
  suspense: false,
});
const Services = dynamic(() => import("@/components/Home/Services"), {
  suspense: false,
});
const RequestOfferInfo = dynamic(
  () => import("@/components/Home/RequestOfferInfo"),
  {
    suspense: false,
  }
);
const AboutUs = dynamic(() => import("@/components/Home/AboutUs"), {
  suspense: false,
});
const OurPartNers = dynamic(() => import("@/components/Home/OurPartNers"), {
  suspense: false,
});
const OurCustomers = dynamic(() => import("@/components/Home/OurCustomers"), {
  suspense: false,
});
const FinaceTools = dynamic(() => import("@/components/Home/FinaceTools"), {
  suspense: false,
});
const Advertisement = dynamic(
  () => import("@/components/Common/Advertisement"),
  {
    suspense: false,
  }
);
const Layout = dynamic(() => import("@/components/_App/Layout"), {
  suspense: false,
});

const IndexPage = React.memo(function IndexPage() {
  const [dataHome, setDataHome] = React.useState();
  React.useEffect(() => {
    const getDataHome = async () => {
      const response = await axiosClient.get(
        `${baseApiUrl}/home-page-setting?populate=deep`
      );
      setDataHome(response.data.data);
    };

    getDataHome();
  }, []);
  return (
    <React.StrictMode>
      <Layout
        activeFooter={"home"}
        title={"Trang chủ"}
        seo={dataHome?.attributes?.seo}
      >
        <div>
          <MainBanner data={dataHome?.attributes} />
          {dataHome?.attributes?.interested?.length && (
            <Services data={dataHome?.attributes?.interested} />
          )}
          <RequestOfferInfo />
          <AboutUs data={dataHome?.attributes?.introduce} />
          <Advertisement data={dataHome?.attributes?.image_ad} />
          <FinaceTools data={dataHome?.attributes?.financial_instruments} />
          <OurPartNers data={dataHome?.attributes?.our_partners} />
          <OurCustomers data={dataHome?.attributes?.our_customers} />
        </div>
      </Layout>
    </React.StrictMode>
  );
});

export default React.memo(IndexPage);
