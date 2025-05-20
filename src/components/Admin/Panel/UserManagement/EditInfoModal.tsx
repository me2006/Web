import { useState, useEffect, type ReactNode } from "react";

import styles from "./index.module.css";

export default function EditInfoModal( { gmInfo, modalElement, username, getPlayerRequest }): ReactNode {
  const [dataError, setDE] = useState(false);
  const [playerData, setPD] = useState({
    email: "",
    username: "",
    sitekickName: "",
  });
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
      values_to_change: `${newEmail != playerData.email}, ${newUsername != playerData.username}, ${newSitekickName != playerData.sitekickName}`,
      new_email: newEmail,
      new_username: newUsername,
      new_sitekick_name: newSitekickName
    };

    return fetch("http://localhost:8080/" + gmInfo.type + "/change_player_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to change player information.");
      }      
      return res.json();
    }).catch(error => {
      alert("Failed to change player information.")
    });
  }

  return (
    <div className={styles.modalContainer}>
      <div id="modalHeader" className={styles.modalHeader} style={{backgroundColor: "#E0A800"}}>
        <span id="closeModal" className={styles.closeModal} onClick={() => modalElement.style.display = "none"}>&times;</span>
        <h2 id="modalTitle" className={styles.modalTitle}>Edit User Info</h2>
      </div>
      <div id="modalBody" className={styles.modalBody}>
        <div id="modalContent" className={styles.modalContent}>
          {
            dataError ? 
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p style={{textAlign: "center"}}>Modify the input boxes below and click save to change the user's information.</p>
              {
                gmInfo.type == "admin" ?
                <>
                  <label htmlFor="changeEmail" className={styles.infoLabel}>Email:</label>
                  <input className={styles.infoInput} name="changeEmail" id="changeEmail" type="email" defaultValue={playerData.email} />
                  <br/>
                </>
                : <></>
              }
              <label htmlFor="changeUsername" className={styles.infoLabel}>Username:</label>
              <input className={styles.infoInput} name="changeUsername" id="changeUsername" type="text" defaultValue={playerData.username} />
              <br/>
              <label htmlFor="changeSitekickName" className={styles.infoLabel}>Sitekick Name:</label>
              <input className={styles.infoInput} name="changeSitekickName" id="changeSitekickName" type="text" defaultValue={playerData.sitekickName} />
              <br/>
              <button type="button" className={styles.changePlayerInfoBtn} onClick={() => changeInfo()}>Change player info</button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

