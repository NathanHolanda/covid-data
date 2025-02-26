import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  // a rota padrão "/" não corresponde a nenhuma página e redireciona para "/brasil"
  const router = useRouter();

  useEffect(() => {
    router.push("/brasil");
  }, []);
}
