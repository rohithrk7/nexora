import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
    const { toast } = useToast();
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignUp = async () => {
        try {
            await signInWithGoogle();
            toast({
                title: "Success",
                description: "Signed up successfully!",
            });
            navigate("/dashboard");
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to sign up with Google",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 bg-slate-50">
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                {/* Glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-orange-100 blur-3xl mix-blend-multiply pointer-events-none"></div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-amber-100 blur-3xl mix-blend-multiply pointer-events-none"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg rotate-3 hover:rotate-6 transition-transform cursor-pointer">
                        <span className="text-3xl font-bold text-white tracking-widest font-serif leading-none">N</span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
                    <p className="text-slate-500 mt-2">Join NEXORA and start hosting today</p>
                </div>

                <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-600 uppercase text-xs tracking-wider font-semibold">Full Name</Label>
                        <Input id="name" type="text" placeholder="Alex Mercer" className="h-12 bg-slate-50 border-slate-200 text-slate-900 rounded-xl placeholder:text-slate-400 focus-visible:ring-orange-500" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-600 uppercase text-xs tracking-wider font-semibold">Email</Label>
                        <Input id="email" type="email" placeholder="name@example.com" className="h-12 bg-slate-50 border-slate-200 text-slate-900 rounded-xl placeholder:text-slate-400 focus-visible:ring-orange-500" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-slate-600 uppercase text-xs tracking-wider font-semibold">Password</Label>
                        <Input id="password" type="password" className="h-12 bg-slate-50 border-slate-200 text-slate-900 rounded-xl placeholder:text-slate-400 focus-visible:ring-orange-500" required />
                    </div>
                    <Button type="submit" className="w-full h-12 text-md font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg rounded-xl transition-all">
                        Sign Up
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-500 font-semibold tracking-widest">Or continue with</span>
                        </div>
                    </div>

                    <Button onClick={handleGoogleSignUp} variant="outline" type="button" className="w-full h-12 bg-white text-slate-700 font-semibold border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm">
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Google
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-500 mt-8 relative z-10">
                    Already have an account? <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">Log in</Link>
                </p>
            </div>
        </div>
    );
}
