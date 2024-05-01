import { useState } from "react";
import { useTaskStore } from "@/hooks/useTaskHook";
import { DeleteOutlined, FireFilled } from "@ant-design/icons";

export default function DeleteTask() {
    const { deleteTask } = useTaskStore();
    const [active, setActive] = useState(false);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragEnd = (e: DragEvent) => {
        if (!e.dataTransfer) return;
        deleteTask(e.dataTransfer.getData("id"));
        setActive(false);
    };

    return (
        <div
            // @ts-ignore
            onDrop={handleDragEnd}
            // @ts-ignore
            onDragOver={handleDragOver}
            onDragLeave={() => setActive(false)}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
                active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? <FireFilled className="animate-bounce" /> : <DeleteOutlined />}
        </div>
    );
}
