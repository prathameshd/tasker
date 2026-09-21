import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Nav from './components/Nav/Nav'
import RouterProvider from './router/RouterProvider'
import './App.scss'

function App() {
  const { isLoading, isAuthenticated, error, loginWithRedirect, user } = useAuth0()

  const login = () => loginWithRedirect()
  const signup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })

  useEffect(() => {
    console.log(user)
  }, [user])

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
      <Nav />
      <div className="app-content">
        <div className="app">
          <RouterProvider />
        </div>
      </div>
    </div>
  )
}

export default App
