import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { InvitePage } from './pages/InvitePage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to="/couple" replace />} />
        <Route path="/couple" element={<InvitePage variant="couple" />} />
        <Route path="/parents" element={<InvitePage variant="parents" />} />
      </Routes>
    </BrowserRouter>
  )
}
