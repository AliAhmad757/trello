"use client";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main>
      <button onClick={() => signOut()}>Logout pls</button>
    </main>
  );
}
