import { browser, by, element } from 'protractor';

export class AppPage {
  constructor() {
    browser.ignoreSynchronization = true;
  }

  navigateTo(path: string = '#/login') {
    return browser.get(`${path}`);
  }

  getLoginHeader() {
    return element(by.css('storaji-root storaji-login .uk-card-body h2')).getText();
  }
}
