import { useStore } from "@nanostores/preact";
import { currentFilter } from "../../stores/filterStore";
import styles from "./project-list.module.css";

export interface Project {
  id: string;
  name: string;
  url?: string;
  tags: string[];
  description: string;
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <div class={styles.card}>
      <h2 class="highlight-text interactable">
        {project.url ? <a href={project.url}>{project.name}</a> : project.name}
      </h2>
      <p>{project.description}</p>
      <ul class="plain-list">
        {project.tags.map((tag) => (
          <li>{tag}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const $currentFilter = useStore(currentFilter);
  const filteredProjects =
    $currentFilter && $currentFilter != "All"
      ? projects.filter((project) => project.tags.includes($currentFilter))
      : projects;

  return (
    <ul class={`${styles.container} | plain-list`}>
      {filteredProjects.map((project) => (
        <li key={project.id}>
          <ProjectItem project={project} />
        </li>
      ))}
    </ul>
  );
}
