import { useState, useEffect, useContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import { UmContext } from "..";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { postRequest } from "@site/src/utils/helpers";

export default function EditInfoModal({ getPlayerRequest, username }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const { gmInfo, isAdmin, closeModal, playerDetails, setPD } = useContext(UmContext);
  const [dataError, setDE] = useState(false);
  const [accountId, setAI] = useState(-1);

  useEffect(() => {
    if (!username)
      return;

    const getPlayer = async () => await getPlayerRequest(username, false);
    getPlayer().then((data) => {
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
      account_id: accountId,
      values_to_change: `${newEmail != playerDetails.email}, ${newUsername != playerDetails.username}, ${newSitekickName != playerDetails.sitekickName}`,
      new_email: newEmail,
      new_username: newUsername,
      new_sitekick_name: newSitekickName
    };

    return postRequest(gmInfo, customFields, data, customFields.CHANGE_INFO, "Failed to change player information.");
  }

  return (
    <div className="modalContainer">
      <div id="modalHeader" className="modalHeader" style={{ backgroundColor: "#e0a800" }}>
        <span id="closeModal" className="closeModal" onClick={() => closeModal()}>&times;</span>
        <Heading as="h2" className="modalTitle">Edit User Info</Heading>
      </div>
      <div id="modalBody" className="modalBody">
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
                    <label htmlFor="changeEmail" className="input--label">Email:</label>
                    <input className="input--bootstrap" name="changeEmail" id="changeEmail" type="email" defaultValue={playerDetails.email} />
                    <br />
                  </>
                  : <></>
              }
              <label htmlFor="changeUsername" className="input--label">Username:</label>
              <input className="input--bootstrap" name="changeUsername" id="changeUsername" type="text" defaultValue={playerDetails.username} />
              <br/>
              <label htmlFor="changeSitekickName" className="input--label">Sitekick Name:</label>
              <input className="input--bootstrap" name="changeSitekickName" id="changeSitekickName" type="text" defaultValue={playerDetails.sitekickName} />
              <br/>
              <button type="button" className="d-flex m-auto button--bootstrap yellow" onClick={() => changeInfo()}>Change player info</button>
            </>
        }
      </div>
    </div>
  );
}

