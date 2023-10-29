import { currentFilter } from "../../stores/filterStore";
import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

import styles from "./ProjectFilter.module.css";

export default function ProjectFilter({ options }: { options: string[] }) {
  const [filter, setFilter] = useState<string>("");

  const onValueChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
    const value = e.currentTarget.value;
    setFilter(value);
    if (!value) {
      currentFilter.set("All");
    } else {
      currentFilter.set(value);
    }
  };

  return (
    <div class={styles.filter}>
      <select value={filter} onChange={onValueChange} class="interactable">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
