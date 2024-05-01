import { useEffect, useState } from "react";
import { useTaskStore } from "./useTaskHook";

export function useProgressHook(projectId: string) {
    const { tasks } = useTaskStore();
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const projectTasks = tasks.filter((task) => task.project === projectId);
        if (projectTasks.length) setProgress(0);

        const completedTasks = projectTasks.filter((task) => task.status === "Done");
        setProgress((completedTasks.length / projectTasks.length) * 100);
    }, [projectId, tasks]);

    return progress;
}
