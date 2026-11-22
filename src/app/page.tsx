import { Button } from "@radix-ui/themes";
import Logo from "./components/logo/logo";
import ThemeToggle from "./components/ui/ThemeToggle/ThemeToggle";
import styles from "./page.module.scss";

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
          <Button className={styles.outlineButton}>შესვლა</Button>
          <Button className={styles.fillButton}>რეგისტრაცია</Button>
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
            <Button className={styles.contentFillButtons}>დაწყება</Button>
            <Button className={styles.contentOutlineButtons}>
              უკვე მაქვს ანგარიში
            </Button>
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