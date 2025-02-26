// componente da página com dados dos estados brasileiros
import api from "@/api";
import Button from "@/components/Button";
import DataCard from "@/components/DataCard";
import Description from "@/components/Description";
import EmptyMessage from "@/components/EmptyMessage";
import Input from "@/components/Input";
import Table from "@/components/Table";
import formatNumber from "@/utils/formatNumber";
import sortAlphabetically from "@/utils/sortAlphabetically";
import Brazil from "@react-map/brazil";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

// tipagem dos dados de um estado
type StateData = {
  cases: number;
  datetime: string;
  deaths: number;
  refuses: number;
  state: string;
  suspects: number;
  uf: string;
  uid: number;
};

type Props = {
  statesData: StateData[];
};

export default function BrazilPage({ statesData }: Props) {
  // controle da visualização por estados ("state") ou data ("date")
  const [currentView, setCurrentView] = useState("state");

  // controle do estado selecionado no mapa
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  // controle da data selecionada no input
  const [searchedDate, setSearchedDate] = useState("");

  // array de dados dos estados por data
  const [statesDataByDate, setStatesDataByDate] = useState<StateData[]>([]);

  // controle do estado de carregamento dos dados por data
  const [loadingTableRequest, setLoadingTableRequest] = useState(false);

  useEffect(() => {
    // requisição disparada quando uma data válida é selecionada
    if (searchedDate.length) {
      setLoadingTableRequest(true);

      api
        .get(`/brazil/${searchedDate.replace(/-/g, "")}`)
        .then((res) => sortAlphabetically(res.data.data, "state"))
        .then((arr) => setStatesDataByDate(arr))
        .finally(() => setLoadingTableRequest(false));
    }
  }, [searchedDate]);

  return (
    <div>
      <div className="flex justify-start mb-3 gap-3">
        <Button
          label="Por estados"
          selected={currentView === "state"}
          onClick={() => {
            setCurrentView("state");

            setSearchedDate("");
          }}
        />
        <Button
          label="Por data"
          selected={currentView === "date"}
          onClick={() => {
            setCurrentView("date");

            setSelectedState(null);
          }}
        />
      </div>
      {currentView === "state" ? (
        <div>
          <Description
            title="Selecione um estado"
            subtitle="Clique em um estado no mapa para obter dados do mesmo a respeito
              da COVID."
          />
          <div className="flex m-auto w-fit">
            {/* componente de mapa do Brasil interativo */}
            <Brazil
              onSelect={(state) => {
                // callback disparada ao selecionar um estado

                const selected = statesData.find(
                  // busca no array de estados pelo estado selecionado
                  (item) => item.state === state
                ) as StateData;

                setSelectedState(selected);
              }}
              hints
              size={450}
              hoverColor="#C7C7C7FF"
              selectColor="#22D3EEaa"
              type="select-single"
            />
            <div className="self-center w-[250px]">
              {selectedState && (
                <DataCard
                  place={selectedState.state}
                  cases={selectedState.cases}
                  suspects={selectedState.suspects}
                  deaths={selectedState.deaths}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-fit w-full">
          <Description
            title="Selecione uma data"
            subtitle="Obtenha dados relacionados a COVID nos estados brasileiros para a
              data selecionada."
          />
          <div className="mb-4">
            <Input
              type="date"
              min="2020-01-01"
              max="2022-12-31"
              onChange={(event) => setSearchedDate(event.target.value)}
              value={searchedDate}
            />
          </div>
          {loadingTableRequest ? (
            <div className="m-auto w-fit mt-4">
              <BeatLoader color="#3730A3" />
            </div>
          ) : statesDataByDate.length > 0 ? (
            <Table
              titles={["Estado", "Casos", "Suspeitas", "Mortes"]}
              rows={statesDataByDate.map((item) => [
                item.state,
                formatNumber(item.cases),
                formatNumber(item.suspects),
                formatNumber(item.deaths),
              ])}
            />
          ) : (
            searchedDate && (
              <EmptyMessage message="Nenhum resultado encontrado para a data selecionada." />
            )
          )}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  // carregamento prévio do array com dados dos estados
  const res = await api.get("/");

  return {
    props: {
      statesData: res.data.data,
    },
  };
}
