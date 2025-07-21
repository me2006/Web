import { useContext, useEffect, useState, createContext, type ReactNode, useRef } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { createTableButton, postRequest } from "@site/src/utils/helpers";
import Heading from "@theme/Heading";
// import BadgeMgmtModal from "./Modals/BadgeMgmtModal";
import BanUserModal from "./Modals/BanUserModal";
import BanHistoryModal from "./Modals/BanHistoryModal";
import AltAccountsModal from "./Modals/AltAccountsModal";
import DeleteAccountModal from "./Modals/DeleteAccountModal";
import EditInfoModal from "./Modals/EditInfoModal";
import ResetPassModal from "./Modals/ResetPassModal";
import UserDetails from "./UserDetails";

import styles from "./index.module.css";

export const UmContext = createContext(null);

enum ModalTypes {
  None,
  EditInfo,
  BanUser,
  BanHistory,
  AltAccounts,
  ResetPass,
  BadgeMgmt,
  DeleteAcc
}

export default function UserManagement({ gmInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [searchTerm, setST] = useState("");
  const [modalUser, setMU] = useState("");
  const [fromTable, setFT] = useState(false);
  const [currView, setCV] = useState("search");
  const [currModal, setCM] = useState(ModalTypes.None);
  const [playerList, setPL] = useState();
  const [playerDetails, setPD] = useState();

  function getPlayerRequest(noe, getList) {
    const data = { username: noe };
    const requestLink = (getList) ? customFields.GET_LIST: customFields.GET_ONE;
    return postRequest(gmInfo, customFields, data, requestLink, "Failed to get player(s)");
  }

  function searchBtn() {
    const noe = (document.getElementById("email") as HTMLInputElement).value;
    setST(noe);
    const searchType = (document.getElementById("searchType") as HTMLInputElement).value;
    const btn = document.getElementById("searchBtn");
    btn.innerText = "Loading...";
    btn.setAttribute("disabled", "true");

    if (searchType !== "list")
      viewDetails(noe, false);
    else
      getPlayerRequest(noe, searchType == "list").then(data =>listData(data));

    btn.innerHTML = "Search";
    btn.removeAttribute("disabled");
  }

  function listData(data) {
    if (!data) return;
    if (Object.keys(data.players).length == 1)
      viewDetails(gmInfo.type == 0 ? data.players[0].email : data.players[0].username, false);
    else {
      setPL(data.players);
      setCV("list");
    }
  }

  function viewDetails(noe, fromTable) {
    setFT(fromTable);

    getPlayerRequest(noe, false).then(data => {
      if (!data) return;
      setPD(data.player);
      setCV("details");
    });
  }

  function addActionButtons(row, o) {
    const buttonCol = document.createElement("td");
    createTableButton(buttonCol, "👀 View Details", "button--bootstrap", () => viewDetails(o.username, true));
    createTableButton(buttonCol, "🖋️ Edit Info", "button--bootstrap yellow", () => openModal(o.username, ModalTypes.EditInfo));
    row.append(buttonCol);
  }

  const modalElem = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (modalElem.current && !modalElem.current.contains(event.target as Node)) {
        closeModal();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc")
        closeModal();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keypress", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keypress", handleEscape);
    };
  }, []);

  function openModal(modalUser, currModal) {
    setMU(modalUser);
    setCM(currModal);
    modalElem.current.style.display = "block";
  }

  function closeModal() {
    modalElem.current.style.display = "none";
  }

  return (
    <div className={styles.searchContainer}>
      <Heading as="h3" className="p-0 m-0">User search:</Heading>
      <p className="text-center">
        List mode will print a list of users with names that contain the search query<br/>
        Single mode will find a user with the exact email or username specified
      </p>

      <div className="inputGroup w-30 pb-1">
        <input className="input--bootstrap" name="email" id="email" type="email" placeholder="Username or Email" />
        <select className={styles.searchDropdown} name="searchType" id="searchType" defaultValue="list">
          <option value="list">List</option>
          <option value="single">Single</option>
        </select>
        <button type="button" id="searchBtn" className={styles.searchBtn} onClick={() => searchBtn()}>Search</button>
      </div>
      <hr className="w-90" />
      <UmContext.Provider value={{
        gmInfo,
        isAdmin: gmInfo.type == 0,
        playerDetails,
        setPD,
        closeModal
      }}>
        { currView == "list" ?
          <AccountTable playerList={playerList}/> :
          <></>
        }
        { currView == "details" ?
          <UserDetails fromTable={fromTable} searchTerm={searchTerm} ModalTypes={ModalTypes} openModal={openModal} openListView={() => setCV("list")}/> :
          <></>
        }
        <div ref={modalElem} className="modalOverlay">
          { currModal == ModalTypes.EditInfo ? <EditInfoModal getPlayerRequest={getPlayerRequest} username={modalUser} /> : <></> }
          { currModal == ModalTypes.BanUser ? <BanUserModal /> : <></> }
          { currModal == ModalTypes.BanHistory ? <BanHistoryModal /> : <></> }
          { currModal == ModalTypes.AltAccounts ? <AltAccountsModal addActionButtons={addActionButtons} /> : <></> }
          { currModal == ModalTypes.ResetPass ? <ResetPassModal /> : <></> }
          {/*{ currModal == ModalTypes.BadgeMgmt ? <BadgeMgmtModal /> : <></> }*/}
          { currModal == ModalTypes.DeleteAcc ? <DeleteAccountModal resetView={() => setCV("search")} /> : <></> }
        </div>
      </UmContext.Provider>
    </div>
  );
}


function AccountTable({ playerList }): ReactNode {
  const { isAdmin, searchTerm, addActionButtons } = useContext(UmContext);


  useEffect(() => {
    if (!playerList || playerList.length == 0)
      return;

    const tbody = document.getElementById("plTableBody") as HTMLTableElement;
    playerList.forEach((o) => {
      const rowData = isAdmin ?
        [o.accountId, o.email, o.username, o.sitekickName] :
        [o.accountId, o.username, o.sitekickName];
      const row = document.createElement("tr");
      for (const colData of rowData) {
        const td = document.createElement("td");
        td.textContent = colData;
        row.appendChild(td);
      }
      addActionButtons(row, o);
      tbody.appendChild(row);
    });
  }, [playerList]);

  return (
    !playerList || playerList.length == 0 ?
      <Heading as='h3' className={styles.emptyListText}>No players were found with the Email / Username: "${searchTerm}"</Heading>
      :
      <table id="playerListTable" className={`${styles.listTable} ${styles.playerListTable}`}>
        <thead>
          <tr>
            <th>Account ID</th>
            {isAdmin ? <th>Email</th> : <></>}
            <th>Username</th>
            <th>Sitekick Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="plTableBody"></tbody>
      </table>
  );
}