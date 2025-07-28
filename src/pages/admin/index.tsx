import { useState, useEffect } from "react";
import Heading from "@theme/Heading";
import Panel from "@site/src/components/Admin/Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { postRequest } from "@site/src/utils/helpers";

import styles from "./index.module.css";

export default function Admin() {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [loggedIn, setLoggedIn] = useState(false);
  const [gm, setGM] = useState(Object);

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };

    //security.fileuri.strict_origin_policy
    postRequest("", customFields, data, customFields.LOGIN, "Incorrect username / password").then((resData) => {
      if (!resData || !resData.gm)
        return;
      const d = new Date();
      d.setTime(d.getTime() + 3600 * 1000);
      document.cookie = "gmInfo=" + JSON.stringify(resData.gm) + ";path=/admin;expires=" + d.toUTCString();
      setGM(resData.gm);
      setLoggedIn(true);
    });
  }

  function logout() {
    if (getCookie("gmInfo"))
      document.cookie = "gmInfo=;path=/admin;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    if (getCookie("Session-Id"))
      document.cookie = "Session-Id=;path=/admin;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setLoggedIn(false);
    setGM(null);
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
    <BrowserOnly>
      {() => {
        return(
          <main className={styles.mainContainer}>
            { !loggedIn && !gm ?
              /* Login Page */
              <div className={styles.loginContainer}>
                <img src="img/deadkick.png" alt="deadkick" />
                <form className={styles.loginForm}>
                  <label htmlFor="email">Email</label>
                  <div className={styles.inputContainer}>
                    <FontAwesomeIcon icon={faUser} className={styles.inputIcon} />
                    <input className={styles.emailInput} onChange={(e) => setEmail(e.target.value)} name="email" id="email" type="email" placeholder="Email" required />
                  </div>

                  <label htmlFor="password">Password</label>
                  <div className={styles.inputContainer}>
                    <FontAwesomeIcon icon={faLock} className={styles.inputIcon} />
                    <input className={styles.passInput} onChange={(e) => setPassword(e.target.value)} name="password" id="password" type="password" placeholder="Password" required />
                  </div>
                  <div className={styles.btnDiv}>
                    <button type="button" className="button--flat" onClick={() => login(email, password)}>Login</button>
                  </div>
                </form>
              </div>
              :
              /* Panel Page */
              <>
                <div className={styles.panelNavbar}>
                  <Heading as="h2">Sitekick Remastered Mod Panel</Heading>
                  <Heading as="h3">Welcome <span>{gm.type == 0 ? "Admin" : "Moderator"}</span> {gm.username}!</Heading>
                  <button className="button red sm margin--sm" onClick={() => { logout(); }}>
                    Logout <FontAwesomeIcon icon={faSignOut} />
                  </button>
                </div>
                <Panel gmInfo={gm}/>
              </>
            }
          </main>
        );
      }}
    </BrowserOnly>
  );
}