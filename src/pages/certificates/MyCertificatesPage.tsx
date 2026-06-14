import { useState } from "react";
import CertificateGenerator from "@/components/certificates/CertificateGenerator";
import { Badge } from "@/components/ui/badge";

export default function MyCertificatesPage() {
    const [selectedCert, setSelectedCert] = useState<any>(null);

    const certificates = [
        {
            id: "cert-abc-1234-xyz",
            recipientName: "Alex Mercer",
            eventName: "NASA Regional Hackathon 2026",
            date: new Date("2026-03-12T10:00:00Z"),
            issuer: "Dr. Elena Vance"
        },
        {
            id: "cert-def-5678-xyz",
            recipientName: "Alex Mercer",
            eventName: "Web Development Summit",
            date: new Date("2026-01-20T10:00:00Z"),
            issuer: "CodeAcademy"
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 bg-slate-50 min-h-[80vh]">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">My Certificates</h1>
                    <p className="text-slate-500 mt-2 font-medium">View, download, and verify your earned credentials.</p>
                </div>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 mt-4 md:mt-0 px-5 py-2 text-sm shadow-sm border border-orange-200 font-bold">
                    2 Earned Certificates
                </Badge>
            </div>

            {!selectedCert ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map(cert => (
                        <div
                            key={cert.id}
                            className="bg-white border border-slate-200 rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                            onClick={() => setSelectedCert(cert)}
                        >
                            <div className="h-40 bg-gradient-to-br from-orange-400 via-amber-400 to-amber-500 p-6 relative">
                                <div className="absolute inset-0 bg-white/10" />
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <Badge variant="outline" className="w-fit text-xs border-white/40 text-white font-semibold shadow-sm bg-black/10 backdrop-blur-md">
                                        ID: {cert.id.split('-')[1]}
                                    </Badge>
                                    <div className="h-10 w-10 bg-white text-orange-500 rounded-full flex items-center justify-center font-bold font-serif mb-2 shadow-md">
                                        N
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2 truncate text-slate-900 group-hover:text-orange-600 transition-colors">{cert.eventName}</h3>
                                <p className="text-sm font-medium text-slate-500 mb-6">{cert.date.toLocaleDateString()}</p>
                                <div className="text-orange-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Open & Download &rarr;
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <button
                        onClick={() => setSelectedCert(null)}
                        className="text-slate-500 font-semibold hover:text-orange-600 mb-6 flex items-center gap-2 transition-colors"
                    >
                        &larr; Back to all certificates
                    </button>

                    <div className="bg-white border border-slate-200 p-6 md:p-12 rounded-3xl shadow-lg">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black mb-2 text-slate-900">{selectedCert.eventName}</h2>
                            <p className="text-slate-500 font-medium">Issued on {selectedCert.date.toLocaleDateString()}</p>
                        </div>

                        {/* Certificate Generator Instance */}
                        <CertificateGenerator
                            recipientName={selectedCert.recipientName}
                            eventName={selectedCert.eventName}
                            date={selectedCert.date}
                            certificateId={selectedCert.id}
                            issuer={selectedCert.issuer}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
