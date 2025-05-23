import cn from 'clsx';
import s from './biz-card.module.css';
import useStore from '~/libs/store';

export default function BizCard() {
  const { isBizCardVisible, toggleBizCard } = useStore();

  return (
    <div className={s.card} data-visible={isBizCardVisible}>
      <button className={s['card-backdrop']} onClick={toggleBizCard}>
        Close
      </button>
      <div className={s['card-inner']}>
        <div className={s['card-inner-area']}>
          <a href="mailto:m@mallard.green">m@mallard.green</a>
        </div>
        <div className={s['card-inner-area']}>
          <a href="https://cal.com/mallardgreen" target="_blank">
            Book a chat
          </a>
        </div>
        <div className={s['card-inner-area']}>
          <p>
            Design Office
            <br /> An artificial space for real design.
          </p>
        </div>
        <div className={s['card-inner-area']}>
          <a href="#">Instagram</a>
        </div>
      </div>
      <span className={s['card-close']}>Close x</span>
    </div>
  );
}

export function BizCardToggle({ children, className }) {
  const { toggleBizCard } = useStore();

  return (
    <button onClick={toggleBizCard} className={cn(s.toggle, className)}>
      {children}
    </button>
  );
}
