import { defineCustomElement } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { useAuthStore } from './stores/auth';

export default function register() {
  const AppElement = defineCustomElement(App);

  class AppWithPlugins extends AppElement {
    connectedCallback() {
      const app = (this as any).__app;
      if (app && !app._pluginsInstalled) {
        app.use(createPinia());
        app.use(router);

        const auth = useAuthStore();
        auth.initialize().finally(() => {
          super.connectedCallback();
        });

        app._pluginsInstalled = true;
      } else {
        super.connectedCallback();
      }
    }
  }

  if (!customElements.get('vue-app')) {
    customElements.define('vue-app', AppWithPlugins);
  }
}
