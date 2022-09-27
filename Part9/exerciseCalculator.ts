export const exerciseCalculator = (
  target: number,
  week: number[]
): object => {
  const daysTrained: number[] = week.filter(
    (days) => days > 0
  );

  const periodLength: number = week.length;
  const trainingDays: number = daysTrained.length;

  const successTester: boolean = week.some(
    (el: number): boolean => el === 0
  );
  const success: boolean = successTester ? false : true;

  const totalHrs = week.reduce(
    (sum: number, a: number): number => sum + a,
    0
  );
  const average: number = totalHrs / periodLength;

  const rating: number =
    average >= target
      ? 3
      : average < target
      ? 2
      : average === 0
      ? 1
      : NaN;

  let ratingDescription: unknown = rating;

  switch (ratingDescription) {
    case 3:
      ratingDescription =
        'Great Job!! You have met your target';
      break;
    case 2:
      ratingDescription = 'Not bad. You can do better';
      break;
    case 1:
      ratingDescription =
        'Very Bad! You have failed to work out this week';
      break;
    default:
      ratingDescription = 'No workout information';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
