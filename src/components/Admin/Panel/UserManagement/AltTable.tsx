import { useContext, useEffect, type ReactNode } from "react";
import { UmContext } from ".";

import styles from "./index.module.css";

export default function AltTable( { altList }): ReactNode {

  const { isAdmin, addActionButtons } = useContext(UmContext);

  useEffect(() => {
    if (!altList || altList.length == 0)
      return;

    let tbody = document.getElementById("aaTableBody") as HTMLTableElement;
    altList.forEach((o) => {
      const isMainText = o.isMain ? "Main" : "Alt";
      const rowData = isAdmin ? 
        [o.accountId, o.email, o.username, o.sitekickName, isMainText] :
        [o.accountId, o.username, o.sitekickName, isMainText];
      const row = document.createElement("tr");
      for (const colData of rowData) {
        const td = document.createElement("td");
        td.textContent = colData;
        row.appendChild(td);
      }
      addActionButtons(row, o);
      tbody.appendChild(row);
    });
  }, [altList]);

  return (
    !altList || altList.length == 0 ? 
    <h3 className={styles.emptyListText}>No alts were found for this account</h3>
    :
    <div className={styles.altTableContainer}>
      <input className={styles.accordionInput} type="checkbox" id="altTableAccordion" />
      <label className={styles.accordionLabel} htmlFor="altTableAccordion">Associated Accounts</label>
      <div className={styles.accordionContent}>
        <table id="altAccountsTable" className={styles.listTable}>
          <thead>
            <tr>
              <th>Account ID</th>
              {isAdmin ? <th>Email</th> : <></>}
              <th>Username</th>
              <th>Sitekick Name</th>
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="aaTableBody"></tbody>
        </table>
      </div>
    </div>
  );
}

