
import { Provider } from 'react-redux';

import MyNavigation from './src/utils/navigations';

import { store } from './src/redux/store';

export default function App() {

  return (
    <Provider store={ store } >
      <MyNavigation />
    </Provider>
  );
}


