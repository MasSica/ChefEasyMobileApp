import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './views/App';
import {name as appName} from './views/app.json';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
