"use client";

import { useProjectStore } from "@/hooks/useProjectHook";
import ProjectCard from "@/components/dashboard/projects/project-card";

export default function Projects() {
    const { projects } = useProjectStore();

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
            ))}
        </div>
    );
}
