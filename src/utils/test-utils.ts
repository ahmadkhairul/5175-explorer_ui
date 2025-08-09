import { mount, type MountingOptions } from '@vue/test-utils'
import { createPinia } from 'pinia'
/**
 * Shared Pinia-enhanced global config
 */
document.body.innerHTML = '<div id="modal"></div>'

function getGlobalConfig(globalOverrides = {}) {
  return {
    plugins: [createPinia()],
    stubs: {
      teleport: true
    },
    ...globalOverrides
  }
}
/**
 * For internal/component-centric testing (Vue Test Utils)
 */
export function mountWithPinia(component: any, options: MountingOptions<any> = {}) {
  return mount(component, {
    global: getGlobalConfig(options.global),
    ...options
  })
}
