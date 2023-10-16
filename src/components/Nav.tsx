import Link from '~/components/ui/Link';

const links = [
  {
    label: '📚 Shop',
    path: '/',
  },
  {
    label: '👻 Spook',
    path: '/spook',
  },
  {
    label: '🔮 About',
    path: '/about',
  },
];

export default function Nav() {
  return (
    <header className="flex justify-between my-2 sticky top-0 bg-slate-900/70 py-4 z-10 backdrop-blur-sm">
      <nav>
        <ul className="flex gap-x-8 text-orange-500 max-w-full text-xl font-bold">
          {links.map(link => (
            <li key={link.path}>
              <Link className="hover:text-yellow-500" to={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
