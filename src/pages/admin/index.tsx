import Login from '@site/src/components/Admin/Login';
import Panel from '@site/src/components/Admin/Panel';
import { type ReactNode, useState } from 'react';

import styles from "./index.module.css";

export default function Admin(): ReactNode {
  const [user, setUser] = useState({});

  return (
    <main className={styles.mainContainer}>
      { !isEmpty(user) ? 
        <Panel user={user} /> :
        <Login setUser={setUser} />
      }
      
    </main>
  );
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}