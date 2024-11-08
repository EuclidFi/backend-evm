import TokenSelectorModal from "@/src/modals/token-selector";
import Swap from "@/src/swap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16 lg:p-24">
      <HeroComponent />
      <CratesTable />
    </main>
  );
}
