const statusEvents: Record<string, string[]> = {
  0: ['active', 'past'],
  1: ['active'],
};

const sxEventGridItems = {
  display: 'grid',
  gridTemplate: 'repeat(2, 1fr)/1fr',
  gap: '24px',
  minHeight: '350px',
  overflow: 'hidden',
};

export { statusEvents, sxEventGridItems };
