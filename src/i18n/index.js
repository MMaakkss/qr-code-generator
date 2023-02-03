export const defaultLocale = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

export const languages = {
	en: {
		title: 'Generate your Qr Code!',
		download: 'Download {type}',
		selectLanguage: 'Select Language:',
		ua: 'Ukrainian',
		en: 'English',
		input: 'Enter link / text',
	},
	ua: {
		title: 'Сгенеруй свій Qr Code!',
		download: 'Скачати {type}',
		selectLanguage: 'Вибрати Мову:',
		ua: 'Ukrainian',
		en: 'English',
		input: 'Введіть посилання або текст',
	}
}