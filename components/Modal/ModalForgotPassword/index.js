import router from "next/router";
import React from "react";
import { Login } from "stores/auth";
import Image from "next/image";
//styles
import styles from "./style/style.module.scss";

const ModalForgotPassword = (props) => {
  const [error, setError] = React.useState("");
  const [login, setLogin] = React.useState(false);
  const [passwordType, setPasswordType] = React.useState(false);
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
        <h1 className={styles.containerTitle}>Đặt lại mật khẩu</h1>
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
              {login ? "Đặt lại bằng email" : "Đặt lại bằng số điện thoại"}
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
          <div className={styles.containerFormElement} style={{ padding: 0 }}>
            <div style={{ flex: "1" }}>
              <input
                type={"number"}
                className={styles.containerFormInputEmail}
                style={{ paddingLeft: "14px" }}
                placeholder={"Nhập mã"}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) &&
                  e.preventDefault()
                }
              />
            </div>
            <span className={styles.containerSendCode}>Gửi mã</span>
          </div>
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
          <button type="button" className={styles.containerFormForgot}>
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
    </>
  );
};

export default ModalForgotPassword;
