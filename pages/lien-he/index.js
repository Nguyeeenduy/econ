import React from "react";
import BannerContact from "@/components/Contact/Banner";
import ContentContact from "@/components/Contact/Content";
import Layout from "@/components/_App/Layout";
const Contact = () => {
  return (
    <Layout title={"Ezmoney - Liên hệ"}>
      <BannerContact />
      <ContentContact />
    </Layout>
  );
};
export default Contact;
