import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EventView from './componenets/Event_View'
import Home from './componenets/EventCalendar_Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/getEvents'} element={<EventView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
