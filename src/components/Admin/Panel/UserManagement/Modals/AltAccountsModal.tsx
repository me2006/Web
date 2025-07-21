import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function AltAccountsModal({ addActionButtons }): ReactNode {
  const { playerDetails, closeModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    if (!playerDetails.associatedAccounts){
      setDE(true);
      return;
    }
  }, [playerDetails]);

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#ff2994" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Alt Accounts</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
            Error: There was an error getting this player's information.<br/>
            Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0"></p>
              <AltTable altList={playerDetails.associatedAccounts} addActionButtons={addActionButtons}/>
            </>
        }
      </div>
    </div>
  );
}

function AltTable( { altList, addActionButtons }): ReactNode {

  const { isAdmin } = useContext(UmContext);

  useEffect(() => {
    if (!altList || altList.length == 0)
      return;

    const tbody = document.getElementById("aaTableBody") as HTMLTableElement;
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
      <Heading as="h3" className={styles.emptyListText}>No alts were found for this account</Heading>
      :
      <div className="mt-1">
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
  );
}

