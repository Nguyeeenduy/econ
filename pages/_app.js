import "@/public/css/bootstrap.min.css";
import "@/public/css/fontawesome.min.css";
import "@/public/css/remixicon.css";
import "@/public/css/animate.min.css";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Global CSS
import "@/public/css/styles.css";
import "@/public/../assets/styles/styles.scss";

import { SessionProvider } from "next-auth/react"
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
} 
