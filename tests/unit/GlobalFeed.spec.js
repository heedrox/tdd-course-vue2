import { config, mount } from '@vue/test-utils';
import App from '@/App';

describe('Global Feed', () => {
  it('is shown', () => {
    const app = mount(App);

    // expect(app.find('[data-testid=global-feed]').exists()).toBeTruthy();
  });
});
