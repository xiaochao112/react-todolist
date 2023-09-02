import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MyHome from '@/pages/home';

function MyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MyHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default MyRouter;
