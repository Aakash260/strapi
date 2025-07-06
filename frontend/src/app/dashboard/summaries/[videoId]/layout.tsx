import { extractYouTubeID } from "@/lib/utils";
import { getSummariesById } from "@/lib/actions/summary-action";
import YouTubePlayer from "@/components/custom/YouTubePlayer";

export default async function SummarySingleRoute({
  params,
  children,
}: {
  readonly params: any;
  readonly children: React.ReactNode;
}) {
  console.log("params.videoId:", params.videoId);
  const response = await getSummariesById(params.videoId);
  console.log("🚀 ~ getSummariesById response:", response);

  const { data } = response || {};
  if (!data) return <p>No Item Found</p>;
  if (data?.error?.status === 400) return <p>No Item Found</p>;
  if (!data.videoId) return <p>No Video ID Found</p>;

  const videoId = extractYouTubeID(data.videoId);
  console.log("Extracted videoId:", videoId);
  if (!videoId) return <p>Invalid Video ID</p>;

  return (
    <div>
      <div className="h-full grid gap-4 grid-cols-5 p-4">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <div>
            <YouTubePlayer videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}
