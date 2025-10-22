import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, auth } from "../lib/firebase";
import api from "../lib/api";

export default function Signin() {
  const navigate = useNavigate();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    if (isSigningIn) return;
    
    setIsSigningIn(true);
    try {
      console.log("🚀 Starting sign-in with Google...");
      const result = await signInWithGoogle();
      
      console.log("✅ Google sign-in successful:", result.email);
      
      // Call backend findOrCreate (will find existing user)
      const res = await api.post("/auth/findOrCreate", {
        firebaseId: result.uid,
        email: result.email,
        firstName: result.name?.split(' ')[0] || '',
        lastName: result.name?.split(' ').slice(1).join(' ') || '',
        photoURL: result.photoURL
      });
      
      const admin = res.data;
      console.log("✅ Admin found:", admin.id);
      
      // Store auth data
      localStorage.setItem("firebaseId", result.uid);
      localStorage.setItem("adminId", admin.id);
      localStorage.setItem("email", admin.email || result.email);
      
      // Redirect to profile setup
      console.log("✅ Existing user → Profile setup");
      navigate("/profilesetup");
      
    } catch (error) {
      console.error("❌ Sign-in failed:", error);
      alert("Sign-in failed. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
        
        {/* Logo */}
        <div className="space-y-4">
          <img src="/logo.png" alt="Ignite Strategies" className="h-20 mx-auto" />
          
          <h1 className="text-3xl font-bold text-white">
            Welcome Back!
          </h1>
          <p className="text-white/80 text-lg">
            Sign in to continue your journey
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="w-full bg-white/20 border-2 border-white/30 text-white py-4 px-6 rounded-xl font-semibold hover:bg-white/30 transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSigningIn ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {/* New user link */}
        <p className="text-white/80 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-red-400 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>

        {/* Back to Home */}
        <div className="pt-4 border-t border-white/20">
          <button
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white transition text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
