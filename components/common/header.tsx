import Link from "next/link";


export function Header() {
  return (
    <header className="p-4 bg-slate-500 flex items-center gap-2">
      <Link className="hover:bg-black/30 px-2 py-1 rounded" href={'/'}>Início</Link>
      <Link className="hover:bg-black/30 px-2 py-1 rounded" href={'/cards'}>Cartões</Link>
    </header>
  )
}