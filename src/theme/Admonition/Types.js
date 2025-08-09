import AdmonitionTypeDiscord from "@theme/Admonition/Type/Discord";
import AdmonitionTypeYAP from "@theme/Admonition/Type/YAP";
import AdmonitionTypeFrantic from "@theme/Admonition/Type/Frantic";
import DefaultAdmonitionTypes from "@theme-original/Admonition/Types";

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  "discord": AdmonitionTypeDiscord,
  "frantic": AdmonitionTypeFrantic,
  "yap": AdmonitionTypeYAP,
};

export default AdmonitionTypes;
