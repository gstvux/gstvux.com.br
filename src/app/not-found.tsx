import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold tracking-tighter text-white">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300">Página não encontrada</h2>
        <p className="mx-auto max-w-md text-gray-400">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </main>
  );
}
