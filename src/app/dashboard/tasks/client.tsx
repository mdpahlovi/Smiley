"use client";

import { DatePicker, Form, Input } from "antd";
import { columnsData } from "@/constants";
import Column from "@/components/ui/column";
import { useTaskStore } from "@/hooks/useTaskHook";
import DeleteTask from "@/components/ui/delete-task";
import { useTaskFormStore } from "@/hooks/useTaskFormHook";
import TaskForm from "@/components/dashboard/tasks/task-form";

export default function Tasks({ userEmail }: { userEmail: string }) {
    const [form] = Form.useForm();
    const { tasks: allTask, editTask } = useTaskStore();
    const { id, type, closeModal } = useTaskFormStore();

    const tasks = allTask.filter(({ members }) => members.includes(userEmail));

    return (
        <>
            <div className="mb-4 grid grid-cols-3 gap-6">
                <Input.Search />
                <DatePicker />
                <DatePicker />
            </div>
            <div className="min-h-[calc(100vh-16rem)] grid grid-cols-4 gap-6 overflow-auto">
                {columnsData.map(({ status, color }, idx) => (
                    <Column key={idx} {...{ status, color, tasks, form }} />
                ))}
                <DeleteTask />
            </div>

            <TaskForm
                form={form}
                onFinish={(value) => {
                    if (id && type === "Edit Task") {
                        editTask({ id, ...value });
                        form.resetFields();
                        closeModal();
                    }
                }}
            />
        </>
    );
}
