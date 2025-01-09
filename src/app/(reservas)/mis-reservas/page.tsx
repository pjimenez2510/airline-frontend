import { ContentLayout } from "@/core/layout/content/content-layout";
import ReservasView from "@/features/reservas/presentation/view/reservas-view";

export default function Page() {
  return (
    <ContentLayout title="Mis reservas">
      <ReservasView />
    </ContentLayout>
  );
}
