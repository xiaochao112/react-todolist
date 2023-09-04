import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import Login from './Login';
import Register from './Register';
type TProps = {
  show: boolean;
  handleCancel: () => void;
};

const LoginAndRegister = ({ show, handleCancel }: TProps) => {
  const [modalType, setModalType] = useState<'Login' | 'Register'>('Login');
  useEffect(() => {
    if (show) {
      setModalType('Login');
    }
  }, [show]);

  return (
    <>
      <Modal
        title={modalType === 'Login' ? '用户登录' : '用户注册'}
        open={show}
        onCancel={handleCancel}
        footer={null}>
        {modalType === 'Login' ? (
          <Login setModalType={() => setModalType('Register')} onClose={handleCancel} />
        ) : (
          <Register setModalType={() => setModalType('Login')} onClose={handleCancel} />
        )}
      </Modal>
    </>
  );
};

export default LoginAndRegister;
