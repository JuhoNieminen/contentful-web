import { browser, by, element } from 'protractor';

export class ContentfulWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('asm-header')).getText();
  }
}
