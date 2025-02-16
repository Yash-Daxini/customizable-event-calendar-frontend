import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/LoginForm'
import SignUp from './components/SignupForm'
import AuthProvider from './hooks/AuthProvider'
import PrivateRoute from './hooks/PrivateRoute'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import CalendarView from './components/CalendarView'
import EventForm from './components/EventForm'
import { ADD_EVENT_URL, DASHBOARD_URL, EVENT_DETAIL_URL, GET_EVENTS_URL, HOME_URL, LANDING_PAGE_URL, LOGIN_URL, SIGNUP_URL } from './constants/RouteConstants'
import EventDetail from './components/EventDetail'
import LoginProvider from './hooks/LoginProvider'
import { AlertProvider } from './hooks/AlertProvider'
import { ModalProvider } from './hooks/ModalProvider'
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <AuthProvider>
          <AlertProvider>
            <ModalProvider>
              <Routes>
                <Route path={LANDING_PAGE_URL} element={<Home />}></Route>
                <Route path={LOGIN_URL} element={<Login />} />
                <Route path={SIGNUP_URL} element={<SignUp />} />
                <Route element={<PrivateRoute />}>
                  <Route path={HOME_URL} element={<Layout />}>
                    <Route path={DASHBOARD_URL} element={<Dashboard />} />
                    <Route path={GET_EVENTS_URL} element={<CalendarView />} />
                    <Route path={ADD_EVENT_URL} element={<EventForm />} />
                    <Route path={EVENT_DETAIL_URL} element={<EventDetail />} />
                  </Route>
                </Route>
              </Routes>
            </ModalProvider>
          </AlertProvider>
        </AuthProvider>
      </LoginProvider>
    </BrowserRouter>
  )
}

export default App
