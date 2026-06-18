import type { MetaFunction } from 'react-router';
import Link from '~/components/link';
import Logo from '~/components/logo';
import s from '~/styles/routes/index.module.css';
import { siteMeta } from '~/utils/meta';

export function loader() {
  return { title: 'Mallard Green' };
}

export const meta: MetaFunction = () => siteMeta();

export default function IndexRoute() {
  return (
    <section className={s.wrapper}>
      <p className={s.copy}>
        Creative development practice. Designing and building products and
        technical systems.
      </p>
      <Link className={s.link} href="mailto:office@mallard.green">
        office@mallard.green
      </Link>
      <Logo className={s.logo} />
    </section>
  );
}
