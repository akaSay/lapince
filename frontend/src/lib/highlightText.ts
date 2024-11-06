import React from "react";

export const highlightText = (
  text: string,
  search: string
): React.ReactNode => {
  if (!search.trim()) return text;

  const searchTerms = search
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0);
  const textLower = text.toLowerCase();

  let lastIndex = 0;
  const elements: (string | JSX.Element)[] = [];

  searchTerms.forEach((term) => {
    const index = textLower.indexOf(term, lastIndex);
    if (index >= 0) {
      // Ajouter le texte avant le terme trouvé
      if (index > lastIndex) {
        elements.push(text.slice(lastIndex, index));
      }

      // Ajouter le terme surligné
      elements.push(
        React.createElement(
          "span",
          {
            key: index,
            className: "bg-blue-500 bg-opacity-40",
          },
          text.slice(index, index + term.length)
        )
      );

      lastIndex = index + term.length;
    }
  });

  // Ajouter le reste du texte
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
};
