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
            className={`mt-9 aspect-square min-w-60 shrink-0 flex justify-center items-center rounded border text-3xl ${
                active ? "bg-red-900/10 text-red-500" : "bg-black/10"
            }`}
        >
            {active ? <FireFilled className="animate-bounce" /> : <DeleteOutlined />}
        </div>
    );
}
