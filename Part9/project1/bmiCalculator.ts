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
  } else if (result > 16 && result <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (result >= 17 && result <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (result >= 18.5 && result <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (result >= 30 && result <= 34.9) {
    return 'Obese (Class I)';
  } else if (result >= 35 && result <= 40) {
    return 'Obese (Class II)';
  } else if (result > 40) {
    return 'Obese (Class III)';
  } else {
    return 'Something Is Wrong';
  }
};

export { calculateBmi };
// console.log(calculateBmi(height, weight));
