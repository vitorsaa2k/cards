import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/libs/prismadb';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        cpf: {
          label: 'CPF',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if(!credentials?.cpf) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Existem campos em branco');
          }
  
          const user = await prismadb.user.findUnique({ where: {
            email: credentials.email
          }});
  
          if (!user || !user.hashedPassword) {
            throw new Error('Email incorreto/Usuário não existe');
          }
  
          const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
  
          if (!isCorrectPassword) {
            throw new Error('Senha incorreta');
          }
          return user;
        } else {
          if (!credentials?.cpf || !credentials?.password) {
            throw new Error('Existem campos em branco');
          }
  
          const user = await prismadb.user.findUnique({ where: {
            cpf: credentials.cpf
          }});
  
          if (!user || !user.hashedPassword) {
            throw new Error('CPF incorreto/Usuário não existe');
          }
  
          const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
  
          if (!isCorrectPassword) {
            throw new Error('Senha incorreta');
          }
          return user;
        }

      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth'
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);

