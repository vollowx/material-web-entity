declare global {
  interface Window {
    mComp: any;
    mUtil: any;
  }
}

import * as mComp from './components/index';
import * as mUtil from './utils/index';
import './lib/focus-visible';

export { mComp, mUtil };
onload = () => {
  window.mComp = mComp;
  window.mUtil = mUtil;
  if (window.mComp && window.mUtil) {
    console.log(
      '%cMWE%cConstant defining%csuccessful',
      'padding:4px;color:#8c7af1;font-weight:600;background:#171717;border-radius:4px 0 0 4px;',
      'padding:4px;color:#aaa;background:#212121;',
      'color:#53e199;padding:4px;background:#333333;border-radius:0 4px 4px 0;'
    );
  } else {
    console.log(
      '%cMWE%Constant defining%cfailed',
      'padding:4px;color:#8c7af1;font-weight:600;background:#171717;border-radius:4px 0 0 4px;',
      'padding:4px;color:#aaa;background:#212121;',
      'color:#ff0000;padding:4px;background:#333333;border-radius:0 4px 4px 0;'
    );
  }
};
