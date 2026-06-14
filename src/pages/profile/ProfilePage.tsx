import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Phone, Link as LinkIcon, Edit3, Save, Star, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const { currentUser } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        displayName: currentUser?.displayName || "Community Member",
        bio: "Event enthusiast and community builder. Passionate about bringing people together for meaningful experiences.",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        website: "https://example.com/portfolio",
        twitter: "@nexorausery",
    });

    // Guard route
    if (!currentUser) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 px-4">
                <div className="text-center bg-white p-12 rounded-3xl shadow-xl max-w-md border border-slate-200">
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Authentication Required</h2>
                    <p className="text-slate-500 mb-8 font-medium">Please sign in to view and edit your profile.</p>
                    <Link to="/login">
                        <Button size="lg" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-bold rounded-full shadow-sm text-white transition-all hover:scale-105">Sign In</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Cover Banner */}
            <div className="h-64 w-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 relative">
                {/* Optional subtle pattern over gradient */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse-slow"></div>
            </div>

            <div className="container mx-auto px-4 -mt-24 relative z-10 max-w-5xl">
                {/* Profile Header Card */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 md:p-12 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">

                        {/* Avatar & Basic Info */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
                            <div className="relative group">
                                <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-8 border-white bg-slate-200 shadow-lg overflow-hidden flex items-center justify-center -mt-16 md:-mt-24 bg-gradient-to-br from-slate-100 to-slate-200 relative">
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl font-black text-slate-400">{profile.displayName.charAt(0)}</span>
                                    )}
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-orange-500 hover:bg-orange-600 text-white p-2 text-sm rounded-full shadow-lg transition-transform hover:scale-110">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="text-center md:text-left flex-1 mt-2 md:mt-0">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{profile.displayName}</h1>
                                <p className="text-slate-500 text-lg font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                                    <MapPin className="w-4 h-4" /> {profile.location}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex w-full md:w-auto gap-4 justify-center md:justify-end mt-4 md:mt-0 items-center">
                            {!isEditing ? (
                                <>
                                    <Button variant="outline" className="rounded-full font-bold border-slate-200 text-slate-700 h-12 px-6 shadow-sm hover:bg-slate-50">
                                        <Settings className="w-4 h-4 mr-2" /> Preferences
                                    </Button>
                                    <Button onClick={() => setIsEditing(true)} className="rounded-full shadow-md font-bold bg-slate-900 text-white hover:bg-slate-800 h-12 px-8">
                                        Edit Profile
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-full font-bold text-slate-500 hover:text-slate-800 h-12 px-6">
                                        Cancel
                                    </Button>
                                    <Button form="profile-form" type="submit" className="rounded-full shadow-md font-bold bg-green-500 text-white hover:bg-green-600 h-12 px-8">
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (About & Contacts) */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Bio Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">About Me</h3>
                            {isEditing ? (
                                <Textarea
                                    className="resize-none border-slate-200 focus-visible:ring-orange-500 rounded-xl min-h-[120px]"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                />
                            ) : (
                                <p className="text-slate-600 leading-relaxed font-medium">{profile.bio}</p>
                            )}
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">Contact Details</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 bg-orange-100 p-2 rounded-lg text-orange-600">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 mb-1">Email</p>
                                        <p className="text-slate-800 font-semibold">{currentUser.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 bg-amber-100 p-2 rounded-lg text-amber-600">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-400 mb-1">Phone</p>
                                        {isEditing ? (
                                            <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="h-10 border-slate-200 rounded-lg text-sm mt-1" />
                                        ) : (
                                            <p className="text-slate-800 font-semibold">{profile.phone}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 bg-yellow-100 p-2 rounded-lg text-yellow-600">
                                        <LinkIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-400 mb-1">Website</p>
                                        {isEditing ? (
                                            <Input value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} className="h-10 border-slate-200 rounded-lg text-sm mt-1" />
                                        ) : (
                                            <a href={profile.website} target="_blank" rel="noreferrer" className="text-orange-600 hover:text-orange-700 font-semibold truncate hover:underline block max-w-[200px]">{profile.website}</a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Tabs: Activity / Editing Form) */}
                    <div className="lg:col-span-2">
                        {isEditing ? (
                            <form id="profile-form" onSubmit={handleSave} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
                                <h3 className="text-2xl font-black text-slate-900 mb-6">Edit Information</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="font-bold text-slate-600">Display Name</Label>
                                            <Input value={profile.displayName} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} className="h-12 rounded-xl focus-visible:ring-orange-500 border-slate-200" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-bold text-slate-600">Location</Label>
                                            <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="h-12 rounded-xl focus-visible:ring-orange-500 border-slate-200" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="font-bold text-slate-600">Twitter / X Handle</Label>
                                        <Input value={profile.twitter} onChange={(e) => setProfile({ ...profile, twitter: e.target.value })} className="h-12 rounded-xl focus-visible:ring-orange-500 border-slate-200" />
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <Tabs defaultValue="activity" className="w-full">
                                <TabsList className="w-full bg-slate-200/50 p-2 h-16 rounded-2xl flex border border-slate-200 mb-6">
                                    <TabsTrigger value="activity" className="flex-1 rounded-xl font-bold text-md data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm">Activity</TabsTrigger>
                                    <TabsTrigger value="listings" className="flex-1 rounded-xl font-bold text-md data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm">Marketplace Listings</TabsTrigger>
                                    <TabsTrigger value="events" className="flex-1 rounded-xl font-bold text-md data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm">Hosted Events</TabsTrigger>
                                </TabsList>

                                <TabsContent value="activity">
                                    <div className="bg-white rounded-[2rem] p-10 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                                            <Star className="w-10 h-10 text-orange-400 fill-orange-200" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-2">No recent activity</h4>
                                        <p className="text-slate-500 font-medium max-w-sm">When you RSVP to events or interact in the community, your activity will show up here.</p>
                                        <Button onClick={() => navigate('/events')} className="mt-8 rounded-full bg-slate-900 text-white font-bold h-12 px-8 hover:bg-slate-800">Explore Events</Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="listings">
                                    <div className="bg-white rounded-[2rem] p-10 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                                        <h4 className="text-2xl font-bold text-slate-900 mb-2">No active listings</h4>
                                        <p className="text-slate-500 font-medium max-w-sm">Got event gear or services to offer? Sell them safely here.</p>
                                        <Button onClick={() => navigate('/marketplace')} variant="outline" className="mt-8 rounded-full border-slate-200 text-slate-700 font-bold h-12 px-8 hover:bg-slate-50">Go to Marketplace</Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="events">
                                    <div className="bg-white rounded-[2rem] p-10 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                                        <h4 className="text-2xl font-bold text-slate-900 mb-2">You haven't hosted any events yet</h4>
                                        <p className="text-slate-500 font-medium max-w-sm">Share your expertise and bring people together.</p>
                                        <Button onClick={() => navigate('/events/new')} className="mt-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold h-12 px-8 hover:from-orange-600 hover:to-amber-600">Create Event</Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
