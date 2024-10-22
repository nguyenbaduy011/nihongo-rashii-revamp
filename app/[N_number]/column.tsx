/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";

export type Grammar = {
  id: string;
  romajiRead: string;
  japaneseRead: string;
  meaning: string;
  level: string;
};

const HandleClick = ({
  id,
  level,
  romajiRead,
}: {
  id: string;
  level: string;
  romajiRead: string;
}) => {
  return <a href={`/${level}/${id}`}>{romajiRead}</a>;
};

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === "ul") {
          return (
            <ul className="list-disc ml-5">
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        }

        if (name === "ol") {
          return (
            <ol className="list-decimal ml-5">
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        }

        if (name === "p") {
          return (
            <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>
          );
        }
        if (name === "br") {
          return (
            <br className="mb-4">
              {domToReact(children as DOMNode[], options)}
            </br>
          );
        }
      }
    },
  };


export const columns: ColumnDef<Grammar>[] = [
  {
    accessorKey: "romajiRead",
    header: "Ngữ pháp",
    cell: ({ row }) => {
      const id = row.original.id;
      const level = row.original.level;
      const romajiRead = row.original.romajiRead;

      return <HandleClick id={id} level={level} romajiRead={romajiRead} />;
    },
  },
  {
    accessorKey: "japaneseRead",
    header: "文法レッスン",
  },
  {
    accessorKey: "meaning",
    header: "Ý Nghĩa (意味)",
    cell: ({ row }) => {
      // Sử dụng html-react-parser để phân tích nội dung HTML
      return parse(row.original.meaning);
    },
  },
];
