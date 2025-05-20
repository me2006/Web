import { useContext, useEffect, type ReactNode } from 'react';
import { GmContext } from "@site/src/pages/admin";
import UserManagement from './UserManagement';
import GameManagement from './GameManagement';
import ActivityLog from './ActivityLog';
import ReportLog from './ReportLog';

import styles from "./index.module.css";

export default function Panel(): ReactNode {

  const { getGmInfo } = useContext(GmContext);

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

  const gmInfo = getGmInfo();

  return (
    <div style={{ width: "90%",}}>
      <div className={styles.panelContainer} style={{marginBottom: "1rem"}}>
        <h1>Sitekick Remastered Mod Panel</h1>
        <h3 style={{margin: 0}}>Welcome <span style={{textTransform: "capitalize"}}>{gmInfo.type}</span> {gmInfo.username}!</h3>
      </div>
      <div className={styles.panelContainer}>
        <div className={styles.panelContent}>
          <div className={styles.tabContainer}>
            <button id="umButton" className={styles.tabLinks} onClick={(e) => openTab(e, 'UserManagement')}>User Management</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'GameManagement')}>Game Management</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'ActivityLog')}>Activity Log</button>
            <button className={styles.tabLinks} onClick={(e) => openTab(e, 'ReportLog')}>Report Log</button>
          </div>

          <div id="UserManagement" className={styles.tabContent}>
            <UserManagement gmInfo={gmInfo} />
          </div>

          { gmInfo.type == "admin" ?
          <div id="GameManagement" className={styles.tabContent}>
            <GameManagement gmInfo={gmInfo} />
          </div>
          :
          <></>
          }

          <div id="ActivityLog" className={styles.tabContent}>
            <ActivityLog gmInfo={gmInfo}/>
          </div>

          <div id="ReportLog" className={styles.tabContent}>
            <ReportLog gmInfo={gmInfo}/>
          </div>
        </div>
      </div>
    </div>
  );
}
