import PrioPicks from "@/app/components/PrioPicks";
import MatchSet from "@/app/components/MatchSet";
export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Home page</h1>
      <div className="layoutWrapper">
        <PrioPicks>
        </PrioPicks>
        <MatchSet>
        </MatchSet>
      </div>
    </>
  );
}
