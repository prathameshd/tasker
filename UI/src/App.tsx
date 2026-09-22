import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Nav from './components/Nav/Nav'
import RouterProvider from './router/RouterProvider'
import { useAuthFetch } from './hooks/useAuthFetch'
import type { User } from '../../Shared/User'
import './App.scss'

function App() {
  const { isLoading, isAuthenticated, error, loginWithRedirect, user } = useAuth0()
  const authFetch = useAuthFetch()
  const [dbUser, setDbUser] = useState<User | null>(null)
  const [taskRefreshKey, setTaskRefreshKey] = useState(0)

  const login = () => loginWithRedirect()
  const signup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })
  const handleTaskCreated = () => setTaskRefreshKey((key) => key + 1)

  useEffect(() => {
    if (!isAuthenticated || !user?.email) return

    authFetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: user.name, email: user.email }),
    })
      .then((res) => res.json())
      .then(setDbUser)
      .catch((err) => console.error('Failed to sync user', err))
  }, [isAuthenticated, user, authFetch])

  if (isLoading) {
    return (
      <Box className="auth-gate">
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  if (!isAuthenticated) {
    return (
      <Box className="auth-gate">
        <Typography variant="h5" className="auth-gate__title">
          Welcome to Tasker
        </Typography>
        {error && (
          <Typography color="error" className="auth-gate__error">
            Error: {error.message}
          </Typography>
        )}
        <Box className="auth-gate__actions">
          <Button variant="contained" onClick={login}>
            Login
          </Button>
          <Button variant="outlined" onClick={signup}>
            Signup
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <div className="app-shell">
      <Nav dbUser={dbUser} onTaskCreated={handleTaskCreated} />
      <div className="app-content">
        <div className="app">
          <RouterProvider dbUser={dbUser} taskRefreshKey={taskRefreshKey} />
        </div>
      </div>
    </div>
  )
}

export default App
