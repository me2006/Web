import { useState, useEffect, useContext, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function BanUserModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, isAdmin, playerDetails, setPD, closeModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);

  useEffect(() => {
    if (!playerDetails.username){
      setDE(true);
      return;
    }

    if (isAdmin) {
      const datePicker = document.getElementById("expiration") as HTMLTextAreaElement;
      const isBannedBox = document.getElementById("permaBanBox") as HTMLInputElement;

      isBannedBox.addEventListener("change", function() {
        datePicker.disabled = this.checked;
      });
    }
  }, [playerDetails]);

  function banUser() {
    const expiration = (document.getElementById("expiration") as HTMLTextAreaElement).value;
    const isBanned = isAdmin ? (document.getElementById("permaBanBox") as HTMLInputElement).checked : false;
    const reason = (document.getElementById("reason") as HTMLInputElement).value;

    if (!expiration && !isBanned) {
      alert("Must have a valid expiration date (unless player is permanently banned)!");
      return;
    }
    if (reason === null || reason.match(/^ *$/) !== null) {
      alert("Reason must not be empty!");
      return;
    }

    const data = {
      author: gmInfo.username,
      token: gmInfo.token,
      email: isAdmin ? playerDetails.email : "",
      username: playerDetails.username,
      expiration: isBanned ? Date.now() : expiration,
      is_banned: isBanned,
      reason: reason,
      created_by: gmInfo.username
    };

    return fetch(`${customFields.BASE_URL}${customFields.BAN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      credentials: "include",
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to ban player.");
      }
      alert(`Player ${playerDetails.username} was succesfully banned`);
      setPD({ ...playerDetails, banStatus: isBanned ? "Perma banned" : "Suspended" });
      closeModal();
    }).catch(() => {
      alert("Failed to ban player.");
    });
  }

  return (
    <div className={styles.modalContainer}>
      <div id="modalHeader" className={styles.modalHeader} style={{ backgroundColor: "#cc0000" }}>
        <span id="closeModal" className={styles.closeModal} onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className={styles.modalTitle}>{ isAdmin ? "Ban / Suspend User" : "Suspend User" }</Heading>
      </div>
      <div id="modalBody" className={styles.modalBody}>
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0">Enter the information below.</p>
              <div>
                <label htmlFor="expiration" className={styles.infoLabel}>Expiration:</label>
                <input className={`${styles.infoInput} ${styles.sm}`} name="expiration" id="expiration" type="date" />
                { isAdmin ?
                  <>
                    <br/>
                    <input type="checkbox" id="permaBanBox" name="permaBanBox" />
                    <label htmlFor="permaBanBox"> Permanently Ban</label>
                  </> :
                  <></>
                }
              </div>
              <br/>
              <label htmlFor="reason" className={styles.infoLabel}>Reason (max 512 characters):</label>
              <textarea className={styles.textareaReason} name= "reason" id="reason" maxLength={512} />
              <br/>
              <button type="button" className={styles.banUserBtn} onClick={ () => banUser()}>{isAdmin ? "Ban / Suspend User" : "Suspend User" }</button>
            </>
        }
      </div>
    </div>
  );
}