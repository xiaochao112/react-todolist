import {
  Form,
  Input,
  Select,
  Modal,
  Button,
  Space,
  message,
  DatePicker,
  DatePickerProps,
} from 'antd';
import { useEffect } from 'react';
import { addTaskType, updateTaskType } from '@api/task/taskType';
import { useStateTaskTypeList } from '@store/hook/task';

type TPorps = {
  type: 'add' | 'edit';
  show: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};
const TaskModal = ({ type, show, handleCancel, handleOk }: TPorps) => {
  const [form] = Form.useForm();
  const taskTypeList = useStateTaskTypeList();

  const onFinish = async () => {
    const data = form.getFieldsValue();
    if (type === 'add') {
      const res = await addTaskType(data);
      if (res.code === 200) {
        message.success('添加成功！');
        form.resetFields();
        handleCancel(); // 关闭模拟框
        handleOk(); // 触发刷新任务列表
      }
    } else {
      const res = await updateTaskType({ ...data, typeId: 1 });
      if (res.code === 200) {
        message.success('更新成功！');
        form.resetFields();
        handleCancel();
        handleOk();
      }
    }
    // await addTaskType()
  };

  // useEffect(() => {
  //   if (!show) {
  //     form.resetFields();
  //   }
  // }, [show, form]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Modal
        title={type === 'add' ? '添加任务' : '编辑任务'}
        open={show}
        onCancel={() => {
          handleCancel();
          form.resetFields();
        }}
        footer={
          <div className='flex justify-end w-full'>
            <Button type='primary' onClick={form.submit}>
              {type === 'add' ? '添加任务' : '编辑任务'}
            </Button>
          </div>
        }>
        <Form form={form} className='login-form' onFinish={onFinish}>
          <Form.Item name='taskName' rules={[{ required: true, message: '请输入任务名称' }]}>
            <Input placeholder='类型名称' />
          </Form.Item>
          <Form.Item name='taskContent' rules={[{ required: true, message: '请输入任务描述!' }]}>
            <Input placeholder='描述信息' />
          </Form.Item>
          <Space>
            <Form.Item name='expectTime'>
              <DatePicker style={{ width: 200 }} onChange={onChange} placeholder='选择时间' />
            </Form.Item>
            <Form.Item name='typeId'>
              <Select style={{ width: 200 }} placeholder='选择任务类型'>
                {taskTypeList.map((item) => {
                  return (
                    <Select.Option value={item.typeId} key={item.typeId}>
                      {item.typeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default TaskModal;
