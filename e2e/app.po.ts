import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path: string = '') {
    path = (path === '/')
      ? ''
      : path;
    return browser.get(`/${path}`);
  }

  getLoginHeader() {
    return element(by.css('storaji-root storaji-login .uk-card-body h2')).getText();
  }
}
