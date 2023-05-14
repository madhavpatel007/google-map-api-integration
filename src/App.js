import "./App.css";
import CustomGoogleMap from "./components/CustomGoogleMap/CustomGoogleMap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseConfig } from "./config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return (
    <div className="App">
      <CustomGoogleMap />
      <ToastContainer />
    </div>
  );
}

export default App;
