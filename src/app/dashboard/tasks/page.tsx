"use client";

import { motion } from "framer-motion";
import { useState, DragEvent } from "react";
import type { Task, TasKStatus } from "@/types";
import { DeleteOutlined, FireFilled, PlusOutlined } from "@ant-design/icons";
import { useTaskStore } from "@/hooks/useTaskHook";
import { Button, Modal } from "antd";
import AddTask from "@/components/dashboard/tasks/add-task";

export default function Board() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Status status="To Do" headingColor="text-yellow-500" tasks={tasks} />
            <Status status="In Progress" headingColor="text-blue-500" tasks={tasks} />
            <Status status="Done" headingColor="text-emerald-500" tasks={tasks} />
            <BurnBarrel />
        </>
    );
}

type StatusProps = {
    headingColor: string;
    tasks: Task[];
    status: TasKStatus;
};

const Status = ({ headingColor, tasks, status }: StatusProps) => {
    const { setTasks } = useTaskStore();
    const [active, setActive] = useState(false);

    const handleDragEnd = (e: DragEvent) => {
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
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{status}</h3>
                <span className="rounded text-sm text-neutral-400">{filteredTasks.length}</span>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
            >
                {filteredTasks.map((task) => (
                    <Task key={task.id} {...task} />
                ))}
                <DropIndicator beforeId={null} status={status} />
                <AddTask status={status} />
            </div>
        </div>
    );
};

const Task = ({ id, description, status }: Task) => {
    return (
        <>
            <DropIndicator beforeId={id} status={status} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                // @ts-ignore
                onDragStart={(e) => e.dataTransfer.setData("id", id)}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
            >
                <p className="text-sm text-neutral-100">{description}</p>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, status }: { beforeId: string | null; status: string }) => {
    return <div data-before={beforeId || "-1"} data-status={status} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />;
};

const BurnBarrel = () => {
    const { deleteTask } = useTaskStore();
    const [active, setActive] = useState(false);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragEnd = (e: DragEvent) => {
        deleteTask(e.dataTransfer.getData("id"));
        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={() => setActive(false)}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
                active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? <FireFilled className="animate-bounce" /> : <DeleteOutlined />}
        </div>
    );
};
