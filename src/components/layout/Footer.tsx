import client from "../../../tina/__generated__/client";

export async function Footer() {
  let footer = null;

  try {
    const res = await client.queries.global({ relativePath: "index.json" });
    footer = res.data.global.footer;
  } catch (error) {
    console.error("TinaCMS: Erro ao buscar dados do Footer durante o build.", error);
  }

  if (!footer) return null;

  return (
    <footer className="w-full py-8 border-t border-(--color-bluepetro-500) bg-page">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-4 font-secondary text-size-body-xs text-fg-body-subtle">

        {footer.since && <p className="text-center md:text-left">{footer.since}</p>}
        {footer.current_year && <p className="text-center">{footer.current_year}</p>}
        {footer.availability && <p className="text-center md:text-right">{footer.availability}</p>}

      </div>
    </footer>
  );
}
