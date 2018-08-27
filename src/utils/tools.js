export const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7;
}

export const hours = () => {
  const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
  const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
  return [start, end];
}
