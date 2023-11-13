// pages/profile.js

import { useSession } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();

  if (!session) {
    // User is not authenticated, you can handle this as needed
    return <div>You are not signed in.</div>;
  }

  // User is authenticated, you can access their response data
  const { user } = session;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>Name: {user.name}</p>
      <p>Picture: <img src={user.image} alt={user.name} /></p>
    </div>
  );
}

export default Profile;
