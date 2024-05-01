import dayjs from "dayjs";
import type { Project, Task, TasKStatus } from "@/types";
import type { FormInstance } from "antd";
import type { EditProjectData } from "@/components/dashboard/projects/edit-project";

export const columnsData: { status: TasKStatus; color: string }[] = [
    { status: "To Do", color: "#000000" },
    { status: "In Progress", color: "#9b48dd" },
    { status: "Done", color: "#22BB33" },
];

export const setProjectValues = (form: FormInstance<EditProjectData>, project: Project) => {
    const { name, status, description, start_date, end_date } = project;
    // @ts-ignore
    form.setFieldsValue({ name, status, description, start_date: dayjs(start_date), end_date: end_date ? dayjs(end_date) : undefined });
};

export const setTaskValues = (form: FormInstance<Omit<Task, "id">>, task: Task) => {
    const { status, description, deadline, assignee, members } = task;
    // @ts-ignore
    form.setFieldsValue({ status, description, deadline: dayjs(deadline), assignee: dayjs(assignee), members });
};
