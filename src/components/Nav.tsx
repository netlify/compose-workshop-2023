import Cookies from 'js-cookie';
import Link from '~/components/ui/Link';

const links = [
  {
    label: '📚 Shop',
    path: '/',
  },
  {
    label: '👻 Storytime',
    path: '/storytime',
  },
  {
    label: '🔮 About',
    path: '/about',
  },
];

export default function Nav() {
  const abTestBucket = Cookies.get('ab-test-bucket');
  return (
    <header className="flex justify-between my-2 sticky top-0 bg-slate-900/70 py-4 z-10 backdrop-blur-sm">
      <nav>
        <ul className="flex gap-x-8 text-green-500 max-w-full text-xl font-bold">
          {links.map(link => (
            <li key={link.path}>
              <Link className="hover:text-red-500" to={link.path}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {abTestBucket && (
        <span className="text-xl font-bold text-white">
          👋 Test group {abTestBucket}
        </span>
      )}
    </header>
  );
}
