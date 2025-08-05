import { useEffect, useState, type ReactNode } from "react";
import UserManagement from "./UserManagement";
import GameManagement from "./GameManagement";
import ActivityLog from "./ActivityLog";
// import ReportLog from "./ReportLog";
import Console from "./Console";

import styles from "./index.module.css";

export default function Panel({ gmInfo }): ReactNode {

  const [currTab, setTab] = useState("UserManagement");

  function openTab(e, tabName) {
    let i;

    const tabLinks = document.getElementsByClassName(styles.active);
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.remove(styles.active);
    }

    // Show the current tab
    setTab(tabName);
    e.currentTarget.classList.add(styles.active);
    localStorage.setItem("lastTab", tabName);
  }

  // Open last tab on load. Open user management by default
  useEffect(() => {
    if (!gmInfo || Object.keys(gmInfo).length === 0)
      return;

    let lastTab = localStorage.getItem("lastTab");
    if (!lastTab)
      lastTab = "UserManagement";

    const btnElem = document.getElementById(lastTab + "Btn");
    btnElem.classList.add(styles.active);
    setTab(lastTab);
  },[gmInfo]);

  return (
    <div className="w-90">
      <div className={styles.panelContainer}>
        <div className={styles.panelContent}>
          <div className={styles.tabContainer}>
            <button id="UserManagementBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "UserManagement")}>User Management</button>
            { gmInfo.type == 0 && <button id="GameManagementBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "GameManagement")}>Game Management</button> }
            <button id="ActivityLogBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "ActivityLog")}>Activity Log</button>
            {/*<button id="ReportLogBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "ReportLog")}>Report Log</button>*/}
            <button id="ConsoleBtn" className={styles.tabLinks} onClick={(e) => openTab(e, "Console")}>Console</button>
          </div>

          <div className={styles.tabContent}>
            {currTab === "UserManagement" && <UserManagement gmInfo={gmInfo} /> }
            {currTab === "GameManagement" && <GameManagement gmInfo={gmInfo} /> }
            {currTab === "ActivityLog" && <ActivityLog gmInfo={gmInfo} /> }
            {/*currTab === "ReportLog" && <ReportLog gmInfo={gmInfo} /> */}
            {currTab === "Console" && <Console gmInfo={gmInfo} /> }
          </div>
        </div>
      </div>
    </div>
  );
}
