export const pmt = (rate, nperiod, pv, fv, type) => {
  if (!fv) fv = 0;
  if (!type) type = 0;

  if (rate == 0) return -(pv + fv) / nperiod;

  var pvif = Math.pow(1 + rate, nperiod);
  var result = (rate / (pvif - 1)) * -(pv * pvif + fv);

  if (type == 1) {
    result /= 1 + rate;
  }

  return result;
};

export const ipmt = (pv, pmt, rate, per) => {
  var tmp = Math.pow(1 + rate, per);
  return 0 - (pv * tmp * rate + pmt * (tmp - 1));
};

export const ppmt = (rate, per, nper, pv, fv, type) => {
  if (per < 1 || per >= nper + 1) return null;
  var x = pmt(rate, nper, pv, fv, type);
  var y = ipmt(pv, x, rate, per - 1);
  return x - y;
};
