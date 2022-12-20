import router from "next/router";
import React from "react";
import { provinces } from "@/utils/countryCodes";
import { Login } from "stores/auth";
import Image from "next/image";
//styles
import styles from "./style/style.module.scss";
import ModalForgotPassword from "../ModalForgotPassword";

const ModalRegister = (props) => {
  const [error, setError] = React.useState("");
  const [register, setRegister] = React.useState(false);
  const [provinceActive, setProvinceAcvite] = React.useState(false);
  const [province, setProvince] = React.useState("");
  const ref = React.useRef();
  const eventHandler = (event) => {
    if (!ref.current?.contains(event.target)) setProvinceAcvite(false);
  };
  React.useEffect(() => {
    document.addEventListener("click", eventHandler);
    return () => document.removeEventListener("click", eventHandler);
  }, []);
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
        <h1 className={styles.containerTitle}>Đăng ký</h1>
        <form
          className={styles.containerForm}
          // onSubmit={(e) => handleLogin(e)}
        >
          <div className={styles.containerFormHead}>
            <span className={styles.containerFormHeadText}>Họ và tên</span>
          </div>
          <div className={styles.containerFormElement}>
            <input
              type="text"
              className={styles.containerFormInputEmail}
              placeholder={"Họ và tên"}
            />
          </div>
          <div className={styles.containerFormHead}>
            <span className={styles.containerFormHeadText}>Tỉnh/Thành phố</span>
          </div>
          <div
            className={`${styles.containerFormElement} cursor-pointer position-relative`}
            onClick={() => setProvinceAcvite(!provinceActive)}
            ref={ref}
          >
            <div style={{ flex: "1" }}>
              <span className={styles.containerFormInputProvince}>
                {province || "Tỉnh/Thành phố"}
              </span>
            </div>
            <div
              className={`background-image ${styles.containerImage} cursor-pointer`}
            >
              <Image
                src={"/icons/ic-down-fill.svg"}
                alt="image-eye"
                layout="fill"
                objectFit="cover"
              />
            </div>
            {provinceActive && (
              <div className={styles.containerProvince}>
                {provinces.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={() => setProvince(item.name)}
                      className={styles.containerProvinceElement}
                    >
                      {item.name}
                    </p>
                  );
                })}
                <p className={styles.containerProvinceElement}></p>
              </div>
            )}
          </div>
          <div className={styles.containerFormHead}>
            <span className={styles.containerFormHeadText}>Ngày sinh</span>
          </div>
          <div className={styles.containerFormElement}>
            <input
              type="date"
              className={styles.containerFormInputEmail}
              placeholder={"Ngày sinh"}
            />
          </div>
          <div className={styles.containerFormHead}>
            <span className={styles.containerFormHeadText}>
              {register ? "Điện thoại" : "Email"}
            </span>
            <button
              className={styles.containerFormHeadButton}
              type={"button"}
              onClick={() => setRegister(!register)}
            >
              {register ? "Đăng ký bằng email" : "Đăng ký bằng số điện thoại"}
            </button>
          </div>
          {register ? (
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
          <button type="submit" className={styles.containerFormLogin}>
            Đăng nhập
          </button>
          <div className={styles.containerText}>
            <span className={styles.containerTextLeft}>
              Bạn đã có tài khoản?
            </span>
            <span
              className={styles.containerTextRight}
              onClick={() => router.push("/dang-ky")}
            >
              Đăng nhập
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default ModalRegister;
