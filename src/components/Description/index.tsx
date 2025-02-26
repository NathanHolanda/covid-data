// componente de descrição com título e subtítulo
import React from "react";

type Props = {
  title: string;
  subtitle: string;
};

export default function Description({ title, subtitle }: Props) {
  return (
    <div className="mb-2">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm font-semibold">{subtitle}</p>
    </div>
  );
}
