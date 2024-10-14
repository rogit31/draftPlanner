import PrioPicks from "@/app/components/PrioPicks";
import MatchSet from "@/app/components/MatchSet";
import ChampPick from "@/app/components/ChampPick"
//TODO: Persist data in browser memory
//TODO: Make multiple draft scenarios per match, 9 default perhaps
export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-center">Home page</h1>
      <div className="grid grid-cols-2">
        <PrioPicks>
        </PrioPicks>
        <MatchSet>
        </MatchSet>
      </div>
    </>
  );
}
