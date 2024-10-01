import store from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react"; // Import useEffect
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie"; // Import js-cookie
import { userLoggedIn } from "@/redux/features/auth/authSlice"; // Import userLoggedIn action
import '../styles/index.scss';

// Bootstrap JS and Modal setup
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
  ReactModal.setAppElement("body");
}

// Stripe initialization
const NEXT_PUBLIC_STRIPE_KEY = 'pk_test_51NYXCFGndYsQkAEFifIbJH64sZFMDpF7DcLYvUUN2az3VdK1M7qVPo7Z2j9rhunf3Pd0C3aFLENIxFriJWwx1P6a00lQFqaoc6';
const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_KEY);

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

  return null; // This component doesn't render any UI
}

export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <div id="root">
            {/* Hydrate Redux state from cookies */}
            <HydrateAuthState />
            <Component {...pageProps} />
          </div>
        </Elements>
      </Provider>
    </GoogleOAuthProvider>
  );
}
