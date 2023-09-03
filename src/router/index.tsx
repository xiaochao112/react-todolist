import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyHome from '@/pages/home';
import NavBer from '@/components/NavBer/NavBer';

function MyRouter() {
  return (
    <>
      <Router>
        <NavBer></NavBer>
        <Routes>
          <Route path='/' element={<MyHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default MyRouter;
