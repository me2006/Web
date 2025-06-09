import { useState, createContext, useEffect } from "react";
import Heading from "@theme/Heading";
import Login from "@site/src/components/Admin/Login";
import Panel from "@site/src/components/Admin/Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export const GmContext = createContext(null);

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [gm, setGM] = useState(Object);

  function login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };

    //security.fileuri.strict_origin_policy
    fetch("http://localhost:8080/mod_panel_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },

      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (!res.ok) {
        alert("Incorrect username / password");
        throw new Error("Incorrect username / password");
      }
      return res.json();
    }).then(resData => {
      // console.info(resData);
      localStorage.setItem("gmInfo", JSON.stringify(resData));
      setLoggedIn(true);
    }).catch(error => {
      console.error("Error:", error);
    });
  }

  function logout() {
    localStorage.removeItem("gmInfo");
    setLoggedIn(false);
  }

  function getGmInfo() {
    const userStr = localStorage.getItem("gmInfo");
    return (userStr) ? JSON.parse(userStr) : null;
  }

  useEffect(() => {
    const cUser = getGmInfo();
    setGM(cUser);
    setLoggedIn(cUser && cUser != null && Object.keys(cUser).length != 0 && cUser.token);
  },[]);

  return (
    <main className={styles.mainContainer}>
      { loggedIn ?
        <div className={styles.panelNavbar}>
          <Heading as="h2">Sitekick Remastered Mod Panel</Heading>
          <Heading as="h3">Welcome <span>{gm.type}</span> {gm.username}!</Heading>
          <button className="button red sm margin--sm" onClick={() => { logout(); }}>
            Logout <FontAwesomeIcon icon={faSignOut} />
          </button>
        </div>
        :
        <></>
      }
      <GmContext.Provider value={{ login: login, getGmInfo: getGmInfo }}>
        { !loggedIn ? <Login /> : <Panel /> }
      </GmContext.Provider>
    </main>
  );
}