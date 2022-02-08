import { Text } from "@chakra-ui/react";
import React from "react";

export default function MovieTitleCell({ cell }) {
  const maxLength = 75;
  const text = cell.value.trim();

  if (text.length <= maxLength) return <Text color="#0D2B88">{text}</Text>;

  let trimmedString = text.substr(0, maxLength);
  if (trimmedString.lastIndexOf(" ") !== -1)
    trimmedString = trimmedString.substr(0, trimmedString.lastIndexOf(" "));
  if (text.length > maxLength) trimmedString = trimmedString.concat("...");

  return <Text color="#0D2B88">{trimmedString}</Text>;
}
