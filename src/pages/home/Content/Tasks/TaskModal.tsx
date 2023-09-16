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
import { useStateTaskTypeList } from '@store/hook/task';
import { addTaskItem, updateTaskItem } from '@api/task';
import { TTaskItem } from '@api/task/type';
import moment from 'moment';

type TPorps = {
  type: 'add' | 'edit';
  show: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  taskIInfo?: TTaskItem;
  currentTaskType?: number;
};
const TaskModal = ({ type, show, handleCancel, handleOk, taskIInfo, currentTaskType }: TPorps) => {
  const [form] = Form.useForm();
  const taskTypeList = useStateTaskTypeList();

  const onFinish = async () => {
    const data = form.getFieldsValue();
    console.log(data, 'data');
    if (type === 'add') {
      data.expectTime = (+data.expectTime).toString();
      const res = await addTaskItem(data);
      if (res.code === 200) {
        message.success('添加成功！');
        form.resetFields();
        handleCancel(); // 关闭模拟框
        handleOk(); // 触发刷新任务列表
      }
    } else {
      const res = await updateTaskItem({ ...data, taskId: taskIInfo.taskId });
      if (res.code === 200) {
        message.success('更新成功！');
        form.resetFields();
        handleCancel();
        handleOk();
      }
    }
  };

  useEffect(() => {
    if (taskIInfo?.taskId) {
      form.setFieldsValue({
        taskName: taskIInfo.taskName,
        taskContent: taskIInfo.taskContent,
        expectTime: moment(+(taskIInfo.expectTime || new Date())),
        typeId: taskIInfo.typeId,
      });
    } else {
      form.setFieldsValue({
        typeId: currentTaskType,
      });
    }
    console.log(taskIInfo);
  }, [taskIInfo, currentTaskType]);
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
