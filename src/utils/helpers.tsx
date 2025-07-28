import { RefObject } from "react";

export function postRequest(gmInfo, customFields, data, listLink, customError?) {
  const body = (gmInfo) ?
    {
      author: gmInfo.username,
      token: gmInfo.token,
      ...data
    } :
    { ...data };

  return fetch(`${customFields.BASE_URL}${listLink}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    credentials: "include",
    body: encodeURIComponent(JSON.stringify(body))
  }).then(res => {
    if (!res.ok) {
      if (customError) throw new Error(customError);
      throw new Error(`Failed to get data from ${listLink}`);
    }
    return res.json();
  }).catch(error => alert(error));
}

export interface TableButton {
  text: string,
  style: string,
  onClick: (...data) => void;
  objKeys?: string[];
  extraArgs?;
}

export function createTable(
  tableId: string,
  tableHeaders: string[],
  expectedKeys: string[],
  objArr: object[],
  buttons?: TableButton[],
  headerStyles?: string[],
  chipList?: object[]
) {
  const table = document.getElementById(tableId) as HTMLTableElement;
  table.innerHTML = "";

  const thead = document.createElement("thead");
  tableHeaders.forEach(colData => {
    const th = document.createElement("th");
    th.textContent = colData;
    thead.appendChild(th);
  });
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  objArr.forEach((obj) => {
    const row = document.createElement("tr");

    expectedKeys.forEach((key, idx) => {
      const td = document.createElement("td");
      td.textContent = obj[key] ?? "NULL";
      if (chipList && Array.isArray(obj[key]))
        td.title = getChipListNames(chipList, obj[key]);
      td.style.overflowX = "auto";
      if (headerStyles?.length > 0)
        td.classList.add(headerStyles[idx]);
      row.appendChild(td);
    });

    if (buttons && buttons.length > 0) {
      const buttonCol = document.createElement("td");
      buttons.forEach((btn) => {
        createTableButton(buttonCol, btn, obj);
      });
      row.appendChild(buttonCol);
    }

    tbody.appendChild(row);
    table.appendChild(tbody);
  });
}

function getChipListNames(chipList, chipArr) {
  const nameArr = [];
  for (const chipId of chipArr) {
    if (chipList[chipId - 1])
      nameArr.push(chipList[chipId - 1].name);
  }
  return nameArr.join("\n");
}

export function createTableButton(buttonCol: HTMLTableCellElement, btnData: TableButton, rowData) {
  const btn = document.createElement("button");
  btn.textContent = btnData.text;
  btn.classList.add(...(btnData.style.split(" ")));
  btn.onclick = () => {
    if (btnData.objKeys && btnData.objKeys.length > 0){
      const args = [
        ...btnData.objKeys.map((arg) => rowData[arg]),
        ...(btnData.extraArgs ?? [])
      ];
      btnData.onClick(...args);
    }
    else
      btnData.onClick(rowData);
  };
  buttonCol.append(btn);
}

export function addModalListeners(modalElem: RefObject<HTMLDivElement>, closeModal) {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalElem.current && (event.target as Node) === modalElem.current)
      closeModal();
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (modalElem.current && (event.key === "Escape" || event.key === "Esc"))
      closeModal();
  };
  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
  };
}