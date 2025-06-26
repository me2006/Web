import { useState, useEffect, useContext, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { UmContext } from "..";

import styles from "../index.module.css";

export default function ResetPassModal(): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, playerDetails, closeModal } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!playerDetails.username){
      setDE(true);
      return;
    }

    const confirmBtn = document.getElementById("resetPassBox") as HTMLInputElement;

    confirmBtn.addEventListener("change", function() {
      setConfirmed(confirmBtn.checked);
    });
  }, [playerDetails]);

  function resetPassword() {
    const data = {
      author: gmInfo.username,
      token: gmInfo.token,
      username: playerDetails.email || playerDetails.username
    };

    return fetch(`${customFields.BASE_URL}${customFields.CREATE_PASS_RESET}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      credentials: "include",
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to reset player's password.");
      }
      alert(`${playerDetails.username}'s password was reset successfully.`);
      closeModal();
    }).catch(() => {
      alert(`Failed to reset ${playerDetails.username}'s password.`);
    });
  }

  return (
    <div className={styles.modalContainer}>
      <div id="modalHeader" className={styles.modalHeader} style={{ backgroundColor: "#3399ff" }}>
        <span id="closeModal" className={styles.closeModal} onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className={styles.modalTitle}>Reset Password</Heading>
      </div>
      <div id="modalBody" className={styles.modalBody}>
        {
          dataError ?
            <p>
              Error: There was an error getting this player's information.<br/>
              Please try again later or contact the server admin.
            </p> :
            <>
              <p className="text-center mb-0"><b>Warning:</b> The button that appears after clicking the checkbox below will reset {playerDetails.username}'s password.</p>
              <p className="text-center mb-0"><b>This action cannot be undone.</b></p>
              <p className="text-center mb-0">Are you sure you want to reset the password?</p>
              <br/>
              <input type="checkbox" id="resetPassBox" name="resetPassBox" />
              <label htmlFor="resetPassBox"> Yes, I want to reset {playerDetails.username}'s password</label>
              <br/>
              {
                confirmed ?
                  <button type="button" className={styles.changePassBtn} onClick={ () => resetPassword()}>Reset Password</button> :
                  <></>
              }
            </>
        }
      </div>
    </div>
  );
}