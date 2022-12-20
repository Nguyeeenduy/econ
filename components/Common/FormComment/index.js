import Image from "next/image";
import React from "react";
import styles from "./styles/styles.module.scss";
const FormComment = ({ submitComment, submitCommentNotLogin, isLogin }) => {
  const [contentComment, setContentComment] = React.useState(null);
  const [nameConment, setNameComment] = React.useState(null);
  const [emailComment, setEmailComment] = React.useState(null);
  const [dataUser, setDataUser] = React.useState(null);
  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setDataUser(foundUser);
    }
  }, []);
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const handleChangeComment = (e) => {
    setContentComment(e?.target?.value);
  };
  const handleChangeName = (e) => {
    setNameComment(e?.target?.value);
  };
  const handleChangeEmail = (e) => {
    setEmailComment(e?.target?.value);
  };
  const handleSubmitComment = () => {
    submitComment(contentComment);
    setContentComment(null);
  };
  const handleSubmitCommentNotLogin = () => {
    submitCommentNotLogin({
      content: contentComment,
      author: { id: emailComment, name: nameConment, email: emailComment },
    });
    setContentComment(null);
  };
  return (
    <form style={{ margin: "20px 0" }}>
      <textarea
        name="content"
        placeholder={"Bình luận của bạn"}
        className={styles.containerCommentInput}
        value={contentComment || ""}
        onChange={(e) => handleChangeComment(e)}
      />
      <div
        className={`${styles.containerCommentInfo} ${
          isLogin ? "justify-content-end" : "justify-content-between"
        }`}
      >
        {!isLogin ? (
          <>
            <input
              type={"text"}
              placeholder={"Email"}
              className={styles.containerCommentInfoInput}
              onChange={(e) => handleChangeEmail(e)}
            />
            <input
              type={"text"}
              placeholder={"Họ và tên"}
              className={styles.containerCommentInfoInput}
              onChange={(e) => handleChangeName(e)}
            />
          </>
        ) : (
          <>
            <div
              className={`${styles.containerCommentAvatar} background-image position-relative`}
            >
              {dataUser?.avatar?.url && (
                <Image src={dataUser?.avatar?.url} alt="icon" layout="fill" />
              )}
            </div>
            <p className={styles.containerCommentUserName}>
              {dataUser?.username}
            </p>
          </>
        )}
        <button
          type="button"
          className={styles.containerCommentButton}
          disabled={
            isLogin
              ? !contentComment
              : !contentComment || !nameConment || !isValidEmail(emailComment)
          }
          onClick={() =>
            isLogin ? handleSubmitComment() : handleSubmitCommentNotLogin()
          }
        >
          Gửi
        </button>
      </div>
    </form>
  );
};
export default FormComment;
