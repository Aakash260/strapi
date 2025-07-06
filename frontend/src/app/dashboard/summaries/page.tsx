import Link from "next/link";
import { getAllSummary } from "@/lib/actions/summary-action";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "@/components/custom/Search";
import { PaginationComponent } from "@/components/custom/Pagination";
interface LinkCardProps {
  documentId: string;
  title: string;
  summary: string;
}

function LinkCard({ documentId, title, summary }: any) {
  return (
    <Link href={`/dashboard/summaries/${documentId}`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500">
            {title || "Video Summary"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="w-full mb-4 leading-7">
            {summary.slice(0, 164) + " [read more]"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface SearchParamsProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function SummariesRoute({ searchParams }: any) {
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  const { data, meta } = await getAllSummary(query, currentPage);
  console.log(meta);
  const pageCount = meta?.pagination?.pageCount;
  if (!data) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item: LinkCardProps) => (
          <LinkCard key={item.documentId} {...item} />
        ))}
      </div>
      <PaginationComponent pageCount={pageCount} />
    </div>
  );
}
