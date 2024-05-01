import { useState } from "react";
import type { TasKStatus } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

export default function AddTask({ status }: { status: TasKStatus }) {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish = (data: { description: string; deadline: string; assignee: string }) => {};

    return (
        <>
            <Button size="small" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} block>
                Add Task
            </Button>
            <Modal title="Add Task" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
                <Form {...{ form, onFinish }} layout="vertical" autoComplete="off" requiredMark="optional">
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <div className="grid grid-cols-2 gap-6">
                        <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item name="assignee" label="Assignee" rules={[{ required: true }]}>
                            <DatePicker className="w-full" />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <div className="mt-2 -mb-4 flex justify-end gap-4">
                            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button htmlType="submit" type="primary">
                                Add Task
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
