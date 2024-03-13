const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = Math.round(parseFloat((bytes / Math.pow(k, i)).toFixed(2)));

  return size + " " + sizes[i];
};

const findClosestPercentage = (number, max, min, step = 1) => {
  const percentage = ((number - min) / (max - min)) * 100;

  return Math.round(percentage / step) * step;
};

function findNumberForPercentage(percentage, max, min) {
  const range = max - min;
  const number = min + (range * percentage) / 100;

  return Math.round(number);
}

export { formatFileSize, findClosestPercentage, findNumberForPercentage };
