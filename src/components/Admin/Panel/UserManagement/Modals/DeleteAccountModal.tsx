import { useState, useEffect, useContext, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function DeleteAccountModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, playerDetails, resetView, closeModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!playerDetails.username){
      setDE(true);
      return;
    }

    const confirmBtn = document.getElementById("deleteAccBox") as HTMLInputElement;

    confirmBtn.addEventListener("change", function() {
      setConfirmed(confirmBtn.checked);
    });
  }, [playerDetails]);

  function deleteAccount() {
    const data = {
      author: gmInfo.username,
      token: gmInfo.token,
      account_id: playerDetails.accountId
    };

    return fetch(`${customFields.BASE_URL}${customFields.DELETE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      credentials: "include",
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to delete player's account.");
      }
      alert(`${playerDetails.username}'s account was deleted successfully`);
      closeModal();
      resetView();
    }).catch(() => {
      alert(`Failed to delete ${playerDetails.username}'s account.`);
    });
  }

  return (
    <div className={styles.modalContainer}>
      <div id="modalHeader" className={`${styles.modalHeader} ${styles.light}`} style={{ backgroundColor: "#1a1a1a" }}>
        <span id="closeModal" className={`${styles.closeModal} ${styles.light}`} onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className={styles.modalTitle}>Delete Account</Heading>
      </div>
      <div id="modalBody" className={styles.modalBody}>
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0"><b>Warning:</b> The button that appears after clicking the checkbox below will delete {playerDetails.username}'s account.</p>
              <p className="text-center mb-0"><b>This action cannot be undone.</b></p>
              <p className="text-center mb-0">Are you sure you want to delete this account?</p>
              <br/>
              <input type="checkbox" id="deleteAccBox" name="deleteAccBox" />
              <label htmlFor="deleteAccBox"> Yes, I want to delete {playerDetails.username}'s account</label>
              <br/>
              {
                confirmed ?
                  <button type="button" className={styles.banUserBtn} onClick={ () => deleteAccount()}>Delete Account</button> :
                  <></>
              }
            </>
        }
      </div>
    </div>
  );
}