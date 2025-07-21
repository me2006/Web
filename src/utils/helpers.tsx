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
  onClick: (data) => void;
  objKey?: string;
}

export function createTable(tableId: string, tableHeaders: string[], objArr: object[], buttons?: TableButton[]) {
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

    Object.keys(obj).forEach((key) => {
      const td = document.createElement("td");
      td.textContent = obj[key] ?? "NULL";
      td.style.overflowX = "auto";
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

export function createTableButton(buttonCol: HTMLTableCellElement, btnData: TableButton, rowData) {
  const btn = document.createElement("button");
  btn.textContent = btnData.text;
  btn.classList.add(...(btnData.style.split(" ")));
  btn.onclick = () => {
    if (btnData.objKey)
      btnData.onClick(rowData[btnData.objKey]);
    else
      btnData.onClick(rowData);
  };
  buttonCol.append(btn);
}

export function addModalListeners(modalElem: RefObject<HTMLDivElement>, closeModal) {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalElem.current && (event.target as Node) === modalElem.current)
      closeModal(modalElem);
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Esc")
      closeModal(modalElem);
  };
  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleEscape);
  };
}