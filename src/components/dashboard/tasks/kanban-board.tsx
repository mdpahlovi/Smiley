import { useState } from "react";
import type { Task } from "@/types";
import { columnsData } from "@/constants";
import Column from "@/components/ui/column";
import { usePathname } from "next/navigation";
import DeleteTask from "@/components/ui/delete-task";
import { DatePicker, FormInstance, Input } from "antd";

export default function KanbanBoard({ tasks, form }: { tasks: Task[]; form: FormInstance<Omit<Task, "id">> }) {
    const pathname = usePathname();
    const [search, setSearch] = useState("");
    const [range, setRange] = useState<[Date, Date] | null>(null);

    if (range) tasks = tasks.filter(({ deadline }) => new Date(deadline) >= range[0] && new Date(deadline) <= range[1]);
    if (search) tasks = tasks.filter(({ description }) => description.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <div style={pathname !== "/tasks" ? { marginTop: 24 } : undefined} className="mb-4 grid md:grid-cols-[5fr_7fr] gap-6">
                <Input.Search value={search} onChange={(e) => setSearch(e.target.value)} />
                {/* @ts-ignore */}
                <DatePicker.RangePicker value={range} onChange={setRange} />
            </div>
            <div
                className="flex min-[1280px]:grid min-[1280px]:grid-cols-4 gap-6 overflow-auto"
                style={pathname === "/tasks" ? { minHeight: "calc(100vh - 16rem)" } : undefined}
            >
                {columnsData.map(({ status, color }, idx) => (
                    <Column key={idx} {...{ status, color, tasks, form }} />
                ))}
                <DeleteTask />
            </div>
        </>
    );
}
