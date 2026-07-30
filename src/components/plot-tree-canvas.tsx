"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PlotNode = { id: string; label: string; x: number; y: number; kind: "main" | "choice" | "ending" };
const nodes: PlotNode[] = [
  { id: "school", label: "Герою плохо в школе", x: 360, y: 20, kind: "main" },
  { id: "pills", label: "Отказаться от таблеток", x: 360, y: 130, kind: "choice" },
  { id: "pills-end", label: "Выпить: состояние нормализуется", x: 720, y: 130, kind: "ending" },
  { id: "night", label: "Шорохи и смех ночью", x: 360, y: 240, kind: "main" },
  { id: "basement", label: "Не спускаться в подвал", x: 360, y: 350, kind: "choice" },
  { id: "basement-end", label: "Спуститься: человек в маске", x: 0, y: 350, kind: "ending" },
  { id: "cameras", label: "Камеры и отключение света", x: 360, y: 460, kind: "main" },
  { id: "fight", label: "Взять пистолет", x: 360, y: 570, kind: "choice" },
  { id: "fight-end", label: "Кулаки: незнакомец обезврежен", x: 720, y: 570, kind: "ending" },
  { id: "mask", label: "Нападение человека в маске", x: 360, y: 680, kind: "main" },
  { id: "cave", label: "Пещера внутри сознания", x: 360, y: 790, kind: "main" },
  { id: "lab", label: "Лаборатория и флешка", x: 360, y: 900, kind: "main" },
  { id: "chase", label: "Погоня и уничтожение флешки", x: 360, y: 1010, kind: "ending" },
  { id: "sequel", label: "Сиквел: новый герой и граффити", x: 360, y: 1140, kind: "main" },
  { id: "theft", label: "Кража сока и новая погоня", x: 360, y: 1250, kind: "main" },
  { id: "crash", label: "Авария и флешка в снегу", x: 360, y: 1360, kind: "main" },
  { id: "address", label: "«Теперь мы знаем ваш адрес»", x: 360, y: 1470, kind: "ending" },
];
const edges = [
  ["school", "pills"], ["pills", "pills-end"], ["pills", "night"], ["night", "basement"],
  ["basement", "basement-end"], ["basement", "cameras"], ["cameras", "fight"],
  ["fight", "fight-end"], ["fight", "mask"], ["mask", "cave"], ["cave", "lab"], ["lab", "chase"],
  ["chase", "sequel"], ["sequel", "theft"], ["theft", "crash"], ["crash", "address"],
] as const;

const minScale = 0.45;
const maxScale = 1.8;
export function PlotTreeCanvas({ compact = false }: { compact?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const [scale, setScale] = useState(compact ? 0.56 : 0.72);
  const [offset, setOffset] = useState({ x: compact ? 12 : 40, y: 18 });

  const draw = useCallback(() => {
    const element = canvas.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    element.width = Math.round(rect.width * ratio);
    element.height = Math.round(rect.height * ratio);
    const context = element.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    const styles = getComputedStyle(element);
    const ink = styles.getPropertyValue("--plot-ink").trim() || "#181918";
    const paper = styles.getPropertyValue("--plot-paper").trim() || "#f2f0e9";
    const surface = styles.getPropertyValue("--plot-surface").trim() || "#fbfaf6";
    const accent = styles.getPropertyValue("--accent").trim() || "#d94535";
    context.clearRect(0, 0, rect.width, rect.height);
    context.translate(offset.x, offset.y);
    context.scale(scale, scale);
    const byId = new Map(nodes.map((node) => [node.id, node]));
    context.lineWidth = 3 / scale;
    context.lineCap = "round";
    for (const [fromId, toId] of edges) {
      const from = byId.get(fromId)!; const to = byId.get(toId)!;
      const fromX = from.x + 130; const fromY = from.y + 72;
      const toX = to.x + 130; const toY = to.y;
      context.strokeStyle = to.kind === "ending" ? accent : ink;
      context.beginPath(); context.moveTo(fromX, fromY);
      const middle = (fromY + toY) / 2;
      context.bezierCurveTo(fromX, middle, toX, middle, toX, toY);
      context.stroke();
    }
    for (const node of nodes) {
      context.fillStyle = node.kind === "ending" ? ink : surface;
      context.strokeStyle = node.kind === "choice" ? accent : ink;
      context.lineWidth = node.kind === "choice" ? 4 / scale : 2 / scale;
      context.beginPath(); context.roundRect(node.x, node.y, 260, 72, 12); context.fill(); context.stroke();
      context.fillStyle = node.kind === "ending" ? paper : ink;
      context.font = "600 17px 'Segoe UI', sans-serif";
      context.textAlign = "center"; context.textBaseline = "middle";
      const words = node.label.split(" "); const lines: string[] = []; let line = "";
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (context.measureText(candidate).width > 220 && line) { lines.push(line); line = word; } else line = candidate;
      }
      lines.push(line);
      lines.forEach((text, index) => context.fillText(text, node.x + 130, node.y + 36 + (index - (lines.length - 1) / 2) * 21));
    }
  }, [offset, scale]);

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(draw);
    if (canvas.current) observer.observe(canvas.current);
    return () => observer.disconnect();
  }, [draw]);

  const zoom = (factor: number) => setScale((value) => Math.min(maxScale, Math.max(minScale, Number((value * factor).toFixed(2)))));
  return <div className={`plot-canvas-shell${compact ? " compact" : ""}`}>
    <div className="plot-canvas-controls" aria-label="Управление масштабом дерева сюжета">
      <button type="button" onClick={() => zoom(1.2)} aria-label="Увеличить">＋</button>
      <button type="button" onClick={() => zoom(1 / 1.2)} aria-label="Уменьшить">−</button>
      <button type="button" onClick={() => { setScale(compact ? 0.56 : 0.72); setOffset({ x: compact ? 12 : 40, y: 18 }); }}>Сбросить</button>
      <output aria-live="polite">{Math.round(scale * 100)}%</output>
    </div>
    <canvas
      ref={canvas}
      role="img"
      aria-label="Интерактивное дерево сюжета «Выжить в школе»: основная линия идёт вертикально, альтернативные концовки отходят в стороны"
      onWheel={(event) => { event.preventDefault(); zoom(event.deltaY < 0 ? 1.1 : 1 / 1.1); }}
      onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); drag.current = { x: event.clientX, y: event.clientY, ox: offset.x, oy: offset.y }; }}
      onPointerMove={(event) => { if (drag.current) setOffset({ x: drag.current.ox + event.clientX - drag.current.x, y: drag.current.oy + event.clientY - drag.current.y }); }}
      onPointerUp={(event) => { event.currentTarget.releasePointerCapture(event.pointerId); drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
    />
    <p className="plot-canvas-hint">Перетаскивайте схему. Колесо мыши и кнопки меняют масштаб.</p>
  </div>;
}
