import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import ONE_ARTICLE from '../data/articles/one-article.json';
import TWO_ARTICLES from '../data/articles/two-articles.json';
import HomePage from '@/components/HomePage';

const PAGINATION_SELECTOR = '[data-testid=feed-pagination]';
const PAGINATION_PREVIOUS_SELECTOR = '[data-testid=pagination-previous]';
const PAGINATION_NEXT_SELECTOR = '[data-testid=pagination-next]';
const ACTIVE_PAGE_SELECTOR = '.active[data-testid=page-number]';

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

  it('retrieves only the first 10 posts first time', async () => {
    mockAxios.onGet('/articles').reply(200, TWO_ARTICLES);

    mount(HomePage);
    await flushPromises();

    expect(mockAxios.history.get[0].params.limit).toEqual(10);
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

      expect(app.findAll(ACTIVE_PAGE_SELECTOR).length).toEqual(1);
      expect(app.find(ACTIVE_PAGE_SELECTOR).text()).toEqual('1');
    });
    it('actives 2nd page when clicked', async () => {
      const articles = buildArticles(10, 30);
      mockAxios.onGet('/articles').reply(200, articles);
      const app = mount(HomePage);
      await flushPromises();

      await app.findAll('[data-testid=page-number] a').at(1).trigger('click');
      await flushPromises();

      expect(app.find(ACTIVE_PAGE_SELECTOR).text()).toEqual('2');
    });

    it.each`
      pageNumberClicked | offsetRequested
      ${1}              | ${10}
      ${2}              | ${20}
      ${3}              | ${30}
    `('reloads articles when another page is clicked', async ({ pageNumberClicked, offsetRequested }) => {
      const articles = buildArticles(10, 40);
      mockAxios.onGet('/articles').reply(200, articles);
      const app = mount(HomePage);
      await flushPromises();

      await app.findAll('[data-testid=page-number] a').at(pageNumberClicked).trigger('click');
      await flushPromises();

      expect(mockAxios.history.get.length).toEqual(2);
      expect(mockAxios.history.get[0].params.offset).toEqual(0);
      expect(mockAxios.history.get[1].params.offset).toEqual(offsetRequested);
    });

    describe('Previous & Next buttons', () => {
      it('shows previous when active page is greater than 1', async () => {
        const articles = buildArticles(10, 20);
        mockAxios.onGet('/articles').reply(200, articles);

        const app = mount(HomePage);
        await flushPromises();

        await app.findAll('[data-testid=page-number] a').at(1).trigger('click');
        await flushPromises();

        expect(app.find(PAGINATION_PREVIOUS_SELECTOR).exists()).toBeTruthy();
      });

      it('does not show previous when active page is 1', async () => {
        const articles = buildArticles(10, 20);
        mockAxios.onGet('/articles').reply(200, articles);

        const app = mount(HomePage);
        await flushPromises();

        expect(app.find(PAGINATION_PREVIOUS_SELECTOR).exists()).toBeFalsy();
      });

      it('shows next button', async () => {
        const articles = buildArticles(10, 31);
        mockAxios.onGet('/articles').reply(200, articles);

        const app = mount(HomePage);
        await flushPromises();

        expect(app.find(PAGINATION_NEXT_SELECTOR).exists()).toBeTruthy();
      });

      it('does not show next when active page is last', async () => {
        const articles = buildArticles(10, 31);
        mockAxios.onGet('/articles').reply(200, articles);

        const app = mount(HomePage);
        await flushPromises();

        await app.findAll('[data-testid=page-number] a').at(3).trigger('click');
        await flushPromises();

        expect(app.find(PAGINATION_NEXT_SELECTOR).exists()).toBeFalsy();
      });

      it('changes pagination when previous is pressed', async () => {
        const articles = buildArticles(10, 40);
        mockAxios.onGet('/articles').reply(200, articles);
        const app = mount(HomePage);
        await flushPromises();
        await app.findAll('[data-testid=page-number] a').at(2).trigger('click');
        await flushPromises();

        await app.find(PAGINATION_PREVIOUS_SELECTOR).find('a').trigger('click');
        await flushPromises();

        expect(mockAxios.history.get.length).toEqual(3);
        expect(mockAxios.history.get[2].params.offset).toEqual(10);
        expect(app.find(ACTIVE_PAGE_SELECTOR).text()).toEqual('2');
      });

      it('changes pagination when NEXT is pressed', async () => {
        const articles = buildArticles(10, 40);
        mockAxios.onGet('/articles').reply(200, articles);
        const app = mount(HomePage);
        await flushPromises();
        await app.findAll('[data-testid=page-number] a').at(2).trigger('click');
        await flushPromises();

        await app.find(PAGINATION_NEXT_SELECTOR).find('a').trigger('click');
        await flushPromises();

        expect(mockAxios.history.get.length).toEqual(3);
        expect(mockAxios.history.get[2].params.offset).toEqual(30);
        expect(app.find(ACTIVE_PAGE_SELECTOR).text()).toEqual('4');
      });
    });
  });

});
