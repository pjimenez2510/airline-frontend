import { ContentLayout } from "@/core/layout/content/content-layout";
import VulosView from "@/features/reservas/presentation/view/vuelos-view";

export default function Page() {
  return (
    <ContentLayout title="Vuelos">
      <VulosView />
    </ContentLayout>
  );
}
