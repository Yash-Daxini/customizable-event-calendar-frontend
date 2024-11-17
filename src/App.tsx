import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './componenets/LoginForm'
import SignUp from './componenets/SignupForm'
import AuthProvider from './hooks/AuthProvider'
import PrivateRoute from './hooks/PrivateRoute'
import Layout from './componenets/Layout'
import Dashboard from './componenets/Dashboard'
import CalendarView from './componenets/CalendarView'
import AddEvent from './componenets/AddEvent'

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={'/Login'} element={<Login />} />
            <Route path={'/signup'} element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path={'/getEvents'} element={<CalendarView />} />
                <Route path={'/addEvent'} element={<AddEvent />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
