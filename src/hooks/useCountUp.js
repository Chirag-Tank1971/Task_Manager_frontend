import { useEffect, useState } from 'react';

export function useCountUp(target, duration = 600) {
  const num = typeof target === 'number' ? target : 0;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (num === 0) {
      setValue(0);
      return;
    }

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * num));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [num, duration]);

  return value;
}
