import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { InvitePage } from './pages/InvitePage'

/** React Router basename: leading slash only (no trailing slash) */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={routerBasename === '/' ? undefined : routerBasename}>
      <Routes>
        <Route path="/" element={<InvitePage variant="couple" />} />
        <Route path="/couple" element={<InvitePage variant="couple" />} />
        <Route path="/parents" element={<InvitePage variant="parents" />} />
      </Routes>
    </BrowserRouter>
  )
}
