export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    image: string;
}

export interface Project {
    id: string;
    name: string;
    status: string;
    description: string;
    start_date: string;
    end_date: string | null;
    leader: string;
    members: string[];
}

export type TasKStatus = "To Do" | "In Progress" | "Done";

export interface Task {
    id: string;
    description: string;
    deadline: string;
    members: string[];
    status: TasKStatus;
    assignee: string;
    project: string;
}
