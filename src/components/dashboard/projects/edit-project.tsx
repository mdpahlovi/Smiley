import { useProjectStore } from "@/hooks/useProjectHook";
import { Button, DatePicker, Form, type FormInstance, Input, Modal, Select } from "antd";

type EditProjectProps = {
    id: string;
    form: FormInstance<EditProjectData>;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type EditProjectData = { name: string; status: string; start_date: string; end_date: string; description: string };

export default function EditProject({ id, form, isModalOpen, setIsModalOpen }: EditProjectProps) {
    const { editProject } = useProjectStore();

    console.log({ values: form.getFieldsValue() });

    const onFinish = (data: EditProjectData) => {
        editProject({ id, ...data });
        setIsModalOpen(false);
    };

    return (
        <Modal title="Edit Project" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
            <Form {...{ form, onFinish }} layout="vertical" autoComplete="off" requiredMark="optional">
                <div className="grid grid-cols-2 gap-6">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="Planning">Planning</Select.Option>
                            <Select.Option value="In Progress">In Progress</Select.Option>
                            <Select.Option value="Complete">Complete</Select.Option>
                            <Select.Option value="In Review">In Review</Select.Option>
                            <Select.Option value="Delivered">Delivered</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <Form.Item name="start_date" label="Start Date" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item name="end_date" label="End Date" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>
                </div>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <div className="mt-2 -mb-4 flex justify-end gap-4">
                        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button htmlType="submit" type="primary">
                            Edit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}
