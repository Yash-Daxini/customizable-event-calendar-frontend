import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/LoginForm'
import SignUp from './components/SignupForm'
import AuthProvider from './hooks/AuthProvider'
import PrivateRoute from './hooks/PrivateRoute'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import CalendarView from './components/CalendarView'
import EventForm from './components/EventForm'
import { ADD_EVENT_URL, EVENT_DETAIL_URL, GET_EVENTS_URL, HOME_URL, LOGIN_URL, SIGNUP_URL } from './constants/RouteConstants'
import EventDetail from './components/EventDetail'
import LoginProvider from './hooks/LoginProvider'
import { AlertProvider } from './hooks/AlertProvider'

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <AlertProvider>
          <AuthProvider>
            <Routes>
              <Route path={LOGIN_URL} element={<Login />} />
              <Route path={SIGNUP_URL} element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path={HOME_URL} element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path={GET_EVENTS_URL} element={<CalendarView />} />
                  <Route path={ADD_EVENT_URL} element={<EventForm />} />
                  <Route path={EVENT_DETAIL_URL} element={<EventDetail />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </AlertProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
