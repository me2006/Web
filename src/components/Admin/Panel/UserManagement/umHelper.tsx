
import styles from "./index.module.css";
let user;


const openModal = (noe) => {

}

function createAccountTable(data, divId) {
  if (!data) return;
  const isAdmin = user.type == "admin";
  const isAltTable = divId == "altAccountsTable";

  let html = ``;
  if (data.length == 0 && isAltTable) {
    html = `<h3 class="${styles.emptyListText}">No alts were found for this account</h3>`;
  }
  else {
    if (isAltTable) {
      const id = "altTableAccordion";
      html += `
          <input class="${styles.accordionInput}" type="checkbox" id=${id} />
          <label class="${styles.accordionLabel}" for=${id}>Associated Accounts</label>
          <div class="${styles.accordionContent}">
        `
    }
    html += `
        <table class="${styles.playerListTable}">
          <thead>
            <tr>
              <th>Account ID</th>
              ${isAdmin ? "<th>Email</th>" : ""}
              <th>Username</th>
              <th>Sitekick Name</th>
              ${isAltTable ? "<th>Account Type</th>" : ""}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="tableBody">
        `;

    data.forEach((o) => {
      const noe = isAdmin ? o.email : o.username;
      html += `
        <tr>
          <td>${o.accountId}</td>
          ${isAdmin ? `<td>${o.email}</td>` : ""}
          <td>${o.username}</td>
          <td>${o.sitekickName}</td>
              ${isAltTable ? `<th>${o.isMain ? "Main" : "Alt"}</th>` : ""}
          <td>
            <button type="button" id="viewDetailsBtn" name="${noe}" class="${styles.viewDetailsBtn}">👀 View Details</button>
            <button type="button" id="editNamesBtn" name="${noe}" class="${styles.editNamesBtn}">🖋️ Edit Names</button>
          </td>
        </tr>
      `
    });
    html += `
        </tbody>
      </table>
      `;
    if (isAltTable) {
      html += `</div>`
    }
  }

  document.getElementById(divId).innerHTML = html;

  if (data.length > 0) {
    const tableBody = document.getElementById("tableBody");

    tableBody.addEventListener("click", (e) => {
      const target = (e.target as HTMLInputElement);
      const isButton = target.nodeName === "BUTTON";
      if (!isButton) return;

      if (target.id == "viewDetailsBtn") searchPlayer(e);
      if (target.id == "editNamesBtn") openModal(e);
    })
  }
}

function createBadgeTable(data) {
  const isAdmin = user.type == "admin";
  if (!data || !isAdmin) return;

  let html = ``;
  if (data.length == 0)
    html = `<h3 class="${styles.emptyListText}">This account has no badges</h3>`;
  else {
    const id = "badgeTableAccordion";
    html += `
      <input class="${styles.accordionInput}" type="checkbox" id=${id} />
      <label class="${styles.accordionLabel}" for=${id}>Account Badges</label>
      <div class="${styles.accordionContent}">
    `
    html += `
      <table class="${styles.playerListTable}">
        <thead>
          <tr>
            <th>Badge ID</th>
            <th>Badge Name</th>
            <th>Metadata</th>
            <th>Badge Level</th>
            <th>Date Earned</th>
          </tr>
        </thead>
        <tbody id="tableBody">
      `;

    data.forEach((o) => {
      const noe = isAdmin ? o.email : o.username;
      html += `
        <tr>
          <td>${o.id}</td>
          <td>${o.name}</td>
          <td>${o.metadata ? o.metadata : "No metadata"}</td>
          <td>${o.level}</td>
          <td>${o.dateEarned}</td>
        </tr>
      `
    });
    html += `
          </tbody>
        </table>
      </div>
      `;
  }

  document.getElementById("badgeTable").innerHTML = html;
}

function createBanTable(data) {
  const isAdmin = user.type == "admin";
  if (!data || !isAdmin) return;

  let html = ``;
  if (data.length == 0)
    html = `<h3 class="${styles.emptyListText}">This account has not been banned</h3>`;
  else {
    const id = "banTableAccordion";
    html += `
      <input class="${styles.accordionInput}" type="checkbox" id=${id} />
      <label class="${styles.accordionLabel}" for=${id}>Account Badges</label>
      <div class="${styles.accordionContent}">
    `
    html += `
      <table class="${styles.playerListTable}">
        <thead>
          <tr>
            <th>Expiration</th>
            <th>Reason</th>
            <th>Ban Author</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody id="tableBody">
      `;

    data.forEach((o) => {
      const noe = isAdmin ? o.email : o.username;
      html += `
        <tr>
          <td>${o.expiration}</td>
          <td>${o.reason}</td>
          <td>${o.createdBy}</td>
          <td>${o.dateCreated}</td>
        </tr>
      `
    });
    html += `
          </tbody>
        </table>
      </div>
      `;
  }

  document.getElementById("banTable").innerHTML = html;
}

function viewDetails(data, fromTable) {
  if (!data) return;
  let details = ``;
  const isAdmin = user.type == "admin";

  const tableColumns = {
    "Account ID": data.accountId,
    "Email": data.email,
    "Username": data.username,
    "Sitekick Name": data.sitekickName,
    "Total XP": data.xp,
    "Verified Status": data.verified ? "Verified" : "Not Verified",
    "Banned Status": data.banStatus,
    "Account Type": data.isMain ? "Main" : "Alt",
    "Number of Alts": data.numAlts,
    "Date Created": data.dateCreated,
    "Last Interaction": data.lastInteraction
  }
  const adminOnly = ["Email", "Account Type", "Number of Alts"]

  if (fromTable)
    details += `<button style="display: flex; margin: auto" id="openListView">Back to List</button>`

  details += `
    <div class=${styles.playerDetailsContainer}>
      <div class=${styles.playerDetailsImg} style="background-color: ${data.sitekickColour || "#FFCC00"}"></div>
      <h2 class=${styles.playerDetailsName}>${data.username}</h2>
    `;

  Object.keys(tableColumns).forEach((key) => {

    if (!isAdmin && adminOnly.includes(key)) return;

    details += `
      <div class=${styles.playerDetailsInfoBlock}>
        ${key}
        <span class=${styles.playerDetailsValue}>${tableColumns[key]}</span>
      </div>
      `
  });

  const viewDetails = document.getElementById("playerDetails");
  viewDetails.innerHTML = details;

  if (fromTable) {
    viewDetails.addEventListener("click", (e) => {
      const target = (e.target as HTMLInputElement);
      const isButton = target.nodeName === "BUTTON";
      if (isButton && target.id == "openListView") openListView(null);
    })
  }
}

const postRequest = (noe, getList) => {
  const data = {
    author: user.username,
    token: user.token,
    username: noe
  };

  let requestLink = `${user.type}_get_player`;
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
    document.getElementById("noPlayersFound").innerHTML = "";
    return res.json();
  }).catch(error => {
    const err = `<h3 class="${styles.emptyListText}">No players were found with the Email / Username: "${data.username}"</h3>`;
    document.getElementById("noPlayersFound").innerHTML = err;
    console.error(error);
  });
}

const listData = (data) => {
  if (!data) return;
  if (Object.keys(data.players).length == 1)
    searchPlayer(user.type == "admin" ? data.players[0].email : data.players[0].username);
  else
    openListView(data.players);
}

const openListView = (players) => {
  document.getElementById("playerListTable").style.display = "";
  document.getElementById("playerDetails").innerHTML = "";
  document.getElementById("altAccountsTable").innerHTML = "";
  document.getElementById("badgeTable").innerHTML = "";
  document.getElementById("banTable").innerHTML = "";
  if (players) createAccountTable(players, "playerListTable");
}

const searchPlayer = (e) => {
  const noe = (e.target) ? e.target.name : e;
  const ft = (e.target) ? true : false;

  postRequest(noe, false).then(data => {
    if (!data) return;
    viewDetails(data.player, ft);
    createAccountTable(data.player.associatedAccounts, "altAccountsTable");
    createBadgeTable(data.player.badgeList);
    createBanTable(data.player.banList);
    document.getElementById("playerListTable").style.display = "none";
  });
}

export const searchBtn = (u) => {
  user = u;
  let noe = (document.getElementById("email") as HTMLInputElement).value;
  let searchType = (document.getElementById("searchType") as HTMLInputElement).value;
  const btn = document.getElementById("searchBtn");
  btn.innerText = "Loading...";
  btn.setAttribute("disabled", "true");

  if (searchType !== "list")
    searchPlayer(noe);
  else
    postRequest(noe, searchType == "list").then(data => { listData(data); })

  btn.innerHTML = "Search";
  btn.removeAttribute("disabled");
}
