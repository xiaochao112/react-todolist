import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyHome from '@pages/home';
import NavBer from '@components/NavBer/NavBer';
import { useState } from 'react';

function MyRouter() {
  const [showTaskModal, setShowTaskModal] = useState(true);
  return (
    <>
      <Router>
        <NavBer
          cancelTaskModal={() => {
            setShowTaskModal(false);
          }}
          onShowTaskModal={() => {
            setShowTaskModal(true);
          }}
        />
        <Routes>
          <Route
            path='/'
            element={
              <MyHome
                showTaskModal={showTaskModal}
                cancelTaskModal={() => {
                  setShowTaskModal(false);
                }}
                onShowTaskModal={() => {
                  setShowTaskModal(true);
                }}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default MyRouter;
