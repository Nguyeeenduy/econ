import React from "react";
import { getInfoContact, sendInfoContact } from "stores/contact";
import styles from "./style/style.module.scss";
const ContentContact = () => {
  const datas = [
    {
      image: "/icons/ic-facebook-one.svg",
      link: "facebook",
    },
    {
      image: "/icons/ic-youtube-one.svg",
      link: "youtube",
    },
    {
      image: "/icons/ic-twitter-one.svg",
      link: "twitter",
    },
    {
      image: "/icons/ic-tiktok-one.svg",
      link: "tiktok",
    },
  ];

  const [error, setError] = React.useState(0);
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPhone, setErrorPhone] = React.useState("");
  const [info, setInfo] = React.useState();
  React.useEffect(async () => {
    const result = await getInfoContact();
    setInfo(result);
  }, []);
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleChangeEmail = (e) => {
    if (!isValidEmail(e.target.value)) setErrorEmail("Email không hợp lệ");
    else setErrorEmail("");
  };
  const handleChangePhone = (e) => {
    if (e.target.value.length !== 10)
      setErrorPhone("Số điện thoại phải là 10 số");
    else setErrorPhone("");
  };
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (
      errorEmail ||
      errorPhone ||
      !e.target.email.value ||
      !e.target.phone.value
    )
      return;
    const result = await sendInfoContact({
      data: {
        email: e.target.email.value,
        phone: e.target.phone.value,
        title: e.target.title.value,
        content: e.target.content.value,
      },
    });
    if (result) setError(1);
    else setError(2);
  };
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  return (
    <div className={`${styles.container} container`}>
      <div className={styles.containerLeft}>
        <form
          className={styles.containerLeftForm}
          onSubmit={(e) => handleSubmitContact(e)}
        >
          <div className={styles.containerLeftFormInfo}>
            <h2 className={styles.containerLeftTitle}>Email</h2>
            <input
              type={"text"}
              placeholder={"Điền email của bạn"}
              className={styles.containerLeftInput}
              name={"email"}
              required
              onChange={(e) => handleChangeEmail(e)}
            />
            {errorEmail && (
              <p className={styles.containerError}>{errorEmail}</p>
            )}
          </div>
          <div className={styles.containerLeftFormInfo}>
            <h2 className={styles.containerLeftTitle}>Số điện thoại</h2>
            <input
              type={"number"}
              placeholder={"Số điện thoại"}
              className={styles.containerLeftInput}
              name={"phone"}
              required
              onKeyDown={(e) =>
                exceptThisSymbols.includes(e.key) && e.preventDefault()
              }
              onChange={(e) => handleChangePhone(e)}
            />
            {errorPhone && (
              <p className={styles.containerError}>{errorPhone}</p>
            )}
          </div>
          <div className={styles.containerLeftFormContent}>
            <h2 className={styles.containerLeftTitle}>Tiêu đề</h2>
            <input
              type={"text"}
              placeholder={"Tiêu đề"}
              className={styles.containerLeftInput}
              name={"title"}
            />
          </div>
          <div className={styles.containerLeftFormContent}>
            <h2 className={styles.containerLeftTitle}>Nội dung</h2>
            <textarea
              placeholder={"Nội dung"}
              className={styles.containerLeftInput}
              name={"content"}
              style={{ height: "100px" }}
            />
          </div>
          {error === 1 && (
            <p className={styles.containerSuccess}>
              Gửi thông tin liên hệ thành công
            </p>
          )}
          {error === 2 && (
            <p className={styles.containerErrorSend}>
              Gửi thông tin liên hệ thất bại
            </p>
          )}
          <button type={"submit"} className={styles.containerLeftButton}>
            Gửi
          </button>
        </form>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.containerRightBackground}>
          <h2 className={styles.containerRightTitle}>Kết nối với chúng tôi</h2>
          {datas.map((data, index) => {
            return (
              <div
                className={`d-flex align-items-center ${styles.containerRightElement}`}
                key={index}
              >
                <div
                  className={`background-image ${styles.containerRightImage}`}
                  style={{ backgroundImage: `url(${data.image})` }}
                />
                <a
                  className={styles.containerRightLink}
                  href={info?.data?.attributes?.[data.link]}
                >
                  {info?.data?.attributes?.[data.link]}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentContact;
