import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EventView from './componenets/Event_View'
import Home from './componenets/EventCalendar_Home'
import Login from './componenets/LoginForm'
import SignUp from './componenets/SignupForm'
import AuthProvider from './hooks/AuthProvider'
import PrivateRoute from './hooks/PrivateRoute'
import Layout from './componenets/Layout'

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
                <Route path={`/`} element={<Home />} />
                <Route path={'/getEvents'} element={<EventView />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
