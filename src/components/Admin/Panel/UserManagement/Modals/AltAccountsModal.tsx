import { useState, useEffect, useContext, type ReactNode } from "react";
import { UmContext } from "..";
import Heading from "@theme/Heading";
import { createTable, TableButton } from "@site/src/utils/helpers";

import styles from "../index.module.css";

export default function AltAccountsModal(): ReactNode {
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
              <AltTable altList={playerDetails.associatedAccounts}/>
            </>
        }
      </div>
    </div>
  );
}

function AltTable( { altList }): ReactNode {
  const { isAdmin, ModalTypes, viewDetails, openModal } = useContext(UmContext);
  const tableId = "altAccountsTable";

  useEffect(() => {
    if (!altList || altList.length == 0)
      return;

    const headers = ["Account ID", "Email", "Username", "Sitekick Name", "Account Type", "Actions"];
    const expKeys = ["accountId", "email", "username", "sitekickName", "isMainText"];
    if (!isAdmin) {
      headers.splice(1, 1);
      expKeys.splice(1, 1);
    }
    const buttons : TableButton[] = [
      { text: "👀 View Details", style: "button--bootstrap", onClick: viewDetails, objKeys: ["username"], extraArgs: [true] },
      { text: "🖋️ Edit Info", style: "button--bootstrap yellow", onClick: openModal, objKeys: ["id"], extraArgs: [ModalTypes.EditInfo] }
    ];

    createTable(tableId, headers, expKeys, altList, buttons);
  }, [altList]);

  return (
    !altList || altList.length == 0 ?
      <Heading as="h3" className={styles.emptyListText}>No alts were found for this account</Heading>
      :
      <div className="mt-1">
        <table id="altAccountsTable" className={styles.listTable} />
      </div>
  );
}