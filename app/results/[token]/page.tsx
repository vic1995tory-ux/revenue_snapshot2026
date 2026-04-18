import { ResultsPage } from "@/components/results/ResultsPage";
import { resultsMockData } from "@/lib/results/mock-data";

export default function Page() {
  return <ResultsPage data={resultsMockData} />;
}
