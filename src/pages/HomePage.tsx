import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ShoppingBag, PlusCircle, ArrowRight } from "lucide-react";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-40">
                {/* Dark, photographic background like the Lovable example */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2600&auto=format&fit=crop"
                        alt="Community Event"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-background"></div>
                </div>

                <div className="container px-4 mx-auto text-center relative z-10">
                    <Badge className="mb-6 bg-primary/20 text-orange-400 hover:bg-primary/30 border-primary/30 uppercase tracking-widest py-1.5 px-4 backdrop-blur-md">
                        Anyone Can Host
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 mt-4 text-white">
                        Connect. Celebrate. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Grow.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The ultimate platform for communities across the USA. Whether you want to attend a local meetup or host your own massive event, NEXORA gives you the tools to make it happen.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/events/new">
                            <Button size="lg" className="h-14 px-8 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xl rounded-full border border-orange-400/50 hover:scale-105 transition-transform">
                                Host an Event
                            </Button>
                        </Link>
                        <Link to="/events">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm shadow-sm rounded-full hover:scale-105 transition-transform">
                                Explore Events
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social Proof Stats Bar */}
            <section className="border-b border-border bg-slate-50 py-12 relative z-20 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-border">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold text-slate-900">1,200+</span>
                            <span className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider">Events Hosted</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold text-slate-900">850+</span>
                            <span className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider">Communities</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold text-slate-900">25K+</span>
                            <span className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider">Active Members</span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl font-extrabold text-slate-900">50</span>
                            <span className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wider">States Covered</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Pillars */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Everything you need to thrive</h2>
                        <p className="text-lg text-slate-600">NEXORA is built for organizers and attendees alike. From local meetups to state-wide conferences, we provide the platform to connect.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Attend block */}
                        <div className="bg-white border border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Calendar className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-900">Attend Events</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">Discover local and virtual events tailored to your interests. Connect with peers and expand your network effortlessly.</p>
                            <Link to="/events" className="text-blue-600 font-semibold flex items-center group-hover:gap-2 transition-all">
                                Find Events <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        {/* Host block (Highlighted) */}
                        <div className="bg-gradient-to-b from-orange-50 to-white border-2 border-orange-200 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group transform md:-translate-y-4">
                            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                                <div className="absolute inset-0 bg-orange-200 rounded-2xl animate-ping opacity-30"></div>
                                <PlusCircle className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-900">Host Your Own</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">NEXORA is open to everyone. Launch your community, sell tickets, manage RSVPs, and issue digital certificates in one place.</p>
                            <Link to="/events/new" className="text-orange-600 font-semibold flex items-center group-hover:gap-2 transition-all">
                                Start Hosting <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        {/* Market block */}
                        <div className="bg-white border border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-8 h-8 text-amber-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-900">Marketplace</h3>
                            <p className="text-slate-600 leading-relaxed mb-6">Buy, sell, or trade equipment, skills, and services exclusively with other verified community members.</p>
                            <Link to="/marketplace" className="text-amber-600 font-semibold flex items-center group-hover:gap-2 transition-all">
                                Browse Shop <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Warm closing CTA */}
            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 opacity-80 z-0" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Your Community?</h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Join thousands of event organizers and attendees shaping the future of community gathering across the USA.
                    </p>
                    <Link to="/signup">
                        <Button size="lg" className="h-16 px-10 text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-xl rounded-full">
                            Get Started for Free
                        </Button>
                    </Link>
                </div>
            </section>

        </div>
    );
}
