import { Form, Input, Select, Modal, Button, Space } from 'antd';

type TPorps = {
  show: boolean;
  handleCancel: () => void;
  onFinish: (values: any) => void;
};
const TaskTypeModal = ({ show, handleCancel, onFinish }: TPorps) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title='Title'
        open={show}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-end w-full'>
            <Button type='primary' onClick={form.submit}>
              添加类型
            </Button>
          </div>
        }>
        <Form form={form} className='login-form' onFinish={onFinish}>
          <Form.Item name='typeName' rules={[{ required: true, message: '请输入类型名称' }]}>
            <Input placeholder='类型名称' />
          </Form.Item>
          <Form.Item name='desc' rules={[{ required: true, message: '请输入类型描述!' }]}>
            <Input placeholder='描述信息' />
          </Form.Item>
          <Space>
            <Form.Item name='icon'>
              <Select style={{ width: 200 }} placeholder='选择图标'>
                <Select.Option value='demo'>Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='themeColor'>
              <Input type='color' style={{ width: 100 }} placeholder='选择图标颜色' />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default TaskTypeModal;
