import * as d3 from "d3";

const palette = d3.schemeDark2;

export function hashString(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h << 5) + h + s.charCodeAt(i);
  return h >>> 0; // uint32
}

export function colorFromNameHSL(name: string) {
  // const h = hashString(name);
  // const hue = h % 360; // 0..359
  // const sat = 60; // регулируй под тему
  // const light = 50; // регулируй под тему
  // return `hsl(${hue}deg ${sat}% ${light}%)`;
  const h = hashString(name);
  const base = d3.color(palette[h % palette.length])!;
  // «слой» яркости/насыщенности для разведения
  const tier = Math.floor(h / palette.length) % 3; // 0..2
  // чуть варьируем
  const k = tier === 0 ? 0 : tier === 1 ? 0.6 : -0.6;
  const c = base.copy();
  return (k > 0 ? c.brighter(k) : c.darker(-k)).formatHex();
}
