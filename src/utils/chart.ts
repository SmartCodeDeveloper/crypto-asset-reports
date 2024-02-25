export const formatTimestampToHour = (timestamp: number) => {
  const date = new Date(timestamp);
  const hour = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hour}:${minutes}`;
}

export const formatTimestampToDayMonth = (timestamp: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  return `${day}.${month}`;
};