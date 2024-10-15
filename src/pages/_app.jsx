import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie"; 
import { userLoggedIn } from "@/redux/features/auth/authSlice"; 
import '../styles/index.scss';

// Bootstrap JS and Modal setup
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
  ReactModal.setAppElement("body");
}

// Google OAuth setup
const NEXT_PUBLIC_GOOGLE_CLIENT_ID = '23455951198-r713jg4kfn9bnp8bs2trs5kk92tfubef.apps.googleusercontent.com';

// Component to hydrate Redux state on load
function HydrateAuthState() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null;

    if (userInfo) {
      dispatch(
        userLoggedIn({
          accessToken: userInfo.accessToken,
          user: userInfo.user,
        })
      );
    }
  }, [dispatch]);

  return null; 
}

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <div id="root">
          {/* Hydrate Redux state from cookies */}
          <HydrateAuthState />
          <Component {...pageProps} />
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}
