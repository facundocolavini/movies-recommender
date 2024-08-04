import * as React from "react";
import { Button } from "@/components/ui/button";
import MovieCard from "./movie-card";
import { useSelectedMoviesContext } from "@/app/context/movies-context";
import { TransitionLink } from "./transition-links";
import { ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
// Paso 2: Importa ScrollArea de Shadcn UI


export function MoviesDrawer() {
  const { selectedMovies, clearSelectedMovies } = useSelectedMoviesContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-2  border-foreground fixed z-10 bottom-2 left-5 gap-2">
          Películas Seleccionadas
          <Badge>{selectedMovies.length}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'} className="flex overflow-auto">
        <div className="mx-auto w-full max-w-md">
          <SheetHeader>
            <SheetTitle>Películas Seleccionadas</SheetTitle>
          </SheetHeader>
          {/* Paso 3: Utiliza ScrollArea para hacer desplazable la lista de MovieCard */}
          <ScrollArea className="p-4 w-full ">
            {selectedMovies.map((movie) => (
              <div key={movie.id} className="mb-2 p-2  border-b border-gray-200 w-full">
                <MovieCard movie={movie} />
              </div>
            ))}
          </ScrollArea>
          <SheetDescription className="grid grid-cols md:grid-cols-2 gap-x-2 justify-center">
            <Button asChild>
              <TransitionLink href="/recommendation">
                Ver Recomendaciones
                <ChevronRight size={24} />
              </TransitionLink>
            </Button>
            <SheetTrigger asChild>
              <Button variant="outline" onClick={()=>clearSelectedMovies()}>Cerrar</Button>
            </SheetTrigger>
          </SheetDescription>
        </div>
      </SheetContent>
    </Sheet>
  );
}