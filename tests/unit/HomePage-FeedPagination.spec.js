import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ONE_ARTICLE from '../data/articles/one-article.json';
import TWO_ARTICLES from '../data/articles/two-articles.json';
import HomePage from '@/components/HomePage';

const PAGINATION_SELECTOR = '[data-testid=feed-pagination]';

const changeSlug = (article, idx) => ({
  ...article,
  slug: `${article.slug}-${idx}`
});

const buildArticles = (numPageArticles, numArticlesCount) => {
  const article = JSON.parse(JSON.stringify(ONE_ARTICLE.articles[0]));
  return {
    articles: Array(numPageArticles).fill(article).map(changeSlug),
    articlesCount: numArticlesCount
  };
};

describe('Home Page - Feeds pagination', () => {

  it('asks for the first 10 posts first time', async () => {
    mockAxios.onGet('/articles').reply(200, TWO_ARTICLES);

    mount(HomePage);
    await flushPromises();

    expect(mockAxios.history.get[0].params.limit).toEqual(10);
  });

  it('does not show previous when active page is 1', async () => {
    const articles = buildArticles(10, 20);
    mockAxios.onGet('/articles').reply(200, articles);

    const app = mount(HomePage);
    await flushPromises();

    expect(app.find('[data-testid=previous]').exists()).toBeFalsy();
  });

  it.each`
    numArticlesCount | pages
    ${11}            | ${['1', '2']}
    ${20}            | ${['1', '2']}
    ${21}            | ${['1', '2', '3']}
  `('shows number of pages', async ({ numArticlesCount, pages }) => {
    const articles = buildArticles(10, numArticlesCount);
    mockAxios.onGet('/articles').reply(200, articles);

    const app = mount(HomePage);
    await flushPromises();

    expect(app.findAll('[data-testid=page-number]').length).toEqual(pages.length);
    for (let a = 0; a < pages.length; a++) {
      expect(app.findAll('[data-testid=page-number').at(a).text()).toEqual(pages[a]);
    }

  });

  describe('Active Page', () => {
    it('is the 1st page by default', async () => {
      const articles = buildArticles(10, 30);
      mockAxios.onGet('/articles').reply(200, articles);

      const app = mount(HomePage);
      await flushPromises();

      expect(app.findAll('.active[data-testid=page-number]').length).toEqual(1);
      expect(app.find('.active[data-testid=page-number]').text()).toEqual('1');
    });
    it('actives 2nd page when clicked', async () => {
      const articles = buildArticles(10, 30);
      mockAxios.onGet('/articles').reply(200, articles);
      const app = mount(HomePage);
      await flushPromises();

      await app.findAll('[data-testid=page-number] a').at(1).trigger('click');
      await flushPromises();

      expect(app.find('.active[data-testid=page-number]').text()).toEqual('2');
    });
  });
  it('does not show pagination when <10 posts', async () => {
    mockAxios.onGet('/articles').reply(200, TWO_ARTICLES);

    const app = mount(HomePage);
    await flushPromises();

    expect(app.find(PAGINATION_SELECTOR).exists()).toBeFalsy();
  });

  it('shows pagination when >=10 posts', async () => {
    const articles = buildArticles(10, 11);
    mockAxios.onGet('/articles').reply(200, articles);

    const app = mount(HomePage);
    await flushPromises();

    expect(app.find(PAGINATION_SELECTOR).exists()).toBeTruthy();
  });

});
