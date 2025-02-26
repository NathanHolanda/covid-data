// função para formatar números para terem pontuação a cada 3 dígitos
export default function formatNumber(value: number) {
  return Intl.NumberFormat("pt-BR", { style: "decimal" }).format(value);
}
