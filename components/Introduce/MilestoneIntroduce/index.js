import moment from "moment";
import React from "react";
import styles from "./style/style.module.scss";
const MileStoneIntroduce = ({ data, isDark }) => {
  return (
    <div
      id="MileStoneIntroduce"
      className="background-image"
      style={{
        backgroundImage: isDark
          ? `url('/images/bg-our-services-dark.webp')`
          : `url('/images/bg-our-services.webp')`,
      }}
    >
      <div className={styles.mileStoneIntroduce}>
        <div className="container">
          <div className={styles.mileStoneContainer}>
            <div className={styles.mileStoneHeader}>
              <div className={styles.mileStoneHeaderIntro}>
                <div className={styles.mileStoneHeaderBar} />
                <span>OUR TEAM</span>
                <div className={styles.mileStoneHeaderBar} />
              </div>
              <h2 className={styles.mileStoneHeaderTitle}>
                Cột mốc phát triển
              </h2>
            </div>
            <div className={styles.mileStoneBody}>
              {data?.timelines?.map((item, index) => {
                return (
                  <div className={styles.mileStoneBodyItem}>
                    <span className={styles.mileStoneBodyItemTime}>
                      {moment(item.time).format("M/YYYY")}
                    </span>
                    <div className={styles.mileStoneBodyItemDot}>
                      {index !== 0 && (
                        <div className={styles.mileStoneBodyItemDotLeft} />
                      )}
                      <div className={styles.mileStoneBodyItemDotCenter} />
                      {index !== data?.timelines?.length - 1 && (
                        <div className={styles.mileStoneBodyItemDotRight} />
                      )}
                    </div>
                    <span className={styles.mileStoneBodyItemDescription}>
                      {item.discription}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileStoneIntroduce;
