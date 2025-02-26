// componente de botão customizado
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  selected?: boolean;
};

export default function Button({ label, selected, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={
        (selected ? "bg-indigo-300 pointer-events-none" : "") +
        " border border-indigo-900 rounded-md py-1 px-5 hover:bg-indigo-100 duration-300"
      }
    >
      <p className="text-indigo-900 font-semibold text-md">{label}</p>
    </button>
  );
}
