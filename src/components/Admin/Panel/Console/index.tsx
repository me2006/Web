import { type ReactNode, useState, useEffect } from "react";
import { postRequest } from "@site/src/utils/helpers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

export default function Console({ gmInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  function fetchConsoleLogs() {
    postRequest(gmInfo, customFields, "", customFields.GET_CONSOLE_LOG, "Failed to get console logs").then(res => {
      setLoading(false);
      if (!res || !res.consoleLogs || res.consoleLogs.length == 0) {
        setData([]);
        return;
      }

      setData(res.consoleLogs);
    });
  }

  useEffect(() => {
    fetchConsoleLogs();
  }, []);

  return (
    <>
      <button className="d-flex m-1a" onClick={() => fetchConsoleLogs()}>Refresh Logs</button>
      { isLoading ?
        <img className="d-flex text-center m-auto"src="/img/loading.png" alt="Loading image" />
        :
        !data || data.length == 0 ?
          <Heading as="h3" className="text-center p-1">There is no console logs. Please check again later.</Heading>
          :
          <div className={styles.console}>
            { data.map((line, idx) => <p key={"line" + idx} className={line.startsWith(" ") && styles.indent}>{line}</p>) }
          </div>
      }
    </>
  );
}
