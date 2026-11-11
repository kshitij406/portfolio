export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`foot ${className}`}>
      <p>
        © 2026 Kshitij Jha
        <a href="mailto:kshitij.j615@gmail.com">kshitij.j615@gmail.com</a>
      </p>
      <p>
        <a href="/Kshitij_Jha_CV.pdf" target="_blank" rel="noreferrer">
          CV
        </a>
      </p>
    </footer>
  );
}
