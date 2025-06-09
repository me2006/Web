import { useContext, useEffect, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from ".";

import styles from "./index.module.css";

export default function AccountTable({ playerList }): ReactNode {
  const { isAdmin, searchTerm, addActionButtons } = useContext(UmContext);


  useEffect(() => {
    if (!playerList || playerList.length == 0)
      return;

    const tbody = document.getElementById("plTableBody") as HTMLTableElement;
    playerList.forEach((o) => {
      const rowData = isAdmin ?
        [o.accountId, o.email, o.username, o.sitekickName] :
        [o.accountId, o.username, o.sitekickName];
      const row = document.createElement("tr");
      for (const colData of rowData) {
        const td = document.createElement("td");
        td.textContent = colData;
        row.appendChild(td);
      }
      addActionButtons(row, o);
      tbody.appendChild(row);
    });
  }, [playerList]);

  return (
    !playerList || playerList.length == 0 ?
      <Heading as='h3' className={styles.emptyListText}>No players were found with the Email / Username: "${searchTerm}"</Heading>
      :
      <table id="playerListTable" className={`${styles.listTable} ${styles.playerListTable}`}>
        <thead>
          <tr>
            <th>Account ID</th>
            {isAdmin ? <th>Email</th> : <></>}
            <th>Username</th>
            <th>Sitekick Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="plTableBody"></tbody>
      </table>
  );
}

