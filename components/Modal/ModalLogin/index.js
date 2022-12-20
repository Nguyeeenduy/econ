import router from "next/router";
import React from "react";
import { Login } from "stores/auth";
import Image from "next/image";
//styles
import styles from "./style/style.module.scss";
import ModalForgotPassword from "../ModalForgotPassword";

const ModalLogin = (props) => {
  const [error, setError] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [modalForgotPassword, setModaForgotPassword] = React.useState(false);
  const [passwordType, setPasswordType] = React.useState(false);
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     identifier: e.target.userName.value,
  //     password: e.target.password.value,
  //   };
  //   const result = await Login(e.target.saveAccount.checked, payload);
  //   if (result) {
  //     setError("");
  //     window.location.reload(false);
  //   } else setError("Tài khoản hoặc mật khẩu không chính xác");
  // };
  return (
    <>
      <div className={styles.closeModal} onClick={() => props.closeModal()} />
      <div className={styles.container}>
        <div
          className={`${styles.containerClose}`}
          onClick={() => props.closeModal()}
        >
          <div className={`background-image ${styles.containerImage}`}>
            <Image
              src="/icons/ic-close-grey.svg"
              alt="image-down"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div
          className={`background-image ${styles.containerImageBack}`}
          onClick={() => props.closeModal()}
        >
          <Image
            src="/icons/ic-arrow-left-black.svg"
            alt="image-back"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className={styles.containerTitle}>Đăng nhập</h1>
        <form
          className={styles.containerForm}
          // onSubmit={(e) => handleLogin(e)}
        >
          <div className={styles.containerFormHead}>
            <span className={styles.containerFormHeadText}>
              {login ? "Điện thoại" : "Email"}
            </span>
            <button
              className={styles.containerFormHeadButton}
              type={"button"}
              onClick={() => setLogin(!login)}
            >
              {login ? "Đăng nhập bằng email" : "Đăng nhập bằng số điện thoại"}
            </button>
          </div>
          {login ? (
            <div className={styles.containerFormElement}>
              <span className={styles.containerFormElementText}>VN +84</span>
              <div className={`background-image ${styles.containerImage}`}>
                <Image
                  src="/icons/ic-down-fill.svg"
                  alt="image-down"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div style={{ flex: "1", paddingLeft: "10px" }}>
                <input
                  type="number"
                  className={styles.containerFormInputPhone}
                  placeholder={"Số điện thoại"}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-", "."].includes(e.key) &&
                    e.preventDefault()
                  }
                />
              </div>
            </div>
          ) : (
            <div className={styles.containerFormElement}>
              <input
                type="text"
                className={styles.containerFormInputEmail}
                placeholder={"Email"}
              />
            </div>
          )}
          <div className={styles.containerFormElement}>
            <div style={{ flex: "1" }}>
              <input
                type={passwordType ? "text" : "password"}
                className={styles.containerFormInputEmail}
                placeholder={"Mật khẩu"}
              />
            </div>
            <div
              className={`background-image ${styles.containerImage} cursor-pointer`}
              onClick={() => setPasswordType(!passwordType)}
            >
              <Image
                src={
                  passwordType
                    ? "/icons/ic-eye.svg"
                    : "/icons/ic-eye-closed.svg"
                }
                alt="image-eye"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <button
            type="button"
            className={styles.containerFormForgot}
            onClick={() => setModaForgotPassword(true)}
          >
            Quên mật khẩu?
          </button>
          <button type="submit" className={styles.containerFormLogin}>
            Đăng nhập
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
        </form>
      </div>
      {modalForgotPassword && (
        <ModalForgotPassword closeModal={() => setModaForgotPassword(false)} />
      )}
    </>
  );
};

export default ModalLogin;
