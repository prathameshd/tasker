import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import Settings from '../components/Settings/Settings'
import type { User } from '../../../Shared/User'

interface RouterProviderProps {
  dbUser: User | null
  taskRefreshKey: number
}

export default function RouterProvider({ dbUser, taskRefreshKey }: RouterProviderProps) {
  return (
    <Routes>
      <Route index element={<Home dbUser={dbUser} refreshKey={taskRefreshKey} />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  )
}
