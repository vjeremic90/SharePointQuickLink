import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneHorizontalRule,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { ICardItem, IQuickLinksCardsProps } from './components/IQuickLinksCardsProps';
import Cards from './components/FlexQuickLinks';

const ICON_OPTIONS = [
  { key: 'apps',     text: 'Apps / Kacheln' },
  { key: 'flow',     text: 'Flow / Pfeile' },
  { key: 'box',      text: 'Quadrat' },
  { key: 'grid',     text: 'Raster' },
  { key: 'plus',     text: 'Plus' },
  { key: 'doc',      text: 'Dokument' },
  { key: 'link',     text: 'Link / Kette' },
  { key: 'star',     text: 'Stern' },
  { key: 'home',     text: 'Startseite' },
  { key: 'settings', text: 'Einstellungen' },
  { key: 'chart',    text: 'Diagramm' },
  { key: 'mail',     text: 'E-Mail' },
  { key: 'calendar', text: 'Kalender' },
  { key: 'people',   text: 'Personen' },
  { key: 'folder',   text: 'Ordner' },
  { key: 'search',   text: 'Suche' },
  { key: 'cloud',    text: 'Cloud' },
  { key: 'lock',     text: 'Sicherheit / Schloss' },
  { key: 'list',     text: 'Liste' },
];

const DEFAULT_CARDS: ICardItem[] = [
  { title: 'Power Apps',                url: 'https://make.powerapps.com/',                 bgColor: '', iconColor: '', titleColor: '', iconName: 'apps',   tooltip: '', openInNewTab: true },
  { title: 'Power Automate',            url: 'https://make.powerautomate.com/',             bgColor: '', iconColor: '', titleColor: '', iconName: 'flow',   tooltip: '', openInNewTab: true },
  { title: 'Training Portal',           url: 'https://learn.microsoft.com/en-us/training/', bgColor: '', iconColor: '', titleColor: '', iconName: 'doc',    tooltip: '', openInNewTab: true },
  { title: 'Training & Certifications', url: 'https://your-link-4',                         bgColor: '', iconColor: '', titleColor: '', iconName: 'star',   tooltip: '', openInNewTab: true },
  { title: 'IT Helpdesk',               url: 'https://your-link-5',                         bgColor: '', iconColor: '', titleColor: '', iconName: 'people', tooltip: '', openInNewTab: true },
  { title: 'Forms Library',             url: 'https://your-link-6',                         bgColor: '', iconColor: '', titleColor: '', iconName: 'folder', tooltip: '', openInNewTab: true },
];

const DEFAULT_ICONS = ['apps', 'flow', 'doc', 'star', 'people', 'folder'];

export default class CardsWebPart extends BaseClientSideWebPart<IQuickLinksCardsProps> {

  public onInit(): Promise<void> {
    if (!this.properties.cards || this.properties.cards.length !== 6) {
      this.properties.cards = DEFAULT_CARDS;
    } else {
      // Migrate existing cards — backfill new fields + clear old hardcoded defaults
      this.properties.cards = this.properties.cards.map((c, i) => {
        const card = c as ICardItem & Record<string, unknown>;
        if (!card.iconName)                   card.iconName    = DEFAULT_ICONS[i] || 'apps';
        if (card.tooltip === undefined)       card.tooltip     = '';
        if (card.openInNewTab === undefined)  card.openInNewTab = true;
        if (card.titleColor === undefined)    card.titleColor  = '';
        // Clear old hardcoded default colors so CSS theme vars take over
        if (card.bgColor === '#ce9e3a')       card.bgColor   = '';
        if (card.iconColor === '#dc2626')     card.iconColor = '';
        return card as ICardItem;
      });
    }
    if (!this.properties.cardsCount) this.properties.cardsCount = 6;
    if (!this.properties.brandColor) this.properties.brandColor = '#2b5ce6';
    if (this.properties.sectionTitle === undefined) this.properties.sectionTitle = '';
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IQuickLinksCardsProps> = React.createElement(Cards, {
      sectionTitle: this.properties.sectionTitle,
      cardsCount: this.properties.cardsCount,
      brandColor: this.properties.brandColor,
      cards: this.properties.cards
    });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _cardFields(): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fields: any[] = [];

    for (let i = 0; i < (this.properties.cardsCount || 6); i++) {
      if (i > 0) fields.push(PropertyPaneHorizontalRule());
      fields.push(
        PropertyPaneLabel(`_lbl${i}`, { text: `Kachel ${i + 1}` }),
        PropertyPaneTextField(`cards[${i}].title`, { label: 'Bezeichnung' }),
        PropertyPaneTextField(`cards[${i}].url`,   { label: 'Link' }),
        PropertyPaneTextField(`cards[${i}].tooltip`, { label: 'Tooltip (optional)' }),
        PropertyPaneDropdown(`cards[${i}].iconName`, {
          label: 'Symbol',
          options: ICON_OPTIONS,
          selectedKey: this.properties.cards?.[i]?.iconName || 'apps'
        }),
        PropertyPaneTextField(`cards[${i}].bgColor`, {
          label: 'Hintergrundfarbe (HEX, optional)',
          placeholder: '#2b5ce6'
        }),
        PropertyPaneTextField(`cards[${i}].iconColor`, {
          label: 'Symbolfarbe (HEX, leer = bela)',
          placeholder: '#ffffff'
        }),
        PropertyPaneTextField(`cards[${i}].titleColor`, {
          label: 'Boja teksta (HEX, leer = bela)',
          placeholder: '#ffffff'
        }),
        PropertyPaneToggle(`cards[${i}].openInNewTab`, {
          label: 'In neuem Tab öffnen'
        })
      );
    }

    return fields;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Kacheleinstellungen' },
          groups: [
            {
              groupName: 'Allgemein',
              groupFields: [
                PropertyPaneTextField('sectionTitle', {
                  label: 'Abschnittstitel (optional)',
                  placeholder: 'z.B. Meine Links'
                }),
                PropertyPaneSlider('cardsCount', {
                  label: 'Anzahl der Kacheln',
                  min: 3,
                  max: 6,
                  showValue: true
                }),
                PropertyPaneTextField('brandColor', {
                  label: 'Markenfarbe (HEX)',
                  placeholder: '#2b5ce6'
                })
              ]
            },
            {
              groupName: 'Kacheln',
              groupFields: this._cardFields()
            }
          ]
        }
      ]
    };
  }
}

