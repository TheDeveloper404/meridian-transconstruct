// Monogramă PROVIZORIE pentru iconițe (tab, iOS, manifest) până la primirea logo-ului (B-018).
// Randată de ImageResponse (next/og): doar stiluri inline și flexbox.
export function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#101f3c",
        borderRadius: Math.round(size * 0.12),
        color: "#f8a046",
        fontSize: Math.round(size * 0.68),
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      M
    </div>
  );
}
