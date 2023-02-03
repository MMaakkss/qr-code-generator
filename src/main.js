import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import App from './App.vue'

import './assets/style.css'

import { languages, defaultLocale } from './i18n/index.js'

const messages = Object.assign(languages)

const i18n = createI18n({
	legacy: false,
	locale: defaultLocale,
	fallbackLocale: 'en',
	messages,
})

createApp(App)
	.use(i18n)
	.component(VueQrcode.name, VueQrcode)
	.mount('#app')
