import { type ReactNode, useState, useEffect } from "react";
import { createTable, postRequest } from "@site/src/utils/helpers";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";

export default function ActivityLog({ gmInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();

  const [data, setData] = useState(["log"]); // Set temp code in array so it can render
  const tableId = "activityLogTable";

  function fetchModActivity() {
    postRequest(gmInfo, customFields, "", customFields.GET_ACTIVITY_LOG, "Failed to get mod activity logs").then(res => {
      if (!res || !res.logList || res.logList.length == 0) {
        setData([]);
        return;
      }

      setData(res.logList);

      const tableHeaders = ["ID", "Action", "Author", "Date Created"];
      const expectedKeys = ["id", "action", "author", "dateCreated"];
      createTable(tableId, tableHeaders, expectedKeys, res.logList, undefined, undefined);
    });
  }

  useEffect(() => {
    fetchModActivity();
  }, []);

  return (
    !data || data.length == 0 ?
      <Heading as="h3" className="text-center p-1">The database has no mod activity!</Heading>
      :
      <div className="p-2">
        <p className="text-center mb-1">Mod logs are sorted in descending order. The most recent log will be displayed at the top.</p>
        <div className="d-flex align-items-center flex-col">
          <table id={tableId} className="w-100 d-inline-table" />
        </div>
      </div>
  );
}
