export interface ICardItem {
  title: string;
  url: string;
  bgColor: string;
  iconColor: string;
  titleColor: string;
  iconName: string;
  tooltip: string;
  openInNewTab: boolean;
}

export interface IQuickLinksCardsProps {
  sectionTitle: string;
  cardsCount: number;    // 3..6
  brandColor: string;
  cards: ICardItem[];    // always 6, render the first cardsCount
}
