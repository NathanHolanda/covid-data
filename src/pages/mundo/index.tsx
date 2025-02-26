import api from "@/api";
import DataCard from "@/components/DataCard";
import Description from "@/components/Description";
import getToast from "@/utils/getToast";
import World from "@react-map/world";
import React, { useState } from "react";

type CountryData = {
  cases: any;
  confirmed: number;
  country: string;
  deaths: number;
  recovered: any;
  updated_at: string;
};

type Props = { countriesData: CountryData[] };

const diffCountries = new Map([
  ["Republic of Congo", "Congo (Brazzaville)"],
  ["Democratic Republic of Congo", "Congo (Kinshasa)"],
  ["North Korea", "Korea, North"],
  ["South Korea", "Korea, South"],
  ["United States", "US"],
  ["Lao People's Democratic Republic", "Laos"],
  ["Swaziland", "Eswatini"],
  ["Cape Verde", "Cabo Verde"],
  ["Taiwan", "Taiwan*"],
]);

export default function WorldPage({ countriesData }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );

  return (
    <div>
      <Description
        title="Selecione um país"
        subtitle="Clique em um país no mapa para obter dados do mesmo a respeito da COVID."
      />
      <div className="flex">
        <World
          onSelect={(country) => {
            if (country) {
              const selected = countriesData.find(
                (item) =>
                  item.country === country ||
                  diffCountries.get(country) === item.country
              ) as CountryData;

              if (selected) {
                setSelectedCountry(selected);

                return;
              }

              if (!selected)
                getToast(`Dados não encontrados para ${country}.`, "error");
            }

            setSelectedCountry(null);
          }}
          hints
          size={800}
          hoverColor="#C7C7C7FF"
          selectColor="#22D3EEaa"
          type="select-single"
        />
        <div className="self-center">
          {selectedCountry && (
            <DataCard
              place={selectedCountry.country}
              cases={selectedCountry.confirmed}
              deaths={selectedCountry.deaths}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await api.get("/countries");

  return {
    props: {
      countriesData: res.data.data,
    },
  };
}
