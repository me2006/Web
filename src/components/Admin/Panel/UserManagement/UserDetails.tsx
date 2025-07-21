import { useContext, useEffect, useState, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from ".";
import { faSquareCheck, faGavel, faLock, faPenToSquare, /*faShield,*/ faTrash, faClone, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postRequest } from "@site/src/utils/helpers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./index.module.css";

export default function UserDetails( { fromTable, searchTerm, ModalTypes, openModal, openListView }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { isAdmin, gmInfo, playerDetails, setPD } = useContext(UmContext);
  const [isBanned, setIsBanned] = useState(false);
  const [banType, setBanType] = useState(0);
  const [hasHistory, setHistory] = useState(playerDetails.banList.length > 0);
  const [hasAlts, setHasAlts] = useState(playerDetails.associatedAccounts.length > 0);

  function unbanUser() {

    if (!confirm(`Are you sure you want to unban ${playerDetails.username}? This action cannot be undone.`))
      return;

    const data = {
      email: isAdmin ? playerDetails.email : "",
      username: playerDetails.username
    };
    return postRequest(gmInfo, customFields, data, customFields.UNBAN, "Failed to unban player.").then(() => {
      alert(playerDetails.username + " was successfully unbanned.");
      setPD({ ...playerDetails, banStatus: "Not banned" });
    });
  }


  function ActionButton({ colour, modalType, icon, name, isDisabled = false }) {
    return (
      <div className={`row ${styles.actionsCard}`}>
        <button disabled={isDisabled} className={`button--flat ${colour}`} onClick={() => {
          if (!modalType) unbanUser();
          else openModal(playerDetails.username, modalType);
        }}>
          <FontAwesomeIcon icon={icon} className={ styles.buttonIcon } /> {name}
        </button>
      </div>
    );
  }

  useEffect(() => {
    setIsBanned(playerDetails.banStatus != "Not banned");
    setBanType(playerDetails.banStatus == "Perma banned" ? 2 : playerDetails.banStatus == "Suspended" ? 1 : 0);
    setHistory(playerDetails.banList.length > 0);
    setHasAlts(playerDetails.associatedAccounts.length > 0);
  }, [playerDetails]);

  return (
    !playerDetails || playerDetails.length == 0 ?
      <Heading as="h3" className={styles.emptyListText}>No players were found with the Email / Username: "${searchTerm}"</Heading>
      :
      <>
        { fromTable ?
          <button className="d-flex m-auto mb-1" onClick={() => openListView()}>Back to List</button> :
          <></>
        }
        <div className="d-flex">
          <div>
            <div id="playerDetailsContainer" className={styles.playerDetailsContainer}>
              <div className={styles.playerDetailsImg} style={{ backgroundColor: playerDetails.sitekickColour || "#FFCC00" }} />
              <Heading as="h2" className={styles.playerDetailsName}>{playerDetails.username}</Heading>
              <div id="infoContainer">
                <div className={styles.playerDetailsInfoBlock}>Account ID<span>{playerDetails.accountId}</span></div>
                {isAdmin ? <div className={styles.playerDetailsInfoBlock}>Email<span>{playerDetails.email}</span></div> : <></> }
                <div className={styles.playerDetailsInfoBlock}>Username<span>{playerDetails.username}</span></div>
                <div className={styles.playerDetailsInfoBlock}>Sitekick Name<span>{playerDetails.sitekickName}</span></div>
                <div className={styles.playerDetailsInfoBlock}>Total XP<span>{playerDetails.xp}</span></div>
                <div className={styles.playerDetailsInfoBlock}>Verified Status<span>{playerDetails.verified ? "Verified" : "Not Verified"}</span></div>
                <div className={styles.playerDetailsInfoBlock}>Banned Status<span>{playerDetails.banStatus}</span></div>
                {isAdmin ? <div className={styles.playerDetailsInfoBlock}>Account Type<span>{playerDetails.isMain ? "Main" : "Alt"}</span></div> : <></> }
                {isAdmin ? <div className={styles.playerDetailsInfoBlock}>Number of Alts<span>{playerDetails.numAlts}</span></div> : <></> }
                <div className={styles.playerDetailsInfoBlock}>Date Created<span>{playerDetails.dateCreated}</span></div>
                <div className={styles.playerDetailsInfoBlock}>Last Interaction<span>{playerDetails.lastInteraction}</span></div>
              </div>
            </div>
          </div>
          <div className="mx-1" />
          <div>
            <div id="actionCards">
              <div className="row">
                <div className="col">
                  <ActionButton colour="" modalType={ModalTypes.EditInfo} icon={faPenToSquare} name="Edit Info" />
                  { !isBanned || (isBanned && ((!isAdmin && banType != 2) || isAdmin)) ?
                    <ActionButton
                      colour={isBanned ? "green" : "red"}
                      modalType={isBanned ? "" : ModalTypes.BanUser}
                      icon={isBanned ? faSquareCheck : faGavel}
                      name={isBanned ? (isAdmin ? "Unban / Unsuspend" : "Unsuspend") : (isAdmin ? "Ban / Suspend" : "Suspend") + " User"}/>
                    :
                    <></>
                  }
                  <ActionButton colour={hasHistory ? "orange" : "white"} modalType={ModalTypes.BanHistory} icon={faBook} name={hasHistory ? "Ban History" : "User has no ban history"} isDisabled={!hasHistory} />
                  {
                    isAdmin ?
                      <>
                        <ActionButton colour={hasAlts ? "pink" : "white"} modalType={ModalTypes.AltAccounts} icon={faClone} name={hasAlts ? "Alternate Accounts" : "User has no alt accounts"} isDisabled={!hasAlts} />
                        <ActionButton colour="blue" modalType={ModalTypes.ResetPass} icon={faLock} name="Reset Password" />
                        {/*<ActionButton colour="purple" modalType={ModalTypes.BadgeMgmt} icon={faShield} name="Badge Management" />*/}
                        <ActionButton colour="black" modalType={ModalTypes.DeleteAcc} icon={faTrash} name="Delete Account" />
                      </> : <></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

