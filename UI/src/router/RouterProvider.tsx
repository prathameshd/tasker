import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import Settings from '../components/Settings/Settings'

export default function RouterProvider() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  )
}
