import { mount } from '@vue/test-utils';
import App from '@/App';

beforeEach(() => {
  mockAxios.onGet('/articles').reply(200, { articles: [] });
});

describe('App', () => {
  it('shows a header', () => {
    const app = mount(App, {
      stubs: ['router-link', 'router-view']
    });

    expect(app.find('[data-testid=header]').exists()).toBeTruthy();
  });

  it('shows a footer', () => {
    const app = mount(App, {
      stubs: ['router-link', 'router-view']
    });

    expect(app.find('[data-testid=footer]').exists()).toBeTruthy();
  });

});
