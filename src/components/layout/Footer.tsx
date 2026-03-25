import client from "../../../tina/__generated__/client";

export async function Footer() {
  const res = await client.queries.global({ relativePath: "index.json" });
  const footer = res.data.global.footer;

  if (!footer) return null;

  return (
    <footer className="w-full py-8 border-t border-(--color-bluepetro-500) bg-page">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-4 text-fg-body font-utils text-sm">
        
          <p className="text-center md:text-left">{footer.since}</p>
          <p className="text-center">{footer.current_year}</p>
          <p className="text-center md:text-right">{footer.availability}</p>
        
      </div>
    </footer>
  );
}
