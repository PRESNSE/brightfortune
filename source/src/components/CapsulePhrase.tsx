export function CapsulePhrase({ id }: { id: string }) {
  return <svg className="capsule-phrase" viewBox="0 0 360 600" aria-hidden="true">
    <defs><path id={`capsule-${id}`} d="M180 22a158 158 0 0 1 158 158v240a158 158 0 0 1-316 0V180A158 158 0 0 1 180 22Z" /></defs>
    <text><textPath href={`#capsule-${id}`} textLength="1450" lengthAdjust="spacing">Closer to what matters. • Closer to what matters. • Closer to what matters. • Closer to what matters. • </textPath></text>
  </svg>;
}
