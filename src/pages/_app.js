import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/globals.scss";

import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
