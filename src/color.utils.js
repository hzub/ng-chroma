export class ColorUtils {
  static rgbToHtml(rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }

  static rgbToHexHtml(rgb) {
    let ret = '#';
    ret += (`0${parseInt(rgb[0], 10).toString(16)}`).slice(-2);
    ret += (`0${parseInt(rgb[1], 10).toString(16)}`).slice(-2);
    ret += (`0${parseInt(rgb[2], 10).toString(16)}`).slice(-2);
    return ret;
  }

  static hsbToRgb(hsv) {
    const [h, s, v] = hsv;

    let r;
    let g;
    let b;

    const i = Math.floor(h * 6);
    const f = (h * 6) - i;
    const p = v * (1 - s);
    const q = v * (1 - (f * s));
    const t = v * (1 - ((1 - f) * s));

    switch (i % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        break;
    }
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
    ];
  }

  static rgbToHsb(rgb) {
    const [r, g, b] = rgb;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const s = (max === 0 ? 0 : d / max);
    const v = max / 255;

    let h;

    switch (max) {
      case min:
        h = 0;
        break;
      case r:
        h = (g - b) + (d * (g < b ? 6 : 0));
        h /= 6 * d;
        break;
      case g:
        h = (b - r) + (d * 2);
        h /= 6 * d;
        break;
      case b:
        h = (r - g) + (d * 4);
        h /= 6 * d;
        break;
      default:
        break;
    }

    return [
      h,
      s,
      v,
    ];
  }

  static htmlColorToRgb(input) {
    const rgbResult = /rgb\([^\d]*(\d+)[^\d]+(\d+)[^\d]+(\d+)[^\d]*\)/i.exec(input);
    if (rgbResult) {
      return [
        parseInt(rgbResult[1], 10),
        parseInt(rgbResult[2], 10),
        parseInt(rgbResult[3], 10),
      ];
    }

    const hexResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input);
    if (hexResult) {
      return [
        parseInt(hexResult[1], 16),
        parseInt(hexResult[2], 16),
        parseInt(hexResult[3], 16),
      ];
    }

    return null;
  }

  static rgbToCmyk(rgb) {
    let c;
    let m;
    let y;
    let k;

    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    k = Math.min(1 - r, 1 - g, 1 - b);
    c = (1 - r - k) / (1 - k);
    m = (1 - g - k) / (1 - k);
    y = (1 - b - k) / (1 - k);

    c = Math.round(c * 100) || 0;
    m = Math.round(m * 100) || 0;
    y = Math.round(y * 100) || 0;
    k = Math.round(k * 100);

    return [c, m, y, k];
  }

  static cmykToRgb(cmyk) {
    let r;
    let g;
    let b;

    let [c, m, y, k] = cmyk;

    c /= 100;
    m /= 100;
    y /= 100;
    k /= 100;

    r = 1 - Math.min(1, (c * (1 - k)) + k);
    g = 1 - Math.min(1, (m * (1 - k)) + k);
    b = 1 - Math.min(1, (y * (1 - k)) + k);

    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return [r, g, b];
  }
}
