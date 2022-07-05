export function hoursEnding(number: number) {
  if(!number) return;
  switch (number) {
    case 1:
      return 'час назад';
    case 2:
    case 3:
    case 4:
      return 'часa назад';
    default: return 'часов назад';
  }
}
