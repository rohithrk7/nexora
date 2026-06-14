import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Hash, Volume2, Plus, Send, Smile, Paperclip, Bell, Users, Search, LogIn, Compass, MessageSquare, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message { id: string; author: string; avatar: string; content: string; time: string; isMe?: boolean; }
interface Channel { id: string; name: string; type: "text" | "voice"; messages: Message[]; }
interface Community { id: string; name: string; icon: string; color: string; members: number; category: string; description: string; joined: boolean; channels: Channel[]; }

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_COMMUNITIES: Community[] = [
  {
    id: "c1", name: "Tech Builders", icon: "🚀", color: "from-blue-500 to-indigo-600", members: 4280,
    category: "Technology", description: "Builders, hackers & innovators sharing ideas and projects.",
    joined: true,
    channels: [
      { id: "ch1", name: "general", type: "text", messages: [
        { id: "m1", author: "Alex", avatar: "A", content: "Welcome to Tech Builders! 🚀", time: "10:00 AM" },
        { id: "m2", author: "Priya", avatar: "P", content: "Excited to be here! Anyone building with React 19?", time: "10:05 AM" },
        { id: "m3", author: "Sam", avatar: "S", content: "Yes! The new hooks are amazing 🔥", time: "10:07 AM" },
      ]},
      { id: "ch2", name: "project-showcase", type: "text", messages: [
        { id: "m4", author: "Jordan", avatar: "J", content: "Just shipped my SaaS MVP — check it out!", time: "9:00 AM" },
      ]},
      { id: "ch3", name: "resources", type: "text", messages: [
        { id: "m5", author: "Taylor", avatar: "T", content: "Great article on system design 👇 bit.ly/sysdes", time: "8:30 AM" },
      ]},
      { id: "ch4", name: "Voice Lounge", type: "voice", messages: [] },
    ],
  },
  {
    id: "c2", name: "Music & Arts", icon: "🎵", color: "from-pink-500 to-rose-600", members: 2140,
    category: "Arts", description: "Musicians, artists & creatives connecting worldwide.",
    joined: true,
    channels: [
      { id: "ch5", name: "general", type: "text", messages: [
        { id: "m6", author: "Luna", avatar: "L", content: "Who's coming to the open mic next Friday?", time: "11:00 AM" },
        { id: "m7", author: "Marco", avatar: "M", content: "I'll be performing! 🎸", time: "11:03 AM" },
      ]},
      { id: "ch6", name: "share-your-work", type: "text", messages: [
        { id: "m8", author: "Aria", avatar: "A", content: "Just dropped my first EP on Spotify 🎶", time: "9:45 AM" },
      ]},
      { id: "ch7", name: "Jam Session", type: "voice", messages: [] },
    ],
  },
  {
    id: "c3", name: "Startup Founders", icon: "💡", color: "from-amber-500 to-orange-600", members: 3760,
    category: "Business", description: "Founders & entrepreneurs building the next big thing.",
    joined: false,
    channels: [
      { id: "ch8", name: "general", type: "text", messages: [
        { id: "m9", author: "Chris", avatar: "C", content: "Anyone looking for a technical co-founder?", time: "8:00 AM" },
      ]},
      { id: "ch9", name: "funding-talks", type: "text", messages: [] },
      { id: "ch10", name: "Office Hours", type: "voice", messages: [] },
    ],
  },
  {
    id: "c4", name: "Sports & Fitness", icon: "⚡", color: "from-green-500 to-emerald-600", members: 5920,
    category: "Sports", description: "Athletes and fitness enthusiasts pushing their limits.",
    joined: false,
    channels: [
      { id: "ch11", name: "general", type: "text", messages: [
        { id: "m10", author: "Kai", avatar: "K", content: "Morning run done! 5km PR today 🏃", time: "6:30 AM" },
      ]},
      { id: "ch12", name: "workout-plans", type: "text", messages: [] },
      { id: "ch13", name: "Live Training", type: "voice", messages: [] },
    ],
  },
];

const INTERESTS = ["All", "Technology", "Arts", "Business", "Sports", "Gaming"];

const AVATARS: Record<string, string> = {
  A: "bg-orange-100 text-orange-700", B: "bg-blue-100 text-blue-700", C: "bg-cyan-100 text-cyan-700", J: "bg-green-100 text-green-700",
  K: "bg-emerald-100 text-emerald-700", L: "bg-pink-100 text-pink-700", M: "bg-red-100 text-red-700", P: "bg-purple-100 text-purple-700",
  R: "bg-rose-100 text-rose-700", S: "bg-amber-100 text-amber-700", T: "bg-teal-100 text-teal-700", Z: "bg-violet-100 text-violet-700",
};

function avatarColor(letter: string) {
  return AVATARS[letter] ?? "bg-slate-200 text-slate-700";
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CommunityPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [communities, setCommunities] = useState<Community[]>(SEED_COMMUNITIES);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(communities[0]);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(communities[0].channels[0]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [view, setView] = useState<"chat" | "discover">("chat");
  const [membersOpen, setMembersOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChannel, localMessages, view]);

  const joined = communities.filter(c => c.joined);
  const discover = communities.filter(c =>
    !c.joined &&
    (filter === "All" || c.category === filter) &&
    (searchQ === "" || c.name.toLowerCase().includes(searchQ.toLowerCase()))
  );

  function handleJoin(id: string) {
    if (!currentUser) {
      toast({ title: "Sign in required", description: "Please sign in to join communities.", variant: "destructive" });
      navigate("/login");
      return;
    }
    setCommunities(prev => prev.map(c => c.id === id ? { ...c, joined: true } : c));
    toast({ title: "Joined! 🎉", description: "You've successfully joined the community." });
    setView("chat");
    const newComm = communities.find(c => c.id === id);
    if(newComm) {
        setSelectedCommunity({...newComm, joined: true});
        setSelectedChannel(newComm.channels[0]);
    }
  }

  function handleSelectCommunity(c: Community) {
    setSelectedCommunity(c);
    setSelectedChannel(c.channels[0]);
    setView("chat");
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    if (!currentUser) {
      toast({ title: "Sign in required", variant: "destructive" });
      navigate("/login");
      return;
    }
    const newMsg: Message = {
      id: Date.now().toString(),
      author: currentUser.displayName?.split(" ")[0] || "You",
      avatar: (currentUser.displayName?.[0] || "Y").toUpperCase(),
      content: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };
    const key = selectedChannel.id;
    setLocalMessages(prev => ({ ...prev, [key]: [...(prev[key] || []), newMsg] }));
    setMessage("");
  }

  const allMessages = selectedChannel ? [
    ...selectedChannel.messages,
    ...(localMessages[selectedChannel.id] || []),
  ] : [];

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 font-sans p-4 gap-4 overflow-hidden">

      {/* ── Left Sidebar (Spaces & Channels) ── */}
      <div className="w-80 flex flex-col gap-4 flex-shrink-0 h-full">
        
        {/* Spaces Switcher */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 flex flex-col gap-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Your Spaces</h2>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {joined.map(c => (
                    <button
                        key={c.id}
                        onClick={() => handleSelectCommunity(c)}
                        title={c.name}
                        className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-xl transition-all shadow-sm
                            ${selectedCommunity?.id === c.id && view === "chat" 
                                ? "bg-gradient-to-br border-2 border-orange-500 shadow-orange-200/50 scale-105 " + c.color
                                : "bg-white border border-slate-200 hover:border-orange-300 opacity-70 hover:opacity-100"}`}
                    >
                        <span className={selectedCommunity?.id === c.id && view === "chat" ? "text-white drop-shadow-md" : "grayscale"}>{c.icon}</span>
                    </button>
                ))}
                <button
                    onClick={() => setView("discover")}
                    className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border-2 border-dashed transition-all
                        ${view === "discover" ? "border-orange-500 bg-orange-50 text-orange-500" : "border-slate-300 text-slate-400 hover:border-orange-300 hover:text-orange-500"}`}
                >
                    <Compass className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Current Space Details / Discover Menu */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
            {view === "discover" ? (
                 <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Compass className="w-5 h-5" />
                        </div>
                        <h2 className="font-bold text-lg text-slate-900">Discover</h2>
                    </div>
                    <p className="text-sm text-slate-500 mb-4 px-1">Find new communities based on your interests.</p>
                    <div className="space-y-2 flex-1 overflow-y-auto pr-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-orange-50 text-orange-700 font-semibold border border-orange-100 transition-all">
                            <Search className="w-5 h-5" /> Explore All
                        </button>
                         <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 text-slate-700 font-medium transition-all">
                            <Plus className="w-5 h-5 text-slate-400" /> Create New Space
                        </button>
                    </div>
                 </div>
            ) : selectedCommunity ? (
                <>
                    <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-2xl drop-shadow-sm">{selectedCommunity.icon}</span>
                            <h2 className="font-bold text-lg text-slate-900 line-clamp-1">{selectedCommunity.name}</h2>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Users className="w-3 h-3" /> {selectedCommunity.members.toLocaleString()} members
                        </p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Discussions</h3>
                            <div className="space-y-1">
                                {selectedCommunity.channels.filter(ch => ch.type === "text").map(ch => (
                                    <button key={ch.id} onClick={() => setSelectedChannel(ch)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm transition-all group
                                            ${selectedChannel.id === ch.id ? "bg-orange-50 text-orange-700 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                                        <div className="flex items-center gap-2">
                                            <Hash className={`w-4 h-4 ${selectedChannel.id === ch.id ? "text-orange-500" : "text-slate-400 group-hover:text-slate-500"}`} />
                                            <span className="truncate">{ch.name}</span>
                                        </div>
                                        {selectedChannel.id !== ch.id && Math.random() > 0.5 && (
                                            <div className="w-2 h-2 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">Voice Lounges</h3>
                            <div className="space-y-1">
                                {selectedCommunity.channels.filter(ch => ch.type === "voice").map(ch => (
                                    <button key={ch.id} onClick={() => setSelectedChannel(ch)}
                                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl text-sm transition-all group
                                            ${selectedChannel.id === ch.id ? "bg-green-50 text-green-700 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                                        <Volume2 className={`w-4 h-4 ${selectedChannel.id === ch.id ? "text-green-500" : "text-slate-400 group-hover:text-slate-500"}`} />
                                        <span className="truncate">{ch.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
      </div>

      {/* ── Main Area (Chat / Discover) ── */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
        {view === "discover" ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Discover Header */}
                <div className="px-8 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white relative overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay" />
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-4xl font-extrabold mb-4">Find your tribe.</h1>
                        <p className="text-lg text-slate-300 mb-8">Join spaces filled with people who share your passion. Connect, learn, and grow together.</p>
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-400" />
                            <Input
                                value={searchQ}
                                onChange={e => setSearchQ(e.target.value)}
                                placeholder="Search for communities (e.g. Design, Startups...)"
                                className="pl-14 h-14 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-orange-400 rounded-full text-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Discover Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                    <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                        {INTERESTS.map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm border
                                ${filter === f ? "bg-orange-500 text-white border-orange-500 shadow-orange-200" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300 hover:text-orange-500"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {discover.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No communities found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {discover.map(c => (
                                <div key={c.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-3xl shadow-md transform group-hover:scale-110 transition-transform`}>
                                            <span className="drop-shadow-md text-white">{c.icon}</span>
                                        </div>
                                        <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-600 font-semibold">{c.category}</Badge>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{c.name}</h3>
                                    <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3">{c.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                                            <Users className="w-4 h-4" /> {c.members.toLocaleString()}
                                        </div>
                                        <Button onClick={() => handleJoin(c.id)} className="bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-full px-5 font-bold transition-colors">
                                            Join Space
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        ) : selectedCommunity && selectedChannel ? (
            <div className="flex-1 flex flex-col h-full bg-[#f8fafc]">
                {/* Chat Header */}
                <div className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-6 justify-between flex-shrink-0 z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm text-white bg-gradient-to-br ${selectedChannel.type === 'voice' ? 'from-green-400 to-emerald-500' : 'from-orange-400 to-amber-500'}`}>
                             {selectedChannel.type === "text" ? <Hash className="w-5 h-5 drop-shadow-sm" /> : <Volume2 className="w-5 h-5 drop-shadow-sm" />}
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 leading-tight">{selectedChannel.name}</h2>
                            <p className="text-xs text-slate-500 font-medium">
                                {selectedChannel.type === "voice" ? "Live Voice Lounge" : `General discussion for ${selectedCommunity.name}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-full">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setMembersOpen(p => !p)} className={`rounded-full transition-colors ${membersOpen ? "text-orange-500 bg-orange-50" : "text-slate-400 hover:text-orange-500 hover:bg-orange-50"}`}>
                            <Users className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {selectedChannel.type === "voice" ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-white to-slate-50">
                        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6 relative">
                            <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-30" />
                            <Volume2 className="w-16 h-16 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedChannel.name}</h2>
                        <p className="text-slate-500 max-w-md mb-8">Join the voice lounge to hang out and talk with other members of {selectedCommunity.name} in real-time.</p>
                        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full px-10 h-14 text-lg font-bold shadow-lg shadow-green-200 transition-transform hover:scale-105">
                            Join Voice Chat
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                            
                            {/* Empty State / Welcome */}
                            {allMessages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
                                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="w-10 h-10 text-orange-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">It's quiet here...</h3>
                                    <p className="text-slate-500">You're the first one here! Start the conversation and say hello to the {selectedCommunity.name} community.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-200">
                                    <div className="px-4 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                        Beginning of {selectedChannel.name}
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome to #{selectedChannel.name}!</h2>
                                    <p className="text-slate-500 text-sm">This is the start of the #{selectedChannel.name} channel.</p>
                                </div>
                            )}

                            {/* Chat Bubbles */}
                            {allMessages.map((msg, i) => {
                                const showAuthor = i === 0 || allMessages[i - 1].author !== msg.author;
                                return (
                                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} mb-1`}>
                                        <div className={`flex max-w-[75%] gap-3 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                            {/* Avatar (only show for first message in a group, or keep spacing) */}
                                            {showAuthor ? (
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-auto shadow-sm ${avatarColor(msg.avatar)}`}>
                                                    {msg.avatar}
                                                </div>
                                            ) : (
                                                <div className="w-10 flex-shrink-0" />
                                            )}

                                            <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                                                {showAuthor && (
                                                    <span className="text-xs font-semibold text-slate-500 mb-1 px-1">
                                                        {msg.author} <span className="font-normal text-slate-400 ml-1">{msg.time}</span>
                                                    </span>
                                                )}
                                                <div className={`px-5 py-3 rounded-2xl text-[15px] shadow-sm leading-relaxed
                                                    ${msg.isMe 
                                                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-br-sm' 
                                                        : 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm'}`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
                            <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-3xl p-2 shadow-inner focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-300 transition-all">
                                <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-orange-500 hover:bg-orange-100 rounded-full flex-shrink-0">
                                    <Paperclip className="w-5 h-5" />
                                </Button>
                                <textarea
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend(e);
                                        }
                                    }}
                                    placeholder={`Message #${selectedChannel.name}...`}
                                    className="flex-1 bg-transparent border-none text-slate-900 placeholder:text-slate-400 focus:ring-0 text-[15px] p-2.5 max-h-32 min-h-[44px] resize-none outline-none overflow-y-auto"
                                    rows={1}
                                />
                                <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-orange-500 hover:bg-orange-100 rounded-full flex-shrink-0">
                                    <Smile className="w-5 h-5" />
                                </Button>
                                <Button type="submit" disabled={!message.trim()}
                                    className="h-10 w-10 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex-shrink-0 shadow-sm disabled:opacity-50 transition-transform hover:scale-105 active:scale-95">
                                    <Send className="w-4 h-4 ml-0.5" />
                                </Button>
                            </form>
                            <p className="text-center text-xs text-slate-400 mt-2"><strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new line.</p>
                        </div>
                    </>
                )}
            </div>
        ) : null}

        {/* ── Members Overlay (Slide-over on Right) ── */}
        {selectedCommunity && view === "chat" && membersOpen && (
            <div className="absolute top-0 right-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl flex flex-col z-20 animate-in slide-in-from-right duration-300">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-bold text-slate-900">Members</h3>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">{selectedCommunity.members.toLocaleString()}</Badge>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Online — 4</h4>
                        <div className="space-y-1">
                            {["Alex", "Priya", "Sam", "Jordan"].map((name) => (
                                <div key={name} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <div className="relative">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${avatarColor(name[0])}`}>
                                            {name[0]}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                                    </div>
                                    <span className="font-medium text-slate-700 group-hover:text-slate-900">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Offline</h4>
                        <div className="space-y-1 opacity-60 hover:opacity-100 transition-opacity">
                            {["Taylor", "Casey", "Morgan", "Riley", "Drew", "Jamie"].map((name) => (
                                <div key={name} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group">
                                    <div className="relative">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${avatarColor(name[0])}`}>
                                            {name[0]}
                                        </div>
                                         <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-300 border-2 border-white rounded-full" />
                                    </div>
                                    <span className="font-medium text-slate-600 group-hover:text-slate-900">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>

    </div>
  );
}
