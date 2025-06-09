import { useState, createContext, type ReactNode } from "react";
import Heading from "@theme/Heading";
import AccountTable from "./AccountTable";
import EditInfoModal from "./EditInfoModal";
import BanUserModal from "./Modals/BanUserModal";
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
  ResetPass,
  BadgeMgmt,
  DeleteAcc
}

export default function UserManagement({ gmInfo }): ReactNode {
  const [searchTerm, setST] = useState("");
  const [modalUser, setMU] = useState("");
  const [fromTable, setFT] = useState(false);
  const [currView, setCV] = useState("search");
  const [currModal, setCM] = useState(ModalTypes.None);
  const [playerList, setPL] = useState();
  const [playerDetails, setPD] = useState();

  function getPlayerRequest(noe, getList) {
    const data = {
      author: gmInfo.username,
      token: gmInfo.token,
      username: noe
    };

    let requestLink = `${gmInfo.type}_get_player`;
    if (getList) requestLink += "_list";

    return fetch("http://localhost:8080/" + requestLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to get player(s)");
      }
      return res.json();
    }).catch(error => {
      console.error(error);
    });
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
      viewDetails(gmInfo.type == "admin" ? data.players[0].email : data.players[0].username, false);
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
    const viewDetailsBtn = document.createElement("button");
    viewDetailsBtn.textContent = "👀 View Details";
    viewDetailsBtn.classList.add(styles.viewDetailsBtn);
    viewDetailsBtn.onclick = () => viewDetails(o.username, true);
    const editInfoBtn = document.createElement("button");
    editInfoBtn.textContent = "🖋️ Edit Info";
    editInfoBtn.classList.add(styles.editInfoBtn);
    editInfoBtn.onclick = () => openModal(o.username, ModalTypes.EditInfo);
    buttonCol.append(viewDetailsBtn, editInfoBtn);
    row.append(buttonCol);
  }

  const modalElem = document.getElementById("actionsModal");

  function openModal(modalUser, currModal) {
    setMU(modalUser);
    setCM(currModal);
    modalElem.style.display = "block";
  }

  function closeModal() {
    modalElem.style.display = "none";
  }

  // Close the modal if the user clicks anywhere outside
  window.onclick = function(event) {
    if (event.target == modalElem)
      modalElem.style.display = "none";
  };

  return (
    <div className={styles.searchContainer}>
      <Heading as="h3" className="p-0 m-0">User search:</Heading>
      <p className="text-center">
        List mode will print a list of users with names that contain the search query<br/>
        Single mode will find a user with the exact email or username specified
      </p>

      <div className={styles.inputGroup}>
        <input className={styles.searchInput} name="email" id="email" type="email" placeholder="Username or Email" />
        <select className={styles.searchDropdown} name="searchType" id="searchType" defaultValue="list">
          <option value="list">List</option>
          <option value="single">Single</option>
        </select>
        <button type="button" id="searchBtn" className={styles.searchBtn} onClick={() => searchBtn()}>Search</button>
      </div>
      <hr className="w-90" />
      <UmContext.Provider value={{
        gmInfo,
        isAdmin: gmInfo.type == "admin",
        searchTerm,
        ModalTypes,
        playerDetails,
        resetView: () => setCV("search"),
        setPD,
        openModal,
        closeModal,
        addActionButtons,
        getPlayerRequest,

      }}>
        { currView == "list" ?
          <AccountTable playerList={playerList}/> :
          <></>
        }
        { currView == "details" ?
          <UserDetails fromTable={fromTable} openListView={() => setCV("list")}/> :
          <></>
        }
        <div id="actionsModal" className={styles.actionsModal}>
          { currModal == ModalTypes.EditInfo ? <EditInfoModal username={modalUser} /> : <></> }
          { currModal == ModalTypes.BanUser ? <BanUserModal /> : <></> }
          { currModal == ModalTypes.ResetPass ? <ResetPassModal /> : <></> }
          { currModal == ModalTypes.DeleteAcc ? <DeleteAccountModal /> : <></> }
        </div>
      </UmContext.Provider>
    </div>
  );
}