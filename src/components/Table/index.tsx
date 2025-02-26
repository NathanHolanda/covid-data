import React from "react";

type Props = {
  titles: string[];
  rows: string[][];
};

export default function Table({ titles, rows }: Props) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="border border-bottom-gray-300">
          {titles.map((title, i, arr) => (
            <th
              key={`title-${i}`}
              className={
                (i !== arr.length - 1 ? "border border-right-gray-300" : "") +
                " px-2 py-1"
              }
            >
              {title}
            </th>
          ))}
        </thead>
        <tbody>
          {rows.map((row, i, arr) => (
            <tr key={`row-${i}`} className="border border-bottom-gray-300">
              {row.map((col) => (
                <td
                  className={
                    (i !== arr.length - 1
                      ? "border border-right-gray-300"
                      : "") + " px-2 py-1"
                  }
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
