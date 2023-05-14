import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseConfig } from "./config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import MapOperations from "./components/MapOperations/MapOperations";

function App() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return (
    <div className="App">
      <MapOperations />
      <ToastContainer />
    </div>
  );
}

export default App;
