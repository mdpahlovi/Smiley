import { Task } from "@/types";

const tasks: Task[] = [
    {
        id: "1",
        description: "Implement user authentication",
        deadline: "2024-05-10T00:00:00.000Z",
        members: ["george.bluth@reqres.in", "janet.weaver@reqres.in", "emma.wong@reqres.in"],
        status: "To Do",
        assignee: "2024-05-01T08:00:00.000Z",
        project: "1",
    },
    {
        id: "2",
        description: "Design product listing page",
        deadline: "2024-05-15T00:00:00.000Z",
        members: ["eve.holt@reqres.in", "charles.morris@reqres.in"],
        status: "To Do",
        assignee: "2024-05-02T08:00:00.000Z",
        project: "1",
    },
    {
        id: "3",
        description: "Create user profile feature",
        deadline: "2024-05-05T00:00:00.000Z",
        members: ["janet.weaver@reqres.in", "emma.wong@reqres.in"],
        status: "To Do",
        assignee: "2024-05-03T08:00:00.000Z",
        project: "2",
    },
    {
        id: "4",
        description: "Implement messaging system",
        deadline: "2024-05-20T00:00:00.000Z",
        members: ["george.bluth@reqres.in", "eve.holt@reqres.in", "tracey.ramos@reqres.in"],
        status: "To Do",
        assignee: "2024-05-04T08:00:00.000Z",
        project: "2",
    },
    {
        id: "5",
        description: "Design course catalog UI",
        deadline: "2024-05-08T00:00:00.000Z",
        members: ["emma.wong@reqres.in", "charles.morris@reqres.in"],
        status: "To Do",
        assignee: "2024-05-05T08:00:00.000Z",
        project: "3",
    },
    {
        id: "6",
        description: "Implement course enrollment system",
        deadline: "2024-05-18T00:00:00.000Z",
        members: ["george.bluth@reqres.in", "janet.weaver@reqres.in", "eve.holt@reqres.in"],
        status: "To Do",
        assignee: "2024-05-06T08:00:00.000Z",
        project: "3",
    },
];

export default tasks;
