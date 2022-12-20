import React from "react";
import Layout from "@/components/_App/Layout";
import Image from "next/image";
import styles from "./style/style.module.scss";
import ModalLogin from "@/components/Modal/ModalLogin";
import router from "next/router";
import { getSession, signIn} from "next-auth/react";
import Link from "next/link";

const Login = () => {
  const [modalLogin, setModalLogin] = React.useState(false);
  const handleChangeModal = () => {
    setModalLogin(!modalLogin);
  };
  return (
    <Layout title={"Ezmoney - Đăng nhập"}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.containerTitle}>Đăng nhập vào EZMONEY</h1>
        <button
          className={styles.containerButton}
          onClick={() => setModalLogin(true)}
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
        <div>
        <Link href={'/api/auth/signin'}>
          <button className={styles.containerButton} 
          onClick={(e) => {
                    e.preventDefault();
                    signIn('google');
                }}>
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
        </Link>
        </div>
        
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
          <span className={styles.containerTextLeft}>
            Bạn không có tài khoản?
          </span>
          <span
            className={styles.containerTextRight}
            onClick={() => router.push("/dang-ky")}
          >
            Đăng ký
          </span>
        </div>
      </div>
      {modalLogin && <ModalLogin closeModal={() => setModalLogin(false)} />}
    </Layout>
  );
};

export default Login;
