import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "项目",
};
export default function AboutPage() {
  return (
    <main className="bg-curate-50 py-[40px] md:py-[80px]">
      <div className="mx-auto max-w-[1140px] px-[30px]">
        <h1 className="m-0 text-[36px] font-bold leading-[1.1] tracking-[-1px] text-curate-950 md:text-[46px] md:leading-none md:tracking-[-2px]">
          About
        </h1>
        <p className="mt-[20px] max-w-[760px] text-[22px] leading-[1.24] tracking-[-1px] text-curate-700 md:mt-[30px] md:text-[26px] md:leading-[1.4] md:tracking-[1px]">
          Tesight is a technical notebook for GNSS simulation, signal systems,
          networking and practical engineering research.
        </p>
      </div>
    </main>
  );
}
