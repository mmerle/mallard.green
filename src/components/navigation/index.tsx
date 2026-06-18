import { useLocation } from 'react-router';
import { BizCardToggle } from '~/components/biz-card';
import Link from '~/components/link';
import s from './navigation.module.css';

const LINKS = [{ href: '/contact', label: 'Contact' }];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        {LINKS.map((link) => (
          <li
            className={s.item}
            data-active={location.pathname === link.href}
            key={link.href}
          >
            <Link href={link.href} className="link">
              {link.label}
            </Link>
          </li>
        ))}
        <li className={s.item}>
          <BizCardToggle className="link">Card</BizCardToggle>
        </li>
      </ul>
    </nav>
  );
}
