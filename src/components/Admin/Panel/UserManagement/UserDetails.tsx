import { useContext, useEffect, type ReactNode } from "react";
import Heading from "@theme/Heading";
import AltTable from "./AltTable";
import BadgeTable from "./BadgeTable";
import BanTable from "./BanTable";
import { UmContext } from ".";
import { faGavel, faLock, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import styles from "./index.module.css";

export default function UserDetails( { playerDetails, fromTable, openListView }): ReactNode {

  const { isAdmin, searchTerm } = useContext(UmContext);
  const adminOnly = ["Email", "Account Type", "Number of Alts"];

  useEffect(() => {
    if (!playerDetails)
      return;

    const container = document.getElementById("playerDetailsContainer");

    const tableColumns = {
      "Account ID": playerDetails.accountId,
      "Email": playerDetails.email,
      "Username": playerDetails.username,
      "Sitekick Name": playerDetails.sitekickName,
      "Total XP": playerDetails.xp,
      "Verified Status": playerDetails.verified ? "Verified" : "Not Verified",
      "Banned Status": playerDetails.banStatus,
      "Account Type": playerDetails.isMain ? "Main" : "Alt",
      "Number of Alts": playerDetails.numAlts,
      "Date Created": playerDetails.dateCreated,
      "Last Interaction": playerDetails.lastInteraction
    };

    Object.keys(tableColumns).forEach((key) => {

      if (!isAdmin && adminOnly.includes(key)) return;
      const block = document.createElement("div");
      block.classList.add(styles.playerDetailsInfoBlock);
      const span = document.createElement("span");
      span.classList.add(styles.playerDetailsValue);
      span.append(tableColumns[key]);
      block.append(key, span);
      block.append(span);
      container.append(block);
    });
  }, [playerDetails]);

  return (
    !playerDetails || playerDetails.length == 0 ?
      <Heading as="h3" className={styles.emptyListText}>No players were found with the Email / Username: "${searchTerm}"</Heading>
      :
      <>
        { fromTable ?
          <button style={{ display: "flex", margin: "auto", marginBottom: "1rem" }} onClick={() => openListView()}>Back to List</button> :
          <></>
        }
        <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
          <div>
            <Heading as="h2" className="text--center">Player Info</Heading>
            <div id="playerDetailsContainer" className={styles.playerDetailsContainer}>
              <div className={styles.playerDetailsImg} style={{ backgroundColor: playerDetails.sitekickColour || "#FFCC00" }} />
              <Heading as="h2" className={styles.playerDetailsName}>{playerDetails.username}</Heading>
            </div>
          </div>
          <div>
            <div id="actionCards">
              <Heading as="h2" className="text--center" style={{ marginLeft: "1rem" }}>Actions</Heading>
              <div className={styles.actionsContainer}>
                <div className="row">
                  <div className={clsx("col", styles.actionsCard)}>
                    <Heading as="h3">{isAdmin ? "Ban / Suspend" : "Suspend" } User</Heading>
                    <FontAwesomeIcon icon={faGavel} size="4x" />
                    <hr/>
                    <button className="button button--red button--sm margin--sm">{isAdmin ? "Ban / Suspend" : "Suspend" } User</button>
                  </div>
                  <div className={clsx("col", styles.actionsCard)}>
                    <Heading as="h3">Edit Info</Heading>
                    <FontAwesomeIcon icon={faPenToSquare} size="4x" />
                    <hr/>
                    <button className="button button--red button--sm margin--sm">Edit Info</button>
                  </div>
                  {
                    isAdmin ?
                      <>
                        <div className={clsx("col", styles.actionsCard)}>
                          <Heading as="h3">Reset Password</Heading>
                          <FontAwesomeIcon icon={faLock} size="4x" />
                          <hr/>
                          <button className="button button--red button--sm margin--sm">Reset Password</button>
                        </div>
                        <div className={clsx("col", styles.actionsCard)}>
                          <Heading as="h3">Delete Account</Heading>
                          <FontAwesomeIcon icon={faTrash} size="4x" />
                          <hr/>
                          <button className="button button--red button--sm margin--sm">Delete Account</button>
                        </div>
                        <div className={clsx("col", styles.actionsCard)}>
                          <Heading as="h3">Badge Management</Heading>
                          <FontAwesomeIcon icon={faGavel} size="4x" />
                          <hr/>
                          <button className="button button--red button--sm margin--sm">Badge Management</button>
                        </div>
                      </> : <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <AltTable altList={playerDetails.associatedAccounts} />
        <BadgeTable badgeData={playerDetails.badgeList}/>
        <BanTable banData ={playerDetails.banList} />
      </>
  );
}

