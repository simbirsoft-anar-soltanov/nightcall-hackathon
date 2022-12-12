const statusEvents: Record<string, string> = {
  0: 'active',
  1: 'approve',
  2: 'reject',
};

const sxOrderGridItems = {
  display: 'grid',
  gridTemplate: 'repeat(2, 1fr)/1fr',
  gap: '24px',
  minHeight: '350px',
  overflow: 'hidden',
};

export { statusEvents, sxOrderGridItems };
