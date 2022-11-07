import { Provider } from "react-redux";
import CommonLayout from "../components/CommonLayout";
import Footer from "../components/Footer";
import { store } from "../store/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <CommonLayout>
        <div
          className="px-4 py-5 w-full flex justify-center"
          style={{
            minHeight: "calc(100vh - 64px - 56px)",
          }}
        >
          <Component {...pageProps} />
        </div>
        <Footer />
      </CommonLayout>
    </Provider>
  );
};

export default MyApp;
