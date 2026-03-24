import client from "../../../tina/__generated__/client";

export async function Footer() {
  const res = await client.queries.global({ relativePath: "index.json" });
  const footer = res.data.global.footer;

  if (!footer) return null;

  return (
    <footer className="w-full py-8 border-t border-(--color-bluepetro-500) bg-page">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-fg-body font-utils text-sm">
        <div className="flex items-center gap-2">
          <span>{footer.since}</span>
          <span>-</span>
          <span>{footer.current_year}</span>
        </div>
        <div>
          <p>{footer.availability}</p>
        </div>
      </div>
    </footer>
  );
}
