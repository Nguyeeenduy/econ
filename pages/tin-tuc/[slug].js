import React, { useRef } from "react";
import baseApiUrl from "@/utils/baseApiUrl";
import { activeMenuBlog } from "@/utils/activeMenu";
import { useRouter } from "next/router";
import Slider from "react-slick";
import styles from "./style/style.module.scss";
import Menu from "@/components/Blog/Menu";
import Breadcrumb from "@/components/Common/Breadcrumb";
import moment from "moment";
import Share from "@/components/Common/Share";
import Advertiser from "@/components/Common/Advertiser";
import FormComment from "@/components/Common/FormComment";
import Rating from "@/components/Common/Rating";
import Layout from "@/components/_App/Layout";
import Comment from "@/components/Common/Comment";
import {
  getCommentByBlog,
  getRatingByBlog,
  postCommentByBlog,
  postRatingByBlog,
} from "stores/comment";
import {
  getFilterBlogByCategory,
  getListBlogById,
  updateBlogById,
} from "stores/blog";
import { getUserList } from "stores/user";
import { convertSlug } from "@/utils/convertSlug";
import MenuInBlog from "@/components/Blog/MenuInBlog";
import { sendInfoContact } from "stores/contact";

const BlogDetails = (data) => {
  const [tab, setTab] = React.useState(1);
  const router = useRouter();
  const [dataBlog, setDataBlog] = React.useState();
  const [dataMenu, setDataMenu] = React.useState([]);
  const [commentList, setCommentList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [valueRating, setValueRating] = React.useState(0);
  const [isLogin, setIsLogin] = React.useState(false);
  const [rating, setRating] = React.useState();
  const [blogDetail, setBlogDetail] = React.useState(null);
  const [averageRating, setAverageRating] = React.useState(null);
  const idMenu = dataMenu?.map((item) => {
    return { id: `${convertSlug(item.title)}-${item?.id}` };
  });
  const active = activeMenuBlog(idMenu, 116);
  const idMenuChild = [];
  dataMenu?.map((item) => {
    item?.contentChilds?.map((child) => {
      idMenuChild.push({
        id: `${convertSlug(child.title)}-child-${child?.id}`,
      });
    });
  });
  const activeChild = activeMenuBlog(idMenuChild, 116);
  React.useEffect(() => {
    const getRatingBlog = async () => {
      const result = await getRatingByBlog(router.query.slug);
      setRating(result);
    };
    getRatingBlog();
    getUsers();
    if (localStorage.getItem("user")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    const menuList = [];
    let num = 0;
    document.getElementById("content").childNodes.forEach((item, index) => {
      if (item.tagName == "H1") {
        item.setAttribute("id", `${convertSlug(item.innerText)}-${index}`);
        menuList[num] = { id: index, title: item.innerText, contentChilds: [] };
        num++;
      }
      if (item.tagName == "H2" && menuList.length !== 0) {
        item.setAttribute(
          "id",
          `${convertSlug(item.innerText)}-child-${index}`
        );
        menuList[num - 1].contentChilds.push({
          id: index,
          title: item.innerText,
        });
      }
    });
    setDataMenu(menuList);
  }, []);
  React.useEffect(() => {
    if (data?.data?.data?.[0]?.id) {
      getCommentList();
      getBlogById();
      updateBlog({
        data: { views: data?.data?.data?.[0]?.attributes?.views + 1 },
      });
      const getDataBlog = async () => {
        const response = await getFilterBlogByCategory(
          data?.data?.data?.[0]?.attributes?.category_lists?.data?.[0]
            ?.attributes?.categoryName,
          0,
          5,
          "image%2Ccategory_lists"
        );
        setDataBlog(response.data.data);
      };
      getDataBlog();
    }
  }, [data?.data?.data?.[0]?.id]);
  const [width, setWidth] = React.useState(0);
  React.useEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;
      const element = document.getElementById("content-blog");
      if (scroll < element.offsetTop) setWidth(0);
      else if (scroll > element.offsetTop + element.offsetHeight) setWidth(100);
      else
        setWidth(((scroll - element.offsetTop) * 100) / element.offsetHeight);
    };
    listener();
    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, []);
  const getBlogById = async () => {
    const result = await getListBlogById(data?.data?.data?.[0]?.id);
    if (result) {
      setBlogDetail(result?.data?.data);
      getTotalRating(result?.data?.data);
    }
  };
  const getTotalRating = (data) => {
    let count = 0;
    if (data?.attributes?.ratings && data?.attributes?.ratings?.length > 0) {
      data?.attributes?.ratings.forEach((rating) => {
        count = count + rating?.rating;
      });
      setAverageRating(
        parseFloat(count / data?.attributes?.ratings?.length).toFixed(1)
      );
    } else {
      setAverageRating(null);
    }
  };
  const getCommentList = async () => {
    const result = await getCommentByBlog(data?.data?.data?.[0]?.id);
    if (result) {
      setCommentList([...result]);
    }
  };

  const updateBlog = async (payload) => {
    const result = await updateBlogById(data?.data?.data?.[0]?.id, payload);
    if (result) {
    }
  };

  const getUsers = async () => {
    const result = await getUserList();
    if (result) {
      setUserList([...result]);
    }
  };
  const breadcrumb = [
    {
      href: "/tin-tuc",
      title: "Blog",
    },
    {
      href: `/danh-muc/${
        data?.data?.data?.[0]?.attributes?.category_lists?.data?.[0]?.id ||
        "baivietmoi"
      }`,
      title:
        data?.data?.data?.[0]?.attributes?.category_lists?.data?.[0]?.attributes
          ?.categoryName || "Bài viết mới",
    },
  ];
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const myref = useRef(null);
  const date =
    new Date() - new Date(data?.data?.data?.[0]?.attributes?.createdAt);

  const handleSubmitContent = (payload) => {
    if (isLogin && valueRating) {
      postRatingByBlog(router.query.slug, {
        score: valueRating,
        content: "abc",
      });
    }
    postCommentByBlog(data?.data?.data?.[0]?.id, payload).then((r) => {
      if (r) {
        getCommentList();
      }
    });
  };
  const getNumberComment = () => {
    let total = 0;
    commentList.map((item) => {
      total = total + item?.children?.length + 1;
    });
    return total;
  };
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (/\S+@\S+\.\S+/.test(e.target.email.value))
      await sendInfoContact({
        data: {
          email: e.target.email.value,
        },
      });
  };
  return (
    <Layout
      activeFooter={"tip"}
      title={"Ezmoney- Chỉ dẫn và tips"}
      seo={data?.data?.data?.[0]?.attributes?.seo}
    >
      <div className={styles.lineScroll} style={{ width: `${width}%` }} />
      <div className={`container ${styles.container}`}>
        <div className={styles.blogMenu}>
          <div className={styles.blogFixed}>
            <Menu
              data={dataMenu}
              className={styles.blogMenuFixed}
              activeMenu={active}
              activeMenuChild={activeChild}
            />
          </div>
        </div>
        <div className={styles.blogDetail}>
          <Breadcrumb breadcrumb={breadcrumb} />
          <Advertiser />
          <div id="content-blog">
            <h1 className={styles.blogDetailTitle}>
              {data?.data?.data?.[0]?.attributes?.title}
            </h1>
            <div className={styles.blogDetailInfo}>
              <span
                className={styles.blogDetailInfoName}
                style={{ marginRight: "5px" }}
              >
                {data?.data?.data?.[0]?.attributes?.author?.authorName ||
                  "Ẩn danh"}
              </span>
              <span style={{ marginRight: "5px" }}>
                {"| " +
                  moment(data?.data?.data?.[0]?.attributes?.createdAt).format(
                    "DD/MM/YYYY"
                  )}
              </span>
              {data?.data?.data?.[0]?.attributes?.createdAt && (
                <span style={{ marginRight: "20px" }}>{` | ${
                  date < 60000
                    ? "Vừa xong"
                    : date < 3600000
                    ? Math.floor(date / 60000) + " phút"
                    : date < 86400000
                    ? Math.floor(date / 3600000) + " giờ"
                    : date < 2592000000
                    ? Math.floor(date / 86400000) + " ngày"
                    : date < 31104000000
                    ? Math.floor(date / 2592000000) + " tháng"
                    : Math.floor(date / 31104000000) + " năm"
                }`}</span>
              )}

              {rating?.reviewsCount ? (
                <Rating size={20} start={rating?.averageScore} />
              ) : (
                <span>Chưa có đánh giá</span>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.data?.data?.[0]?.attributes?.description,
              }}
            />
            <Share
              className={"d-flex align-items-center"}
              handleUpdateBlog={() =>
                updateBlog({
                  data: {
                    shares: data?.data?.data?.[0]?.attributes?.shares + 1,
                  },
                })
              }
            />
            <MenuInBlog data={dataMenu} />
            <div className={styles.blogDetailContent}>
              <div
                id={"content"}
                dangerouslySetInnerHTML={{
                  __html:
                    data?.data?.data?.[0]?.attributes?.contents?.description,
                }}
              />
            </div>

            <span className={styles.blogDetailSeeMore}>
              Đọc tiếp{" "}
              <img
                src={"/icons/ic-chevrons-right.svg"}
                width={24}
                height={24}
              />
            </span>
          </div>
          <div
            className={`slider-desktop equal-slider ${styles.containerSlider}`}
          >
            <Slider {...settings}>
              {dataBlog?.slice(0, 4).map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className={styles.containerBlog}
                      onClick={() =>
                        router.push(`/tin-tuc/${item?.attributes?.slug}`)
                      }
                    >
                      <div
                        className={`${styles.containerBlogImage} background-image`}
                        style={{
                          backgroundImage: `url(${
                            item?.attributes?.image?.data?.attributes?.url ||
                            "/images/img-no-image.png"
                          })`,
                        }}
                      />
                      <div className={styles.containerBlogText}>
                        <div className={styles.containerBlogTitle}>
                          {item.attributes.title}
                        </div>
                        <div className={styles.containerBlogTime}>
                          <span className={styles.time}>
                            {moment(item?.attributes?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </span>
                          <img
                            src={"/icons/ic-text-chat.svg"}
                            style={{
                              marginRight: "4px",
                            }}
                          />
                          <span>{item.attributes.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <span className={styles.blogDetailText}>Đánh giá và bình luận </span>
          <span>{`(${getNumberComment()})`}</span>
          <div className={styles.blogDetailRating}>
            <span className={styles.blogDetailRatingText}>Đánh giá</span>
            <Rating
              size={28}
              start={valueRating}
              edit={true}
              setValueRating={setValueRating}
            />
          </div>
          <FormComment
            submitComment={(submitComment) =>
              handleSubmitContent({ content: submitComment })
            }
            submitCommentNotLogin={(submitCommentNotLogin) =>
              handleSubmitContent(submitCommentNotLogin)
            }
            isLogin={isLogin}
          />
          <div className={styles.containerComment}>
            <div className={styles.containerCommentTab}>
              <div
                className={styles.containerCommentTabButton}
                style={{ color: tab === 1 ? "#067655" : "#595959" }}
                onClick={() => setTab(1)}
                ref={myref}
              >
                Quan tâm nhất
                {tab === 1 && <div className={styles.underLine} />}
              </div>
              <div
                className={styles.containerCommentTabButton}
                style={{ color: tab === 2 ? "#067655" : "#595959" }}
                onClick={() => setTab(2)}
              >
                Mới nhất
                {tab === 2 && <div className={styles.underLine} />}
              </div>
            </div>
            <Comment
              isLogin={isLogin}
              commentList={commentList}
              userList={userList}
              submitComment={(payload) => handleSubmitContent(payload)}
            />
          </div>
          <div className={styles.blogDetailAuthor}>
            <Share
              className={`d-flex ${styles.blogDetailAuthorGap}`}
              handleUpdateBlog={() =>
                updateBlog({
                  data: {
                    shares: data?.data?.data?.[0]?.attributes?.shares + 1,
                  },
                })
              }
            />
            <div className="d-flex flex-wrap">
              <div className={styles.blogDetailAuthorTitle}>
                Thông tin bài viết
              </div>
              <div className={styles.blogDetailAuthorContainerText}>
                <div className={styles.blogDetailAuthorText}>
                  <span>Lượt đọc:</span>
                  <span>{data?.data?.data?.[0]?.attributes?.views || 0}</span>
                </div>
                <div className={styles.blogDetailAuthorText}>
                  <span>Lượt chia sẻ:</span>
                  <span>{data?.data?.data?.[0]?.attributes?.shares || 0}</span>
                </div>
              </div>
            </div>

            <div className={styles.blogDetailAuthorInfo}>
              <div className={styles.blogDetailAuthorInfo1}>
                <div
                  className={`${styles.blogAuthorInfoImage} background-image`}
                  style={{
                    backgroundImage: `url('${
                      data?.data?.data?.[0]?.attributes?.author?.avatar?.data
                        ?.attributes?.url
                        ? data?.data?.data?.[0]?.attributes?.author?.avatar
                            ?.data?.attributes?.url
                        : "/images/avatar-default.png"
                    }')`,
                  }}
                />
                <span className={styles.blogAuthorInfoWriteBy}>
                  Được viết bởi
                </span>
                <span className={styles.blogAuthorInfoName}>
                  {blogDetail?.attributes?.createdBy?.data?.attributes
                    ?.firstname +
                    blogDetail?.attributes?.createdBy?.data?.attributes
                      ?.lastname || "Ẩn danh"}
                </span>
              </div>
              <div className={styles.blogDetailAuthorInfo2}>
                <span className={styles.blogAuthorInfoRating}>Đánh giá</span>
                {averageRating && (
                  <Rating size={20} start={averageRating || 0} />
                )}
                {!averageRating && <p>Chưa có đánh giá</p>}
                <span
                  className={styles.blogAuthorInfoRating}
                  style={{ marginTop: "2px" }}
                >
                  Số lượng bài viết:{" "}
                  {blogDetail?.attributes?.ratings?.length || 0}
                </span>
                <p className={styles.blogDetailAuthorInfoDescription}>
                  {data?.data?.data?.[0]?.attributes?.author?.description}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.blogDetailEmail}>
            <div
              className={`${styles.blogDetailEmailImage} background-image`}
              style={{ backgroundImage: `url('/images/img-email.png')` }}
            />
            <span className={styles.blogDetailEmailText}>
              Đăng kí để nhận bài viết mới hàng tuần
            </span>
            <form
              className={styles.contactForm}
              onSubmit={(e) => handleSubmitContact(e)}
            >
              <div style={{ flex: "1" }}>
                <input
                  placeholder={"Email của bạn"}
                  type="text"
                  name="email"
                  className={styles.textPlaceholder}
                  required
                />
              </div>
              <button type="submit" className={styles.buttonSubmit}>
                <div
                  className={`${styles.logoTelegram} background-image`}
                  style={{
                    backgroundImage: "url('/icons/ic-telegram.svg')",
                  }}
                />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.blogAuthor}>
          <div className={styles.blogFixed}>
            <Share
              className={`d-flex flex-column ${styles.blogAuthorGap}`}
              handleUpdateBlog={() =>
                updateBlog({
                  data: {
                    shares: data?.data?.data?.[0]?.attributes?.shares + 1,
                  },
                })
              }
            />
            <div className={styles.blogAuthorTitle}>Thông tin bài viết</div>
            <div className={styles.blogAuthorText}>
              <span>Lượt đọc</span>
              <span>{data?.data?.data?.[0]?.attributes?.views || 0}</span>
            </div>
            <div className={styles.blogAuthorText}>
              <span>Lượt chia sẻ</span>
              <span>{data?.data?.data?.[0]?.attributes?.shares || 0}</span>
            </div>
            <div className={styles.blogAuthorInfo}>
              <div
                className={`${styles.blogAuthorInfoImage} background-image`}
                style={{
                  backgroundImage: `url('${
                    data?.data?.data?.[0]?.attributes?.author?.avatar?.data
                      ?.attributes?.url
                      ? data?.data?.data?.[0]?.attributes?.author?.avatar?.data
                          ?.attributes?.url
                      : "/images/avatar-default.png"
                  }')`,
                }}
              />
              <span className={styles.blogAuthorInfoWriteBy}>
                Được viết bởi
              </span>
              <span className={styles.blogAuthorInfoName}>
                {blogDetail?.attributes?.createdBy?.data?.attributes
                  ?.firstname +
                  blogDetail?.attributes?.createdBy?.data?.attributes
                    ?.lastname || "Ẩn danh"}
              </span>
              <span className={styles.blogAuthorInfoRating}>Đánh giá</span>
              {averageRating && <Rating size={20} start={averageRating || 0} />}
              {!averageRating && <p>Chưa có đánh giá</p>}
              <span
                className={styles.blogAuthorInfoRating}
                style={{ marginTop: "2px" }}
              >
                Số lượng bài viết:{" "}
                {blogDetail?.attributes?.ratings?.length || 0}
              </span>
              <p className={styles.blogAuthorInfoDescription}>
                {data?.data?.data?.[0]?.attributes?.author?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let { slug } = context.query;
  const res = await fetch(
    `${baseApiUrl}/blog-lists?filters%5Bslug%5D=${slug}&populate=image%2Ccategory_lists%2Ccontents`
  );

  const data = await res.json();
  return {
    props: { data },
  };
}

export default BlogDetails;
