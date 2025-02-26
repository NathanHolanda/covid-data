import formatNumber from "@/utils/formatNumber";
import React from "react";

type Props = {
  place: string;
  cases: number;
  suspects?: number;
  deaths: number;
};

export default function DataCard({ place, cases, suspects, deaths }: Props) {
  return (
    <div className="border border-[2px] border-indigo-200 p-2 rounded-md w-fit">
      <p className="text-2xl font-bold">{place}</p>
      <p>Casos: {formatNumber(cases)}</p>
      {suspects && <p>Suspeitas: {formatNumber(suspects)}</p>}
      <p>Mortes: {formatNumber(deaths)}</p>
    </div>
  );
}
