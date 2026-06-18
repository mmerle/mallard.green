import type { MetaFunction } from 'react-router';
import s from '~/styles/routes/contact.module.css';
import { siteMeta } from '~/utils/meta';

export const meta: MetaFunction = () =>
  siteMeta({ title: 'Contact', path: '/contact' });

export default function ContactRoute() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Contact</h1>
    </div>
  );
}
