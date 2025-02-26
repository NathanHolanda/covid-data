export default function formatNumber(value: number) {
  return Intl.NumberFormat("pt-BR", { style: "decimal" }).format(value);
}
