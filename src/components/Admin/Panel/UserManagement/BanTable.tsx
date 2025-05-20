import { useEffect, type ReactNode } from "react";

import styles from "./index.module.css";

export default function BanTable( { banData }): ReactNode {

  useEffect(() => {
    if (!banData || banData.length == 0)
      return;

    let tbody = document.getElementById("banTableBody") as HTMLTableElement;
    banData.forEach((o) => {
      const rowData = [o.expiration, o.reason, o.createdBy, o.dateCreated];
      const row = document.createElement("tr");
      for (const colData of rowData) {
        const td = document.createElement("td");
        td.textContent = colData;
        row.appendChild(td);
      }
      tbody.appendChild(row);
    });
  }, [banData]);

  return (
    !banData || banData.length == 0 ? 
    <h3 className={styles.emptyListText}>This account has not been banned</h3>
    :
    <div className={styles.banTableContainer}>
      <input className={styles.accordionInput} type="checkbox" id="banTableAccordion"/>
      <label className={styles.accordionLabel} htmlFor="banTableAccordion">Account Bans</label>
      <div className={styles.accordionContent}>
        <table id="banTable" className={styles.listTable}>
          <thead>
            <tr>
              <th>Expiration</th>
              <th>Reason</th>
              <th>Ban Author</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody id="banTableBody"></tbody>
        </table>
      </div>
    </div>
  );
}

