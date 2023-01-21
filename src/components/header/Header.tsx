import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextConstants from '../../constants/TextConstants'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

const Header = () => {
  const navigate = useNavigate()

  const handleClickSignOut = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {TextConstants.BEE_WEB}
          </Typography>
          <Button onClick={handleClickSignOut} color="inherit">
            {TextConstants.BUTTONS.SIGN_OUT}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
