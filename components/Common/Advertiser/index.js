import React from "react";
import styles from "./styles/styles.module.scss";
const Advertiser = () => {
  const [showAdv, setShowAdv] = React.useState(false);
  const ref = React.useRef();
  const eventHandler = (event) => {
    if (!ref.current?.contains(event.target)) {
      setShowAdv(false);
    }
  };
  const handleClick = () => {
    setShowAdv(!showAdv);
  };
  React.useEffect(() => {
    document.addEventListener("click", eventHandler);
    return () => document.removeEventListener("click", eventHandler);
  }, [ref]);

  return (
    <div ref={ref} className="position-relative">
      <div className={styles.advertiser} onClick={() => handleClick()}>
        Advertiser disclosure
      </div>
      {showAdv && (
        <>
          <div className={styles.advertiserModal}>
            <h3 className={styles.advertiserTitle}>
              You’re our first priority. Every time.
            </h3>
            <p>
              We believe everyone should be able to make financial decisions
              with confidence. And while our site doesn’t feature every company
              or financial product available on the market, we’re proud that the
              guidance we offer, the information we provide and the tools we
              create are objective, independent, straightforward — and free. So
              how do we make money? Our partners compensate us. This may
              influence which products we review and write about (and where
              those products appear on the site), but it in no way affects our
              recommendations or advice, which are grounded in thousands of
              hours of research. Our partners cannot pay us to guarantee
              favorable reviews of their products or services. Here is a list of
              our partners.
            </p>
          </div>
          <div className={styles.advertiserArrow} />
        </>
      )}
    </div>
  );
};
export default Advertiser;
