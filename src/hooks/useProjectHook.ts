import { create } from "zustand";
import projects from "@/data/projects";
import type { Project } from "@/types";
import { EditProjectData } from "@/components/dashboard/projects/edit-project";

type ProjectStore = {
    projects: Project[];
    editProject: (data: { id: string } & EditProjectData) => void;
    deleteProject: (id: string) => void;
    addMember: (data: { id: string; email: string }) => void;
};

export const useProjectStore = create<ProjectStore>()((set) => ({
    projects,
    editProject: (data) =>
        set(({ projects }) => ({ projects: projects.map((project) => (project.id === data.id ? { ...project, ...data } : project)) })),
    deleteProject: (id) => set(({ projects }) => ({ projects: projects.filter((project) => project.id !== id) })),
    addMember: (data) =>
        set(({ projects }) => ({
            projects: projects.map((project) =>
                project.id === data.id ? { ...project, members: [...project.members, data.email] } : project
            ),
        })),
}));
