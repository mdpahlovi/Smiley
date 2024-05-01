"use client";

import Column from "@/components/ui/column";
import DeleteTask from "@/components/ui/delete-task";
import { useTaskStore } from "@/hooks/useTaskHook";

export default function Board() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Column status="To Do" color="#000000" tasks={tasks} />
            <Column status="In Progress" color="#9b48dd" tasks={tasks} />
            <Column status="Done" color="#22BB33" tasks={tasks} />
            <DeleteTask />
        </>
    );
}
