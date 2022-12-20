import router from "next/router";
import React from "react";

//styles
import styles from "./style/style.module.scss";

const Fixed = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div
          id={"compare"}
          className={`${styles.containerIcon} background-image position-relative`}
          style={{ backgroundImage: "url('/icons/ic-weigh.svg')" }}
          onClick={() => props.setModalCompare(!props.modalCompare)}
        >
          {props?.numberCompare ? (
            <div className={styles.containerNumber}>{props.numberCompare}</div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`${styles.containerIcon} background-image`}
          style={{ backgroundImage: "url('/icons/ic-question-fix.svg')" }}
          onClick={() => router.push("/lien-he")}
        />
      </div>
    </>
  );
};

export default Fixed;
