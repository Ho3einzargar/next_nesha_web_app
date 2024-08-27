import { Suspense, useEffect } from 'react';
import { onComplete, onStart } from './events';
import { usePathname, useSearchParams } from 'next/navigation';

function HandleOnCompleteChild() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => onComplete(), [pathname, searchParams]);
  return null;
}

export function HandleOnComplete() {
  return (
    <Suspense>
      <HandleOnCompleteChild />
    </Suspense>
  );
}
