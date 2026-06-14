import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Share2, Award, Users } from "lucide-react";

export default function EventDetailPage() {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Mock data based on the ID or just a static mock
    const event = {
        id: id || "ev-1",
        title: "NASA Regional Hackathon 2026",
        date: "Thursday, March 12, 2026",
        time: "10:00 AM - 10:00 PM CST",
        location: "Houston Space Center, Houston, TX",
        type: "In-person",
        price: "Free",
        attendees: 145,
        category: "Technology",
        description: "Join us for a 12-hour intensive hackathon to solve problems related to space exploration and satellite data. Connect with developers, scientists, and engineers from around the state. Bring your laptops and your biggest ideas! Food and drinks will be provided.",
        host: {
            name: "Dr. Elena Vance",
            avatar: "https://i.pravatar.cc/150?u=elena",
            role: "Lead Scientist"
        },
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Hero Cover */}
            <div className="w-full h-[50vh] relative min-h-[400px]">
                <div className="absolute inset-0 bg-slate-900/40 z-10" />
                <img src={event.image} alt="Event cover" className="w-full h-full object-cover" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-orange-500 hover:bg-orange-600 text-white font-semibold border-orange-500 shadow-sm">{event.category}</Badge>
                            <Badge variant="outline" className="border-white/50 text-white backdrop-blur-md shadow-sm font-semibold">{event.type}</Badge>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-xl">{event.title}</h1>
                    </div>
                </div>
            </div>

            {/* Main Content Details */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column (Details) */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Event Meta Card */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 justify-between">
                            <div className="space-y-6 flex-1">
                                <div className="flex items-start gap-4">
                                    <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-slate-900">{event.date}</p>
                                        <p className="text-slate-500 font-medium">{event.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-slate-900">{event.location}</p>
                                        <a href="#" className="text-orange-600 font-semibold text-sm hover:underline">View map</a>
                                    </div>
                                </div>
                            </div>

                            {/* Host info */}
                            <div className="flex flex-col justify-center items-center text-center p-6 border border-slate-100 rounded-3xl bg-slate-50 md:min-w-[250px] shadow-inner">
                                <img src={event.host.avatar} alt={event.host.name} className="w-24 h-24 rounded-full mb-4 shadow-md border-4 border-white" />
                                <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Hosted By</p>
                                <p className="text-xl font-bold text-slate-900">{event.host.name}</p>
                                <p className="text-sm text-slate-600 mb-4">{event.host.role}</p>
                                <Button variant="outline" size="sm" className="rounded-full shadow-sm font-semibold border-slate-200 hover:bg-slate-100 text-slate-700">Follow</Button>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">About this event</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        {/* Certificate Eligible Banner */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-md text-white">
                                <Award className="w-10 h-10" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-orange-900 mb-2">Certificate Eligible</h3>
                                <p className="text-orange-800 font-medium">
                                    Attendees who complete this event will automatically receive a verifiable digital certificate for their professional portfolio.
                                </p>
                            </div>
                        </div>

                        {/* Attendees Section */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Users className="w-7 h-7 text-orange-500" />
                                <h2 className="text-2xl font-bold text-slate-900">Attendees ({event.attendees})</h2>
                            </div>
                            <div className="flex flex-wrap gap-[-10px] items-center">
                                {/* Fake avatars */}
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <img key={i} className="w-14 h-14 rounded-full border-4 border-white z-10 hover:z-20 transform hover:-translate-y-2 transition-transform cursor-pointer shadow-sm" src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="avatar" />
                                    ))}
                                </div>
                                <div className="w-14 h-14 rounded-full border-4 border-white bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm -ml-4 z-20 shadow-sm">
                                    +{event.attendees - 8}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (RSVP) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
                            <div className="text-center mb-8">
                                <p className="text-slate-500 mb-2 text-sm uppercase tracking-widest font-bold">Ticket Price</p>
                                <h2 className="text-5xl font-black text-slate-900">{event.price}</h2>
                            </div>

                            <Button onClick={() => {
                                if (!currentUser) {
                                    toast({ title: "Authentication Required", description: "You must be logged in to RSVP for events.", variant: "destructive" });
                                    navigate("/login");
                                } else {
                                    toast({ title: "RSVP Successful!", description: "You're on the list. We'll email you the details." });
                                }
                            }} className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg mb-4 rounded-full hover:scale-105 transition-transform">
                                RSVP Now
                            </Button>

                            <Button variant="outline" className="w-full h-14 text-lg font-bold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full shadow-sm">
                                <Share2 className="mr-2 h-5 w-5" /> Share Event
                            </Button>

                            <p className="text-center text-sm font-medium text-slate-500 mt-6">
                                Secure your spot quickly. Spaces are limited.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
