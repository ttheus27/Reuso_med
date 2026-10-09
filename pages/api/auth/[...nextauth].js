// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getActiveTaskForUser } from '../server/db/users/getActiveTaskForUser';

// Verifica se o NEXTAUTH_SECRET está definido
if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ NEXTAUTH_SECRET não está definido! Isso pode causar problemas de autenticação.');
}

export const authOptions = {
  // 🔎 ajuda a debugar (pode remover depois)
  debug: true,

  secret: process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-secret-key-change-in-production' : undefined),

  pages: {
    signIn: '/',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // ⚠️ mantém seu fetch, mas agora com retorno NORMALIZADO
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/user/checkCredentials`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
              },
              body: JSON.stringify(credentials),
            }
          );

          if (!response.ok) {
            return null;
          }

          const user = await response.json();
          console.log(user, 'USER');

          if (!user) return null;

          // Apenas ADMIN e MEMBRO
          if (user.role === 'SUBSCRIBER') return null;

          // ✅ RETORNO CORRETO PARA O NEXTAUTH
          return {
            id: String(user.id), // ⚠️ id SEMPRE string
            name: user.name ?? '',
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('Erro na autenticação:', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // ⚠️ GARANTE QUE session.user EXISTE
      if (!session.user) {
        session.user = {};
      }

      // dados básicos
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;

      // 🚀 carrega tarefa ativa do usuário
      try {
        if (session.user.email) {
          const info = await getActiveTaskForUser(session.user.email);

          session.user.hasActiveTask = info.hasActiveTask;
          session.user.activeTask = info.activeTask;
        } else {
          session.user.hasActiveTask = false;
          session.user.activeTask = null;
        }
      } catch (e) {
        console.error(
          'Erro ao carregar tarefa ativa do usuário na sessão:',
          e
        );
        session.user.hasActiveTask = false;
        session.user.activeTask = null;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
