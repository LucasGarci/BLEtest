import I18n from 'react-native-i18n';
import en from './english.json'
import es from './es.json'

I18n.fallbacks = true;

let languageCode = I18n.locale.substr(0,2);

I18n.translations = {
	en: require('./english.json'),
	es: require('./es.json')
}

export default I18n