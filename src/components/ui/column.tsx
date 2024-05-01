import dayjs from "dayjs";
import { useState } from "react";
import { motion } from "framer-motion";
import { Text, Title } from "../export";
import type { FormInstance } from "antd";
import type { Task, TasKStatus } from "@/types";
import { useTaskStore } from "@/hooks/useTaskHook";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTaskFormStore } from "@/hooks/useTaskFormHook";

dayjs.extend(localizedFormat);

type StatusProps = { color: string; tasks: Task[]; status: TasKStatus; form: FormInstance<Omit<Task, "id">> };

export default function Column({ color, tasks, status, form }: StatusProps) {
    const { setTasks } = useTaskStore();
    const [active, setActive] = useState(false);

    const handleDragEnd = (e: DragEvent) => {
        if (!e.dataTransfer) return;
        const id = e.dataTransfer.getData("id");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== id) {
            let copy = [...tasks];

            let taskToTransfer = copy.find((c) => c.id === id);
            if (!taskToTransfer) return;
            taskToTransfer = { ...taskToTransfer, status };

            copy = copy.filter((c) => c.id !== id);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(taskToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, taskToTransfer);
            }

            setTasks(copy);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => (i.style.opacity = "0"));
    };

    const highlightIndicator = (e: DragEvent) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY, element: indicators[indicators.length - 1] }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-status="${status}"]`) as unknown as HTMLElement[]);
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredTasks = tasks.filter((c) => c.status === status);

    return (
        <div className="min-w-60 shrink-0">
            <div className="flex items-center justify-between">
                <Title style={{ color }} level={5}>
                    {status}
                </Title>
                <Text style={{ color }}>{filteredTasks.length}</Text>
            </div>
            <div
                // @ts-ignore
                onDrop={handleDragEnd}
                // @ts-ignore
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${active ? "bg-black/5" : ""}`}
            >
                {filteredTasks.map((task) => (
                    <Task key={task.id} {...{ task, form }} />
                ))}
                <div data-before="-1" data-status={status} className="my-0.5 h-0.5 w-full bg-[#9b48dd] opacity-0" />
            </div>
        </div>
    );
}

const Task = ({ task, form }: { task: Task; form: FormInstance<Omit<Task, "id">> }) => {
    const { editModal } = useTaskFormStore();
    const { id, status, description, deadline } = task;

    return (
        <>
            <div data-before={id} data-status={status} className="my-0.5 h-0.5 w-full bg-[#9b48dd] opacity-0" />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                // @ts-ignore
                onDragStart={(e) => e.dataTransfer.setData("id", id)}
                className="relative cursor-grab active:cursor-grabbing flex flex-col gap-1 rounded border bg-black/10 px-4 py-2.5"
            >
                <button
                    className="absolute top-0 right-0 bg-white p-1.5 rounded"
                    onClick={() => {
                        editModal(id);
                        form.setFieldsValue({ status, description });
                    }}
                >
                    <EditOutlined />
                </button>
                <Text strong>{description}</Text>
                <Text className="text-xs">
                    <CalendarOutlined /> Deadline: {dayjs(deadline).format("LL")}
                </Text>
            </motion.div>
        </>
    );
};
