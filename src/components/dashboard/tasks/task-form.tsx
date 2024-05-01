import users from "@/data/users";
import type { Task } from "@/types";
import AddMember from "../projects/add-member";
import { useTaskFormStore } from "@/hooks/useTaskFormHook";
import { Button, DatePicker, Form, FormInstance, Input, Modal, Select } from "antd";

type TaskFormProps = {
    form: FormInstance<Omit<Task, "id">>;
    onFinish: (data: Omit<Task, "id">) => void;
};

export default function TaskForm({ form, onFinish }: TaskFormProps) {
    const { type, state, closeModal } = useTaskFormStore();

    return (
        <Modal title={type} open={state} onCancel={closeModal} footer={false}>
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
                <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="To Do">To Do</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <div className="mt-2 -mb-4 flex justify-end gap-4">
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button htmlType="submit" type="primary">
                            {type}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}
