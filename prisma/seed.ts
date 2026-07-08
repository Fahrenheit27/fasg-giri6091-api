import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const SALT_ROUNDS = 10;

  console.log('🌱 Iniciando seed...');

  // Limpiar usuarios existentes
  await prisma.user.deleteMany({});

  // Crear admin
  const adminPassword = await bcrypt.hash('admin123', SALT_ROUNDS);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin creado: ${admin.email}`);

  // Crear usuario
  const userPassword = await bcrypt.hash('user123', SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: userPassword,
      role: 'USER',
    },
  });
  console.log(`✅ Usuario creado: ${user.email}`);

  console.log('✨ Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
