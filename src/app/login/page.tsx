import { redirect } from "next/navigation";
import { isAuthEnabled } from "@/lib/features";
import Logo from "@/components/logo/logo";
import styles from "./page.module.scss";
import LoginForm from "@/components/loginForm/LoginForm";
export default function LoginPage() {
  // Without a backend there is nothing to log in to; go straight to the projects.
  if (!isAuthEnabled) redirect("/dashboard");

  return (
    <section className={styles.container}>
      <section className={styles.leftSide}>
        <Logo />

        <div className={styles.leftSideHeading}>
          <h1 className={styles.title}>კეთილი იყოს შენი დაბრუნება</h1>
        </div>

        <p className={styles.leftSideFooter}>შენი სია გელოდება</p>
      </section>

      <section className={styles.rightSide}>
        <LoginForm/>
      </section>
    </section>
  );
}
