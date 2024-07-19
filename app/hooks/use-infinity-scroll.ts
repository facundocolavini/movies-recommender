import { MutableRefObject, useEffect, useRef } from 'react';

interface UseInfiniteScrollParams {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteScrollParams): MutableRefObject<HTMLDivElement | null> => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    observer.current = new IntersectionObserver(observerCallback);
    const currentObserver = observer.current;

    if (lastElementRef.current) {
      currentObserver.observe(lastElementRef.current);
    }

    return () => currentObserver.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return lastElementRef;
};

export default useInfiniteScroll;