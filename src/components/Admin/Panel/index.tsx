import { useContext, useEffect, type ReactNode } from 'react';
import { UserContext } from "@site/src/pages/admin";
import UserManagement from './UserManagement';
import GameManagement from './GameManagement';
import ActivityLog from './ActivityLog';
import ReportLog from './ReportLog';
import Console from './Console';

import styles from "./index.module.css";

export default function Panel(): ReactNode {

  const { getCurrentUser, logout } = useContext(UserContext);

  function openTab(e, tabName) {
    var i, tabContent, tabLinks;
    tabContent = document.getElementsByClassName(styles.tabContent);
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName(styles.active);
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove(styles.active);
    }
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.classList.add(styles.active);
  }

  // Open User management tab on load
  useEffect(() => {
    let ignore = false;
    const btnElem = document.getElementById("umButton");
    const elem = document.getElementById("UserManagement");
    btnElem.classList.add(styles.active);
    elem.style.display = "block";
    return () => { ignore = true; }
  },[]);

  const currUser = getCurrentUser();

  return (
    <div style={{ width: "90%",}}>
      <div className={styles.panelContainer} style={{marginBottom: "1rem"}}>
        <h1>Sitekick Remastered Mod Panel</h1>
        <h3 style={{margin: 0}}>Welcome <span style={{textTransform: "capitalize"}}>{currUser.type}</span> {currUser.username}!</h3>
      </div>
      <div className={styles.panelContainer}>
        <div className={styles.panelContent}>
          <div className={styles.tabContainer}>
            <button id="umButton" className={styles.tabLinks} onClick={(e) => openTab(e, 'UserManagement')}>User Management</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'GameManagement')}>Game Management</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'ActivityLog')}>Activity Log</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'ReportLog')}>Report Log</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'Console')}>Console</button>
          </div>

          <div id="UserManagement" className={styles.tabContent}>
            <UserManagement user={currUser} />
          </div>

          <div id="GameManagement" className={styles.tabContent}>
            <GameManagement user={currUser} />
          </div>

          <div id="ActivityLog" className={styles.tabContent}>
            <ActivityLog user={currUser}/>
          </div>

          <div id="ReportLog" className={styles.tabContent}>
            <ReportLog user={currUser}/>
          </div>

          <div id="Console" className={styles.tabContent}>
            <Console user={currUser}/>
          </div>
        </div>
      </div>
    </div>
  );
}
