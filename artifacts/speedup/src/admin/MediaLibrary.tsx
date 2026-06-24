import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Trash2, Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminApi, type MediaAsset } from "./client";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaLibrary() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const { data: media = [], isLoading } = useQuery({ queryKey: ["media"], queryFn: adminApi.listMedia });

  const upload = useMutation({
    mutationFn: (file: File) => adminApi.uploadMedia(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["media"] });
      toast({ title: "Uploaded" });
    },
    onError: (e) => toast({ title: "Upload failed", description: String(e), variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: (id: number) => adminApi.deleteMedia(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["media"] });
      toast({ title: "Deleted" });
    },
  });

  const copyUrl = (m: MediaAsset) => {
    navigator.clipboard.writeText(m.url);
    toast({ title: "URL copied", description: m.url });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#0A0F1E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Media library
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Upload images and video to use anywhere on the site.</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={upload.isPending}
          className="flex items-center gap-2 rounded-full bg-[#FF5500] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 hover:opacity-90 disabled:opacity-60"
        >
          {upload.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload file
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload.mutate(f);
            e.target.value = "";
          }}
        />
      </div>

      {isLoading ? (
        <div className="text-sm text-slate-400">Loading…</div>
      ) : media.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center text-slate-400">
          No media yet. Upload your first file.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((m) => (
            <div key={m.id} className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
              <div className="aspect-video bg-slate-50 flex items-center justify-center overflow-hidden">
                {m.mimeType.startsWith("image/") ? (
                  <img src={m.url} alt={m.originalName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-slate-400">{m.mimeType}</span>
                )}
              </div>
              <div className="p-3">
                <div className="text-xs font-semibold text-[#0A0F1E] truncate">{m.originalName}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{formatSize(m.sizeBytes)}</div>
                <div className="flex items-center gap-1 mt-3">
                  <button onClick={() => copyUrl(m)} className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600 hover:border-[#FF5500] hover:text-[#FF5500]">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                  <button onClick={() => del.mutate(m.id)} className="rounded-lg border border-slate-200 p-1.5 text-red-400 hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
