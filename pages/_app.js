import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authenticationlayout from "../shared/layout-components/layout/authentication-layout";
import Contentlayout from "../shared/layout-components/layout/contentlayout";
import "../styles/globals.scss";
import { useEffect } from "react";

const layouts = {
  Contentlayout,
  Authenticationlayout,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = layouts[Component.layout] || (({ children }) => <>{children}</>);

  useEffect(() => {
    import("leaflet/dist/leaflet.css");
    import("filepond/dist/filepond.min.css");
  }, []);

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <NextNProgress color="#FFF" />
      <ToastContainer theme="colored" />
    </SessionProvider>
  );
}

export default MyApp;
