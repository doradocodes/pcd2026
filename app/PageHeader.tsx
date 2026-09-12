import styles from "./PageHeader.module.css";
import {ReactNode} from "react";

export default function PageHeader({ children }: { children: ReactNode }) {
  return <div className={styles.pageHeader}>
    <div className={styles.contentWrapper}>
      {/*<div className={styles.ditherField} aria-hidden="true" />*/}
      {children}
    </div>
  </div>
}