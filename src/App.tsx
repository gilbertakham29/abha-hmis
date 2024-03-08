import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PatientDashboard from "./components/PatientDashboard";
import ConsentForm from "./components/ConsentForm";
import ViewList from "./components/ViewList";
//import PatientDashboard from "./components/PatientDashboard";
//import Prscp from "./components/Prscp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/consent" element={<ConsentForm />} />
        <Route path="/viewlist" element={<ViewList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
