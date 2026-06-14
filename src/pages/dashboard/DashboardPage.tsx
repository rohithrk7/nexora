import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Calendar, Users, TrendingUp, Star, PlusCircle,
    MapPin, ArrowRight, Ticket, Award, ShoppingBag,
    Bell, ChevronRight, Activity, BarChart2, Clock, CheckCircle
} from "lucide-react";

const stats = [
    { label: "Events Hosted", value: "12", change: "+3 this month", icon: Calendar, color: "bg-orange-100 text-orange-600", border: "border-orange-200" },
    { label: "Total Attendees", value: "1,847", change: "+214 this month", icon: Users, color: "bg-blue-100 text-blue-600", border: "border-blue-200" },
    { label: "Revenue Earned", value: "$4,290", change: "+$820 this month", icon: TrendingUp, color: "bg-green-100 text-green-600", border: "border-green-200" },
    { label: "Certificates Issued", value: "362", change: "+45 this month", icon: Award, color: "bg-purple-100 text-purple-600", border: "border-purple-200" },
];

const upcomingEvents = [
    {
        id: "ev-1",
        title: "NASA Regional Hackathon 2026",
        date: "Mar 12, 2026",
        time: "10:00 AM",
        location: "Houston, TX",
        attendees: 145,
        capacity: 200,
        status: "active",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
        category: "Technology",
    },
    {
        id: "ev-2",
        title: "Global Web Summit",
        date: "Apr 5, 2026",
        time: "09:00 AM",
        location: "Virtual",
        attendees: 892,
        capacity: 1000,
        status: "active",
        image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=600&auto=format&fit=crop",
        category: "Business",
    },
    {
        id: "ev-3",
        title: "Community Creators Meetup",
        date: "May 10, 2026",
        time: "06:00 PM",
        location: "Austin, TX",
        attendees: 34,
        capacity: 50,
        status: "active",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop",
        category: "Networking",
    },
];

const recentActivity = [
    { icon: Ticket, color: "text-orange-500 bg-orange-50", msg: "12 new registrations for NASA Hackathon", time: "2 mins ago" },
    { icon: Star, color: "text-amber-500 bg-amber-50", msg: "New 5-star review on Global Web Summit", time: "18 mins ago" },
    { icon: Award, color: "text-purple-500 bg-purple-50", msg: "45 certificates auto-issued for past event", time: "1 hr ago" },
    { icon: Users, color: "text-blue-500 bg-blue-50", msg: "Community Creators hit 34 RSVPs", time: "3 hrs ago" },
    { icon: ShoppingBag, color: "text-green-500 bg-green-50", msg: "New marketplace listing from your network", time: "5 hrs ago" },
];

const monthlyData = [
    { month: "Jan", events: 1, attendees: 120 },
    { month: "Feb", events: 2, attendees: 310 },
    { month: "Mar", events: 1, attendees: 145 },
    { month: "Apr", events: 3, attendees: 892 },
    { month: "May", events: 2, attendees: 380 },
    { month: "Jun", events: 3, attendees: 0 },
];

const quickActions = [
    { label: "Create Event", icon: PlusCircle, to: "/events/new", color: "from-orange-500 to-amber-500", text: "text-white" },
    { label: "My Certificates", icon: Award, to: "/certificates", color: "from-purple-500 to-violet-500", text: "text-white" },
    { label: "Marketplace", icon: ShoppingBag, to: "/marketplace", color: "from-blue-500 to-cyan-500", text: "text-white" },
    { label: "Community", icon: Users, to: "/community", color: "from-green-500 to-emerald-500", text: "text-white" },
];

export default function DashboardPage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [activeBar, setActiveBar] = useState<number | null>(null);

    const maxAttendees = Math.max(...monthlyData.map(d => d.attendees), 1);
    const displayName = currentUser?.displayName?.split(" ")[0] || "there";

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 rounded-3xl p-8 mb-8 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="text-orange-300 font-semibold text-sm uppercase tracking-widest mb-2">
                                Welcome back 👋
                            </p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                                Hey, {displayName}!
                            </h1>
                            <p className="text-slate-300 text-lg max-w-lg">
                                You have <span className="text-orange-400 font-bold">3 upcoming events</span> and <span className="text-amber-400 font-bold">214 new attendees</span> this month.
                            </p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            <Link to="/events/new">
                                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform font-bold">
                                    <PlusCircle className="w-5 h-5 mr-2" /> Host an Event
                                </Button>
                            </Link>
                            <Link to="/events">
                                <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full font-bold">
                                    Explore Events <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Decorative blobs */}
                    <div className="absolute -right-12 -top-12 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label}
                            className={`bg-white border ${stat.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <Activity className="w-4 h-4 text-slate-300 group-hover:text-orange-400 transition-colors" />
                            </div>
                            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
                            <div className="mt-2 text-xs font-medium text-green-600 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {quickActions.map((action) => (
                        <Link key={action.label} to={action.to}>
                            <div className={`bg-gradient-to-br ${action.color} rounded-2xl p-5 flex items-center gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer`}>
                                <action.icon className={`w-6 h-6 ${action.text}`} />
                                <span className={`font-bold text-sm ${action.text}`}>{action.label}</span>
                                <ChevronRight className={`w-4 h-4 ${action.text} ml-auto opacity-70`} />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Main Content Row */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">

                    {/* Upcoming Events — 2 cols */}
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
                                <p className="text-sm text-slate-500 mt-0.5">Your next 3 scheduled events</p>
                            </div>
                            <Link to="/events">
                                <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 font-semibold">
                                    View All <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {upcomingEvents.map((event) => {
                                const fillPct = Math.round((event.attendees / event.capacity) * 100);
                                return (
                                    <Link to={`/events/${event.id}`} key={event.id} className="flex gap-4 p-4 hover:bg-slate-50 transition-colors group">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h3 className="font-bold text-slate-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">{event.title}</h3>
                                                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex-shrink-0">Live</Badge>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.date} · {event.time}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                                                        style={{ width: `${fillPct}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-slate-600 flex-shrink-0">
                                                    {event.attendees}/{event.capacity}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Activity Feed — 1 col */}
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                                <p className="text-sm text-slate-500 mt-0.5">Latest updates</p>
                            </div>
                            <Bell className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="divide-y divide-slate-50">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
                                    <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-700 font-medium leading-snug">{item.msg}</p>
                                        <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Monthly Attendance Chart */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Monthly Attendance</h2>
                            <p className="text-sm text-slate-500 mt-0.5">Attendees per month across all your events</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
                            <BarChart2 className="w-4 h-4" /> 2026
                        </div>
                    </div>
                    <div className="flex items-end gap-3 h-40">
                        {monthlyData.map((d, i) => {
                            const height = d.attendees > 0 ? Math.max((d.attendees / maxAttendees) * 100, 8) : 8;
                            return (
                                <div
                                    key={d.month}
                                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                                    onMouseEnter={() => setActiveBar(i)}
                                    onMouseLeave={() => setActiveBar(null)}
                                >
                                    {activeBar === i && d.attendees > 0 && (
                                        <div className="bg-slate-900 text-white text-xs font-bold rounded-lg px-2 py-1 whitespace-nowrap shadow-lg">
                                            {d.attendees.toLocaleString()}
                                        </div>
                                    )}
                                    <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
                                        <div
                                            className={`w-full rounded-xl transition-all duration-300 ${
                                                activeBar === i
                                                    ? "bg-gradient-to-t from-orange-600 to-amber-400 shadow-lg"
                                                    : d.attendees > 0
                                                    ? "bg-gradient-to-t from-orange-400 to-amber-300"
                                                    : "bg-slate-100"
                                            }`}
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">{d.month}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Top Events */}
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Top Performing Events</h2>
                        <div className="space-y-4">
                            {upcomingEvents.map((e, i) => (
                                <div key={e.id} className="flex items-center gap-4">
                                    <div className="text-2xl font-black text-slate-200 w-8">#{i + 1}</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-slate-800 line-clamp-1">{e.title}</div>
                                        <div className="text-xs text-slate-500">{e.attendees} attendees</div>
                                    </div>
                                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                                        <Star className="w-4 h-4 fill-current" /> 4.{9 - i}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checklist / Tasks */}
                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Organizer Checklist</h2>
                        <div className="space-y-3">
                            {[
                                { task: "Set up event page for Summer Fest", done: true },
                                { task: "Send invites to previous attendees", done: true },
                                { task: "Configure ticket tiers & pricing", done: false },
                                { task: "Upload speaker bios & schedule", done: false },
                                { task: "Enable certificate auto-issuance", done: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.done ? "bg-green-500 border-green-500" : "border-slate-300 group-hover:border-orange-400"}`}>
                                        {item.done && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-sm font-medium ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{item.task}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
