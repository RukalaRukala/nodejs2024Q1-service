const color = {
  blue: '\x1b[34m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  reset: '\x1b[0m',
};

export function startServerMessage() {
  console.log(`\
${color.green}\nServer running successfully on the port \
${color.blue}http://localhost:4000/\
${color.reset}`);
}
