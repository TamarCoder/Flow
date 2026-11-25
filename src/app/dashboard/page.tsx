"use client";

import Logo from "@/components/logo/logo";
import styles from "./page.module.scss";
import { Avatar, Flex } from "@radix-ui/themes";
import HeadingSection from "@/components/HeadingSection/ HeadingSection";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Dashboard() {
  const { data: projects = [] } = useProjects();
  const { data: user } = useCurrentUser();

  return (
    <section className={styles.container}>
      
      <section className={styles.dashboardHeader}>
        <Logo />

        <div className={styles.avatarSection}>
          <Flex gap="2" className={styles.headerAvatar}>
            <Avatar
              src={user?.avatarUrl}
              fallback={user?.name.charAt(0) ?? ""}
              className={styles.avatar}
            />
            <p className={styles.avatarName}>{user?.name}</p>
          </Flex>
          <ThemeToggle />
        </div>
      </section>

      <HeadingSection />

      <section className={styles.projects}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.name}
            description={project.description}
            done={project.doneCount}
            total={project.taskCount}
          />
        ))}
      </section>
    </section>
  );
}
