"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {

  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Welcome, {session.user.name}!</p>
        <p>Email: {session.user.email}</p>
        {session.user.image && <img src={session.user.image} alt={session.user.name} />}
        <button onClick={() => signOut()}>Sign out</button>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
}
