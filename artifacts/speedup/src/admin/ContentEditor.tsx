import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUp, ArrowDown, Trash2, Plus, ImageIcon, Loader2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  REGISTRY,
  REGISTRY_BY_KEY,
  registryGroups,
  type AnyField,
  type Field,
  type ListField,
  type SectionDef,
} from "@/content/registry";
import { adminApi } from "./client";
import { MediaPickerDialog } from "./MediaPickerDialog";

type Data = Record<string, any>;

/* ─────────────────────────── Scalar field input ─────────────────────────── */
function ScalarInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
}) {
  const [picking, setPicking] = useState(false);
  const base =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#FF5500] transition-colors";

  if (field.type === "textarea") {
    return (
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={base + " resize-y font-mono text-[13px]"}
      />
    );
  }

  if (field.type === "number") {
    return (
      <input
        type="number"
        value={value ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className={base}
      />
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-10 rounded border border-slate-200 cursor-pointer bg-white"
        />
        <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} />
      </div>
    );
  }

  if (field.type === "image") {
    return (
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
        ) : (
          <div className="w-12 h-12 rounded-lg border border-dashed border-slate-300 flex items-center justify-center shrink-0">
            <ImageIcon className="w-4 h-4 text-slate-300" />
          </div>
        )}
        <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="/path or URL" className={base} />
        <button
          type="button"
          onClick={() => setPicking(true)}
          className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-slate-600 hover:border-[#FF5500] hover:text-[#FF5500]"
        >
          Library
        </button>
        {picking && (
          <MediaPickerDialog
            onClose={() => setPicking(false)}
            onSelect={(asset) => {
              onChange(asset.url);
              setPicking(false);
            }}
          />
        )}
      </div>
    );
  }

  // text / url
  return <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} />;
}

/* ─────────────────────────── List field editor ─────────────────────────── */
function ListEditor({
  field,
  value,
  onChange,
}: {
  field: ListField;
  value: any[];
  onChange: (v: any[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];

  const update = (idx: number, next: Data) => {
    const copy = items.slice();
    copy[idx] = next;
    onChange(copy);
  };
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[idx], copy[j]] = [copy[j], copy[idx]];
    onChange(copy);
  };
  const add = () => {
    const blank: Data = {};
    for (const f of field.fields) blank[f.key] = f.type === "number" ? 0 : "";
    onChange([...items, blank]);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black uppercase tracking-[0.12em] text-slate-400">
              {field.itemNoun} {idx + 1}
              {field.titleKey && item[field.titleKey] ? ` · ${String(item[field.titleKey]).slice(0, 40)}` : ""}
            </span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1.5 rounded text-slate-400 hover:bg-slate-200 disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1.5 rounded text-slate-400 hover:bg-slate-200 disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
              <button type="button" onClick={() => remove(idx)} className="p-1.5 rounded text-red-400 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {field.fields.map((sub) => (
              <div key={sub.key} className={sub.type === "textarea" || sub.type === "image" ? "sm:col-span-2" : ""}>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">{sub.label}</label>
                <ScalarInput field={sub} value={item[sub.key]} onChange={(v) => update(idx, { ...item, [sub.key]: v })} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-slate-500 hover:border-[#FF5500] hover:text-[#FF5500] w-full justify-center"
      >
        <Plus className="w-3.5 h-3.5" /> Add {field.itemNoun}
      </button>
    </div>
  );
}

/* ─────────────────────────────── Section form ─────────────────────────────── */
function SectionForm({ section, initial }: { section: SectionDef; initial: Data }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [data, setData] = useState<Data>(initial);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(false);

  // Reset working copy when switching sections / when server data arrives.
  useEffect(() => {
    setData(initial);
    setSavedAt(false);
  }, [section.key, initial]);

  const setField = (key: string, v: any) => {
    setData((d) => ({ ...d, [key]: v }));
    setSavedAt(false);
  };

  async function save() {
    setSaving(true);
    try {
      await adminApi.saveContent(section.key, data);
      await qc.invalidateQueries({ queryKey: ["admin-content"] });
      await qc.invalidateQueries({ queryKey: ["site-content"] });
      setSavedAt(true);
      toast({ title: "Saved", description: `${section.title} updated.` });
    } catch (err) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  const isList = (f: AnyField): f is ListField => f.type === "list";

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#0A0F1E]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {section.title}
          </h1>
          {section.description && <p className="text-sm text-[#6B7280] mt-1">{section.description}</p>}
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="shrink-0 flex items-center gap-2 rounded-full bg-[#FF5500] text-white text-xs font-bold uppercase tracking-[0.12em] px-6 py-3 hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : savedAt ? <Check className="w-4 h-4" /> : null}
          {saving ? "Saving" : savedAt ? "Saved" : "Save changes"}
        </button>
      </div>

      <div className="space-y-6">
        {section.fields.map((field) => (
          <div key={field.key} className="rounded-2xl bg-white border border-slate-100 p-5">
            <label className="block text-sm font-bold text-[#0A0F1E] mb-1">{field.label}</label>
            {field.help && <p className="text-xs text-slate-400 mb-2">{field.help}</p>}
            <div className="mt-2">
              {isList(field) ? (
                <ListEditor field={field} value={data[field.key]} onChange={(v) => setField(field.key, v)} />
              ) : (
                <ScalarInput field={field} value={data[field.key]} onChange={(v) => setField(field.key, v)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── Page shell ───────────────────────────── */
export default function ContentEditor({ sectionKey }: { sectionKey?: string }) {
  const [, navigate] = useLocation();
  const groups = useMemo(() => registryGroups(), []);
  const activeKey = sectionKey && REGISTRY_BY_KEY[sectionKey] ? sectionKey : REGISTRY[0].key;
  const section = REGISTRY_BY_KEY[activeKey];

  // Load current overrides so forms show live values.
  const { data: content, isLoading } = useQuery({
    queryKey: ["admin-content"],
    queryFn: adminApi.getContent,
  });

  useEffect(() => {
    if (!sectionKey || !REGISTRY_BY_KEY[sectionKey]) {
      navigate(`/content/${REGISTRY[0].key}`, { replace: true });
    }
  }, [sectionKey, navigate]);

  const initial: Data = { ...section.default, ...(content?.[activeKey] ?? {}) };

  return (
    <div className="flex min-h-dvh">
      {/* Section list */}
      <div className="w-56 shrink-0 border-r border-slate-200 bg-white py-5 px-3 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.group} className="mb-5">
            <div className="px-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-2">{g.group}</div>
            {g.sections.map((s) => (
              <Link
                key={s.key}
                href={`/content/${s.key}`}
                className="block px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{
                  background: s.key === activeKey ? "#FFF1E9" : "transparent",
                  color: s.key === activeKey ? "#FF5500" : "#4B5675",
                }}
              >
                {s.title}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="flex-1 min-w-0 p-8 max-w-3xl">
        {isLoading ? (
          <div className="text-sm text-slate-400">Loading content…</div>
        ) : (
          <SectionForm key={activeKey} section={section} initial={initial} />
        )}
      </div>
    </div>
  );
}
