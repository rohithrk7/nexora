import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                        <span className="font-bold text-white tracking-widest leading-none">N</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground">NEXORA</span>
                </Link>

                <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
                    <Link to="/certificates" className="hover:text-primary transition-colors">Certificates</Link>
                    <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
                    <Link to="/community" className="hover:text-primary transition-colors">Community</Link>
                    <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-3 mr-2">
                        <Link to="/events/new">
                            <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10 font-semibold flex gap-2 rounded-full">
                                <PlusCircle className="w-4 h-4" /> Host Event
                            </Button>
                        </Link>
                    </div>

                    {!currentUser ? (
                        <>
                            <Link to="/login" className="hidden sm:block">
                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md border-0 rounded-full px-6">Join Now</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/profile">
                                <span className="hidden md:block text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors">
                                    {currentUser.displayName || currentUser.email}
                                </span>
                            </Link>
                            <Button onClick={async () => {
                                await logout();
                                navigate("/");
                            }} variant="outline" className="rounded-full border-slate-200">
                                <LogOut className="w-4 h-4 mr-2" /> Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="border-t border-border/40 bg-slate-50 py-12 mt-20">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold tracking-tight text-foreground">NEXORA</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Connect. Celebrate. Grow. <br />The modern platform for everyone to host and share.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link to="/events" className="hover:text-primary">Events</Link></li>
                        <li><Link to="/events/new" className="hover:text-primary">Host an Event</Link></li>
                        <li><Link to="/certificates" className="hover:text-primary">Certificates</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link to="/about" className="hover:text-primary">About</Link></li>
                        <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
                        <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-primary">Twitter</a></li>
                        <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-primary">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default function MainLayout() {
    const location = useLocation();
    const isCommunity = location.pathname === "/community";
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
            <Navbar />
            <main className={`${isCommunity ? "flex-1 overflow-hidden" : "flex-1 w-full animate-in fade-in duration-500"}`}>
                <Outlet />
            </main>
            {!isCommunity && <Footer />}
        </div>
    );
}
