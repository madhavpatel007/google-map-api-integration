import "./App.css";
import CustomGoogleMap from "./components/CustomGoogleMap/CustomGoogleMap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <CustomGoogleMap />
      <ToastContainer />
    </div>
  );
}

export default App;
