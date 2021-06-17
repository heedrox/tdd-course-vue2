import { mount } from '@vue/test-utils';
import App from '@/App';

describe('App', () => {
  it('shows a header', () => {
    const app = mount(App);

    expect(app.find('[data-testid=header]').exists()).toBeTruthy();
  });

  it('shows a footer', () => {
    const app = mount(App);

    expect(app.find('[data-testid=footer]').exists()).toBeTruthy();
  });
});
