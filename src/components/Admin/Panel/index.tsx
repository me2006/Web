import { type ReactNode } from 'react';

import styles from "./index.module.css";

export default function Admin({ user }): ReactNode {

  return (
    <div className={styles.panelContainer}>
    <h1>Welcome {user.username}!</h1>
    </div>
  );
}
