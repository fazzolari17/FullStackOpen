// const height = parseInt(process.argv[2]);
// const weight = parseInt(process.argv[3]);

const calculateBmi = (
  height: number,
  weight: number
): string => {
  height = (height / 100) ^ 2;
  const result = weight / height;

  if (result < 16) {
    return `Underweight (Severe thinness)`;
  } else if (result > 16 && result < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (result > 16.9 && result < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (result > 18.4 && result < 25) {
    return 'Normal (healthy weight)';
  } else if (result > 25 && result < 30) {
    return 'Overweight (Pre-obese)';
  } else if (result > 30 && result < 35) {
    return 'Obese (Class I)';
  } else if (result > 35 && result < 40) {
    return 'Obese (Class II)';
  } else if (result > 40) {
    return 'Obese (Class III)';
  } else {
    return 'Something Is Wrong';
  }
};

export { calculateBmi };
// console.log(calculateBmi(height, weight));
