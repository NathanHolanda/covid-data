// componente da página com dados dos países
import api from "@/api";
import DataCard from "@/components/DataCard";
import Description from "@/components/Description";
import getToast from "@/utils/getToast";
import World from "@react-map/world";
import React, { useState } from "react";

// tipagem dos dados de um país
type CountryData = {
  cases: any;
  confirmed: number;
  country: string;
  deaths: number;
  recovered: any;
  updated_at: string;
};

type Props = { countriesData: CountryData[] };

// Map dos países com nomes diferentes entre API e mapa interativo
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
        {/* componente de mapa mundi interativo */}
        <World
          onSelect={(country) => {
            // callback disparada ao selecionar um país

            if (country) {
              // busca no array de países pelo país selecionado ou seu correspondente no Map diffCountries
              const selected = countriesData.find(
                (item) =>
                  item.country === country ||
                  diffCountries.get(country) === item.country
              ) as CountryData;

              // caso o país selecionado for encontrado no array
              if (selected) {
                setSelectedCountry(selected);

                return;
              }

              // caso não seja encontrado
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
  // carregamento prévio do array com dados dos países
  const res = await api.get("/countries");

  return {
    props: {
      countriesData: res.data.data,
    },
  };
}
