import { Task } from "@/types";
import { create } from "zustand";
import tasks from "@/data/tasks";

type TaskStore = {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (data: Omit<Task, "id">) => void;
    deleteTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()((set) => ({
    tasks,
    setTasks: (tasks) => set({ tasks }),
    addTask: (data) => set(({ tasks }) => ({ tasks: [...tasks, { id: (tasks.length + 2).toString(), ...data }] })),
    deleteTask: (id) => set(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== id) })),
}));
