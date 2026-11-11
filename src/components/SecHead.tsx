export default function SecHead({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 className="sec-h" id={`${id}-h`}>
      {children}
    </h2>
  );
}
