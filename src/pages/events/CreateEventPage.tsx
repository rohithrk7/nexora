import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateEventPage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // Guard route
    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 px-4">
                <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-md border border-slate-200">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Authentication Required</h2>
                    <p className="text-slate-500 mb-8 font-medium">You must be logged in to host events and access organizer tools.</p>
                    <Link to="/login">
                        <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-bold rounded-full shadow-sm text-white transition-all hover:scale-105">Sign In to Continue</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({ title: "Event Published!", description: "Your event is now live." });
        navigate("/events");
    };

    return (
        <div className="container mx-auto px-4 py-12 bg-slate-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Host an Event</h1>
                    <p className="text-slate-500 font-medium">Tell the community what you're planning.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-slate-700 font-semibold">Event Title</Label>
                        <Input id="title" required placeholder="e.g., Summer Music Festival" className="h-12 border-slate-200 focus-visible:ring-orange-500 rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-slate-700 font-semibold">Date</Label>
                            <Input id="date" type="date" required className="h-12 border-slate-200 focus-visible:ring-orange-500 rounded-xl" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-slate-700 font-semibold">Time</Label>
                            <Input id="time" type="time" required className="h-12 border-slate-200 focus-visible:ring-orange-500 rounded-xl" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-slate-700 font-semibold">Format</Label>
                            <select id="type" className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                                <option value="In-person">In-person</option>
                                <option value="Virtual">Virtual</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price" className="text-slate-700 font-semibold">Ticket Price</Label>
                            <Input id="price" placeholder="Free, $10, etc." className="h-12 border-slate-200 focus-visible:ring-orange-500 rounded-xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-slate-700 font-semibold">Location / Link</Label>
                        <Input id="location" required placeholder="Address or meeting link" className="h-12 border-slate-200 focus-visible:ring-orange-500 rounded-xl" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-slate-700 font-semibold">Description</Label>
                        <Textarea id="description" required placeholder="What is this event about?" className="min-h-[150px] resize-none border-slate-200 focus-visible:ring-orange-500 rounded-xl" />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-4">
                        <Button type="button" variant="ghost" onClick={() => navigate("/events")} className="font-semibold text-slate-600 hover:text-slate-900 rounded-full h-12">Cancel</Button>
                        <Button type="submit" size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-full shadow-lg px-8 h-12 hover:scale-105 transition-transform">Create Event</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
