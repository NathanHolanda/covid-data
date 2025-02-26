// componente tabela
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
                // a borda à direita não é colocada na última coluna pois já há a borda da tabela
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
            <tr
              key={`row-${i}`}
              className={
                // cria uma tabela no estilo striped
                (i % 2 === 0 ? "bg-indigo-100 " : "") +
                "border border-bottom-gray-300"
              }
            >
              {row.map((col, j) => {
                console.log(i % 2);
                return (
                  <td
                    key={`col-${i}-${j}`}
                    className={
                      // a borda à direita não é colocada na última coluna pois já há a borda da tabela
                      (j !== arr.length - 1
                        ? "border border-right-gray-300"
                        : "") + " px-2 py-1"
                    }
                  >
                    {col}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
