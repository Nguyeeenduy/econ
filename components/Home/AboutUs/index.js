import router from "next/router";
import React, {useEffect} from "react";
import Image from "next/image"

//styles
import styles from "./style/style.module.scss";

const AboutUs = React.memo(function AboutUs(props) {
  const { data } = props;
  const [isDark, setIsDark] = React.useState(false)

  useEffect(() => {
    const onStorage = () => {
      setIsDark(localStorage.getItem('theme') === 'dark');
    };

    window.addEventListener('storage', onStorage);

    return () => {
        window.removeEventListener('storage', onStorage);
    };
  }, [data])
  return (
    <div
      className={`${styles.backgroundAbout} background-image position-relative`}
    >
      <Image
        src={isDark ? '/images/bg-about-us-dark.webp' : '/images/bg-about-us.webp'}
        alt={'bg-about-us'}
        layout='fill'
      />
      <div className={`${styles.containerAbout} container`}>
        <div
          className={`d-flex justify-content-center ${styles.containerAboutFull}`}
        >
          <div className={styles.containerAboutDot}></div>
          <div className={styles.containerAboutLeft}>
            <div className={`${styles.containerAboutLeftImage} position-relative background-image`}>
            {
                data?.image?.data?.attributes?.url &&
                <Image
                src={data?.image?.data?.attributes?.url}
                alt='aboutUs'
                layout='fill'
              />
            }
            </div>
          </div>
          <div className={styles.containerAboutRight}>
            <div className={`d-flex align-items-center ${styles.wrapperAbout}`}>
              <div className={styles.wrapperLineLeft} />
              <span className={styles.wrapperTitle}>ABOUT US</span>
              <div className={styles.wrapperLineRight} />
            </div>
            <h2 className={`d-flex align-items-center ${styles.wrapperText}`}>
              {data?.title}
            </h2>
            <p className={styles.containerAboutRightWrapper}>
              {data?.subtitle}
            </p>
            {data?.mission.slice(0, 2).map((data, index) => (
              <div
                key={index}
                className={`d-flex ${styles.containerAboutRightElement}`}
              >
                <div className={styles.containerAboutRightContainerImage}>
                  <div
                    className={`${styles.containerAboutRightImage} background-image`}
                    style={{ backgroundImage: `url(/images/img-check.png)` }}
                  />
                </div>
                <div>
                  <div className={styles.containerAboutRightText}>
                    {data.title}
                  </div>
                  <div className={styles.containerAboutRightDescribe}>
                    {data.subTitle}
                  </div>
                </div>
              </div>
            ))}
            <div
              className={`${styles.buttonSeeMoreAbout} d-flex align-items-center`}
              onClick={() => router.push("/gioi-thieu")}
            >
              <div >
                Xem thêm
              </div>
              <Image
                src="/icons/ic-chevrons-down.svg"
                alt="icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(AboutUs);
