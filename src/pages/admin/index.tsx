import Login from '@site/src/components/Admin/Login';
import { type ReactNode } from 'react';

import styles from "./index.module.css";

export default function Admin(): ReactNode {  
  return (
    <main className={styles.mainContainer}>
      <Login />
    </main>
  );
}
