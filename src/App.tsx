import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './componenets/LoginForm'
import SignUp from './componenets/SignupForm'
import AuthProvider from './hooks/AuthProvider'
import PrivateRoute from './hooks/PrivateRoute'
import Layout from './componenets/Layout'
import Dashboard from './componenets/Dashboard'
import CalendarView from './componenets/CalendarView'
import EventForm from './componenets/AddEvent'
import { ADD_EVENT_URL, GET_EVENTS_URL, HOME_URL, LOGIN_URL, SIGNUP_URL } from './constants/RouteConstants'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={LOGIN_URL} element={<Login />} />
          <Route path={SIGNUP_URL} element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path={HOME_URL} element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path={GET_EVENTS_URL} element={<CalendarView />} />
              <Route path={ADD_EVENT_URL} element={<EventForm />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
