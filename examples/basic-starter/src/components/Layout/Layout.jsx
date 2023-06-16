import classNames from "@/utils/classNames";
import { Footer, Header } from "@/components/Layout";

export function Layout({navBarData, children}) {
  return (
    <>
      <Header navBarData={navBarData} />
      <main className={classNames("w-full max-w-none overflow-hidden min-h-[300px]")}>
        {children}
      </main>
      <Footer navBarData={navBarData} />
    </>
  )
}
