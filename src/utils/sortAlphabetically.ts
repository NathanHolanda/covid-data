export default function sortAlphabetically(arr: any[], key?: string) {
  if (key && arr[0] && typeof arr[0][key] === "string") {
    return arr.sort((a, b) =>
      (a[key] as string).localeCompare(b[key], "pt-BR", { numeric: true })
    );
  }

  if (arr.every((item) => typeof item === "string"))
    return arr.sort((a, b) =>
      (a as string).localeCompare(b, "pt-BR", { numeric: true })
    );

  return arr;
}
