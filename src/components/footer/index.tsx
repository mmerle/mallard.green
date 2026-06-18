import { GridDebuggerToggle } from '~/components/grid-debugger';
import Link from '~/components/link';
import s from './footer.module.css';

const LINKS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Linkedin' },
  { href: '#', label: 'Github' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <GridDebuggerToggle>Shift + G</GridDebuggerToggle>
      <div>
        {LINKS.map((link, index) => (
          <span key={link.label}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {link.label}
            </Link>
            {index !== LINKS.length - 1 && <span>/</span>}
          </span>
        ))}
        <p>© Mallard Green — {year}</p>
      </div>
    </footer>
  );
}
