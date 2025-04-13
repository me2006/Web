import { useState, type ReactNode } from 'react';

import styles from "./index.module.css";

export default function UserManagement({ user }): ReactNode {
  const [noe, setNoe] = useState(""); // Name or Email
  const [searchType, setST] = useState("list"); // Dropdown selection
  const [isViewDetails, setVD] = useState(false); // Determines if the view details screen is shown
  const [isFromTable, setFT] = useState(false); // Determines if the back button is shown on view details.


  const viewDetails = (noe) => {
    setVD(true);
    setFT(true);
    setNoe(noe)
  }

  const openModal = (noe) => {

  }


  function createTable(isAdmin, data) {

    let table = `
  <table class="${styles.getListTable}">
    <thead>
      <tr>
        <th>Account ID</th>
        ${isAdmin ? "<th>Email</th>" : ""}
        <th>Username</th>
        <th>Sitekick Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
  `;

    data.forEach((o) => {
      table += `
      <tr>
        <td>${o.accountId}</td>
        ${isAdmin ? `<td>${o.email}</td>` : ""}
        <td>${o.username}</td>
        <td>${o.sitekickName}</td>
        <td>
          <button type="button" class="${styles.viewDetailsBtn}" onClick={${viewDetails(isAdmin ? o.email : o.username)}}>👀 View Details</button>
          <button type="button" class="${styles.editNamesBtn}" onClick={${openModal(isAdmin ? o.email : o.username)}}>✏️ Edit Names</button>
        </td>
      </tr>
    `
    });
    table += `
    </tbody>
  </table>
  `;

    document.getElementById("getListTableContainer").innerHTML = table;
  }

  const search = () => {
    const data = {
      author: user.username,
      token: user.token,
      username: noe
    };

    const btn = document.getElementById("searchBtn");
    btn.innerText = "Loading...";
    btn.setAttribute('disabled', "true");

    let requestLink = `${user.type}_get_player`;
    if (searchType === "list" && !isViewDetails)
      requestLink += "_list";

    fetch("http://localhost:8080/" + requestLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to get player");
      }
      return res.json()
    }).then(resData => {
      console.info(resData);
      if (Object.keys(resData.players).length == 1) {
        setVD(true);
        setNoe(resData.players[0].email);
        search();
      }
      else {
        createTable(user.type == "admin", resData.players);
      }
    }).catch(error => {
      console.error("Error:", error);
    });
    btn.innerHTML = "Search";
    btn.setAttribute('disabled', "false");
  }

  return (
    <div className={styles.searchContainer}>
      <h3 style={{padding: 0, margin: 0}}>User search:</h3>
      <p style={{textAlign: "center"}}>
        List mode will print a list of users with names that contain the search query<br/>
        Single mode will find a user with the exact email or username specified
      </p>
      
      <div className={styles.inputGroup}>
        <input className={styles.searchInput} onChange={(e) => setNoe(e.target.value)} name="email" id="email" type="email" placeholder="Username or Email" />
        <select className={styles.searchDropdown} onChange={(e) => setST(e.target.value)} name="searchType" id="searchType" defaultValue="list">
          <option value="list">List</option>
          <option value="single">Single</option>
        </select>
        <button type="button" id="searchBtn" className={styles.searchBtn} onClick={() => search()}>Search</button>
      </div>
      <div id="getListTableContainer" className={styles.getListTableContainer}>
      </div>
      <div id="viewDetails">
        <div id="associatedAccountsTable">

        </div>
      </div>
    </div>
  );
}

