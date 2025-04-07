import { useState, type ReactNode } from 'react';

import styles from "./index.module.css";

export default function UserManagement({ user }): ReactNode {
  const [noe, setNoe] = useState(""); // Name or Email
  const [searchType, setST] = useState("");

  const search = () => {
    const data = { 
      author: user.username,
      token: user.token,
      username: noe
    };

    let requestLink = `${user.type}_get_player`;
    if (searchType === "list")
      requestLink += "_list";
    console.info(requestLink);
    
    fetch("http://localhost:8080/" + requestLink, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },

      body: "json=" + encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        throw new Error("Failed to get player");
      }
      return res.json()
    }).then(resData => {
      console.info(resData);
    }).catch(error => {
      console.error("Error:", error);
    });
  }

  return (
    <div style={{ width: "90%", }}>
      <div className={styles.searchContainer}>
        <input className={styles.searchInput} onChange={(e) => setNoe(e.target.value)} name="email" id="email" type="email" placeholder="Username or Email" />
        <select className={styles.searchDropdown} onChange={(e) => setST(e.target.value)} name="searchType" id="searchType">
          <option value="single">Single</option>
          <option value="list">List</option>
        </select>
        <button type="button" className={styles.searchBtn} onClick={() => search()}>Search</button>
      </div>
    </div>
  );
}
