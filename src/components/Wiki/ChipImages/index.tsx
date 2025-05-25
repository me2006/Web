export type ChipAttrs = {
  id: string;
  name?: string;
  styles?: React.CSSProperties;
};

/**
 * Shows a chip icon image from its ID (as a string because of leading 0s)
 *
 * Syntax:
 *
 *  <ChipTableCell id={""} styles={} />
 */
export function ChipIcon({ id, styles }: ChipAttrs) {
  return (
    <img src={`/img/wiki/chipendium/icons/chip_${id}_icon.png`} alt={`Chip ${id} Icon`} style={styles} />
  );
}

/**
 * Shows a chip effect image from its ID (as a string because of leading 0s)
 *
 * Syntax:
 *
 *  <ChipTableCell id={""} styles={} />
 */
export function ChipEffect({ id, styles }: ChipAttrs) {
  return (
    <img src={`/img/wiki/chipendium/effects/chip_${id}.png`} alt={`Chip ${id} Effect`} style={styles} />
  );
}

