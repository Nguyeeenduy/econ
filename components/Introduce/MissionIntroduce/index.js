import React from "react";
import styles from "./style/style.module.scss";
function MissionIntroduce({ isDark, data }) {
  return (
    <div
      id="MissionIntroduce"
      className="background-image"
      style={{
        backgroundImage: isDark
          ? `url('/images/bg-our-services-dark.webp')`
          : `url('/images/bg-our-services.webp')`,
      }}
    >
      <div className={styles.missionIntroduce}>
        <div className="container">
          <div className={styles.missionContainer}>
            <div className={styles.missionHeader}>
              <div className={styles.missionHeaderIntro}>
                <div className={styles.missionHeaderBar} />
                <span>MISSION & VISION</span>
                <div className={styles.missionHeaderBar} />
              </div>
              <h2 className={styles.missionHeaderTitle}>{data?.title}</h2>
            </div>
            <div className={styles.missionBody}>
              <div className={styles.missionBodyItem}>
                <div
                  className={`${styles.missionBodyItemImage} background-image`}
                  style={{
                    backgroundImage: `url(${data?.image?.data?.attributes?.url})`,
                  }}
                />
              </div>
              <div className={styles.missionBodyItem}>
                <div className={styles.missionBodyItemInfo}>
                  <div
                    className={`${styles.missionBodyItemInfoImage} background-image`}
                    style={{ backgroundImage: `url("/images/img-check.png")` }}
                  />
                  <div className={styles.missionBodyItemInfoText}>
                    <p className={styles.missionBodyItemInfoTextTitle}>
                      {data?.mission?.title}
                    </p>
                    <span className={styles.missionBodyItemInfoTextContent}>
                      {data?.mission?.subTitle}
                    </span>
                  </div>
                </div>
                <div className={styles.missionBodyItemInfo}>
                  <div
                    className={`${styles.missionBodyItemInfoImage} background-image`}
                    style={{ backgroundImage: `url("/images/img-check.png")` }}
                  />
                  <div className={styles.missionBodyItemInfoText}>
                    <p className={styles.missionBodyItemInfoTextTitle}>
                      {data?.vision?.title}
                    </p>
                    <span className={styles.missionBodyItemInfoTextContent}>
                      {data?.vision?.subTitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionIntroduce;
