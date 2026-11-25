import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch";
import styles from "./ProfileSettings.module.scss";

type ProfileSettingsProps = {
  onChangeName: () => void;
  onChangePassword: () => void;
};

// The settings card: theme switch, then rows that open the name and password dialogs.
export default function ProfileSettings({ onChangeName, onChangePassword }: ProfileSettingsProps) {
  return (
    <section className={styles.card}>
      <div className={styles.row}>
        <span>თემა</span>
        <ThemeSwitch />
      </div>
      <button type="button" className={styles.row} onClick={onChangeName}>
        <span>სახელის შეცვლა</span>
        <span aria-hidden>›</span>
      </button>
      <button type="button" className={styles.row} onClick={onChangePassword}>
        <span>პაროლის შეცვლა</span>
        <span aria-hidden>›</span>
      </button>
    </section>
  );
}
