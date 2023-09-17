import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyHome from '@pages/home';
import NavBer from '@components/NavBer/NavBer';
import { useState } from 'react';
import LoginAndRegister from '@components/common/LoginAndRegister';
import { useStateUserInfo } from '@store/hook';

function MyRouter() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [type, setType] = useState<'add' | 'edit'>('add');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const userInfo = useStateUserInfo();

  return (
    <>
      <Router>
        <NavBer
          onShowTaskModal={() => {
            if (userInfo.isLogin) {
              setShowTaskModal(true);
              setType('add');
            } else {
              setIsLoginModalOpen(true);
            }
          }}
          onLogin={() => {
            setIsLoginModalOpen(true);
          }}
        />
        <Routes>
          <Route
            path='/'
            element={
              <MyHome
                onLogin={() => {
                  setIsLoginModalOpen(true);
                }}
                showTaskModal={showTaskModal}
                cancelTaskModal={() => {
                  setShowTaskModal(false);
                }}
                type={type}
                setType={setType}
                onShowTaskModal={() => {
                  if (userInfo.isLogin) {
                    setShowTaskModal(true);
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
              />
            }
          />
        </Routes>
      </Router>
      <LoginAndRegister
        show={isLoginModalOpen}
        handleCancel={() => {
          setIsLoginModalOpen(false);
        }}
      />
    </>
  );
}

export default MyRouter;
