import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { users: [] };
    }
    throw error;
  }
}

async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function POST(req: Request) {
  try {
    const { name, email, password, userType } = await req.json();

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const db = await readDb();
    const existingUser = db.users.find((user) => user.email === email);

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      userType,
    };

    db.users.push(newUser);
    await writeDb(db);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
