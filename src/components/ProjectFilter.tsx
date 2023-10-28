import { useStore } from "@nanostores/preact";
import { currentFilter } from "../stores/filterStore";
import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

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
    <select value={filter} onChange={onValueChange}>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}
