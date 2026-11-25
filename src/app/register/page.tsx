import { redirect } from "next/navigation";
import { isAuthEnabled } from "@/lib/features";
import Logo from "@/components/logo/logo";
import styles from "./page.module.scss";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
export default function RegisterPage() {
  // Without a backend there is nothing to log in to; go straight to the projects.
  if (!isAuthEnabled) redirect("/dashboard");

  return (
    <section className={styles.container}>
      <section className={styles.leftSide}>
        <Logo />

        <div className={styles.leftSideHeading}>
          <h1 className={styles.title}>დაიწყე პირველი ტასქით</h1>
        </div>

        <p className={styles.leftSideFooter}>ნაბიჯი 1 / 1</p>
      </section>

      <section className={styles.rightSide}>
        <RegisterForm />
      </section>
    </section>
  );
}
