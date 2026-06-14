import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateProps {
    recipientName: string;
    eventName: string;
    date: Date;
    certificateId: string;
    issuer: string;
    template?: "classic" | "modern" | "achievement";
}

export default function CertificateGenerator({
    recipientName,
    eventName,
    date,
    certificateId,
    issuer,
    // @ts-ignore template is currently unused
    template = "classic",
}: CertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);

    // The base URL where the app is hosted
    const verifyUrl = `${window.location.origin}/verify/${certificateId}`;

    const handleDownloadPNG = async () => {
        if (!certificateRef.current) return;
        setIsGenerating(true);

        try {
            // Small delay to ensure styles and fonts are fully mapped, though usually safe
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3, // High-res
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const link = document.createElement("a");
            link.download = `Certificate_${certificateId}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();

            toast({
                title: "Success",
                description: "Certificate downloaded as PNG! 🎉",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate PNG image.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = async () => {
        if (!certificateRef.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            // Create a landscape A4 PDF instance
            const pdf = new jsPDF("landscape", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Center vertically if it's somehow not matching exactly
            const yOffset = (pdf.internal.pageSize.getHeight() - pdfHeight) / 2;

            pdf.addImage(imgData, "JPEG", 0, yOffset, pdfWidth, pdfHeight);
            pdf.save(`Certificate_${certificateId}.pdf`);

            toast({
                title: "Success",
                description: "Certificate downloaded as PDF! 🎉",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate PDF document.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-5xl mx-auto my-8">

            {/* Visual Preview container (scaled down for small screens) */}
            <div className="relative w-full overflow-hidden flex justify-center bg-surface/30 p-4 md:p-8 rounded-2xl border border-white/10 shadow-xl group">

                {/* Shimmer Effect overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />

                {/* Certificate Container meant exactly for A4 proportion (roughly 1.414 ratio) */}
                <div
                    className="w-[800px] h-[565px] flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-50 transition-transform origin-top lg:scale-100 md:scale-75 scale-50 -my-[15%] md:-my-0"
                >
                    {/* Real DOM to capture */}
                    <div
                        ref={certificateRef}
                        className="w-full h-full relative p-10 bg-white text-slate-900 border-[16px] border-double border-amber-600 box-border overflow-hidden"
                    >
                        {/* Corner decors */}
                        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500 opacity-60"></div>
                        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500 opacity-60"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-500 opacity-60"></div>
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500 opacity-60"></div>

                        {/* Inner Content */}
                        <div className="h-full flex flex-col items-center justify-center border border-amber-200 p-8 text-center relative z-0 relative">

                            {/* Logo equivalent */}
                            <div className="h-16 w-16 mb-4 rounded-full bg-gradient-to-tr from-indigo-800 to-purple-600 flex items-center justify-center">
                                <span className="text-3xl font-bold text-white tracking-widest font-serif leading-none">N</span>
                            </div>

                            <h1 className="text-4xl uppercase tracking-[0.2em] text-indigo-950 font-serif mb-2 font-bold">
                                Certificate of Attendance
                            </h1>

                            <p className="text-sm text-slate-500 uppercase tracking-widest mb-8">
                                NEXORA Platform
                            </p>

                            <p className="text-lg text-slate-600 italic mb-4 font-serif">
                                This is to proudly certify that
                            </p>

                            <div className="w-full max-w-lg mb-6 border-b border-indigo-200 pb-2">
                                <h2 className="text-5xl font-bold text-indigo-900 font-serif">{recipientName}</h2>
                            </div>

                            <p className="text-lg text-slate-600 italic mb-4 font-serif">
                                has successfully completed / attended the event
                            </p>

                            <h3 className="text-2xl font-bold text-slate-800 mb-8 max-w-2xl font-sans">
                                {eventName}
                            </h3>

                            {/* Footer info block */}
                            <div className="flex justify-between items-end w-full px-12 mt-auto">
                                {/* Date & Signature Left */}
                                <div className="text-center w-48 border-t border-slate-300 pt-2">
                                    <p className="text-sm font-semibold text-slate-800">{format(date, "MMMM do, yyyy")}</p>
                                    <p className="text-xs text-slate-500 mt-1 uppercase">Date</p>
                                </div>

                                {/* QR Code Center/Right */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-2 border border-amber-200 rounded-sm bg-white">
                                        <QRCodeSVG value={verifyUrl} size={64} level="L" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-mono tracking-tighter">ID: {certificateId}</p>
                                </div>

                                {/* Host Signature Right */}
                                <div className="text-center w-48 border-t border-slate-300 pt-2">
                                    <p className="text-sm font-semibold text-slate-800 font-serif italic">{issuer}</p>
                                    <p className="text-xs text-slate-500 mt-1 uppercase">Authorized Issuer</p>
                                </div>
                            </div>
                        </div>

                        {/* Watermark/Seal */}
                        <div className="absolute right-[80px] bottom-[140px] opacity-10 flex items-center justify-center w-40 h-40">
                            <div className="w-full h-full rounded-full border-[8px] border-amber-700 border-dashed absolute animate-[spin_60s_linear_infinite]" />
                            <div className="text-amber-700 font-bold text-lg rotate-[-15deg]">VERIFIED</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex gap-4">
                <Button
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[200px]"
                >
                    <Download className="mr-2 h-5 w-5" />
                    Download as PDF
                </Button>
                <Button
                    onClick={handleDownloadPNG}
                    disabled={isGenerating}
                    size="lg"
                    variant="outline"
                    className="min-w-[200px]"
                >
                    <Download className="mr-2 h-5 w-5" />
                    Download as PNG
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                        navigator.clipboard.writeText(verifyUrl);
                        toast({ title: "Link copied!", description: "Verification link copied to clipboard." });
                    }}
                >
                    <Share2 className="mr-2 h-5 w-5" />
                    Copy Link
                </Button>
            </div>
        </div>
    );
}
