import { Form, Input, Select, Modal, Button, Space, message } from 'antd';
import Icon, * as icons from '@ant-design/icons';
import { TaskType } from '@api/task/taskType/type';
import { useEffect } from 'react';
import { addTaskType, updateTaskType } from '@api/task/taskType';

type TPorps = {
  title: 'add' | 'edit';
  show: boolean;
  handleCancel: () => void;
  typeInfo?: TaskType;
  getTaskTypeList: () => void;
};
const iconlist = Object.keys(icons).filter((item) => {
  // @ts-ignore
  return typeof icons[item] === 'object';
});
const TaskTypeModal = ({ title, show, handleCancel, typeInfo, getTaskTypeList }: TPorps) => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    const data = form.getFieldsValue();
    if (title === 'add') {
      const res = await addTaskType(data);
      if (res.code === 200) {
        message.success('添加成功！');
        getTaskTypeList();
        handleCancel();
      }
    } else {
      const res = await updateTaskType({ ...data, typeId: typeInfo?.typeId });
      if (res.code === 200) {
        message.success('更新成功！');
        getTaskTypeList();
        handleCancel();
      }
    }
    // await addTaskType()
  };

  useEffect(() => {
    if (!show) {
      form.resetFields();
    }
  }, [show, form]);

  useEffect(() => {
    if (typeInfo?.typeId) {
      form.setFieldsValue({
        typeName: typeInfo.typeName,
        desc: typeInfo.desc,
        themeColor: typeInfo.themeColor,
        icon: typeInfo.icon,
      });
    }
  }, [typeInfo, form]);

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
