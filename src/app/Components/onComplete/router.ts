import { useRouter as useRouterOriginal } from 'next/navigation';
import { shouldTriggerStartEvent } from './should-trigger-start-event';
import { onStart } from './events';

export function useRouter(): ReturnType<typeof useRouterOriginal> {
  const router = useRouterOriginal();
  return {
    ...router,
    push: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.push(href, options);
    },
    replace: (href, options) => {
      if (shouldTriggerStartEvent(href)) onStart();
      router.replace(href, options);
    },
  };
}
