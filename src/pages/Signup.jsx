import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../lib/firebase";
import api from "../lib/api";

export default function Signup() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = async () => {
    if (isSigningUp) return;
    
    setIsSigningUp(true);
    try {
      console.log("🚀 Starting signup with Google...");
      const result = await signInWithGoogle();
      
      console.log("✅ Google sign-in successful:", result.email);
      
      // Call backend findOrCreate
      const firstName = result.name?.split(' ')[0] || '';
      const lastName = result.name?.split(' ').slice(1).join(' ') || '';
      
      const res = await api.post("/auth/findOrCreate", {
        firebaseId: result.uid,
        email: result.email,
        firstName,
        lastName,
        photoURL: result.photoURL
      });
      
      const admin = res.data;
      console.log("✅ Admin:", admin.id);
      
      // Store auth data
      localStorage.setItem("firebaseId", result.uid);
      localStorage.setItem("adminId", admin.id);
      localStorage.setItem("email", admin.email || result.email);
      
      // NEW USER → Profile setup FIRST!
      console.log("✅ New user → Profile setup");
      navigate("/profilesetup");
      
    } catch (error) {
      console.error("❌ Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
        
        {/* Logo */}
        <div className="space-y-4">
          <img src="/logo.png" alt="Ignite Strategies" className="h-20 mx-auto" />
          
          <h1 className="text-3xl font-bold text-white">
            Welcome to Ignite!
          </h1>
          <p className="text-white/80 text-lg">
            How would you like to get started?
          </p>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          disabled={isSigningUp}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-orange-700 transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🚀</span>
          <div className="text-left flex-1">
            <div className="font-bold">Set Up Your Organization</div>
            <div className="text-xs text-white/80">I'm starting fresh - create new org</div>
          </div>
        </button>

        {/* Already have account */}
        <p className="text-white/80 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-red-400 font-semibold hover:underline"
          >
            Sign In
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
