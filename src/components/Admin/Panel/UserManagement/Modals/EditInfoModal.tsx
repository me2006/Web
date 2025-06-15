import { useState, useEffect, useContext, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function EditInfoModal( { username }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, isAdmin, closeModal, playerDetails, setPD, getPlayerRequest } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const [accountId, setAI] = useState(-1);

  useEffect(() => {
    if (!username)
      return;

    const fetchData = async () => await getPlayerRequest(username, false);
    fetchData().then((data) => {
      if (!data)
        setDE(true);
      else {
        setPD(data.player);
        setAI(data.player.accountId);
      }
    });
  }, [username]);

  function changeInfo() {
    const newEmail = (document.getElementById("changeEmail") as HTMLInputElement).value;
    const newUsername = (document.getElementById("changeUsername") as HTMLInputElement).value;
    const newSitekickName = (document.getElementById("changeSitekickName") as HTMLInputElement).value;

    const data = {
      author: gmInfo.username,
      token: gmInfo.token,
      account_id: accountId,
      values_to_change: `${newEmail != playerDetails.email}, ${newUsername != playerDetails.username}, ${newSitekickName != playerDetails.sitekickName}`,
      new_email: newEmail,
      new_username: newUsername,
      new_sitekick_name: newSitekickName
    };

    return fetch(`${customFields.BASE_URL}${customFields.CHANGE_INFO}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      credentials: "include",
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to change player information.");
      }
      return res.json();
    }).catch(() => {
      alert("Failed to change player information.");
    });
  }

  return (
    <div className={styles.modalContainer}>
      <div id="modalHeader" className={styles.modalHeader} style={{ backgroundColor: "#e0a800" }}>
        <span id="closeModal" className={styles.closeModal} onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className={styles.modalTitle}>Edit User Info</Heading>
      </div>
      <div id="modalBody" className={styles.modalBody}>
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center">Modify the input boxes below and click save to change the user's information.</p>
              {
                isAdmin ?
                  <>
                    <label htmlFor="changeEmail" className={styles.infoLabel}>Email:</label>
                    <input className={styles.infoInput} name="changeEmail" id="changeEmail" type="email" defaultValue={playerDetails.email} />
                    <br />
                  </>
                  : <></>
              }
              <label htmlFor="changeUsername" className={styles.infoLabel}>Username:</label>
              <input className={styles.infoInput} name="changeUsername" id="changeUsername" type="text" defaultValue={playerDetails.username} />
              <br/>
              <label htmlFor="changeSitekickName" className={styles.infoLabel}>Sitekick Name:</label>
              <input className={styles.infoInput} name="changeSitekickName" id="changeSitekickName" type="text" defaultValue={playerDetails.sitekickName} />
              <br/>
              <button type="button" className={styles.changePlayerInfoBtn} onClick={() => changeInfo()}>Change player info</button>
            </>
        }
      </div>
    </div>
  );
}

