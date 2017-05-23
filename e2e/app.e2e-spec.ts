import { GithubRepositoryComparatorPage } from './app.po';

describe('github-repository-comparator App', () => {
  let page: GithubRepositoryComparatorPage;

  beforeEach(() => {
    page = new GithubRepositoryComparatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
