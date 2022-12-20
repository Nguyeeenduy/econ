import React from "react";
import styles from "./style/style.module.scss";
import Slider from "react-slick";
import { activeMenu } from "@/utils/activeMenu";

const MenuFixed = (props) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: props?.showDesktop || 6,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: props?.showIpad || 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: props?.showMobile || 2.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [isFixed, setIsFixed] = React.useState(false);
  const { datas } = props;
  const active = activeMenu(datas, 0);

  React.useEffect(() => {
    let elementId = document.getElementById("menu");
    let elementFixed = document.getElementById("fixed");
    document.addEventListener("scroll", () => {
      if (window.scrollY > elementId.offsetTop - 80) {
        elementFixed.classList.add(styles.container);
        setIsFixed(true);
      } else {
        elementFixed.classList.remove(styles.container);
        setIsFixed(false);
      }
    });
  }, []);
  let showScroll = 0;
  React.useEffect(() => {
    const listener = () => {
      if (window.innerWidth < 769) {
        const scr = window.pageYOffset;
        if (showScroll < 80 || showScroll > scr) {
          document
            .getElementById("fixed")
            .classList.remove(styles.containerMobile);
        } else
          document
            .getElementById("fixed")
            .classList.add(styles.containerMobile);
        showScroll = scr;
      }
    };
    listener();
    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <div id="menu" className={styles.containerMenu}>
      <div id="fixed">
        <div className={`container ${isFixed ? "" : "px-0"}`}>
          <div className={`${styles.containerBorder}`}>
            <Slider {...settings}>
              {datas?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.containerButton}>
                      <a
                        href={`#${item.id}`}
                        style={{
                          background:
                            active === item.id ? "#067655" : "#F0F0F0",
                          fontWeight: active === item.id ? "700" : "500",
                          color: active === item.id ? "#FFFFFF" : "#595959",
                        }}
                        className={styles.containerButtonText}
                      >
                        <span>{item.title}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuFixed;
