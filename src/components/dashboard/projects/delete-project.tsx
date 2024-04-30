import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useProjectStore } from "@/hooks/useProjectHook";
import { ExclamationCircleFilled } from "@ant-design/icons";

export function useDeleteProject() {
    const { push } = useRouter();
    const { deleteProject } = useProjectStore();

    const confirmDelete = (id: string, redirect?: string) => {
        Modal.confirm({
            title: "Are You Sure?",
            icon: <ExclamationCircleFilled />,
            content: "Do you really want to delete the project?",
            okButtonProps: { type: "primary", children: "Yes", danger: true },
            cancelButtonProps: { children: "No" },
            onOk: () => {
                redirect && push(redirect);
                setTimeout(() => deleteProject(id), redirect ? 500 : 0);
            },
        });
    };

    return { confirmDelete };
}
