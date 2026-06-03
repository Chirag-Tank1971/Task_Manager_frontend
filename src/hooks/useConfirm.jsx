import { useCallback, useRef, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';

const initialState = {
  open: false,
  title: '',
  message: '',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  variant: 'danger',
};

export function useConfirm() {
  const [config, setConfig] = useState(initialState);
  const resolverRef = useRef(null);

  const ask = useCallback(
    ({ title, message, confirmText, cancelText, variant }) =>
      new Promise((resolve) => {
        resolverRef.current = resolve;
        setConfig({
          open: true,
          title,
          message,
          confirmText: confirmText || 'Delete',
          cancelText: cancelText || 'Cancel',
          variant: variant || 'danger',
        });
      }),
    []
  );

  const close = useCallback((result) => {
    setConfig((prev) => ({ ...prev, open: false }));
    resolverRef.current?.(result);
    resolverRef.current = null;
  }, []);

  function ConfirmDialog() {
    return (
      <ConfirmModal
        open={config.open}
        title={config.title}
        message={config.message}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        variant={config.variant}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    );
  }

  return { ask, ConfirmDialog };
}
