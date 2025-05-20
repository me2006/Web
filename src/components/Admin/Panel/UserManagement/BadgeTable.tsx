import { useEffect, type ReactNode } from "react";

import styles from "./index.module.css";

export default function BadgeTable( { badgeData }): ReactNode {

  useEffect(() => {
    if (!badgeData || badgeData.length == 0)
      return;

    let tbody = document.getElementById("bTableBody") as HTMLTableElement;
    badgeData.forEach((o) => {
      const rowData = [o.id, o.name, o.metadata ? o.metadata : "No metadata", o.level, o.dateEarned]
      const row = document.createElement("tr");
      for (const colData of rowData) {
        const td = document.createElement("td");
        td.textContent = colData;
        row.appendChild(td);
      }
      tbody.appendChild(row);
    });
  }, [badgeData]);

  return (
    !badgeData || badgeData.length == 0 ? 
    <h3 className={styles.emptyListText}>This account has no badges</h3>
    :
    <div className={styles.badgeTableContainer}>
      <input className={styles.accordionInput} type="checkbox" id="badgeTableAccordion"/>
      <label className={styles.accordionLabel} htmlFor="badgeTableAccordion">Account Badges</label>
      <div className={styles.accordionContent}>
        <table id="badgeTable" className={styles.listTable}>
          <thead>
            <tr>
              <th>Badge ID</th>
              <th>Badge Name</th>
              <th>Metadata</th>
              <th>Badge Level</th>
              <th>Date Earned</th>
            </tr>
          </thead>
          <tbody id="bTableBody"></tbody>
        </table>
      </div>
    </div>
  );
}

