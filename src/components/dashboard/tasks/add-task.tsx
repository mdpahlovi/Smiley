import { useState } from "react";
import type { Task, TasKStatus } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import AddMember from "../projects/add-member";
import users from "@/data/users";
import { useProjectStore } from "@/hooks/useProjectHook";

export default function AddTask({ status }: { status: TasKStatus }) {
    const { projects } = useProjectStore();
    const [form] = Form.useForm<Omit<Task, "id">>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish = (data: Omit<Task, "id">) => {
        console.log(data);
    };

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
                    <Form.Item name="members" label="Members" rules={[{ required: true }]}>
                        <AddMember
                            options={users}
                            value={form.getFieldValue("members")}
                            onChange={(value) => form.setFieldValue("members", value)}
                        />
                    </Form.Item>
                    <Form.Item name="project" label="Project" rules={[{ required: true }]}>
                        <Select>
                            {projects.map((project) => (
                                <Select.Option key={project.id} value={project.id}>
                                    {project.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
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
