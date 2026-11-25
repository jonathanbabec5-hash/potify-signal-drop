# Signal Drop 001

[Complete repository directory tree](docs/DIRECTORY.md)

**QR component and decoding test.** Connect a printed signal card to one verifiable ecosystem destination.

### Setup and usage

Use Node.js 24 for the included checks. Use Python 3 for the local static preview.

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory public
```

Scan the sample card. Open http://127.0.0.1:8000/ in a browser. 

### Developer entry points

The printed matrix from the Launch Room encodes the original campaign link. A regression test decodes the actual modules. Explore `app/`, `public/`, `tests/` in the full tree.

### Verification

The original QR regression test decoded the matrix to its fixed public URL. An actual printed scan on a physical device is outstanding.

```sh
node --test tests/qr-matrix.test.mjs
```

### Release scope

A decoded QR proves the payload. Attendance, actual redirect destination and sales need separate receipts. potify-launch-room at `6aabc005854f87b5c3bc9065cbc62383e1b58f83`. Original QR component and decoder test. The portable SVG adds a four-module quiet zone. The hosted short route currently has a home redirect in source.

[Technical whitepaper](docs/WHITEPAPER.md) · [Marketing and sales plan](docs/MARKETING.md) · [Dated developer log](docs/BUILD-LOG.md)

Existing asset and code terms remain applicable. Public access to a recording, illustration, brand or manuscript does not itself grant commercial reuse rights.
