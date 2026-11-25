'use client'
import { Button } from "@radix-ui/themes";
import styles from "./ HeadingSection.module.scss";

export default function HeadingSection() {
  return (
    <section className={styles.HeadingSection}>

      <section className={styles.headingContent}>
        
        <div className={styles.headingTitle}>
          <h1>პროექტები</h1>
          <p> აირჩიე პროექტი ან შექმენი ახალი და გაწერე მისი ტასქები.</p>
        </div>

        <Button className={styles.fillButton}>
          ახალი პროექტი
        </Button>
      </section>
    </section>
  );
}
