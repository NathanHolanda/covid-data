// componente de input customizado
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...rest }: Props) {
  return (
    <input {...rest} className="border border-gray-400 py-2 px-4 rounded-md" />
  );
}
