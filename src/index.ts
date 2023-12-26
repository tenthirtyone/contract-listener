import { Listener } from "./listener";
export * from "./types";

async function main() {
  const listener = new Listener();
  await listener.start();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
