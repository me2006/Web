import { useState, createContext, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import Login from "@site/src/components/Admin/Login";
import Panel from "@site/src/components/Admin/Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

export const GmContext = createContext(null);

export default function Admin() {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const [gm, setGM] = useState(Object);

  function login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };

    //security.fileuri.strict_origin_policy
    fetch(`${customFields.BASE_URL}${customFields.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      credentials: "include",
      body: encodeURIComponent(JSON.stringify(data))
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Incorrect username / password");
    }).then(resData => {
      // console.info(resData);
      const d = new Date();
      d.setTime(d.getTime() + 3600 * 1000);
      document.cookie = "gmInfo=" + JSON.stringify(resData.gm) + ";path=/admin;expires=" + d.toUTCString();
      setGM(resData.gm);
      setLoggedIn(true);
    }).catch(error => {
      alert(error);
    });
  }

  function logout() {
    if (getCookie("gmInfo"))
      document.cookie = "gmInfo=;path=/admin;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    if (getCookie("Session-Id"))
      document.cookie = "Session-Id=;path=/admin;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setLoggedIn(false);
  }

  function getGmInfo() {
    const gmInfo = getCookie("gmInfo");
    return (gmInfo) ? JSON.parse(gmInfo) : null;
  }

  function getCookie(cName) {
    const name = cName + "=";
    const ca = document.cookie.split(";");
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    const cUser = getGmInfo();
    const session = getCookie("Session-Id");
    setGM(cUser);
    setLoggedIn(cUser && cUser != null && Object.keys(cUser).length != 0 && session != "");
  },[]);

  return (
    <main className={styles.mainContainer}>
      { loggedIn && gm ?
        <div className={styles.panelNavbar}>
          <Heading as="h2">Sitekick Remastered Mod Panel</Heading>
          <Heading as="h3">Welcome <span>{gm.type == 0 ? "Admin" : "Moderator"}</span> {gm.username}!</Heading>
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