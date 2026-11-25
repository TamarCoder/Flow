"use client";

import Link from "next/link";
import Logo from "@/components/logo/logo";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { filterLabels, type TaskFilter } from "@/lib/taskStatus";
import styles from "./TaskSidebar.module.scss";

type TaskSidebarProps = {
  filter: TaskFilter;
  counts: Record<TaskFilter, number>;
  onFilterChange: (filter: TaskFilter) => void;
};

const filters = Object.keys(filterLabels) as TaskFilter[];

export default function TaskSidebar({ filter, counts, onFilterChange }: TaskSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <Link href="/dashboard" aria-label="პროექტები">
        <Logo />
      </Link>

      <nav className={styles.filters} aria-label="ფილტრი">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={styles.filter}
            aria-pressed={filter === item}
            onClick={() => onFilterChange(item)}
          >
            {filterLabels[item]}
            <span className={styles.count}>{counts[item]}</span>
          </button>
        ))}
      </nav>

      <ProfileCard />
    </aside>
  );
}
