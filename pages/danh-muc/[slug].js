import Banner from "@/components/Category/Banner";
import AdvertisementInfo from "@/components/Common/AdvertisementInfo";
import Advertisement from "@/components/Common/Advertisement";
import baseApiUrl from "@/utils/baseApiUrl";
import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styles from "./style/style.module.scss";
import Layout from "@/components/_App/Layout";

const Category = (data) => {
  const router = useRouter();
  const [list, setList] = React.useState();
  const [page, setPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [dataCategory, setDataCategory] = React.useState([]);
  const [dataAdv, setDataAdv] = React.useState();
  React.useEffect(() => {
    const getDataHome = async () => {
      const response = await axios.get(
        `${baseApiUrl}/home-page-setting?populate=image_ad.imageDesktop,image_ad.imageMobile`
      );
      setDataAdv(response.data.data);
    };

    getDataHome();
  }, []);
  React.useEffect(() => {
    const getListCategory = async () => {
      const response = await axios.get(
        `${baseApiUrl}/category-lists?populate=advertisement%2Cadvertisement.advertisement_button`
      );
      setList(response.data.data);
    };
    getListCategory();
  }, []);
  const getDataCategoryBySlug = async (page, limit) => {
    const response = await axios.get(
      router.query.slug === "baivietmoi"
        ? `${baseApiUrl}/blog-lists?pagination%5Bstart%5D=${page}&pagination%5Blimit%5D=${limit}&populate=image%2Ccategory_lists`
        : `${baseApiUrl}/blog-lists?pagination%5Bstart%5D=${page}&pagination%5Blimit%5D=${limit}&populate=image%2Ccategory_lists&filters%5Bcategory_lists%5D%5Bslug%5D%5B$eq%5D=${router.query.slug}`
    );
    setDataCategory(
      page === 0
        ? response?.data?.data
        : [...dataCategory, ...response?.data?.data]
    );
    setTotal(response?.data?.meta?.pagination?.total);
  };
  React.useEffect(() => {
    if (router.query.slug) {
      getDataCategoryBySlug(0, 9);
      setPage(page + 9);
    }
  }, [router.query.slug]);
  const handleSeeMore = async () => {
    getDataCategoryBySlug(page, 6);
    setPage(page + 6);
  };
  const category = list?.find(
    (item) => item?.attributes?.slug == router.query.slug
  );
  return (
    <Layout title={"Ezmoney - Chỉ dẫn và tips"}>
      <Banner title={category?.attributes?.categoryName} />
      <div className={`container ${styles.container}`}>
        <div className={styles.containerLeft}>
          <div className={styles.containerLeftContent}>
            {dataCategory?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.containerLeftBlog}
                  onClick={() =>
                    router.push(`/tin-tuc/${item?.attributes?.slug}`)
                  }
                >
                  <div
                    className={`${styles.containerLeftBlogImage} background-image`}
                    style={{
                      backgroundImage: `url(${
                        item?.attributes?.image?.data?.attributes?.url ||
                        "/images/img-no-image.png"
                      })`,
                    }}
                  />
                  <div className={styles.containerLeftBlogText}>
                    <div className={styles.containerLeftBlogTitle}>
                      {item?.attributes?.title}
                    </div>
                    <div className={styles.containerLeftBlogInfo}>
                      <span className={styles.containerLeftBlogTime}>
                        {
                          item?.attributes?.category_lists?.data?.[0]
                            ?.attributes?.categoryName
                        }
                      </span>
                      <span className={styles.containerLeftBlogTime}>
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                      </span>
                      <img
                        src={"/icons/ic-text-chat.svg"}
                        style={{
                          marginRight: "4px",
                        }}
                      />
                      <span>{item?.attributes?.views}</span>
                    </div>
                    <div className={styles.containerLeftBlogDescription}>
                      {item?.attributes?.subTitle}
                    </div>
                    <div className={styles.containerLeftBlogSeeDetail}>
                      Xem chi tiết{" "}
                      <span className={styles.containerLeftBlogArrowRight} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {page < total && (
            <div
              className={styles.containerLeftSeeMore}
              onClick={() => handleSeeMore()}
            >
              Xem thêm{" "}
              <img
                src="/icons/ic-chevrons-down.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
        <div className={styles.containerRight}>
          <div className={styles.containerRightCategory}>
            <span className={styles.containerRightTitle}>Categories</span>
            {list?.map((item, index) => {
              if (item?.attributes?.slug != router.query.slug)
                return (
                  <div
                    key={index}
                    className={styles.containerRightItem}
                    onClick={() =>
                      router.push(`/danh-muc/${item?.attributes?.slug}`)
                    }
                  >
                    {item?.attributes?.categoryName}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
      {category?.attributes?.advertisement && (
        <AdvertisementInfo data={category?.attributes?.advertisement} />
      )}

      <Advertisement data={dataAdv?.attributes?.image_ad} />
    </Layout>
  );
};

export default Category;
