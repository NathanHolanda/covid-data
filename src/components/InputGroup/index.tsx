import React from "react";

type Props = {
  label: string;
  id: string;
  Input: React.JSX.Element;
  error?: string;
};

export default function InputGroup({ label, id, Input, error }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      {Input}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
