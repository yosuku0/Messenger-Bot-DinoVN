const colors = {
  reset: "\x1B[0m",
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  gray: "\x1B[90m",
  brightBlack: "\x1B[90m",
  brightRed: "\x1B[91m",
  brightGreen: "\x1B[92m",
  brightYellow: "\x1B[93m",
  brightBlue: "\x1B[94m",
  brightMagenta: "\x1B[95m",
  brightCyan: "\x1B[96m",
  brightWhite: "\x1B[97m",
};

function getCurrentTimeInHanoi() {
  const utcTime = new Date();
  const hanoiTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);
  return hanoiTime;
}

function loadingAnimation(
  text = "",
  chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
  delay = 100
) {
  let x = 0;

  return setInterval(function () {
    const currentTimeInHanoi = getCurrentTimeInHanoi();
    process.stdout.write(`\r[${colors.brightCyan}${chars[x]}${colors.reset}] ${text} - Giờ Hà Nội: ${currentTimeInHanoi.toLocaleTimeString()}    `);
    x = (x + 1) % chars.length;
  }, delay);
}

function doneAnimation(
  text = "",
  loadingAnimationInstance: any
) {
  clearInterval(loadingAnimationInstance);
  const currentTimeInHanoi = getCurrentTimeInHanoi();
  process.stdout.write(`\r[${colors.brightGreen}✓${colors.reset}] ${text} - Giờ Hà Nội: ${currentTimeInHanoi.toLocaleTimeString()}    \n`);
}

function errAnimation(
  text = "",
  loadingAnimationInstance: any
) {
  clearInterval(loadingAnimationInstance);
  const currentTimeInHanoi = getCurrentTimeInHanoi();
  process.stdout.write(`\r[${colors.brightRed}X${colors.reset}] ${text} - Giờ Hà Nội: ${currentTimeInHanoi.toLocaleTimeString()}    \n`);
}

console.info = (message, ...optionalParams) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${colors.brightGreen}INFO${colors.reset}]`, message, ...optionalParams);
}

console.error = (...data) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${colors.brightRed}ERROR${colors.reset}]`, ...data);
}

console.warn = (...data) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${colors.brightYellow}WARN${colors.reset}]`, ...data);
}

export {
  loadingAnimation,
  doneAnimation,
  errAnimation,
};
