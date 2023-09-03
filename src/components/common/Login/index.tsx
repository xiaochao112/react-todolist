import { Modal } from 'antd';
import React, { useState } from 'react';
type TProps = {
  show: boolean;
  handleCancel: () => void;
};

const Login = ({ show, handleCancel }: TProps) => {
  const handleOk = () => {
    // handleCancel(false);
    handleCancel();
  };

  return (
    <>
      <Modal title='Basic Modal' open={show} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Login;
