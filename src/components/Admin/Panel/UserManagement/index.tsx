import { type ReactNode } from "react";

import { searchBtn } from "./umHelper";
import styles from "./index.module.css";

export default function UserManagement({ user }): ReactNode {
  return (
    <div className={styles.searchContainer}>
      <h3 style={{padding: 0, margin: 0}}>User search:</h3>
      <p style={{textAlign: "center"}}>
        List mode will print a list of users with names that contain the search query<br/>
        Single mode will find a user with the exact email or username specified
      </p>
      
      <div className={styles.inputGroup}>
        <input className={styles.searchInput} name="email" id="email" type="email" placeholder="Username or Email" />
        <select className={styles.searchDropdown} name="searchType" id="searchType" defaultValue="list">
          <option value="list">List</option>
          <option value="single">Single</option>
        </select>
        <button type="button" id="searchBtn" className={styles.searchBtn} onClick={() => searchBtn(user)}>Search</button>
      </div>
      <div id="noPlayersFound"/>
      <div id="playerListTable" className={styles.playerListTableContainer}></div>
      <div id="playerDetails"></div>
      <div id="altAccountsTable" className={styles.altTableContainer}></div>
      <div id="badgeTable" className={styles.badgeTableContainer}></div>
      <div id="banTable" className={styles.banTableContainer}></div>
    </div>
  );
}

