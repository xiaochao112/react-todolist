import { register } from '@api/user';
import { TUserRegisterParams } from '@api/user/type';
import { Form, Input, Button, message } from 'antd';
import { encrypt } from '@utils';
import { useState } from 'react';

type TProps = {
  setModalType: () => void;
  onClose: () => void;
};
type TResLogin = [btnLoad: boolean, onFinish: (values: TUserRegisterParams) => Promise<void>];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
// 注册
function useRegister(): TResLogin {
  const [btnLoad, setBtnLoad] = useState(false);
  const onFinish = async (values: TUserRegisterParams) => {
    setBtnLoad(true);
    try {
      // values.password = await encrypt(values.password);
      values.password = window.btoa(values.password + 'snow-todolist');
      const res = await register(values);
      if (res.code === 200) {
        message.success(res.result);
        setBtnLoad(false);
      }
    } catch (error) {
      console.log(error);
      setBtnLoad(false);
    }
  };
  return [btnLoad, onFinish];
}

const Register = ({ setModalType }: TProps) => {
  const [form] = Form.useForm();
  const [btnLoad, onFinish] = useRegister();
  const onFinishFailed = (errorInfo: object) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name='basic'
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}>
        <Form.Item
          label='用户名'
          name='username'
          rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='phone'
          rules={[
            { required: true, message: '请输入手机号码！' },
            {
              pattern: /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
              message: '请输入正确的手机号',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码最少6位' },
            { max: 12, message: '密码最多12位' },
          ]}>
          <Input.Password maxLength={12} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' loading={btnLoad}>
            注册
          </Button>

          <Button
            type='link'
            htmlType='button'
            onClick={() => {
              setModalType();
              form.resetFields();
            }}>
            返回登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
