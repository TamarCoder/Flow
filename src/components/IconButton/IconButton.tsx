import type { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.scss";

// 44px square button for a single icon; aria-label is required because there is no text.
type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { "aria-label": string };

export default function IconButton({ className = "", ...props }: IconButtonProps) {
  return <button type="button" className={`${styles.button} ${className}`} {...props} />;
}
