import { ReactNode, useState } from "react";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import NotFound from "@theme/NotFound";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./index.module.css";

interface SignUpFormState {
  new_password: string;
  confirm_password: string;
}

export default function ResetPassword(): ReactNode {

  const [passData, setPassData] = useState<SignUpFormState>({
    new_password: "",
    confirm_password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(false);

  return (
    <BrowserOnly>
      {() => {
        const token = new URLSearchParams(window.location.search).get("token");
        return (
          !token ?
            <NotFound /> :
            <Layout title={"Reset Password"} description="Clickity-click, it's Sitekick!">
              <main className={styles.resetPasswordContainer}>
                { !submitted ?
                  <ResetPasswordForm token={token} passData={passData} setPassData={setPassData} setSubmitted={setSubmitted} setStatus={setStatus} /> :
                  submitted && status ?
                    <SuccessPage /> :
                    <ErrorPage />
                }
              </main>
            </Layout>
        );
      }}
    </BrowserOnly>
  );
}

function ResetPasswordForm({ token, passData, setPassData, setSubmitted, setStatus }) {
  const { siteConfig: { customFields } } = useDocusaurusContext();

  function updateRequirement(id, condition, isEmpty) {
    const element = document.getElementById(id);
    if (isEmpty) {
      element.removeAttribute("class");
      return;
    }
    element.classList.toggle(styles.checked, condition);
    element.classList.toggle(styles.unchecked, !condition);
  }

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const letterCheck = /[a-zA-Z]/.test(value);
    const numCheck = /\d/.test(value);
    const lenCheck = value.length >= 8;
    const emptyCheck = value.trim() == "";

    updateRequirement("letterCheck", letterCheck, emptyCheck);
    updateRequirement("numCheck", numCheck, emptyCheck);
    updateRequirement("lenCheck", lenCheck, emptyCheck);

    setPassData(prevData => ({ ...prevData, [name]: value }));
    return letterCheck && numCheck && lenCheck && emptyCheck;
  };

  const validateConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const matchCheck = value === passData["new_password"];
    const emptyCheck = value.trim() !== "" && passData["new_password"].trim() !== "";

    setPassData(prevData => ({ ...prevData, [name]: value }));

    if (matchCheck && emptyCheck || value == "") {
      if (value !== "")
        document.getElementById("submitBtn").classList.toggle("disabled", false);
      document.getElementById("requirementError").innerText = "";
      document.getElementById("confirm_password").classList.toggle(styles.error, false);
    }
    else {
      document.getElementById("submitBtn").classList.toggle("disabled", true);
      document.getElementById("requirementError").innerText = "Passwords do not match!";
      document.getElementById("confirm_password").classList.toggle(styles.error, true);
    }

    return matchCheck && emptyCheck;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const postBody = "password=" + encodeURIComponent(passData["new_password"]) + "&vpassword=" + encodeURIComponent(passData["confirm_password"]) + "&token=" + encodeURIComponent(token);

    fetch(`${customFields.GAME_URL}${customFields.PASS_RESET}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: postBody
    }).then(response => {
      if (!response.ok)
        throw new Error("Failed to reset password: " + response.statusText);
      setStatus(true);
    }).catch(error => {
      console.error(error);
      setStatus(false);
    });
  };

  return (
    <>
      <Heading as="h1">Reset Password</Heading>
      <p>Your new password must meet the following requirements:</p>
      <ul id="passwordRequirements" className={styles.passwordRequirements}>
        <li id="letterCheck">Contain at least one letter (A-Z or a-z)</li>
        <li id="numCheck">Contain at least one number (0-9)</li>
        <li id="lenCheck">Be at least 8 characters long</li>
      </ul>

      <form>

        <div className="row">
          <div className="col col--6">
            <div>
              <label htmlFor="new_password">New Password:</label>
              <br />
              <input type="password" name="new_password" id="new_password" onChange={validatePassword} value={passData.new_password} required />
            </div>
          </div>
          <div className="col col--6">
            <div>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <br />
              <input type="password" name="confirm_password" id="confirm_password" onChange={validateConfirm} value={passData.confirm_password} required />
              <div id="requirementError" className={styles.inputError}></div>
            </div>
          </div>
        </div>
        <div className="row">
          <Link id="submitBtn" className="button disabled" type="submit" onClick={handleSubmit}>Submit</Link>
        </div>

      </form>
    </>
  );
}

function SuccessPage() {
  return (
    <>
      <Heading as="h1">Password reset successful!</Heading>
      <p>Your password reset was successful! Please log into the game with your new password.</p>
    </>
  );
}

function ErrorPage() {
  return (
    <>
      <Heading as="h1">Error: Failed to reset password</Heading>
      <p>An error occurred while resetting the password. Please try again later.</p>
      <p>If this issue persists, please <Link to="/contact">contact us</Link>.</p>
    </>
  );
}