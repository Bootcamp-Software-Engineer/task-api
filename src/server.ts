import { app } from "./app.js";
import { prisma } from "./lib/prisma.js";
const PORT = Number(process.env.PORT ?? 3000);
const server = app.listen(PORT, () => {
console.log(`API a correr em http://localhost:${PORT}`);
});
async function shutdown() {
server.close();
await prisma.$disconnect();
process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);