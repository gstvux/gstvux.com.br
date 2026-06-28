'use client';

import { useState, useEffect } from 'react';

type LineKind = 'prompt' | 'info' | 'warn' | 'ok' | 'result';

interface TerminalStep {
  kind: LineKind;
  text: string;
}

const STEPS: TerminalStep[] = [
  { kind: 'prompt', text: 'init --client setor-moveleiro' },
  { kind: 'info',   text: '→ mapeando processo de cadastro...' },
  { kind: 'warn',   text: '↳ 490 peças/lote · 29 campos = 14.210 inputs manuais' },
  { kind: 'warn',   text: '↳ tempo manual: ~4h por lote de planilhas' },
  { kind: 'prompt', text: 'build_automacao --stack rpa+python' },
  { kind: 'ok',     text: '✓ 3 robôs orquestrados (pai + 2 filhos)' },
  { kind: 'ok',     text: '✓ engine python · triple-parser antifrágil' },
  { kind: 'ok',     text: '✓ ancoragem dinâmica de colunas por fornecedor' },
  { kind: 'prompt', text: 'run --modo producao' },
  { kind: 'result', text: '4 planilhas · 490 peças processadas em 27s' },
  { kind: 'result', text: '-94% tempo de cadastro · 0 erros de digitação' },
];

const CHAR_DELAY_MS = 24;
const LINE_PAUSE_MS = 380;
const END_PAUSE_MS = 4200;

const LINE_COLORS: Record<LineKind, string> = {
  prompt: 'var(--color-lime-code)',
  info:   'var(--color-off-white-muted)',
  warn:   '#D4973B',
  ok:     'var(--color-lime-code)',
  result: 'var(--color-off-white)',
};

interface DoneLine extends TerminalStep {
  id: number;
}

export function HeroTerminal() {
  const [doneLines, setDoneLines] = useState<DoneLine[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'done'>('typing');
  const [hovered, setHovered] = useState(false);

  const isDone = stepIdx >= STEPS.length;
  const currentStep = isDone ? null : STEPS[stepIdx];

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(() => {
        setDoneLines([]);
        setStepIdx(0);
        setCharIdx(0);
        setPhase('typing');
      }, END_PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => {
        if (stepIdx >= STEPS.length) {
          setPhase('done');
        } else {
          setPhase('typing');
        }
      }, LINE_PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (!currentStep) {
      setPhase('done');
      return;
    }

    const fullText = currentStep.text;
    if (charIdx < fullText.length) {
      const delay = hovered ? CHAR_DELAY_MS * 0.5 : CHAR_DELAY_MS;
      const t = setTimeout(() => setCharIdx(c => c + 1), delay);
      return () => clearTimeout(t);
    }

    // line complete — commit it, advance
    setDoneLines(prev => [...prev, { ...currentStep, id: prev.length }]);
    setStepIdx(i => i + 1);
    setCharIdx(0);
    setPhase('pausing');
  }, [charIdx, stepIdx, phase, currentStep, hovered]);

  const displayText = currentStep ? currentStep.text.slice(0, charIdx) : '';
  const displayKind = currentStep ? currentStep.kind : 'prompt';

  return (
    <div
      className="relative flex flex-col gap-0 font-utils text-size-body-sm rounded-xl w-full max-w-[420px] overflow-hidden"
      style={{
        background: 'color-mix(in oklab, var(--color-deep-black-50) 90%, transparent)',
        border: `1px solid color-mix(in oklab, var(--color-lime-code) ${hovered ? '35%' : '18%'}, transparent)`,
        boxShadow: hovered
          ? '0 0 28px color-mix(in oklab, var(--color-lime-code) 12%, transparent)'
          : '0 0 0px transparent',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{
          borderColor: 'color-mix(in oklab, var(--color-lime-code) 14%, transparent)',
          background: 'color-mix(in oklab, var(--color-deep-black) 60%, transparent)',
        }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: 'color-mix(in oklab, var(--color-off-white-dim) 50%, transparent)' }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: 'color-mix(in oklab, var(--color-off-white-dim) 50%, transparent)' }}
        />
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: 'var(--color-lime-code)' }}
        />
        <span
          className="ml-3 text-size-body-xs tracking-wide"
          style={{ color: 'var(--color-off-white-dim)' }}
        >
          automacao.py
        </span>
        <span
          className="ml-auto text-size-body-xs"
          style={{ color: 'color-mix(in oklab, var(--color-lime-code) 45%, transparent)' }}
        >
          rpa · python
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1 px-4 py-3 min-h-[200px]">
        {/* Completed lines */}
        {doneLines.map((line) => (
          <TerminalLine key={line.id} kind={line.kind} text={line.text} done />
        ))}

        {/* Current typing line */}
        {!isDone && (
          <TerminalLine kind={displayKind} text={displayText} cursor />
        )}

        {/* Restart indicator */}
        {phase === 'done' && (
          <p className="mt-2 text-size-body-xs animate-pulse" style={{ color: 'color-mix(in oklab, var(--color-lime-code) 40%, transparent)' }}>
            iniciando novo ciclo...
          </p>
        )}
      </div>
    </div>
  );
}

function TerminalLine({
  kind,
  text,
  done = false,
  cursor = false,
}: {
  kind: LineKind;
  text: string;
  done?: boolean;
  cursor?: boolean;
}) {
  const color = LINE_COLORS[kind];
  const isPrompt = kind === 'prompt';

  return (
    <p
      className="leading-relaxed break-all"
      style={{
        color,
        opacity: done ? (kind === 'info' || kind === 'warn' ? 0.75 : 1) : 1,
      }}
    >
      {isPrompt && (
        <span style={{ color: 'var(--color-lime-code)', opacity: 0.6, marginRight: '6px' }}>
          %&gt;
        </span>
      )}
      {!isPrompt && (
        <span style={{ display: 'inline-block', width: '18px' }} />
      )}
      {text}
      {cursor && <Cursor />}
    </p>
  );
}

function Cursor() {
  return (
    <span
      className="inline-block align-middle ml-0.5"
      style={{
        width: '7px',
        height: '0.85em',
        background: 'var(--color-lime-code)',
        animation: 'terminal-blink 1s step-end infinite',
        verticalAlign: 'text-bottom',
      }}
    />
  );
}
