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
    tasks: any[]; // You may want to define a type for tasks as well
}
