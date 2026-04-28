import { useState, useRef, useCallback } from "react";
import { scanService } from "@/services/scanService"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/* ---------------- Sub Components ---------------- */

function HealthBadge({ score, label, color }) {
    const ringColor = {
        green: "stroke-green-600",
        yellow: "stroke-yellow-500",
        red: "stroke-red-600",
    }[color] || "stroke-gray-400";

    const textColor = {
        green: "text-green-700",
        yellow: "text-yellow-700",
        red: "text-red-700",
    }[color] || "text-gray-700";

    const bgColor = {
        green: "bg-green-50",
        yellow: "bg-yellow-50",
        red: "bg-red-50",
    }[color] || "bg-gray-50";

    const circumference = 2 * Math.PI * 36;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className={`flex items-center gap-5 p-5 rounded-2xl border ${bgColor}`}>
            <div className="relative w-20 h-20">
                <svg
                    viewBox="0 0 88 88"
                    className="rotate-[-90deg] w-full h-full"
                >
                    <circle
                        cx="44"
                        cy="44"
                        r="36"
                        stroke="#e5e7eb"
                        strokeWidth="6"
                        fill="none"
                    />
                    <circle
                        cx="44"
                        cy="44"
                        r="36"
                        className={ringColor}
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-xl font-bold ${textColor}`}>
                        {score}
                    </span>
                    <span className="text-[10px] text-gray-500">/100</span>
                </div>
            </div>

            <div>
                <div className="text-xs uppercase text-gray-500 mb-1">
                    Health Score
                </div>
                <div className={`text-xl font-bold ${textColor}`}>
                    {label}
                </div>
            </div>
        </div>
    );
}

function ReasonPill({ text }) {
    return (
        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
            {text}
        </span>
    );
}

function NutritionRow({ label, value, unit, highlight }) {
    const highlightMap = {
        high: "bg-red-50",
        low: "bg-green-50",
        normal: "",
    };

    return (
        <div
            className={`flex justify-between px-3 py-2 rounded-lg ${highlightMap[highlight]}`}
        >
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-semibold text-gray-900">
                {value != null
                    ? `${typeof value === "number" ? value.toFixed(1) : value}${unit}`
                    : "—"}
            </span>
        </div>
    );
}

/* ---------------- Main Component ---------------- */

export default function ImageUpload() {
    const [dragOver, setDragOver] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("idle");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const inputRef = useRef();

    const loadFile = (f) => {
        if (!f || !f.type.startsWith("image/")) return;
        setFile(f);
        setResult(null);
        setError(null);
        setStatus("idle");

        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(f);
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        loadFile(e.dataTransfer.files[0]);
    }, []);

    const analyse = async () => {
        if (!file) return;

        setStatus("uploading");
        setProgress(0);

        const ticker = setInterval(() => {
            setProgress((p) => Math.min(p + Math.random() * 10, 90));
        }, 400);

        try {
            const form = new FormData();
            form.append("file", file);

            const res = await fetch(`${API_URL}/api/image-scan/`, {
                method: "POST",
                body: form,
            });

            clearInterval(ticker);

            if (!res.ok) throw new Error("Upload failed");

            const data = await scanService.uploadLabel(file);
            setProgress(100);
            setResult(data);
            setStatus("done");
        } catch (err) {
            clearInterval(ticker);
            setError(err.message);
            setStatus("error");
        }
    };

    const reset = () => {
        setPreview(null);
        setFile(null);
        setResult(null);
        setStatus("idle");
        setError(null);
        setProgress(0);
    };

    const p = result?.product;
    const hs = result?.health_score;
    const n = p?.nutrition;

    return (
        <div className="max-w-xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Label Scanner</h1>
                <p className="text-sm text-gray-500">
                    Upload a food label photo — AI analyzes it
                </p>
            </div>

            {/* Dropzone */}
            {!preview && (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDrop={onDrop}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition
            ${dragOver
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                >
                    <p className="font-medium">
                        {dragOver ? "Drop it!" : "Drop your food label here"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        or click to browse
                    </p>

                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => loadFile(e.target.files[0])}
                    />
                </div>
            )}

            {/* Preview */}
            {preview && status !== "done" && (
                <div className="mt-4">
                    <div className="relative rounded-xl overflow-hidden border">
                        <img src={preview} className="w-full max-h-80 object-contain" />

                        {status === "uploading" && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                                <div className="text-white text-sm">
                                    Analysing...
                                </div>

                                <div className="w-52 h-1 bg-white/30">
                                    <div
                                        className="bg-green-400 h-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-3">
                        <button onClick={analyse} className="btn-primary flex-1">
                            Analyse
                        </button>
                        <button onClick={reset} className="btn-ghost">
                            Remove
                        </button>
                    </div>
                </div>
            )}

            {/* Results */}
            {status === "done" && result && (
                <div className="mt-6 space-y-4">

                    {hs && <HealthBadge {...hs} />}

                    {hs?.reasons?.length > 0 && (
                        <div className="card">
                            <div className="text-xs uppercase text-gray-500 mb-2">
                                Why this score
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {hs.reasons.map((r, i) => (
                                    <ReasonPill key={i} text={r} />
                                ))}
                            </div>
                        </div>
                    )}

                    <button onClick={reset} className="btn-ghost w-full">
                        Scan another label
                    </button>
                </div>
            )}
        </div>
    );
}
