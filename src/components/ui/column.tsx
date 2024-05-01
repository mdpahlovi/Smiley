import { useState } from "react";
import { motion } from "framer-motion";
import type { Task, TasKStatus } from "@/types";
import { useTaskStore } from "@/hooks/useTaskHook";

type StatusProps = { headingColor: string; tasks: Task[]; status: TasKStatus };

export default function Column({ headingColor, tasks, status }: StatusProps) {
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
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{status}</h3>
                <span className="rounded text-sm text-neutral-400">{filteredTasks.length}</span>
            </div>
            <div
                // @ts-ignore
                onDrop={handleDragEnd}
                // @ts-ignore
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}
            >
                {filteredTasks.map((task) => (
                    <Task key={task.id} {...task} />
                ))}
                <div data-before="-1" data-status={status} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />
            </div>
        </div>
    );
}

const Task = ({ id, description, status }: Task) => {
    return (
        <>
            <div data-before={id} data-status={status} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />
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
