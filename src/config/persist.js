import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

export const persistConfig = {
  key: 'root',
  storage,
  version: process.env.REACT_APP_BUILD_TIME || -1,
  stateReconciler: autoMergeLevel1,
  debug: true,
  migrate: (state, version) => {
    if ((state && state._persist && state._persist.version !== version)) {
      localStorage.removeItem('token');
      return Promise.resolve({});
    } else {
      return Promise.resolve(state);
    }
  },
  blacklist:['_modals',]
};
