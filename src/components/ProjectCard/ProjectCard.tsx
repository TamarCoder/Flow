import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  title: string;
  description: string;
  done: number;
  total: number;
};

export default function ProjectCard({
  title,
  description,
  done,
  total,
}: ProjectCardProps) {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.progress}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={done}
        >
          <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
        <span className={styles.progressText}>
          {done} / {total} შესრულებული
        </span>
      </div>
    </article>
  );
}