# Relay

A drop-in contact and feedback form for any website. Visitors fill in a short form and Relay opens
**WhatsApp** or their **email app** with the message ready to send. No server, no sign-up, one script tag.

**Demo:** https://ritesh-dhekane.github.io/relay/

## Use it

```html
<script src="https://ritesh-dhekane.github.io/relay/v1/relay.js" defer></script>

<!-- A form on the page -->
<relay-form source="my-app" kind="contact" fields="name,email,phone,message"
  whatsapp="91XXXXXXXXXX" email="you@example.com" greeting="Hi Ritesh,"></relay-form>

<!-- Or a floating button (bottom right) that opens the form in a pop-up -->
<relay-button source="my-app" kind="feedback" whatsapp="91XXXXXXXXXX" label="Feedback"></relay-button>
```

Works in plain HTML and in any framework (React, Vue, Svelte) as normal elements.

### Options (attributes)

| Attribute | What it does |
| --- | --- |
| `source`, `kind` | Internal flags added at the end of every message, e.g. `— sent via my-app · feedback · /page` |
| `fields` | Which fields to show, in order: `name`, `email`, `phone`, `company`, `topic`, `budget`, `timeline`, `message` |
| `whatsapp` | Number with country code, digits only. Shows **Send on WhatsApp** |
| `email` | Address. Shows **Send by email** |
| `topic` | Pre-fills the topic field |
| `greeting` | First words of the message (default `Hello,`) |
| `subject` | Email subject (the topic is appended) |
| `heading`, `intro` | Optional title and line above the form |
| `label` | `<relay-button>` only: button text (default `Let's talk`) |

Open the pop-up from code: `Relay.open({ topic: 'a booking website' })`.

### Fields and checks

Every field is optional, but anything filled in must be valid:

- **Phone:** country code + national number in E.164 form (max 15 digits). India (+91) needs 10 digits
  starting 6–9; spaces, dashes and a repeated country code are fine.
- **Email:** the same rule browsers use for `type="email"`, with a dot in the domain.
- **Name:** letters in any language, spaces and `. ' -`.
- **Message:** up to 1,500 characters.

The form can't be sent empty: it needs a message, an email or a phone number. A hidden field catches
simple bots.

### Theming

Set CSS variables on the elements (or a parent): `--relay-accent`, `--relay-accent-ink`, `--relay-bg`,
`--relay-surface`, `--relay-text`, `--relay-muted`, `--relay-line`, `--relay-danger`, `--relay-radius`,
`--relay-font`.

### Events

`relay:open` and `relay:send` (`detail`: `channel`, `source`, `kind`) bubble up to the page for analytics.
They never include what the visitor typed.

## Develop

```bash
npm install
npm run dev        # demo page with hot reload
npm test           # validation and message tests
npm run build      # dist/v1/relay.js + the demo page
```

Releases: work on `dev`, pull request into `prod` (checks must pass), merging deploys to GitHub Pages.

## License

[MIT](LICENSE)
