import { login } from '@api/user';
import { TUserLoginParams } from '@api/user/type';
import { Form, Input, Button, message, FormInstance } from 'antd';
import { encrypt, setKey } from '@utils';
import { useDispatchUser } from '@store/hook';
import { userInfo } from '@store/user/type';
import { useState } from 'react';

type TProps = {
  setModalType: () => void;
  onClose: () => void;
};
type PUseLoginType = {
  stateSetUser: (info: userInfo) => {
    info: userInfo;
  };
  form: FormInstance<TUserLoginParams>;
  onClose: () => void;
};
type TResLogin = [btnLoad: boolean, onFinish: (values: TUserLoginParams) => Promise<void>];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function useLogin({ stateSetUser, onClose, form }: PUseLoginType): TResLogin {
  const [btnLoad, setBtnLoad] = useState(false);
  const onFinish = async (values: TUserLoginParams) => {
    setBtnLoad(true);
    try {
      values.password = await encrypt(values.password);
      const res = await login(values);
      if (res.code === 200) {
        message.success(res.msg);
        const info = res.result.user;
        stateSetUser(info);
        setKey('token', res.result.token);
        setBtnLoad(false);
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.log(error);
      setBtnLoad(false);
    }
  };
  return [btnLoad, onFinish];
}

const Login = ({ setModalType, onClose }: TProps) => {
  const [form] = Form.useForm();
  const { stateSetUser } = useDispatchUser(); // 设置用户信息
  const [btnLoad, onFinish] = useLogin({ stateSetUser, form, onClose });
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
            确定
          </Button>

          <Button
            type='link'
            htmlType='button'
            onClick={() => {
              setModalType();
              form.resetFields();
            }}>
            没有账号 立即注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
