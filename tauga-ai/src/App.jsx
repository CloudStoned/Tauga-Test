import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import UserChat from './pages/UserChat.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div id="app-root" data-theme="system">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<UserChat />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
