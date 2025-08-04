import { type ReactNode, useState, useEffect } from "react";
import { postRequest } from "@site/src/utils/helpers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

export default function Console({ gmInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();

  const [data, setData] = useState(["log"]); // Set temp code in array so it can render

  function fetchConsoleLog() {
    postRequest(gmInfo, customFields, "", customFields.GET_CONSOLE_LOG, "Failed to get console logs").then(res => {
      if (!res || !res.consoleLogs || res.consoleLogs.length == 0) {
        setData([]);
        return;
      }

      setData(res.consoleLogs);
    });
  }

  useEffect(() => {
    fetchConsoleLog();
  }, []);

  return (
    !data || data.length == 0 ?
      <Heading as="h3" className="text-center p-1">The database has no mod activity!</Heading>
      :
      <div className={styles.console}>
        {data.map((line) => <p>{line}</p>)}
      </div>
  );
}
