import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

// Hash a string to a number
function stringToHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return hash;
}

// Generate an RGB color based on a hash
function hashToRGB(hash): [any, any, any] {
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;

  if (r + g + b < 100) {
    return [150, 150, 150];
  } else {
    return [r, g, b];
  }
}

// Generate an ANSI escape code for the RGB color
function rgbToAnsi([r, g, b]) {
  return `\x1b[38;2;${r};${g};${b}m`;
}

export function createLogger(name) {
  const hash = stringToHash(name);
  const rgb = hashToRGB(hash);

  const ansiColor = rgbToAnsi(rgb);
  const coloredName = `${ansiColor}${name}\x1b[0m`; // \x1b[0m resets the color
  return logger.child({ name: coloredName });
}
