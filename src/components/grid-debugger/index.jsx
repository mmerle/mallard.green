import cn from 'clsx';
import { useCallback, useLayoutEffect } from 'react';
import { useWindowSize } from '~/hooks/use-window-size';
import useStore from '~/utils/store';
import s from './grid-debugger.module.css';

export default function GridDebugger() {
  const { isGridOverlayVisible, toggleGridOverlayVisibility } = useStore();
  useWindowSize();

  const columns =
    typeof window === 'undefined'
      ? 0
      : parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--grid-columns',
          ),
          10,
        );
  const columnKeys = Array.from(
    { length: columns },
    (_, index) => `grid-column-${index}`,
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'G') {
        toggleGridOverlayVisibility();
      }
    },
    [toggleGridOverlayVisibility],
  );

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={s.overlay} data-visible={isGridOverlayVisible}>
      <div className={s.container}>
        <div className={cn(s.row, s.debugger)}>
          {columnKeys.map((key) => (
            <span key={key} className={s.col}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GridDebuggerToggle({ children, className }) {
  const { toggleGridOverlayVisibility } = useStore();

  return (
    <button
      type="button"
      onClick={toggleGridOverlayVisibility}
      className={cn(s.toggle, className)}
    >
      {children}
    </button>
  );
}
