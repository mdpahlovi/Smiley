"use client";

import { useState } from "react";
import { columnsData } from "@/constants";
import Column from "@/components/ui/column";
import { DatePicker, Form, Input } from "antd";
import { useTaskStore } from "@/hooks/useTaskHook";
import DeleteTask from "@/components/ui/delete-task";
import { useTaskFormStore } from "@/hooks/useTaskFormHook";
import TaskForm from "@/components/dashboard/tasks/task-form";

export default function Tasks({ userEmail }: { userEmail: string }) {
    const [form] = Form.useForm();
    const [search, setSearch] = useState("");
    const [range, setRange] = useState<[Date, Date] | null>(null);
    const { tasks: allTask, editTask } = useTaskStore();
    const { id, type, closeModal } = useTaskFormStore();

    let tasks = allTask.filter(({ members }) => members.includes(userEmail));

    if (range) tasks = tasks.filter(({ deadline }) => new Date(deadline) >= range[0] && new Date(deadline) <= range[1]);
    if (search) tasks = tasks.filter(({ description }) => description.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div className="mb-4 grid md:grid-cols-[5fr_7fr] gap-6">
                <Input.Search value={search} onChange={(e) => setSearch(e.target.value)} />
                {/* @ts-ignore */}
                <DatePicker.RangePicker value={range} onChange={setRange} />
            </div>
            <div className="min-h-[calc(100vh-16rem)] flex min-[1280px]:grid min-[1280px]:grid-cols-4 gap-6 overflow-auto">
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
