import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function AltAccountsModal(): ReactNode {
  const { playerDetails, closeModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    if (!playerDetails.banList){
      setDE(true);
      return;
    }
  }, [playerDetails]);

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#ff4500" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Ban History</Heading>
      </div>
      <div id="modalBody" className="modalBody">
        {
          dataError ?
            <p>
            Error: There was an error getting this player's information.<br/>
            Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0">This list contains every ban for "{playerDetails.username}"</p>
              <p className="text-center mb-0">Note: Expirations are reset to the day before if the player was unbanned.</p>
              <BanTable banData={playerDetails.banList}/>
            </>
        }
      </div>
    </div>
  );
}

function BanTable( { banData }): ReactNode {

  useEffect(() => {
    if (!banData || banData.length == 0)
      return;

    const tbody = document.getElementById("banTableBody") as HTMLTableElement;
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
      <Heading as="h3" className={styles.emptyListText}>This account has not been banned</Heading>
      :
      <div className="mt-1">
        <table id="banTable" className={styles.listTable}>
          <thead>
            <tr>
              <th>Expiration</th>
              <th className="w-50">Reason</th>
              <th>Ban Author</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody id="banTableBody"></tbody>
        </table>
      </div>
  );
}