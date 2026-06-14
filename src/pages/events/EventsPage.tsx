import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar as CalendarIcon, Filter, PlusCircle } from "lucide-react";

export default function EventsPage() {
    const events = [
        {
            id: "ev-1",
            title: "NASA Regional Hackathon 2026",
            date: "Mar 12, 2026 • 10:00 AM",
            location: "Houston, TX",
            type: "In-person",
            price: "Free",
            attendees: 145,
            category: "Technology",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "ev-2",
            title: "Global Web Summit",
            date: "Apr 5, 2026 • 09:00 AM",
            location: "Virtual",
            type: "Virtual",
            price: "$49",
            attendees: 892,
            category: "Business",
            image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "ev-3",
            title: "Community Creators Meetup",
            date: "May 10, 2026 • 06:00 PM",
            location: "Austin, TX",
            type: "In-person",
            price: "Free",
            attendees: 34,
            category: "Networking",
            image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Explore Events</h1>
                    <p className="text-slate-500 mt-1">Discover what's happening in your community.</p>
                </div>
                <Link to="/events/new">
                    <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md rounded-full px-6">
                        <PlusCircle className="mr-2 h-5 w-5" /> Host an Event
                    </Button>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 md:p-6 border border-slate-200 rounded-[2rem] shadow-sm mb-12">
                <div className="w-full relative">
                    <Search className="absolute left-5 top-3.5 h-6 w-6 text-slate-400" />
                    <Input placeholder="Search upcoming events by title, city, or state..." className="pl-14 h-14 bg-slate-50 border-transparent focus-visible:ring-orange-500 text-slate-900 rounded-full text-lg w-full" />
                </div>
                <div className="w-full md:w-auto flex flex-shrink-0 items-center gap-4">
                    <Button variant="outline" size="lg" className="h-14 border-slate-200 text-slate-700 hover:bg-slate-50 w-full md:w-auto rounded-full px-8">
                        <Filter className="mr-2 h-5 w-5" /> Filters
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <Link to={`/events/${event.id}`} key={event.id} className="group block bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                {/* Cover */}
                                <div className="h-48 bg-slate-100 relative overflow-hidden">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <Badge className="bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 hover:bg-white shadow-sm font-semibold">
                                            {event.category}
                                        </Badge>
                                        <Badge className={event.type === 'Virtual' ? "bg-amber-100 text-amber-800 border-amber-200 font-semibold" : "bg-orange-100 text-orange-800 border-orange-200 font-semibold"}>
                                            {event.type}
                                        </Badge>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                            {event.title}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 mt-4 mt-auto">
                                        <div className="flex items-center text-slate-500 text-sm font-medium">
                                            <CalendarIcon className="w-5 h-5 mr-3 text-orange-400" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center text-slate-500 text-sm font-medium">
                                            <MapPin className="w-5 h-5 mr-3 text-amber-400" />
                                            {event.location}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                                        <div className="text-sm font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-full">
                                            {event.attendees} attending
                                        </div>
                                        <div className="text-lg font-bold text-slate-900">
                                            {event.price}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
