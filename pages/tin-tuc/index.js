import Banner from "@/components/Blog/Banner";
import BlogList from "@/components/Blog/BlogList";
import BlogListSlider from "@/components/Blog/BlogListSlider";
import MenuCategory from "@/components/Blog/MenuCategory";
import { activeMenu } from "@/utils/activeMenu";
import baseApiUrl from "@/utils/baseApiUrl";
import axios from "axios";
import React from "react";
import Layout from "@/components/_App/Layout";
const Blog = () => {
  const [dataBlog, setDataBlog] = React.useState();
  const [dataCategory, setDataCategory] = React.useState([]);
  const [menu, setMenu] = React.useState();
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const onStorage = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [dataCategory?.length]);
  const dataMenu = dataCategory.map((item) => {
    return { id: item?.attributes?.slug };
  });
  const active = activeMenu([{ id: "baivietmoi" }, ...dataMenu], 0);
  React.useEffect(async () => {
    const responseMenu = await axios.get(
      `${baseApiUrl}/category-lists?filters[isShowCategory]=false`
    );
    const responseCategory = await axios.get(
      `${baseApiUrl}/category-lists?populate=image%2Cblog_lists%2Cblog_lists.image%2Cadvertisement%2Cadvertisement.advertisement_button&filters[isShowCategory]=true`
    );
    const responseBlog = await axios.get(
      `${baseApiUrl}/blog-lists?pagination%5Bpage%5D=0&pagination%5BpageSize%5D=5&&populate=image%2Ccategory_lists`
    );
    setMenu([...responseCategory?.data?.data, ...responseMenu?.data?.data]);
    setDataCategory(responseCategory?.data?.data);
    setDataBlog(responseBlog?.data?.data);
  }, []);
  return (
    <Layout activeFooter={"tip"} title={"Ezmoney- Chỉ dẫn và tips"}>
      <Banner />
      <MenuCategory data={menu} active={active} />
      <BlogListSlider
        data={dataBlog}
        title={"Bài viết mới"}
        slug={"baivietmoi"}
      />
      {dataCategory?.map((data, index) => {
        if (index % 2 === 0)
          return data?.attributes?.blog_lists?.data?.length ? (
            <BlogList
              data={data?.attributes?.blog_lists?.data}
              title={data?.attributes?.categoryName}
              slug={data?.attributes?.slug}
              advertisement={data?.attributes?.advertisement}
              isDark={isDark}
            />
          ) : (
            <></>
          );
        else
          return data?.attributes?.blog_lists?.data?.length ? (
            <BlogListSlider
              data={data?.attributes?.blog_lists?.data}
              title={data?.attributes?.categoryName}
              slug={data?.attributes?.slug}
              advertisement={data?.attributes?.advertisement}
            />
          ) : (
            <>/</>
          );
      })}
    </Layout>
  );
};
export default Blog;
