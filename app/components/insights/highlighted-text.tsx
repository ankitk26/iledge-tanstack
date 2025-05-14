import React from "react";
import { useInsightsStore } from "~/store/use-insights";

type Props = {
  text: string;
};

export default function HighlightedText({ text }: Props) {
  const searchQuery = useInsightsStore((store) => store.searchQuery);

  if (!searchQuery) return text;

  const regex = new RegExp(`(${searchQuery})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === searchQuery.toLowerCase() ? (
      <strong key={i} className="font-extrabold underline">
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
