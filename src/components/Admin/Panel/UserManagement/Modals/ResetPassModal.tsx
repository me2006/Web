import { useState, useEffect, useContext, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { UmContext } from "..";
import { postRequest } from "@site/src/utils/helpers";

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
      username: playerDetails.email || playerDetails.username
    };

    return postRequest(gmInfo, customFields, data, customFields.CREATE_PASS_RESET, `Failed to reset ${playerDetails.username}'s password.`).then(() => {
      alert(`${playerDetails.username}'s password was reset successfully.`);
      closeModal();
    });
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#3399ff" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Reset Password</Heading>
      </div>
      <div id="modalBody" className="modalBody">
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
                  <button type="button" className="d-flex m-auto button--bootstrap" onClick={ () => resetPassword()}>Reset Password</button> :
                  <></>
              }
            </>
        }
      </div>
    </div>
  );
}