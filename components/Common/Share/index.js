import { useRouter } from "next/router";
import React from "react";
import styles from "./style/style.module.scss";

const Share = (props) => {
  const { className, handleUpdateBlog } = props;
  const router = useRouter();
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.containerText}>Chia sẻ</div>
      <div className={styles.containerImages}>
        <a
          href={`https://www.facebook.com/sharer.php?u=${
            process.env.URL + router.asPath
          }`}
          target="_blank"
          onClick={handleUpdateBlog}
        >
          <div
            className={styles.containerImage}
            style={{ backgroundImage: `url('/icons/ic-facebook-green.svg')` }}
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${
            process.env.URL + router.asPath
          }`}
          target="_blank"
          onClick={() => handleUpdateBlog()}
        >
          <div
            className={styles.containerImage}
            style={{ backgroundImage: `url('/icons/ic-twitter-green.svg')` }}
          />
        </a>
        <a
          href={`http://www.linkedin.com/shareArticle?mini=true&url=${
            process.env.URL + router.asPath
          }`}
          target="_blank"
          onClick={() => handleUpdateBlog()}
        >
          <div
            className={styles.containerImage}
            style={{
              backgroundImage: `url('/icons/ic-in.svg')`,
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default Share;
