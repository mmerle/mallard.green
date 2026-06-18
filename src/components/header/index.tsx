import Link from '~/components/link';
import Logo from '~/components/logo';
import Navigation from '~/components/navigation';
import ThemeSwitcher from '~/components/theme-switcher';
import s from './header.module.css';

export default function Header() {
  return (
    <header className={s.head}>
      <Navigation />
      <Link href="/" className={s.logo}>
        <Logo size={164} />
      </Link>
      <ThemeSwitcher />
    </header>
  );
}
