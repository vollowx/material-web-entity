import * as mComp from './components/index';
import * as mUtil from './utils/index';
import './libs/focus-visible.js';

export { mComp, mUtil };
onload = () => {
  (window as any).mComp = mComp;
  (window as any).mUtil = mUtil;
};
