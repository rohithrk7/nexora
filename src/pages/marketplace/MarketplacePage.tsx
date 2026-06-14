import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Star } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialProducts = [
    {
        id: "prod-1",
        title: "Professional DJ Equipment Set",
        price: "$850",
        condition: "Like New",
        seller: "Michael C.",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "prod-2",
        title: "Event Photography Services (4 Hours)",
        price: "$400",
        condition: "Service",
        seller: "Sarah J.",
        category: "Services",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "prod-3",
        title: "Vintage Decorative Lights (100ft)",
        price: "$45",
        condition: "Good",
        seller: "Alex Mercer",
        category: "Decor",
        image: "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?q=80&w=600&auto=format&fit=crop"
    },
    {
        id: "prod-4",
        title: "Catering Warmers Setup",
        price: "$120",
        condition: "Used",
        seller: "Culinary Co.",
        category: "Equipment",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop"
    }
];

export default function MarketplacePage() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [products, setProducts] = useState(initialProducts);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);

    const checkAuth = () => {
        if (!currentUser) {
            toast({
                title: "Authentication Required",
                description: "You must be logged in to perform this action.",
                variant: "destructive"
            });
            navigate("/login");
            return false;
        }
        return true;
    };

    // Form state
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Electronics");
    const [condition, setCondition] = useState("New");

    const handleSellProduct = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct = {
            id: `prod-${Date.now()}`,
            title,
            price: `$${price}`,
            condition,
            seller: "You",
            category,
            image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop" // Temporary placeholder image for new items
        };

        setProducts([newProduct, ...products]);
        setIsSellModalOpen(false);

        // Reset form
        setTitle("");
        setPrice("");

        toast({
            title: "Item Listed Successfully! 🎉",
            description: "Your product is now visible on the NEXORA Marketplace.",
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-slate-50 min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Community Marketplace</h1>
                    <p className="text-slate-500 mt-1">Buy, sell, or rent items exclusively within your trusted network.</p>
                </div>

                <Dialog open={isSellModalOpen} onOpenChange={(open) => {
                    if (open && !checkAuth()) return;
                    setIsSellModalOpen(open);
                }}>
                    <DialogTrigger asChild>
                        <Button onClick={(e) => {
                            if (!checkAuth()) e.preventDefault();
                        }} size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md rounded-full px-6">
                            <PlusCircle className="mr-2 h-5 w-5" /> Sell an Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-slate-900">List an Item</DialogTitle>
                            <DialogDescription>
                                Add a product or service to sell to the community.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSellProduct} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-700 font-semibold">Title</Label>
                                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Vintage Camera Lens" className="border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-slate-700 font-semibold">Price ($)</Label>
                                <Input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0" placeholder="0.00" className="border-slate-200" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-slate-700 font-semibold">Category</Label>
                                    <select
                                        id="category"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                                    >
                                        <option value="Electronics">Electronics</option>
                                        <option value="Decor">Decor</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Services">Services</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="condition" className="text-slate-700 font-semibold">Condition</Label>
                                    <select
                                        id="condition"
                                        value={condition}
                                        onChange={e => setCondition(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                                    >
                                        <option value="New">New</option>
                                        <option value="Like New">Like New</option>
                                        <option value="Good">Good</option>
                                        <option value="Used">Used</option>
                                        <option value="Service">Service</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-slate-700 font-semibold">Description</Label>
                                <Textarea id="description" placeholder="Describe your item..." className="resize-none border-slate-200" />
                            </div>
                            <DialogFooter className="mt-6">
                                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full">List Item</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Top Categories / Nav */}
            <div className="flex overflow-x-auto gap-3 pb-4 mb-6 scrollbar-hide">
                {['All Items', 'Electronics', 'Decor', 'Event Equipment', 'Services', 'Photography'].map((cat, i) => (
                    <Badge key={cat} variant={i === 0 ? "default" : "outline"} className={`whitespace-nowrap px-4 py-2 text-sm cursor-pointer ${i === 0 ? 'bg-slate-800 text-white hover:bg-slate-900 border-transparent' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        {cat}
                    </Badge>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 md:p-6 border border-slate-200 rounded-[2rem] shadow-sm mb-12">
                <div className="w-full relative">
                    <Search className="absolute left-5 top-3.5 h-6 w-6 text-slate-400" />
                    <Input placeholder="Search marketplace..." className="pl-14 h-14 bg-slate-50 border-transparent focus-visible:ring-orange-500 text-slate-900 rounded-full text-lg w-full" />
                </div>
                <div className="w-full md:w-auto flex flex-shrink-0 items-center gap-4">
                    <Button variant="outline" size="lg" className="h-14 border-slate-200 text-slate-700 hover:bg-slate-50 w-full md:w-auto rounded-full px-8">
                        <Filter className="mr-2 h-5 w-5" /> Filters
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer">
                        {/* Image */}
                        <div className="h-48 bg-slate-100 relative overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 left-3 flex gap-2">
                                <Badge className="bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 shadow-sm font-semibold">
                                    {product.category}
                                </Badge>
                                <Badge className="bg-slate-900/80 backdrop-blur-md border border-transparent text-white font-semibold">
                                    {product.condition}
                                </Badge>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-tight mb-2 group-hover:text-orange-600 transition-colors">
                                {product.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-6 w-6 bg-slate-200 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                                    {product.seller.charAt(0)}
                                </div>
                                <span className="text-sm text-slate-500 font-medium">{product.seller}</span>
                                <div className="ml-auto flex items-center text-amber-500 text-xs font-bold">
                                    <Star className="w-3 h-3 fill-current mr-1" /> 4.9
                                </div>
                            </div>
                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                                <div className="text-2xl font-black text-slate-900">
                                    {product.price}
                                </div>
                                <Button onClick={() => {
                                    if (checkAuth()) {
                                        toast({ title: "Purchase Initiated", description: "Taking you to checkout..." });
                                    }
                                }} size="sm" className="bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-full font-bold px-4">
                                    Buy
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Promo banner */}
            <div className="mt-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Got gear you don't need?</h2>
                    <p className="text-lg text-orange-50 font-medium">Turn your unused event equipment, decorations, and electronics into cash within our trusted community network. It takes less than two minutes to list.</p>
                </div>
                <Button size="lg" onClick={() => {
                    if (checkAuth()) setIsSellModalOpen(true);
                }} className="bg-white text-orange-600 hover:bg-slate-50 shadow-lg rounded-full h-16 px-10 text-xl font-bold flex-shrink-0 hover:scale-105 transition-transform">
                    Start Selling Now
                </Button>
            </div>
        </div>
    );
}
