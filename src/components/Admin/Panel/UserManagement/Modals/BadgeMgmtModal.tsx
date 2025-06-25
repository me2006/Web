import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function BadgeMgmtModal(): ReactNode {
  const { playerDetails, closeModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    if (!playerDetails.badgeList){
      setDE(true);
      return;
    }
  }, [playerDetails]);

  return (
    <div className={styles.modalContainer}>
      <div id="modalHeader" className={`${styles.modalHeader} ${styles.light}`} style={{ backgroundColor: "#9933cc" }}>
        <span id="closeModal" className={`${styles.closeModal} ${styles.light}`} onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className={styles.modalTitle}>Badge Management</Heading>
      </div>
      <div id="modalBody" className={styles.modalBody}>
        {
          dataError ?
            <p>
            Error: There was an error getting this player's information.<br/>
            Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0"></p>
              <BadgeTable badgeData={playerDetails.badgeList}/>
            </>
        }
      </div>
    </div>
  );
}

function BadgeTable( { badgeData }): ReactNode {

  useEffect(() => {
    if (!badgeData || badgeData.length == 0)
      return;

    const tbody = document.getElementById("bTableBody") as HTMLTableElement;
    badgeData.forEach((o) => {
      const rowData = [o.id, o.name, o.metadata ? o.metadata : "No metadata", o.level, o.dateEarned];
      const row = document.createElement("tr");
      for (const colData of rowData) {
        const td = document.createElement("td");
        td.textContent = colData;
        td.style.overflowX = "auto";
        row.appendChild(td);
      }
      tbody.appendChild(row);
    });
  }, [badgeData]);

  return (
    !badgeData || badgeData.length == 0 ?
      <Heading as="h3" className={styles.emptyListText}>This account has no badges</Heading>
      :
      <div className={`${styles.modalTableContainer} mt-1`}>
        <table id="badgeTable" className={styles.listTable}>
          <thead>
            <tr>
              <th>Badge ID</th>
              <th>Badge Name</th>
              <th className="w-40">Metadata</th>
              <th>Badge Level</th>
              <th>Date Earned</th>
            </tr>
          </thead>
          <tbody id="bTableBody"></tbody>
        </table>
      </div>
  );
}