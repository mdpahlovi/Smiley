import projects from "@/data/projects";
import ProjectCard from "@/components/dashboard/projects/project-card";

export const metadata = { title: "Projects" };

export default function ProjectPage() {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
            ))}
        </div>
    );
}
