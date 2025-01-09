import { ContentLayout } from "@/core/layout/content/content-layout";
interface PageProps {
  params: {
    id: string;
  };
}
export default function Page({ params }: PageProps) {
  return (
    <ContentLayout title="Nueva Reserva">reserva {params.id}</ContentLayout>
  );
}
