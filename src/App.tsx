import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './components/authentication/SignIn'
import SignUp from './components/authentication/SignUp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
