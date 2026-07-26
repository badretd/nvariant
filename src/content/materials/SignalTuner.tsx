"use client";
import { useState } from "react";

export default function SignalTuner() {
  const [value, setValue] = useState(42);
  return <section className="interactive" aria-labelledby="signal-title">
    <div><span className="eyebrow">Уникальный интерактив</span><h3 id="signal-title">Настройка сигнала</h3></div>
    <output aria-live="polite">{value}% · {value < 34 ? "слабый" : value < 67 ? "различимый" : "сильный"}</output>
    <input aria-label="Сила сигнала" type="range" min="0" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} />
    <div className="button-row"><button onClick={() => setValue(Math.max(0, value - 10))}>−10</button><button onClick={() => setValue(Math.min(100, value + 10))}>+10</button></div>
    <noscript>Шкала показывает переход от слабого сигнала к сильному.</noscript>
  </section>;
}
