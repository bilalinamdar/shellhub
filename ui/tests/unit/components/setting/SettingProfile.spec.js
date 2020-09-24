import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import SettingProfile from '@/components/setting/SettingProfile';

describe('SettingProfile', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let wrapper;

  const user = 'ShellHub';
  const email = 'shellhub@shellhub.com';
  const tenant = '';

  const store = new Vuex.Store({
    namespaced: true,
    state: {
      user,
      email,
      tenant,
    },
    getters: {
      'auth/currentUser': (state) => state.user,
      'auth/email': (state) => state.email,
      'auth/tenant': (state) => state.tenant,
    },
    actions: {
      'users/put': () => {
      },
    },
  });

  beforeEach(() => {
    wrapper = mount(SettingProfile, {
      store,
      localVue,
      stubs: ['fragment'],
    });
  });

  it('Is a Vue instance', () => {
    expect(wrapper).toBeTruthy();
  });
  it('Renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('Process data in the computed', () => {
    expect(wrapper.vm.tenant).toEqual(tenant);
  });
  it('Compare data with default value', () => {
    expect(wrapper.vm.username).toEqual(user);
    expect(wrapper.vm.email).toEqual(email);
    expect(wrapper.vm.currentPassword).toEqual('');
    expect(wrapper.vm.newPassword).toEqual('');
    expect(wrapper.vm.newPasswordConfirm).toEqual('');
    expect(wrapper.vm.editDataStatus).toEqual(false);
    expect(wrapper.vm.editPasswordStatus).toEqual(false);
    expect(wrapper.vm.show).toEqual(false);
  });
  it('Renders the template with data', () => {
    expect(wrapper.find('[data-test="username-text"]').element.value).toEqual(user);
    expect(wrapper.find('[data-test="email-text"]').element.value).toEqual(email);
    expect(wrapper.find('[data-test="password-text"]').element.value).toEqual('');
    expect(wrapper.find('[data-test="newPassword-text"]').element.value).toEqual('');
    expect(wrapper.find('[data-test="confirmNewPassword-text"]').element.value).toEqual('');
  });
});
