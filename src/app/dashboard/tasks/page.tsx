"use client";

import Column from "@/components/ui/column";
import DeleteTask from "@/components/ui/delete-task";
import { useTaskStore } from "@/hooks/useTaskHook";

export default function Board() {
    const { tasks } = useTaskStore();

    return (
        <>
            <Column status="To Do" headingColor="text-yellow-500" tasks={tasks} />
            <Column status="In Progress" headingColor="text-blue-500" tasks={tasks} />
            <Column status="Done" headingColor="text-emerald-500" tasks={tasks} />
            <DeleteTask />
        </>
    );
}
