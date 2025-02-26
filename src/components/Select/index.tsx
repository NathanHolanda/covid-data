// componente de select customizado
import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
};

export default function Select({ options, ...rest }: Props) {
  return (
    <select {...rest} className="border border-gray-400 py-2 px-4 rounded-md">
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
