// import Layout from "@/components/Layout";
// import { store } from "@/store";
import { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import "@/app/globals.css";
// import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
import { FaVirusCovid } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

type CustomLinkProps = {
  href: string;
  label: string;
  pathname: string;
};
function CustomLink({ href, label, pathname }: CustomLinkProps) {
  return (
    <Link
      href={href}
      className={
        (pathname === href
          ? "text-cyan-400 pointer-events-none"
          : "text-gray-50") +
        " hover:text-cyan-100 duration-300 font-semibold text-md"
      }
    >
      {label}
    </Link>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col max-h-screen overflow-hidden">
      <header className="p-5 bg-indigo-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaVirusCovid className="text-gray-50" size={30} />
          <p className="text-gray-50 font-bold text-2xl">COVIData</p>
        </div>
        <div className="flex gap-4">
          <CustomLink
            href="/brasil"
            label="Brasil"
            pathname={router.pathname}
          />
          <CustomLink href="/mundo" label="Mundo" pathname={router.pathname} />
          <CustomLink
            href="/formulario"
            label="Formulário"
            pathname={router.pathname}
          />
        </div>
      </header>
      <main className="grow overflow-auto p-5">
        <Component {...pageProps} />
        <ToastContainer />
      </main>
    </div>
  );
}
