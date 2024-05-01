import { create } from "zustand";

type TaskFormStore = {
    id: string;
    type: string;
    state: boolean;

    addModal: () => void;
    editModal: (id: string) => void;
    closeModal: () => void;
};

export const useTaskFormStore = create<TaskFormStore>()((set) => ({
    id: "",
    type: "",
    state: false,

    addModal: () => set({ id: "", type: "Add Task", state: true }),
    editModal: (id) => set({ id, type: "Edit Task", state: true }),
    closeModal: () => set({ id: "", type: "", state: false }),
}));
