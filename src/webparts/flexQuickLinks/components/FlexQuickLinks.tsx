import * as React from 'react';
import styles from './FlexQuickLinks.module.scss';
import { ICardItem } from './IQuickLinksCardsProps';

export interface ICardsProps {
  sectionTitle: string;
  cardsCount: number;
  brandColor: string;
  cards: ICardItem[];
}

const ICON_MAP: Record<string, JSX.Element> = {
  apps:     <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" strokeWidth="2" strokeLinecap="round"/>,
  flow:     <path d="M5 7h10l-3-3M19 17H9l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
  box:      <><path d="M5 5h14v14H5z" strokeWidth="2"/><path d="M9 9h6v6H9z" strokeWidth="2"/></>,
  grid:     <path d="M4 7h16M7 4v16M17 4v16" strokeWidth="2" strokeLinecap="round"/>,
  plus:     <path d="M4 12h16M12 4v16" strokeWidth="2" strokeLinecap="round"/>,
  doc:      <><path d="M6 4h12v16H6z" strokeWidth="2"/><path d="M8 8h8M8 12h8M8 16h6" strokeWidth="2" strokeLinecap="round"/></>,
  link:     <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.5" strokeWidth="2" strokeLinecap="round"/>,
  star:     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
  home:     <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="2"/><path d="M9 22v-10h6v10" strokeWidth="2"/></>,
  settings: <><circle cx="12" cy="12" r="3" strokeWidth="2"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeWidth="2" strokeLinecap="round"/></>,
  chart:    <><path d="M18 20V10" strokeWidth="2" strokeLinecap="round"/><path d="M12 20V4" strokeWidth="2" strokeLinecap="round"/><path d="M6 20v-6" strokeWidth="2" strokeLinecap="round"/></>,
  mail:     <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2"/><path d="M22 6L12 13 2 6" strokeWidth="2" strokeLinejoin="round"/></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round"/></>,
  people:   <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2"/><circle cx="9" cy="7" r="4" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2"/></>,
  folder:   <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" strokeWidth="2"/>,
  search:   <><circle cx="11" cy="11" r="8" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></>,
  cloud:    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeWidth="2"/>,
  lock:     <><rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"/></>,
  list:     <><path d="M8 6h13M8 12h13M8 18h13" strokeWidth="2" strokeLinecap="round"/><path d="M3 6h.01M3 12h.01M3 18h.01" strokeWidth="2" strokeLinecap="round"/></>,
};

export default function Cards(props: ICardsProps): JSX.Element {
  const count = Math.min(Math.max(props.cardsCount || 6, 3), 6);
  const items = (props.cards || []).slice(0, count);

  return (
    <div className={styles.cardsWrap} style={{ '--jv-brand': props.brandColor } as React.CSSProperties}>
      {props.sectionTitle && (
        <p className={styles.sectionTitle}>{props.sectionTitle}</p>
      )}
      <div className={styles.cards}>
        {items.map((c, idx) => {
          const icon = ICON_MAP[c.iconName] ?? ICON_MAP.apps;
          const isNewTab = c.openInNewTab !== false;
          return (
            <a
              key={idx}
              className={styles.card}
              href={c.url}
              target={isNewTab ? '_blank' : '_self'}
              rel="noreferrer"
              style={{ background: c.bgColor || 'var(--sp-css-color-themePrimary, #2b5ce6)' }}
              title={c.tooltip || c.title}
            >
              <div className={styles.cardTop}>
                <span className={styles.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" width={20} height={20}>
                    <g style={{ stroke: c.iconColor || 'rgba(255,255,255,0.92)', fill: 'none' }}>
                      {icon}
                    </g>
                  </svg>
                </span>
              </div>
              <p className={styles.title} style={c.titleColor ? { color: c.titleColor } : undefined}>{c.title}</p>
              {c.tooltip && <p className={styles.tooltip} style={c.titleColor ? { color: c.titleColor } : undefined}>{c.tooltip}</p>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
