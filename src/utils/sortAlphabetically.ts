// função para ordenar alfabeticamente arrays
export default function sortAlphabetically(arr: any[], key?: string) {
  // arr pode ser um array de strings ou de objetos
  // key é o atributo dos objetos usado para ordenar

  // verificações para o caso de ser um array de objetos
  if (
    key &&
    arr.length > 0 &&
    arr.every((item) => typeof item[key] === "string")
  ) {
    return arr.sort((a, b) =>
      (a[key] as string).localeCompare(b[key], "pt-BR", { numeric: true })
    );
  }

  // verificação para o caso de ser um array de strings
  if (arr.every((item) => typeof item === "string"))
    return arr.sort((a, b) =>
      (a as string).localeCompare(b, "pt-BR", { numeric: true })
    );

  // caso default
  return arr;
}
