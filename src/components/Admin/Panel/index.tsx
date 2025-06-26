import { useEffect, type ReactNode } from "react";
import UserManagement from "./UserManagement";
import GameManagement from "./GameManagement";
import ActivityLog from "./ActivityLog";
// import ReportLog from "./ReportLog";
import Console from "./Console";

import styles from "./index.module.css";

export default function Panel({ gmInfo }): ReactNode {

  function openTab(e, tabName) {
    let i;

    // Hide all tabs and remove the active class
    const tabContent = (document.getElementsByClassName(styles.tabContent) as HTMLCollectionOf<HTMLElement>);
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    const tabLinks = document.getElementsByClassName(styles.active);
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove(styles.active);
    }

    // Show the current tab
    document.getElementById(tabName).style.display = "block";
    e.currentTarget.classList.add(styles.active);
    localStorage.setItem("lastTab", tabName);
  }

  // Open last tab on load. Open user management by default
  useEffect(() => {
    if (!gmInfo || Object.keys(gmInfo).length === 0) return;

    let lastTab = localStorage.getItem("lastTab");
    if (!lastTab) lastTab = "UserManagement";
    const btnElem = document.getElementById(lastTab + "Btn");
    const elem = document.getElementById(lastTab);
    btnElem.classList.add(styles.active);
    elem.style.display = "block";
  },[gmInfo]);

  return (
    <div className="w-90">
      <div className={styles.panelContainer}>
        <div className={styles.panelContent}>
          <div className={styles.tabContainer}>
            <button id="UserManagementBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "UserManagement")}>User Management</button>
            { gmInfo.type == 0 ?
              <button id="GameManagementBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "GameManagement")}>Game Management</button> :
              <></>
            }
            <button id="ActivityLogBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "ActivityLog")}>Activity Log</button>
            {/*<button id="ReportLogBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "ReportLog")}>Report Log</button>*/}
            <button id="ConsoleBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "Console")}>Console</button>
          </div>

          <div id="UserManagement" className={styles.tabContent}>
            <UserManagement gmInfo={gmInfo} />
          </div>

          { gmInfo.type == 0 ?
            <div id="GameManagement" className={styles.tabContent}>
              <GameManagement gmInfo={gmInfo} />
            </div>
            :
            <></>
          }

          <div id="ActivityLog" className={styles.tabContent}>
            <ActivityLog gmInfo={gmInfo}/>
          </div>

          {/*
          <div id="ReportLog" className={styles.tabContent}>
            <ReportLog gmInfo={gmInfo}/>
          </div>
          */}

          <div id="Console" className={styles.tabContent}>
            <Console gmInfo={gmInfo}/>
          </div>
        </div>
      </div>
    </div>
  );
}
