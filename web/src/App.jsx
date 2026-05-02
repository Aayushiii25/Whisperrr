import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Whisper!</h1>

      {/* While Clerk is loading */}
      <ClerkLoading>
        <p>Loading authentication...</p>
      </ClerkLoading>

      {/* After Clerk is ready */}
      <ClerkLoaded>
        <SignedOut>
          <SignInButton mode="modal">
            <button style={{ padding: "10px 20px", cursor: "pointer" }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </ClerkLoaded>
    </div>
  );
}

export default App;
