
import SnowfallBG from '@/components/snowball-bg';
import { TransitionLink } from '@/components/transition-links';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="flex relative h-screen flex-col items-center justify-between p-20 max-sm:p-4 bg-black">
      <SnowfallBG />
      <div className="h-full w-full flex justify-center items-center flex-col gap-8">

          <h1 className="text-center text-3xl font-bold sm:text-4xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-tr from-white to-neutral-800 capitalize max-sm:text-[1.4rem] md:max-w-3xl lg:max-w-5xl">
            Bienvenido a nuestro recomendador de películas
          </h1>
          <p className="text-center text-neutral-400 max-sm:text-sm md:max-w-3xl lg:max-w-5xl">
            Encuentra recomendaciones de películas basadas en tus gustos
          </p>
          <Button asChild variant={'secondary'}>
          <TransitionLink href="/movies">
            Comencemos <ChevronRight size={24} />
          </TransitionLink>
        </Button>
        
      </div>
    </main >
  );
}
