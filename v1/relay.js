var Relay=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=`
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
`,n=`
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
`;function r(e){"@babel/helpers - typeof";return r=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},r(e)}function i(e,t){if(r(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||`default`);if(r(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function a(e){var t=i(e,`string`);return r(t)==`symbol`?t:t+``}function o(e,t,n){return(t=a(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s=`form, heading, intro, label, label-text, optional, input, select, textarea, error, form-error, counter, actions, button, primary, secondary, note, done, link`,c=[`source`,`kind`,`fields`,`whatsapp`,`email`,`topic`,`greeting`,`subject`,`heading`,`intro`],l=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.3A8.5 8.5 0 1 1 21 12z"/></svg>`,u=class extends HTMLElement{constructor(...e){super(...e),o(this,`root`,this.attachShadow({mode:`open`}))}connectedCallback(){let e=this.getAttribute(`label`)||`Let's talk`;this.root.innerHTML=`<style>${n}</style>
      <button class="fab" part="fab" type="button" aria-haspopup="dialog" aria-label="${e}">${l}<span class="text" part="fab-text">${e}</span></button>
      <dialog part="dialog" aria-label="${this.getAttribute(`heading`)||e}">
        <div class="close-bar"><button class="close" part="close" type="button" aria-label="Close">×</button></div>
      </dialog>`,this.root.querySelector(`.fab`).addEventListener(`click`,()=>this.open());let t=this.root.querySelector(`dialog`);this.root.querySelector(`.close`).addEventListener(`click`,()=>t.close()),t.addEventListener(`click`,e=>e.target===t&&t.close())}open(e={}){let t=this.root.querySelector(`dialog`);if(!t)return;t.querySelector(`relay-form`)?.remove();let n=document.createElement(`relay-form`);n.setAttribute(`exportparts`,s);for(let t of c){let r=e[t]??this.getAttribute(t);r&&n.setAttribute(t,r)}t.append(n),t.showModal(),n.focusFirst(),this.dispatchEvent(new CustomEvent(`relay:open`,{bubbles:!0,composed:!0,detail:{source:n.getAttribute(`source`),kind:n.getAttribute(`kind`)}}))}};function d(e,t,n){let r=e=>n===`whatsapp`?`*${e}*`:e,i=[],a=[t.greeting||`Hello,`,e.topic?`I'd like to talk about ${r(e.topic)}.`:``];i.push(a.filter(Boolean).join(` `));let o=[[`Name`,e.name],[`Company`,e.company],[`Email`,e.email],[`Phone`,e.phoneE164],[`Budget`,e.budget],[`Timeline`,e.timeline]].filter(([,e])=>e);return o.length&&i.push(``,...o.map(([e,t])=>`${r(`${e}:`)} ${t}`)),e.message&&i.push(``,e.message),i.push(``,`— sent via ${t.source} · ${t.kind} · ${t.page}`),i.join(`
`)}function f(e,t){return`https://wa.me/${e.replace(/\D/g,``)}?text=${encodeURIComponent(t)}`}function p(e,t,n){return`mailto:${e}?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(n)}`}var m=[{code:`91`,label:`India`,digits:[10,10],pattern:/^[6-9]/},{code:`1`,label:`US / Canada`,digits:[10,10],pattern:/^[2-9]/},{code:`44`,label:`UK`,digits:[10,10]},{code:`971`,label:`UAE`,digits:[8,9]},{code:`966`,label:`Saudi Arabia`,digits:[9,9]},{code:`974`,label:`Qatar`,digits:[8,8]},{code:`61`,label:`Australia`,digits:[9,9]},{code:`65`,label:`Singapore`,digits:[8,8]},{code:`49`,label:`Germany`,digits:[7,12]},{code:`977`,label:`Nepal`,digits:[8,10]}],h={name:80,company:100,topic:120,message:1500,email:254},g=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,_=/^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u,v=e=>(e??``).trim();function y(e,t){let n=e.replace(/[\s().-]/g,``).replace(/^\+?0*/,``);if(!n)return{};if(!/^\d+$/.test(n))return{error:`Use digits only.`};let r=m.find(e=>e.code===t);if(!r)return{error:`Pick a country code.`};let i=n.length>r.digits[1]&&n.startsWith(r.code)?n.slice(r.code.length):n,[a,o]=r.digits;return i.length<a||i.length>o?{error:a===o?`Enter a ${a}-digit number.`:`Enter ${a}–${o} digits.`}:r.pattern&&!r.pattern.test(i)?{error:`This doesn’t look like a valid number.`}:r.code.length+i.length>15?{error:`This number is too long.`}:{e164:`+${r.code}${i}`}}function b(e){let t={},n={},r=v(e.name);r&&(r.length<2||r.length>h.name||!_.test(r)?t.name=`Use letters only (2–80).`:n.name=r.replace(/\s+/g,` `));let i=v(e.email);if(i){if(i.length>h.email||!g.test(i))t.email=`Enter an email like name@example.com.`;else{let e=i.lastIndexOf(`@`);n.email=i.slice(0,e)+i.slice(e).toLowerCase()}}if(v(e.phone)){let r=y(v(e.phone),e.country||`91`);r.error?t.phone=r.error:n.phoneE164=r.e164}for(let r of[`company`,`topic`]){let i=v(e[r]);i.length>h[r]?t[r]=`Keep it under ${h[r]} characters.`:i&&(n[r]=i)}for(let t of[`budget`,`timeline`])v(e[t])&&(n[t]=v(e[t]));let a=v(e.message);return a.length>h.message?t.message=`Keep it under ${h.message} characters.`:a&&(n.message=a),!n.message&&!n.email&&!n.phoneE164&&!Object.keys(t).length&&(t.form=`Write a message, or leave an email or phone number so I can reply.`),{errors:t,clean:n}}var x=[`Under ₹25k`,`₹25k–50k`,`₹50k–1L`,`₹1L–3L`,`₹3L+`,`Not sure yet`],S=[`As soon as possible`,`Within a month`,`1–3 months`,`Just exploring`],C=`name,email,phone,message`,w=e=>e.replace(/[&<>"']/g,e=>`&#${e.charCodeAt(0)};`),T=e=>`<span part="label-text">${e} <span class="opt" part="optional">(optional)</span></span>`;function E(e,t){switch(e){case`name`:return`<label part="label">${T(`Name`)}<input part="input" name="name" autocomplete="name" maxlength="${h.name}"><span class="err" part="error" id="e-name"></span></label>`;case`email`:return`<label part="label">${T(`Email`)}<input part="input" name="email" type="email" autocomplete="email" inputmode="email" maxlength="${h.email}" placeholder="name@example.com"><span class="err" part="error" id="e-email"></span></label>`;case`phone`:return`<label part="label">${T(`Phone / WhatsApp`)}<span class="phone">
        <select part="input select" name="country" aria-label="Country code">${m.map(e=>`<option value="${e.code}">+${e.code} ${e.label}</option>`).join(``)}</select>
        <input part="input" name="phone" type="tel" autocomplete="tel-national" inputmode="tel" maxlength="20" placeholder="98765 43210">
      </span><span class="err" part="error" id="e-phone"></span></label>`;case`company`:return`<label part="label">${T(`Company`)}<input part="input" name="company" autocomplete="organization" maxlength="${h.company}"><span class="err" part="error" id="e-company"></span></label>`;case`topic`:return`<label part="label">${T(`What’s it about?`)}<input part="input" name="topic" maxlength="${h.topic}" value="${w(t)}" placeholder="e.g. a booking website"><span class="err" part="error" id="e-topic"></span></label>`;case`budget`:return`<label part="label">${T(`Budget`)}<select part="input select" name="budget"><option value="">Choose…</option>${x.map(e=>`<option>${e}</option>`).join(``)}</select></label>`;case`timeline`:return`<label part="label">${T(`Timeline`)}<select part="input select" name="timeline"><option value="">Choose…</option>${S.map(e=>`<option>${e}</option>`).join(``)}</select></label>`;case`message`:return`<label part="label">${T(`Message`)}<textarea part="input textarea" name="message" maxlength="${h.message}" placeholder="A few lines about what you need"></textarea><span class="count" part="counter" aria-live="polite"></span><span class="err" part="error" id="e-message"></span></label>`;default:return``}}var D=new Set([`name+email`,`budget+timeline`,`company+topic`]),O=class extends HTMLElement{constructor(...e){super(...e),o(this,`root`,this.attachShadow({mode:`open`}))}connectedCallback(){this.render()}attributeChangedCallback(){this.isConnected&&this.render()}get fieldList(){return(this.getAttribute(`fields`)||C).split(`,`).map(e=>e.trim()).filter(Boolean)}render(){let e=this.fieldList,n=this.getAttribute(`topic`)||``,r=[];for(let t=0;t<e.length;t++){let i=`${e[t]}+${e[t+1]}`;D.has(i)?(r.push(`<div class="row">${E(e[t],n)}${E(e[t+1],n)}</div>`),t++):r.push(E(e[t],n))}let i=this.getAttribute(`whatsapp`),a=this.getAttribute(`email`),o=this.getAttribute(`heading`),s=this.getAttribute(`intro`);this.root.innerHTML=`<style>${t}</style>
      <form novalidate part="form">
        ${o?`<h2 part="heading">${w(o)}</h2>`:``}
        ${s?`<p class="intro" part="intro">${w(s)}</p>`:``}
        ${r.join(``)}
        <input class="sr" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <p class="err" part="error form-error" id="e-form" role="alert"></p>
        <div class="actions" part="actions">
          ${i?`<button type="submit" class="primary" part="button primary" value="whatsapp">Send on WhatsApp</button>`:``}
          ${a?`<button type="submit" class="${i?`secondary`:`primary`}" part="button ${i?`secondary`:`primary`}" value="email">Send by email</button>`:``}
        </div>
        <p class="note" part="note">Opens ${i&&a?`WhatsApp or your email app`:i?`WhatsApp`:`your email app`} with your message ready — just press Send.</p>
      </form>`;let c=this.root.querySelector(`form`);c.addEventListener(`submit`,e=>this.send(e)),c.addEventListener(`input`,e=>this.clearError(e.target)),this.updateCount()}focusFirst(){this.root.querySelector(`input:not(.sr), select, textarea`)?.focus()}values(){let e=new FormData(this.root.querySelector(`form`)),t=t=>e.get(t)??void 0;return{name:t(`name`),email:t(`email`),phone:t(`phone`),country:t(`country`),company:t(`company`),topic:t(`topic`),budget:t(`budget`),timeline:t(`timeline`),message:t(`message`)}}showErrors(e){for(let e of this.root.querySelectorAll(`.err`))e.textContent=``;for(let e of this.root.querySelectorAll(`[aria-invalid]`))e.removeAttribute(`aria-invalid`);for(let[t,n]of Object.entries(e)){let e=this.root.getElementById(`e-${t}`);e&&(e.textContent=n??``);let r=this.root.querySelector(`[name="${t}"]`);r&&(r.setAttribute(`aria-invalid`,`true`),r.setAttribute(`aria-describedby`,`e-${t}`))}this.root.querySelector(`[aria-invalid="true"]`)?.focus()}clearError(e){let t=e.getAttribute(`name`);if(t===`message`&&this.updateCount(),!t)return;e.removeAttribute(`aria-invalid`);let n=this.root.getElementById(`e-${t}`);n&&(n.textContent=``);let r=this.root.getElementById(`e-form`);r&&(r.textContent=``)}updateCount(){let e=this.root.querySelector(`textarea[name="message"]`),t=this.root.querySelector(`.count`);e&&t&&(t.textContent=e.value.length>h.message*.7?`${e.value.length}/${h.message}`:``)}send(e){e.preventDefault();let t=this.root.querySelector(`form`);if(new FormData(t).get(`website`)?.trim())return;let{errors:n,clean:r}=b(this.values());if(Object.keys(n).length)return this.showErrors(n);let i=e.submitter?.value===`email`?`email`:`whatsapp`,a=this.getAttribute(`source`)||location.hostname,o=this.getAttribute(`kind`)||`contact`,s=d(r,{source:a,kind:o,page:location.pathname+location.search,greeting:this.getAttribute(`greeting`)||void 0},i);if(i===`whatsapp`)window.open(f(this.getAttribute(`whatsapp`)||``,s),`_blank`,`noopener`);else{let e=(this.getAttribute(`subject`)||`Message`)+(r.topic?`: ${r.topic}`:``);location.href=p(this.getAttribute(`email`)||``,e,s)}this.dispatchEvent(new CustomEvent(`relay:send`,{bubbles:!0,composed:!0,detail:{channel:i,source:a,kind:o}})),this.showDone(i,s)}showDone(e,n){let r=e===`whatsapp`?`WhatsApp`:`your email app`;this.root.innerHTML=`<style>${t}</style>
      <div class="done" part="done" role="status">
        <h2 part="heading">Almost there ✓</h2>
        <p>${r} should have opened with your message. Press <strong>Send</strong> there and I'll reply soon.</p>
        <p>Didn't open? <button class="link" part="link" data-copy>Copy the message</button> <button class="link" part="link" data-back>Edit and try again</button></p>
      </div>`,this.root.querySelector(`[data-copy]`)?.addEventListener(`click`,async e=>{try{await navigator.clipboard.writeText(n),e.target.textContent=`Copied ✓`}catch{e.target.textContent=`Copy failed`}}),this.root.querySelector(`[data-back]`)?.addEventListener(`click`,()=>this.render())}};o(O,`observedAttributes`,[`fields`,`whatsapp`,`email`,`topic`,`heading`,`intro`]),customElements.get(`relay-form`)||customElements.define(`relay-form`,O),customElements.get(`relay-button`)||customElements.define(`relay-button`,u);function k(e={}){let t=document.querySelector(`relay-button`);return t?(t.open(e),!0):!1}return e.RelayButton=u,e.RelayForm=O,e.open=k,e.version=`1.1.1`,e})({});