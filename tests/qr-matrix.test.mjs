import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const target = "https://potify-launch-room.wile-e-coyot.chatgpt.site/r/drop001";
const G15 = 0x537;
const G15Mask = 0x5412;

function bchDigit(value) {
  let digit = 0;
  while (value !== 0) {
    digit += 1;
    value >>>= 1;
  }
  return digit;
}

function bchTypeInfo(data) {
  let value = data << 10;
  while (bchDigit(value) - bchDigit(G15) >= 0) {
    value ^= G15 << (bchDigit(value) - bchDigit(G15));
  }
  return ((data << 10) | value) ^ G15Mask;
}

const masks = [
  (row, column) => (row + column) % 2 === 0,
  (row) => row % 2 === 0,
  (_row, column) => column % 3 === 0,
  (row, column) => (row + column) % 3 === 0,
  (row, column) => (Math.floor(row / 2) + Math.floor(column / 3)) % 2 === 0,
  (row, column) => (row * column) % 2 + (row * column) % 3 === 0,
  (row, column) => ((row * column) % 2 + (row * column) % 3) % 2 === 0,
  (row, column) => ((row * column) % 3 + (row + column) % 2) % 2 === 0,
];

function isFunctionModule(row, column, size) {
  if (row <= 8 && column <= 8) return true;
  if (row <= 8 && column >= size - 8) return true;
  if (row >= size - 8 && column <= 8) return true;
  if (row === 6 || column === 6) return true;
  return row >= 24 && row <= 28 && column >= 24 && column <= 28;
}

function readFormat(matrix) {
  const size = matrix.length;
  let bits = 0;
  for (let index = 0; index < 15; index += 1) {
    let row;
    if (index < 6) row = index;
    else if (index < 8) row = index + 1;
    else row = size - 15 + index;
    bits |= Number(matrix[row][8]) << index;
  }

  for (const level of [1, 0, 3, 2]) {
    for (let mask = 0; mask < 8; mask += 1) {
      if (bchTypeInfo((level << 3) | mask) === bits) return { level, mask };
    }
  }
  throw new Error("QR format information is invalid");
}

function readCodewords(matrix, maskPattern) {
  const size = matrix.length;
  const bits = [];
  let upward = true;

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let offset = 0; offset < size; offset += 1) {
      const row = upward ? size - 1 - offset : offset;
      for (let side = 0; side < 2; side += 1) {
        const column = right - side;
        if (!isFunctionModule(row, column, size)) {
          bits.push(matrix[row][column] !== masks[maskPattern](row, column));
        }
      }
    }
    upward = !upward;
  }

  const bytes = [];
  for (let index = 0; index + 7 < bits.length; index += 8) {
    let byte = 0;
    for (const bit of bits.slice(index, index + 8)) byte = (byte << 1) | Number(bit);
    bytes.push(byte);
  }
  return bytes;
}

test("QR matrix decodes to the permanent Signal Drop status route", async () => {
  const source = await readFile(new URL("../app/SignalDropQr.tsx", import.meta.url), "utf8");
  const rows = [...source.matchAll(/^  "([01]{33})",$/gm)].map((match) => match[1]);
  assert.equal(rows.length, 33);
  assert.match(source, /const quietZone = 4;/);

  const matrix = rows.map((row) => [...row].map((value) => value === "1"));
  const format = readFormat(matrix);
  assert.deepEqual(format, { level: 1, mask: 2 });

  const codewords = readCodewords(matrix, format.mask);
  const dataBits = codewords.slice(0, 80).map((byte) => byte.toString(2).padStart(8, "0")).join("");
  const mode = Number.parseInt(dataBits.slice(0, 4), 2);
  const length = Number.parseInt(dataBits.slice(4, 12), 2);
  const payload = Buffer.from(
    Array.from({ length }, (_, index) => Number.parseInt(dataBits.slice(12 + index * 8, 20 + index * 8), 2)),
  ).toString("utf8");

  assert.equal(mode, 4);
  assert.equal(payload, target);
});
