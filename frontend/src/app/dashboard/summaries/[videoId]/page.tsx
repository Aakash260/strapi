import { getSummariesById } from "@/lib/actions/summary-action";
import { SummaryCardForm } from "@/components/forms/SummaryCardForm";

interface ParamsProps {
  params: {
    videoId: string;
  };
}

export default async function SummaryCardRoute({ params }: any) {
  const { videoId } = params;
  const { data } = await getSummariesById(videoId);

  return <SummaryCardForm item={data} />;
}
