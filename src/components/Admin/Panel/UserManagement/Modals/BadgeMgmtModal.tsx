import { useState, useEffect, useContext, type ReactNode } from "react";
import { UmContext } from "..";
import Heading from "@theme/Heading";
import { createTable, TableButton } from "@site/src/utils/helpers";


import styles from "../index.module.css";
export default function BadgeMgmtModal(): ReactNode {
  const { playerDetails, closeUmModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    if (!playerDetails.badgeList){
      setDE(true);
      return;
    }
  }, [playerDetails]);

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader light" style={{ backgroundColor: "#9933cc" }}>
        <span id="closeModal" className="closeModal light" onClick={() => closeUmModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Badge Management</Heading>
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
              <BadgeTable badgeData={playerDetails.badgeList}/>
            </>
        }
      </div>
    </div>
  );
}

function BadgeTable({ badgeData }): ReactNode {
  const tableId = "badgeTable";

  useEffect(() => {
    if (!badgeData || badgeData.length == 0)
      return;

    const headers = ["Badge ID", "Badge Name", "Metadata", "Badge Level", "Date Earned", "Actions"];
    const headerStyles = ["", "", "w-40", "", "", ""];
    const expKeys = ["id", "name", "metadata", "level", "dateEarned"];
    const buttons : TableButton[] = [
      { text: "🖋️ Edit", style: "button--bootstrap yellow", onClick: () => {}, objKeys: ["id"] },
      { text: "🗑️ Delete", style: "button--bootstrap red", onClick: () => {}, objKeys: ["id"] }
    ];

    createTable(tableId, headers, expKeys, badgeData, buttons, headerStyles);
  }, [badgeData]);

  return (
    !badgeData || badgeData.length == 0 ?
      <Heading as="h3" className={styles.emptyListText}>This account has no badges</Heading>
      :
      <div className="mt-1">
        <table id="badgeTable" className={styles.listTable} />
      </div>
  );
}