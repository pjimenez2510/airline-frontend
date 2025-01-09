"use client";
import { useVuelosFuturosQuery } from "../../hooks/use-vuelo-query";
import TablaVuelos from "../components/table-vuelos";

export default function VulosView() {
  const { data, isLoading } = useVuelosFuturosQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <TablaVuelos vuelos={data || []} />;
}
