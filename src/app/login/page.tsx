import Logo from "@/components/logo/logo";
import styles from "./page.module.scss";
import LoginForm from "@/components/loginForm/LoginForm";
export default function LoginPage() {
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
