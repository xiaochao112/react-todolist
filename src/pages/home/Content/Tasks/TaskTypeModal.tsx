import { Form, Input, Select, Modal, Button, Space } from 'antd';
import Icon, * as icons from '@ant-design/icons';

type TPorps = {
  title: 'add' | 'edit';
  show: boolean;
  handleCancel: () => void;
  onFinish: (values: any) => void;
};
const iconlist = Object.keys(icons).filter((item) => {
  // @ts-ignore
  return typeof icons[item] === 'object';
});
const TaskTypeModal = ({ title, show, handleCancel, onFinish }: TPorps) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={title === 'add' ? '添加类型' : '编辑类型'}
        open={show}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-end w-full'>
            <Button type='primary' onClick={form.submit}>
              {title === 'add' ? '添加类型' : '编辑类型'}
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
                {iconlist.map((item) => {
                  return (
                    <Select.Option value={item} key={item}>
                      <Icon component={(icons as any)[item]} style={{ marginRight: 8 }}></Icon>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name='themeColor'>
              <Input type='color' style={{ width: 100 }} placeholder='选择图标主题色' />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default TaskTypeModal;
