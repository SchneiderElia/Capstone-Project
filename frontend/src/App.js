import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './home/Home.jsx'
import HomeNew from './home/HomeNew.jsx'
import Dashboard from './dashboard/dashboard'
import DashboardBlock from './dashboardBlock/dashboardBlock.jsx'
import AuthCallback from './home/AuthCallback.jsx'


import { SnackbarProvider } from 'notistack'




function App() {

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
          <Route path='/' element={<HomeNew />} />
          <Route path='/login' element={<HomeNew />} />
          <Route path='/signin' element={<HomeNew />} />
          <Route path='/auth/google/callback' element={<AuthCallback />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path= '/dashboard/block/:id' element={<DashboardBlock />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
