import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/95">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Météo Bénin</h3>
            <p className="text-sm text-muted-foreground">
              Service de prévisions météorologiques précises et localisées pour le Bénin
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/weather" className="block hover:text-primary">
                Prévisions
              </Link>
              <Link href="/statistics" className="block hover:text-primary">
                Statistiques
              </Link>
              <Link href="/about" className="block hover:text-primary">
                À propos
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p>Email: contact@meteobenin.com</p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/votre-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/votre-compte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Météo Bénin. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
