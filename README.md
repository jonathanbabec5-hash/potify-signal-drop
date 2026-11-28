# Signal Drop 001

## Find your way in

| If you are… | Start here | Try this |
| --- | --- | --- |
| A designer | [Inspect the QR component](app/SignalDropQr.tsx) | See how the printed code is generated. |
| A developer | [Read the decoder test](tests/qr-matrix.test.mjs) | Verify the encoded destination independently. |
| A field tester | [Explore the project tree](docs/DIRECTORY.md) | Record print size, device and destination if testing a physical card. |

[Complete repository directory tree](docs/DIRECTORY.md)

## A printed link cannot receive a hotfix

Once a signal card leaves the printer, the quiet border around its code matters just as much as the URL inside it. Signal Drop 001 makes those tiny black and white decisions inspectable long after somebody has put the paper in a pocket.

Compare the [QR component](app/SignalDropQr.tsx) with the [independent matrix decoder](tests/qr-matrix.test.mjs). The regression checks the encoded destination. It cannot tell us whether a phone camera reads a worn print or where the server sends that visitor today.

If you have an existing print, record its size, the camera used and the actual final destination after a scan. If you only ran the decoder, report the decoded string as a software result. No event attendance or sale can be inferred from either one.

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
