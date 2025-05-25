import { ChipAttrs, ChipIcon } from "@site/src/components/Wiki/ChipImages";

/**
 * Creates a table cell that has a line formatted with an icon, id, and name in one cell
 *
 * Syntax: <ChipTableCell id={""} name={""} />
 */
export default function ChipTableCell({ id, name }: ChipAttrs) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ChipIcon id={id} styles={{ paddingRight: "10px" }} />
      {id} - {name}
    </div>
  );
}

