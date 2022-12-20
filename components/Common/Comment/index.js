import React from "react";
import styles from "./styles/styles.module.scss";
import FormComment from "../FormComment";
import { timeUpdate } from "@/utils/converdate";
import { getUserById } from "stores/user";
const Comment = ({ isLogin, commentList, userList, submitComment }) => {
  const [comment, setComment] = React.useState(null);
  const [avatarList, setAvatarList] = React.useState([]);
  const handleSubmitComment = (content, id) => {
    const payload = {
      content: content,
      threadOf: id,
    };
    submitComment(payload);
  };
  const handleSubmitCommentNotLogin = (submitCommentNotLogin, id) => {
    const payload = {
      content: submitCommentNotLogin.content,
      author: submitCommentNotLogin.author,
      threadOf: id,
    };
    submitComment(payload);
  };
  const getAvatarByUserId = async (id) => {
    commentList.forEach(async (item) => {
      const result = await getUserById(item?.author?.id);
      avatarList.push(result);
      if (item?.gotThread) {
        getAvatarChildByUserId(item?.children);
      }
    });
    const result = await getUserById(id);
  };
  const getAvatarChildByUserId = (children) => {
    children.forEach(async (item) => {
      const result = await getUserById(item?.author?.id);
      getAvatarChildByUserId(item?.children);
    });
  };
  const renderReplyMessage = (repplyMessage, id) => {
    return (
      repplyMessage.length > 0 &&
      repplyMessage.map((item, index) => {
        const avatarUser = userList?.find(
          (user) => item?.author?.id === user?.id
        )?.avatar;
        return (
          <div key={item?.id}>
            <div className="d-flex flex-nowrap overflow-hidden">
              <div style={{ minWidth: "52px" }}>
                {repplyMessage[index + 1] && (
                  <div className={styles.containerCommentLine1}></div>
                )}
              </div>
              <div
                className={`${styles.containerCommentImage} background-image`}
                style={{
                  backgroundImage: `url(${
                    avatarUser
                      ? avatarUser?.url
                      : "/icons/ic-user-no-avatar.svg"
                  })`,
                }}
              >
                <div
                  className={styles.containerCommentLine2}
                  style={{
                    backgroundImage: `url(${"/icons/ic-border-left-bot.svg"})`,
                  }}
                ></div>
              </div>
              <div>
                <span className={styles.containerCommentName}>
                  {item.author?.name}
                </span>
                <p className={styles.containerCommentContent}>
                  {item?.content}
                </p>
                <div className={styles.containerCommentInfo}>
                  {/* <div
                  className={`d-flex align-items-center ${styles.containerCommentInfoElement}`}
                >
                  <div
                    className={`${styles.containerCommentInfoImage} background-image`}
                    style={{
                      backgroundImage: `url("/icons/ic-like.svg")`,
                    }}
                  />
                  <span>100</span>
                </div> */}
                  <span
                    className={styles.containerCommentInfoElement}
                    onClick={() => setComment(id)}
                  >
                    Trả lời
                  </span>
                  <span className={styles.containerCommentInfoElement}>
                    Chia sẻ
                  </span>
                  <span className={styles.containerCommentInfoElement}>
                    {timeUpdate(item?.createdAt)} trước
                  </span>
                </div>
                {comment === `rep${item?.id}` && (
                  <FormComment
                    submitComment={(submitComment) =>
                      handleSubmitComment(submitComment, item?.id)
                    }
                    submitCommentNotLogin={(submitCommentNotLogin) =>
                      handleSubmitCommentNotLogin(
                        submitCommentNotLogin,
                        item?.id
                      )
                    }
                    isLogin={isLogin}
                  />
                )}
              </div>
            </div>
            {item?.gotThread && renderReplyMessage(item?.children)}
          </div>
        );
      })
    );
  };

  return (
    <div className={styles.containerCommentUser}>
      {commentList ? (
        commentList.map((item, index) => {
          const userAvatar = userList?.find(
            (user) => item?.author?.id === user?.id
          )?.avatar;
          return (
            <div key={index}>
              <div className="d-flex flex-nowrap overflow-hidden">
                <div>
                  <div
                    className={`${styles.containerCommentImage} background-image`}
                    style={{
                      backgroundImage: `url(${
                        userAvatar
                          ? userAvatar?.url
                          : "/icons/ic-user-no-avatar.svg"
                      })`,
                    }}
                  />
                  {item?.children?.length > 0 && (
                    <div className={styles.containerCommentLine1}></div>
                  )}
                </div>

                <div className="w-100">
                  <span className={styles.containerCommentName}>
                    {item?.author?.name}
                  </span>
                  <p className={styles.containerCommentContent}>
                    {item?.content}
                  </p>
                  <div className={styles.containerCommentInfo}>
                    {/* <div
                    className={`d-flex align-items-center ${styles.containerCommentInfoElement}`}
                  >
                    <div
                      className={`${styles.containerCommentInfoImage} background-image`}
                      style={{
                        backgroundImage: `url("/icons/ic-like.svg")`,
                      }}
                    />
                    <span>100</span>
                  </div> */}
                    <span
                      className={styles.containerCommentInfoElement}
                      onClick={() => setComment(item?.id)}
                    >
                      Trả lời
                    </span>

                    <span className={styles?.containerCommentInfoElement}>
                      Chia sẻ
                    </span>
                    <span className={styles?.containerCommentInfoElement}>
                      {timeUpdate(item?.createdAt)} trước
                    </span>
                  </div>
                  {comment === item?.id && (
                    <FormComment
                      submitComment={(submitComment) =>
                        handleSubmitComment(submitComment, item?.id)
                      }
                      submitCommentNotLogin={(submitCommentNotLogin) =>
                        handleSubmitCommentNotLogin(
                          submitCommentNotLogin,
                          item?.id
                        )
                      }
                      isLogin={isLogin}
                    />
                  )}
                </div>
              </div>
              {item?.gotThread && renderReplyMessage(item?.children, item?.id)}
            </div>
          );
        })
      ) : (
        <div>Chưa có bình luận nào</div>
      )}
    </div>
  );
};

export default Comment;
