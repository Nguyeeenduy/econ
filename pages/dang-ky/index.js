import React from "react";
import Layout from "@/components/_App/Layout";
import Image from "next/image";
import styles from "./style/style.module.scss";
import ModalRegister from "@/components/Modal/ModalRegister";
import router from "next/router";
const SignUp = () => {
  const [modalRegister, setModalRegister] = React.useState(false);
  return (
    <Layout title={"Ezmoney - Đăng ký"}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.containerTitle}>Đăng ký EZMONEY</h1>
        <button
          className={styles.containerButton}
          onClick={() => setModalRegister(true)}
        >
          <div className={`background-image ${styles.containerImage}`}>
            <Image
              src="/icons/ic-user-green.svg"
              alt="image-user"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className={styles.containerButtonText}>
            Số điện thoại/Email
          </span>
        </button>
        <button className={styles.containerButton}>
          <div className={`background-image ${styles.containerImage}`}>
            <Image
              src="/icons/ic-facebook-blue.svg"
              alt="image-facebook"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className={styles.containerButtonText}>
            Tiếp tục với Facebook
          </span>
        </button>
        <button className={styles.containerButton}>
          <div className={`background-image ${styles.containerImage}`}>
            <Image
              src="/icons/ic-google-login.svg"
              alt="image-google"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className={styles.containerButtonText}>
            Tiếp tục với Google
          </span>
        </button>
        <button className={styles.containerButton}>
          <div className={`background-image ${styles.containerImage}`}>
            <Image
              src="/icons/ic-apple.svg"
              alt="image-apple"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className={styles.containerButtonText}>
            Tiếp tục với ID Apple
          </span>
        </button>
        <div className={styles.containerText}>
          <span className={styles.containerTextLeft}>Bạn đã có tài khoản?</span>
          <span
            className={styles.containerTextRight}
            onClick={() => router.push("/dang-nhap")}
          >
            Đăng nhập
          </span>
        </div>
      </div>
      {modalRegister && (
        <ModalRegister closeModal={() => setModalRegister(false)} />
      )}
    </Layout>
  );
};

export default SignUp;
