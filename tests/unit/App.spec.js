import { mount } from '@vue/test-utils';
import App from '@/App';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

beforeEach(() => {
  const mock = new MockAdapter(axios);
  mock.onAny().reply(200, { articles: [] });
});

describe('App', () => {
  it('shows a header', () => {
    const app = mount(App);

    expect(app.find('[data-testid=header]').exists()).toBeTruthy();
  });

  it('shows a footer', () => {
    const app = mount(App);

    expect(app.find('[data-testid=footer]').exists()).toBeTruthy();
  });

  it('shows a banner', () => {
    const app = mount(App);

    expect(app.find('[data-testid=banner]').exists()).toBeTruthy();
  });
});
