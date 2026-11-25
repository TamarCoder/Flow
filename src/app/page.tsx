import { Button } from "@radix-ui/themes";
import Logo from "../components/logo/logo";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import styles from "./page.module.scss";
import Link from "next/link";
import { isAuthEnabled } from "@/lib/features";

type TaskStatus = "done" | "progress" | "todo";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

const dotClass: Record<TaskStatus, string> = {
  done: styles.dotDone,
  progress: styles.dotProgress,
  todo: styles.dotTodo,
};

const tasks: Task[] = [
  { id: 1, title: "კვირის გეგმის შედგენა", status: "done" },
  { id: 2, title: "პრეზენტაციის მომზადება", status: "progress" },
  { id: 3, title: "ექიმთან ჩაწერა", status: "todo" },
];

export default function MainApp() {
  return (
    <div className={styles.landingContainer}>
      <section className={styles.logoSectio}>
        <Logo />

        <div className={styles.buttons}>
          {isAuthEnabled && (
            <>
              <Button asChild className={styles.outlineButton}>
                <Link href="/login">შესვლა</Link>
              </Button>
              <Button asChild className={styles.fillButton}>
                <Link href="/register">რეგისტრაცია</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <h1 className={styles.contentTitle}>შენი დღე, ერთ სიაში</h1>
          <p className={styles.contentDescription}>
            ჩაწერე ტასქები, მონიშნე რა არის პროცესში და რა შესრულდა.
          </p>
          <div className={styles.contentButtons}>
            <Button asChild className={styles.contentFillButtons}>
              <Link href={isAuthEnabled ? "/register" : "/dashboard"}>დაწყება</Link>
            </Button>
            {isAuthEnabled && (
              <Button asChild className={styles.contentOutlineButtons}>
                <Link href="/login">უკვე მაქვს ანგარიში</Link>
              </Button>
            )}
          </div>
        </div>

        <div className={styles.contentToasts}>
          <div className={styles.boxs}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.taskItem}>
                <span className={dotClass[task.status]} />
                {task.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
