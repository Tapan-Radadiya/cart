import { PrismaClient, ApiSpecType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = "demo@example.com";
  const password = "password123";
  const name = "Demo User";

  // Hash password with 12 salt rounds
  const hashedPassword = await bcrypt.hash(password, 12);

  // Upsert user
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      hashedPassword,
    },
  });

  // Find or create project by name and ownerId
  let project = await prisma.project.findFirst({
    where: { name: "Demo Project", ownerId: user.id },
  });

  if (!project) {
    project = await prisma.project.create({
      data: {
        name: "Demo Project",
        ownerId: user.id,
      },
    });
  }

  // Create a sample ApiSpec if not exists
  const existingApiSpec = await prisma.apiSpec.findFirst({
    where: {
      filename: "sample.yaml",
      projectId: project.id,
    },
  });

  if (!existingApiSpec) {
    await prisma.apiSpec.create({
      data: {
        filename: "sample.yaml",
        filePath: "sample.yaml",
        specType: ApiSpecType.OPENAPI,
        rawText: "openapi: 3.0.0\ninfo:\n  title: Sample API\n  version: 1.0.0",
        projectId: project.id,
      },
    });
  }

  console.log("\n🌱 Seed complete!");
  console.log("Login with:");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });