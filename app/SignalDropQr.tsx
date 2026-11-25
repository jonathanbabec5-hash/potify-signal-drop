import Link from "next/link";

const signalDropModules = [
  "111111100100001000011111001111111",
  "100000101101100100001010101000001",
  "101110100111000100100111001011101",
  "101110101101010111000011101011101",
  "101110100010101010111001101011101",
  "100000101010000111000100001000001",
  "111111101010101010101010101111111",
  "000000000000100010000110000000000",
  "111110111110110001010011110101010",
  "110011000100001010011001001000111",
  "000110110101100100101110011001010",
  "110001010111001000110101000010100",
  "011110111101000111000011110111000",
  "011111001110110010011101001100011",
  "011001101100011100000110000000010",
  "000001001000110110111111010110100",
  "100111110000101101110001110010010",
  "011000001000000011110001011001011",
  "001110110001100111000110110111010",
  "100010001101001010101111110000100",
  "110111110011000001001010010110010",
  "100110001100111000011101001001011",
  "101111100000011101101110011001010",
  "101010010110110000011110001111100",
  "101111101000101111010001111111001",
  "000000001100000011111000100010101",
  "111111101111100110101111101010110",
  "100000100001001010000110100011101",
  "101110101101000001011010111110011",
  "101110101100111000011100110111011",
  "101110101100011110001000001001000",
  "100000101100110110111110000101100",
  "111111101000101101010011111001010",
];

const quietZone = 4;
const gridSize = signalDropModules.length + quietZone * 2;
const target = "https://potify-launch-room.wile-e-coyot.chatgpt.site/r/drop001";

export function SignalDropQr() {
  return (
    <Link className="signal-qr" href="/r/drop001" aria-label="Open the Signal Drop 001 status record">
      <span className="signal-qr-visual" aria-hidden="true">
        <span className="broadcast-ring ring-a" />
        <span className="broadcast-ring ring-b" />
        <span className="hourglass-notch"><i /><i /></span>
        <span className="signal-route"><i className="signal-pulse" /><span>CURRENT SIGNAL</span></span>
        <svg className="signal-qr-code" viewBox={`0 0 ${gridSize} ${gridSize}`} shapeRendering="crispEdges">
          <rect width={gridSize} height={gridSize} fill="#f1eadb" />
          {signalDropModules.flatMap((row, rowIndex) =>
            [...row].map((module, columnIndex) => module === "1" ? (
              <rect
                key={`${rowIndex}-${columnIndex}`}
                x={columnIndex + quietZone}
                y={rowIndex + quietZone}
                width="1"
                height="1"
                fill="#060806"
              />
            ) : null),
          )}
        </svg>
      </span>
      <span className="signal-qr-copy">
        <small>PERMANENT STATUS ROUTE</small>
        <strong>Open Signal Drop 001</strong>
        <code>/r/drop001</code>
        <span>{target}</span>
      </span>
    </Link>
  );
}
