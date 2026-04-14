import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/routes/index";
import ChatPage from "@/routes/chat";
import AdminPage from "@/routes/admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
