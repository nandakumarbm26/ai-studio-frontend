function Footer() {
  return (
    <footer className="bg-background border-t py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
        <div>
          <h3 className="text-base font-bold text-foreground mb-2">
            Astraph.AI
          </h3>
          <p>Lightning-fast AI infrastructure for your next-gen products.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Resources</h4>
          <ul className="space-y-1">
            <li>
              <a href="#usecases" className="hover:text-primary">
                Use Cases
              </a>
            </li>
            <li>
              <a href="#why" className="hover:text-primary">
                Why Astraph
              </a>
            </li>
            <li>
              <a href="#docs" className="hover:text-primary">
                Docs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Legal</h4>
          <ul className="space-y-1">
            <li>
              <a href="/terms" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs mt-6 text-muted-foreground">
        © {new Date().getFullYear()} Astraph.AI — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
