// Shadow-DOM styles. Sites theme Relay by setting these CSS variables on the elements (or any parent):
// --relay-accent, --relay-accent-ink, --relay-bg, --relay-surface, --relay-text, --relay-muted,
// --relay-line, --relay-danger, --relay-radius, --relay-font, --relay-backdrop.
// For full control every piece has a `part` (see README): relay-form::part(input), relay-button::part(dialog)…
export const css = `
:host {
  display: block;
  --a: var(--relay-accent, #2563eb);
  --ai: var(--relay-accent-ink, #fff);
  --bg: var(--relay-bg, #fff);
  --sf: var(--relay-surface, #f5f6f8);
  --tx: var(--relay-text, #16181d);
  --mu: var(--relay-muted, #5f6672);
  --ln: var(--relay-line, #dfe2e7);
  --dg: var(--relay-danger, #c62828);
  --r: var(--relay-radius, 12px);
  font-family: var(--relay-font, inherit);
  color: var(--tx);
}
* { box-sizing: border-box; }
form { display: grid; gap: 14px; }
h2 { margin: 0; font-size: 1.25rem; line-height: 1.3; padding-right: 36px; } /* clear of the pop-up's close button */
.intro { margin: -6px 0 2px; color: var(--mu); font-size: 0.92rem; }
.row { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; }
@media (max-width: 560px) {
  .row { grid-template-columns: 1fr; }
  input, select, textarea { font-size: 16px; } /* 16px+ stops iPhone Safari zooming in on focus */
  .phone { grid-template-columns: minmax(120px, 42%) 1fr; }
  .actions { flex-direction: column; }
  .primary, .secondary { flex: 1 1 100%; width: 100%; }
}
label { display: grid; gap: 6px; font-size: 0.85rem; font-weight: 600; }
.opt { color: var(--mu); font-weight: 400; }
input, select, textarea {
  font: inherit; font-size: 0.95rem; color: var(--tx); background: var(--sf);
  border: 1px solid var(--ln); border-radius: calc(var(--r) * 0.75); padding: 10px 12px; width: 100%;
}
textarea { min-height: 120px; resize: vertical; }
input:focus, select:focus, textarea:focus { outline: 2px solid var(--a); outline-offset: 1px; }
[aria-invalid="true"] { border-color: var(--dg); }
.phone { display: grid; grid-template-columns: minmax(96px, 34%) 1fr; gap: 8px; }
.err { color: var(--dg); font-size: 0.8rem; font-weight: 500; }
.err:empty { display: none; }
.count { justify-self: end; color: var(--mu); font-size: 0.75rem; font-weight: 400; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
button { font: inherit; cursor: pointer; border-radius: calc(var(--r) * 0.75); padding: 11px 16px; font-weight: 700; }
.primary { background: var(--a); color: var(--ai); border: 1px solid var(--a); flex: 1 1 180px; }
.secondary { background: transparent; color: var(--tx); border: 1px solid var(--ln); flex: 1 1 140px; }
.note { margin: 0; color: var(--mu); font-size: 0.8rem; }
.done { display: grid; gap: 10px; text-align: center; padding: 8px 0; }
.done p { margin: 0; color: var(--mu); }
.link { background: none; border: 0; color: var(--a); padding: 4px; font-weight: 600; text-decoration: underline; }
.sr { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
`

export const buttonCss = `
* { box-sizing: border-box; }
:host { position: fixed; right: max(16px, env(safe-area-inset-right)); bottom: max(16px, env(safe-area-inset-bottom)); z-index: 2147483000; }
.fab {
  display: inline-flex; align-items: center; gap: 8px; border: 0; cursor: pointer;
  background: var(--relay-accent, #2563eb); color: var(--relay-accent-ink, #fff);
  font: inherit; font-family: var(--relay-font, inherit); font-weight: 700; font-size: 0.95rem;
  padding: 12px 18px; border-radius: 999px; box-shadow: 0 8px 24px rgba(0,0,0,.18);
  transition: transform .2s ease, box-shadow .2s ease;
}
.fab:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,.22); }
.fab:focus-visible { outline: 3px solid var(--relay-accent, #2563eb); outline-offset: 3px; }
.fab svg { width: 20px; height: 20px; }
dialog {
  border: 1px solid var(--relay-line, #dfe2e7); border-radius: var(--relay-radius, 14px);
  background: var(--relay-bg, #fff); color: var(--relay-text, #16181d);
  width: min(560px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); padding: 22px; overflow: auto;
  box-shadow: 0 24px 64px rgba(0,0,0,.25);
}
dialog::backdrop { background: var(--relay-backdrop, rgba(10,12,16,.45)); }
/* The close button sits in a zero-height bar pinned to the top of the sheet: it stays visible while the
   form scrolls but takes no space, so the form keeps its full width (a float here squeezed the form). */
.close-bar { position: sticky; top: 0; height: 0; z-index: 2; }
.close { position: absolute; top: -12px; right: -12px; width: 40px; height: 40px; display: grid; place-items: center;
  border: 0; background: var(--relay-bg, #fff); cursor: pointer; color: var(--relay-muted, #5f6672);
  font-size: 22px; line-height: 1; padding: 0; border-radius: 8px; }
@media (max-width: 560px) {
  dialog { margin: auto 0 0; width: 100vw; max-width: 100vw; border-radius: var(--relay-radius, 14px) var(--relay-radius, 14px) 0 0;
    border-left: 0; border-right: 0; border-bottom: 0;
    max-height: 90dvh; padding: 20px 16px calc(24px + env(safe-area-inset-bottom)); }
  .fab .text { display: none; }
  .fab { width: 48px; height: 48px; padding: 0; justify-content: center; border-radius: 999px; }
}
@media (prefers-reduced-motion: reduce) { .fab { transition: none; } }
`
