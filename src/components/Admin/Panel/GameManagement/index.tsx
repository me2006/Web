import { useEffect, useState, type ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom, faKey, faList, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import ChipCodeTable from "./Tables/ChipCodeTable";
import CollectionListTable from "./Tables/CollectionListTable";
import FusionRecipeTable from "./Tables/FusionRecipeTable";
import { postRequest } from "@site/src/utils/helpers";

import styles from "./index.module.css";

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

type ActionItem = {
  title: string;
  icon: IconDefinition;
  text: string;
  elemId: string;
};

const ActionsList: ActionItem[] = [
  {
    title: "Secret Codes",
    icon: faKey,
    text: "Create and manage chip codes.",
    elemId: "codes"
  },
  {
    title: "Collection Lists",
    icon: faList,
    text: "Create, modify, and delete collection lists.",
    elemId: "clists"
  },
  {
    title: "Fusion Recipes",
    icon: faAtom,
    text: "Add, modify, or delete fusion recipes from the database.",
    elemId:"fuse"
  }
];

function ActionsCard(props) {
  return (
    <div className={`col ${styles.actionCard}`} onClick={() => props.setCV(props.elemId)}>
      <Heading as="h2" className="mb-1">{ props.title }</Heading>
      <FontAwesomeIcon icon={props.icon} size="6x" />
      <hr />
      <p className="mb-0">{ props.text }</p>
    </div>
  );
}

export default function GameManagement({ gmInfo }): ReactNode {
  const { siteConfig: { customFields } } = useDocusaurusContext();
  const [chipList, setCL] = useState();
  const [currView, setCV] = useState("main");

  function getChipList() {
    postRequest(gmInfo, customFields, "", customFields.GET_CHIPS, "Failed to get chip list").then(data => {
      if (!data || !data.chipList || data.chipList.length === 0)
        return;

      const options = data.chipList.map((chip) => {
        return { label: `${chip.id} - ${chip.name}`, value: chip.id, name: chip.name };
      });

      setCL(options);
    });
  }

  useEffect(() => {
    getChipList();
  },[]);

  return (
    <>
      { currView == "main" ?
        <div className={`row ${styles.actionCardContainer}`}>
          { ActionsList.map((props, idx) => (
            <ActionsCard key={idx} {...props} setCV={setCV} />
          ))}
        </div> :
        <div>
          <div>
            <button className="d-flex m-1a" onClick={() => setCV("main")}>Back to Game Management Menu</button>
            <button className="d-flex m-1a" onClick={() => getChipList()}>Refresh Chip List</button>
          </div>
          { currView == "codes" && <ChipCodeTable gmInfo={gmInfo} customFields={customFields} chipList={chipList}/> }
          { currView == "clists" && <CollectionListTable gmInfo={gmInfo} customFields={customFields} chipList={chipList} /> }
          { currView == "fuse" && <FusionRecipeTable gmInfo={gmInfo} customFields={customFields} chipList={chipList} /> }
        </div>
      }
    </>
  );
}

