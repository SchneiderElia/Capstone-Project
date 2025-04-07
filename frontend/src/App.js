import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './home/Home.js'
import Dashboard from './dashboard/dashboard'

import { SnackbarProvider } from 'notistack'


function App() {

  const urlApi = 'http://localhost:4000/api/v1'

  return (
    <SnackbarProvider
      autoHideDuration={5000}
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Home />} />
          <Route path='/signin' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
