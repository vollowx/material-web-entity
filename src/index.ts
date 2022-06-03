import * as mComp from './components/index';
import * as mUtil from './utils/index';
import './polyfills/focus-visible';
import style from './index.scss';

const sheet = new CSSStyleSheet();
sheet.replaceSync(style);
document.adoptedStyleSheets = [sheet];

export { mComp, mUtil };
onload = () => {
  window.mComp = mComp;
  window.mUtil = mUtil;
  if (window.mComp && window.mUtil) {
    console.log('MWE - Constant defining - successful');
  } else {
    console.log('MWE - Constant defining - failed');
  }
};
