import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyCertificatePage() {
    const { id } = useParams();

    // Mock checking DB
    const isValid = true;

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-slate-50">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
                {/* Glow effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 ${isValid ? 'bg-green-300' : 'bg-red-300'}`}></div>

                <div className="text-center relative z-10">
                    {isValid ? (
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-100 blur-xl rounded-full"></div>
                                <CheckCircle2 className="w-20 h-20 text-green-500 relative z-10" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-100 blur-xl rounded-full"></div>
                                <XCircle className="w-20 h-20 text-red-500 relative z-10" />
                            </div>
                        </div>
                    )}

                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                        {isValid ? "Certificate Verified" : "Invalid Certificate"}
                    </h2>

                    {isValid ? (
                        <>
                            <p className="text-slate-500 mb-6">
                                This credential is authentic and was issued by <strong className="text-slate-900">NEXORA Platform</strong>.
                            </p>

                            <div className="bg-slate-50 rounded-2xl p-5 text-left border border-slate-200 space-y-4 mb-8">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Recipient Name</p>
                                    <p className="font-bold text-slate-900 text-lg">Alex Mercer</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Event Completed</p>
                                    <p className="font-semibold text-slate-800">NASA Regional Hackathon 2026</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Date Issued</p>
                                        <p className="font-semibold text-slate-800">Mar 12, 2026</p>
                                    </div>
                                    <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Valid</Badge>
                                </div>
                                <div className="border-t border-slate-200 pt-3 mt-3">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Certificate ID</p>
                                    <p className="font-mono text-xs text-slate-400">{id}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-slate-500 mb-8">
                            We couldn't find a record of this certificate in our system. It may have been deleted or never existed.
                        </p>
                    )}

                    <Link to="/">
                        <Button variant="outline" className="w-full h-12 rounded-xl text-slate-700 font-bold border-slate-200 shadow-sm hover:bg-slate-50">
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
