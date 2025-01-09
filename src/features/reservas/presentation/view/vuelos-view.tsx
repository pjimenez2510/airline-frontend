"use client";

import { useCallback, useEffect, useState } from "react";
import {
  useCiudadesDestinoQuery,
  useCiudadesOrigenQuery,
  useVuelosFuturosQuery,
} from "../../hooks/use-vuelo-query";
import TablaVuelos from "../components/table-vuelos";
import { Vuelo } from "../../interfaces/vuelo.interface";
import { VueloService } from "../../services/vuelo.datasource";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VuelosView() {
  const { data: vuelosFuturos, isLoading: isLoadingFuturos } =
    useVuelosFuturosQuery();
  const { data: ciudadesDestino } = useCiudadesDestinoQuery();
  const { data: ciudadesOrigen } = useCiudadesOrigenQuery();
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [vuelosBuscados, setVuelosBuscados] = useState<Vuelo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarVuelos = useCallback(async () => {
    if (!origen || !destino || !fecha) return;

    setIsSearching(true);
    setError(null);
    try {
      const vuelos = await VueloService.getInstance().buscarVuelos(
        origen,
        destino,
        fecha
      );
      setVuelosBuscados(vuelos);
    } catch (error) {
      console.error(error);
      setError("Error al buscar vuelos. Por favor, intente nuevamente.");
    } finally {
      setIsSearching(false);
    }
  }, [origen, destino, fecha]);

  useEffect(() => {
    setVuelosBuscados(vuelosFuturos || []);
  }, [vuelosFuturos]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    buscarVuelos();
  };

  const handleReset = () => {
    setOrigen("");
    setDestino("");
    setFecha("");
    setVuelosBuscados(vuelosFuturos || []);
    setError(null);
  };

  if (isLoadingFuturos) {
    return <div className="text-center py-10">Cargando vuelos...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Búsqueda de Vuelos</h1>
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <Select value={origen} onValueChange={setOrigen}>
          <SelectTrigger>
            <SelectValue placeholder="Origen" />
          </SelectTrigger>
          <SelectContent>
            {ciudadesOrigen?.map((ciudad) => (
              <SelectItem key={ciudad} value={ciudad}>
                {ciudad}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={destino} onValueChange={setDestino}>
          <SelectTrigger>
            <SelectValue placeholder="Destino" />
          </SelectTrigger>
          <SelectContent>
            {ciudadesDestino?.map((ciudad) => (
              <SelectItem key={ciudad} value={ciudad}>
                {ciudad}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          placeholder="Fecha de salida"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={isSearching} className="w-full">
            {isSearching ? "Buscando..." : "Buscar"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Resetear
          </Button>
        </div>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {vuelosBuscados.length > 0 ? (
        <TablaVuelos vuelos={vuelosBuscados} />
      ) : (
        <p className="text-center py-4">
          No se encontraron vuelos que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
}
