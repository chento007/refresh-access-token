// pages/login.js
"use client"
import { useSession, signIn } from "next-auth/react";

function LoginPage() {
  const { data: session } = useSession();

  const handleSignInWithGoogle = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  };
  console.log("seesion from login",session)
  return (
    <div className="mt-96 float-left">
      <h1>Login with Google</h1>
      {session ? (
        // If the user is already authenticated, display their information
        <div>
          {/* <p>Welcome, {session.user.email}</p>
          <p>Name: {session.user.name}</p>
          <p>Picture: <img src={session.user.image} alt={session.user.name} /></p> */}
        </div>
      ) : (
        // If the user is not authenticated, show the "Sign in with Google" button
        <button
          onClick={handleSignInWithGoogle}
          className="bg-blue-500 hover:bg-blue-600  text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default LoginPage;
