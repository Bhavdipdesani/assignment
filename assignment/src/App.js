
//** MUI Imports
import Box from '@mui/material/Box';

//** Custom Components Import
import Dashboard from './components/Dashboard';
import Login from './components/Login';

//** Third party Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Protected from './components/Protected';

function App() {
  return (
    <Box className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'
            element={<Protected Component={Dashboard} />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
