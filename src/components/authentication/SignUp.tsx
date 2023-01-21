import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { Box, Link, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import TextConstants from '../../constants/TextConstants'
import {
  emailValidation,
  passwordValidation
} from '../../validations/autenticationValidations'

const SignUp = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: emailValidation(),
    password: passwordValidation()
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      ;(async function () {
        try {
          await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          )
          navigate('/dashboard')
        } catch (error) {
          alert(error)
        }
      })()
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false
  })

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/dashboard')
      }
    })
  }, [])

  return (
    <Container maxWidth="lg">
      <form
        onSubmit={e => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Card sx={{ maxWidth: 420, marginTop: 25, marginX: 'auto' }}>
          <Box component="div" sx={{ textAlign: 'center', padding: 3 }}>
            <Box component="span" sx={{ fontSize: 22 }}>
              {TextConstants.SIGN_UP.TITLE}
            </Box>
            <Box component="span" sx={{ display: 'block', paddingTop: 1 }}>
              {TextConstants.SIGN_UP.SUB_TITLE}
              <Link href="/">{TextConstants.BUTTONS.SIGN_IN}</Link>
            </Box>
          </Box>

          <CardContent>
            <TextField
              id="email"
              type="text"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email ? formik.errors.email : ''}
              error={formik.touched.email && Boolean(formik.errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.touched.password ? formik.errors.password : ''}
              error={formik.touched.password && Boolean(formik.errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions sx={{ float: 'right' }}>
            <Button type="submit" color="primary">
              {TextConstants.BUTTONS.SIGN_UP}
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}

export default SignUp
