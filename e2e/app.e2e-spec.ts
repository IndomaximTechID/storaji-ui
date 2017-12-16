import { AppPage } from './app.po';

describe('frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display login header', () => {
    page.navigateTo();
    expect(page.getLoginHeader()).toEqual('STORAJI');
  });
});
