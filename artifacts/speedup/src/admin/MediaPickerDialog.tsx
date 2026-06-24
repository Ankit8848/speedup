import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Upload, Loader2 } from "lucide-react";
import { adminApi, type MediaAsset } from "./client";

function isImage(m: MediaAsset) {
  return m.mimeType.startsWith("image/");
}

export function MediaPickerDialog({
  onSelect,
  onClose,
}: {
  onSelect: (asset: MediaAsset) => void;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const { data: media = [], isLoading } = useQuery({
    queryKey: ["media"],
    queryFn: adminApi.listMedia,
  });

  const upload = useMutation({
    mutationFn: (file: File) => adminApi.uploadMedia(file),
    onSuccess: (asset) => {
      qc.invalidateQueries({ queryKey: ["media"] });
      onSelect(asset);
    },
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6" style={{ background: "rgba(10,15,30,0.55)" }}>
      <div className="w-full max-w-3xl max-h-[80vh] flex flex-col rounded-2xl bg-white overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-black uppercase text-sm tracking-tight text-[#0A0F1E]">Media library</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileRef.current?.click()}
              disabled={upload.isPending}
              className="flex items-center gap-2 rounded-full bg-[#FF5500] text-white text-xs font-bold uppercase tracking-[0.1em] px-4 py-2 hover:opacity-90 disabled:opacity-60"
            >
              {upload.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              Upload
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
          </div>
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

        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="text-sm text-slate-400 py-10 text-center">Loading…</div>
          ) : media.length === 0 ? (
            <div className="text-sm text-slate-400 py-10 text-center">No media yet. Upload your first file.</div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {media.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSelect(m)}
                  className="group rounded-xl border border-slate-200 overflow-hidden text-left hover:border-[#FF5500] transition-colors"
                >
                  <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden">
                    {isImage(m) ? (
                      <img src={m.url} alt={m.originalName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-slate-400 px-2 text-center">{m.mimeType}</span>
                    )}
                  </div>
                  <div className="px-2 py-1.5 text-[10px] text-slate-500 truncate">{m.originalName}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
