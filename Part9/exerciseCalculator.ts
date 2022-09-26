const week = (args: string[]) => {
  const argArray: number[] = [];
  for (let i = 3; i < process.argv.length; i++) {
    argArray.push(parseInt(process.argv[i]));
  }
  return argArray;
};

const target = parseInt(process.argv[2]);

const exerciseCalculator = (
  week: number[],
  target: number
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
    average === target
      ? 3
      : average < target
      ? 2
      : average === 0
      ? 1
      : NaN;

  let ratingDescription: any = rating;

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

console.log(exerciseCalculator(week(process.argv), target));
// { periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286 }
