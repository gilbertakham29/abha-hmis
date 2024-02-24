import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./components/PatientDashboard";
import ConsentForm from "./components/ConsentForm";
//import PatientDashboard from "./components/PatientDashboard";
//import Prscp from "./components/Prscp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/consent" element={<ConsentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
