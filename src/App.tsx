import { HashRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Home from "./pages/Home";
import CredentialVerification from "./pages/CredentialVerification";

export default function App() {
  useTheme();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credentials" element={<CredentialVerification />} />
      </Routes>
    </HashRouter>
  );
}
