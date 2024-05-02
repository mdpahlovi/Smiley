"use client";

import { Form } from "antd";
import { useTaskStore } from "@/hooks/useTaskHook";
import { useTaskFormStore } from "@/hooks/useTaskFormHook";
import TaskForm from "@/components/dashboard/tasks/task-form";
import KanbanBoard from "@/components/dashboard/tasks/kanban-board";

export default function Tasks({ userEmail }: { userEmail: string }) {
    const [form] = Form.useForm();
    const { editTask } = useTaskStore();
    const { tasks: allTask } = useTaskStore();
    const { id, type, closeModal } = useTaskFormStore();

    let tasks = allTask.filter(({ members }) => members.includes(userEmail));

    return (
        <>
            <KanbanBoard {...{ tasks, form }} />
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
