import { ContentLayout } from "@/core/layout/content/content-layout";
import NuevaReservaView from "@/features/reservas/presentation/view/nueva-reserva-view";
interface PageProps {
  params: {
    id: string;
  };
}
export default function Page({ params }: PageProps) {
  return (
    <ContentLayout title="Nueva Reserva">
      <NuevaReservaView idVuelo={params.id} />
    </ContentLayout>
  );
}
