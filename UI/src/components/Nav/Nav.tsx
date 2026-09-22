import { useState } from 'react'
import type { MouseEvent } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { HouseIcon, PlusIcon, GearIcon, UserIcon } from '@phosphor-icons/react'
import NewTask from '../NewTask/NewTask'
import type { NewTaskFields } from '../NewTask/NewTask'
import './Nav.scss'

const topItems: { path?: string; label: string; Icon: typeof HouseIcon }[] = [
  { path: '/', label: 'Home', Icon: HouseIcon },
  { label: 'Add', Icon: PlusIcon },
  { path: '/settings', label: 'Settings', Icon: GearIcon },
]

export default function Nav() {
  const { pathname } = useLocation()
  const { logout } = useAuth0()
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null)
  const [newTaskOpen, setNewTaskOpen] = useState(false)

  const openUserMenu = (event: MouseEvent<HTMLElement>) => setUserMenuAnchor(event.currentTarget)
  const closeUserMenu = () => setUserMenuAnchor(null)

  const handleSaveTask = (task: NewTaskFields) => {
    console.log('New task', task)
  }

  const handleLogout = () => {
    closeUserMenu()
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <Box component="nav" className="nav">
      <Box className="nav__group">
        {topItems.map(({ path, label, Icon }) => {
          const className = `nav__item${path && pathname === path ? ' nav__item--active' : ''}`

          return path ? (
            <IconButton key={label} component={Link} to={path} className={className} aria-label={label}>
              <Icon size={24} />
            </IconButton>
          ) : (
            <IconButton
              key={label}
              className={className}
              aria-label={label}
              onClick={() => setNewTaskOpen(true)}
            >
              <Icon size={24} />
            </IconButton>
          )
        })}
      </Box>

      <Box className="nav__group">
        <IconButton
          className="nav__item"
          aria-label="User"
          aria-controls={userMenuAnchor ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={userMenuAnchor ? 'true' : undefined}
          onClick={openUserMenu}
        >
          <UserIcon size={24} />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={closeUserMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <MenuItem onClick={closeUserMenu}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>

      <NewTask open={newTaskOpen} onClose={() => setNewTaskOpen(false)} onSave={handleSaveTask} />
    </Box>
  )
}
