// ─── Field wrapper ────────────────────────────────────────────────────────────

export default function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[12px] font-medium text-neutral-600 tracking-wide">
        {label}
        {required && <span className="ml-0.5 text-neutral-400">*</span>}
      </label>
      {children}
    </div>
  );
}