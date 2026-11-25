import Logo from "@/components/logo/logo";
import styles from "./page.module.scss";
import { Avatar, Flex } from "@radix-ui/themes";
import HeadingSection from "@/components/HeadingSection/ HeadingSection";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import ProjectCard from "@/components/ProjectCard/ProjectCard";

type Project = {
  id: number;
  title: string;
  description: string;
  done: number;
  total: number;
};

const projects: Project[] = [
  {
    id: 1,
    title: "სამსახური",
    description: "კვარტლის პრეზენტაცია და გუნდის გეგმები.",
    done: 1,
    total: 3,
  },
  {
    id: 2,
    title: "სახლი",
    description: "ყოველდღიური საქმეები და გადასახადები.",
    done: 0,
    total: 2,
  },
  {
    id: 3,
    title: "პირადი განვითარება",
    description: "კითხვა, კურსები და ჯანმრთელობა.",
    done: 0,
    total: 2,
  },
];

export default function Dashboard() {
  return (
    <section className={styles.container}>
      
      <section className={styles.dashboardHeader}>
        <Logo />

        <div className={styles.avatarSection}>
          <Flex gap="2" className={styles.headerAvatar}>
            <Avatar
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
              fallback="A"
              className={styles.avatar}
            />
            <p className={styles.avatarName}>თამარ</p>
          </Flex>
          <ThemeToggle />
        </div>
      </section>

      <HeadingSection />

      <section className={styles.projects}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            done={project.done}
            total={project.total}
          />
        ))}
      </section>
    </section>
  );
}
