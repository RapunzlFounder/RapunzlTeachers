import Settings from '../settings';
import { setJSExceptionHandler } from 'react-native-exception-handler';
import ErrorScreen from '../components/Admin/ErrorScreen';
const env = Settings.extra.env;

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    return (
      <ErrorScreen error={e} type={'fatal'}/>
    );
  } 
  // Handles Non-Fatal errors which may hamped UX but do not crash client
  else {
    // Only logs Non-Fatal Errors in Staging, Not Production
    if (env !== 'production') {
      // console.log(e);
    }
  }
};

// Catch all errors and restart app if we're in production, but allow errors through in dev/staging
if (env == 'production') {
  setJSExceptionHandler(errorHandler);
}
