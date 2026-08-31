import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home";
import CredentialVerification from "./pages/CredentialVerification";

export default function App() {
  // Initialise theme at the app root so the dark class is applied immediately
  useTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credentials" element={<CredentialVerification />} />
      </Routes>
    </BrowserRouter>
  );
}
