import type { ValidationError } from "@/lib/siteDataSchema";
import { AlertTriangle } from "lucide-react";

interface Props {
  errors: ValidationError[];
}

const SiteDataErrorOverlay = ({ errors }: Props) => {
  return (
    <div className="min-h-screen bg-[hsl(20,15%,6%)] text-[hsl(40,20%,92%)] flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-[hsl(36,95%,50%)] shrink-0" size={32} />
          <h1 className="text-2xl font-bold">Site Data Has Errors</h1>
        </div>

        <p className="text-[hsl(30,10%,55%)] mb-6 leading-relaxed">
          Your <code className="bg-[hsl(20,12%,14%)] px-1.5 py-0.5 rounded text-sm font-mono">siteData.json</code> file
          has some problems that need fixing. Here's what went wrong:
        </p>

        <div className="rounded-xl border border-[hsl(20,10%,18%)] bg-[hsl(20,12%,10%)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[hsl(20,10%,18%)] bg-[hsl(20,12%,8%)]">
            <span className="text-sm font-semibold uppercase tracking-wider text-[hsl(36,95%,50%)]">
              {errors.length} {errors.length === 1 ? "Issue" : "Issues"} Found
            </span>
          </div>
          <ul className="divide-y divide-[hsl(20,10%,18%)]">
            {errors.map((err, i) => (
              <li key={i} className="px-4 py-3">
                <p className="text-sm font-mono text-[hsl(36,95%,50%)] mb-1">{err.path}</p>
                <p className="text-sm text-[hsl(40,20%,92%)]">{err.message}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[hsl(20,12%,14%)] border border-[hsl(20,10%,18%)]">
          <p className="text-sm text-[hsl(30,10%,55%)] leading-relaxed">
            <strong className="text-[hsl(40,20%,92%)]">How to fix:</strong> Open{" "}
            <code className="bg-[hsl(20,12%,10%)] px-1.5 py-0.5 rounded font-mono text-xs">src/data/siteData.json</code>{" "}
            and check the fields listed above. Refer to{" "}
            <code className="bg-[hsl(20,12%,10%)] px-1.5 py-0.5 rounded font-mono text-xs">src/data/EDITING_GUIDE.md</code>{" "}
            for help on what each field expects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiteDataErrorOverlay;
