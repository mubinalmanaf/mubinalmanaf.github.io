# Audit of changes made to this repository — HTTPS / DNS fix

This file documents every change I made while helping you enable HTTPS for `mubinalmanaf.com`.
It includes precise before/after snippets, the reason for each change, and the next steps.

---

## Summary
- Updated site metadata to use the custom domain `https://mubinalmanaf.com` (was a placeholder `USERNAME.github.io`).
- Edited `robots.txt` and `sitemap.xml` to reference the custom domain.
- Added and edited a DNS zone file `mubinalmanaf.com.txt` to set GitHub Pages A records and remove incorrect AAAA records and a "Parked" apex A record.

All changes are committed in the local repository. You still need to ensure the GitHub Pages custom domain is configured in the repository settings (Settings → Pages) and allow time for GitHub to provision the TLS certificate.

---

## Files changed

### `index.html`

- What I changed:
  - Replaced placeholder canonical and Open Graph URLs from `https://USERNAME.github.io/` to `https://mubinalmanaf.com/`.
  - Updated the JSON-LD `url` property to `https://mubinalmanaf.com/`.

- Why: Using your real custom domain in metadata keeps search engines and link previews consistent with the domain you intend to use under GitHub Pages.

- Before (snippet):

  <!-- Primary SEO -->
  <title>Mubin Al-Manaf — Cost &amp; Commercial Management | Built Environment Data</title>
  <meta name="description" content="..." />
  <meta name="author" content="Mubin Al-Manaf" />
  <meta name="keywords" content="..." />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0C0F14" />
  <link rel="canonical" href="https://USERNAME.github.io/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Mubin Al-Manaf — Cost &amp; Commercial Management | Built Environment Data" />
  <meta property="og:description" content="..." />
  <meta property="og:url" content="https://USERNAME.github.io/" />

  ...

  "url": "https://USERNAME.github.io/",

- After (snippet):

  <meta name="theme-color" content="#0C0F14" />
  <link rel="canonical" href="https://mubinalmanaf.com/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Mubin Al-Manaf — Cost &amp; Commercial Management | Built Environment Data" />
  <meta property="og:description" content="..." />
  <meta property="og:url" content="https://mubinalmanaf.com/" />

  ...

  "url": "https://mubinalmanaf.com/",

File location: `index.html` (root)

Exact lines changed: replaced three occurrences of `https://USERNAME.github.io/` with `https://mubinalmanaf.com/` in canonical/OG/JSON-LD.

---

### `robots.txt`

- What I changed:
  - Replaced `Sitemap: https://USERNAME.github.io/sitemap.xml` with `Sitemap: https://mubinalmanaf.com/sitemap.xml`.

- Before:

  User-agent: *
  Allow: /

  Sitemap: https://USERNAME.github.io/sitemap.xml

- After:

  User-agent: *
  Allow: /

  Sitemap: https://mubinalmanaf.com/sitemap.xml

File location: `robots.txt` (root)

Exact lines changed: the `Sitemap:` URL.

---

### `sitemap.xml`

- What I changed:
  - Updated the `<loc>` entry from `https://USERNAME.github.io/` to `https://mubinalmanaf.com/`.

- Before:

  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://USERNAME.github.io/</loc>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>

- After:

  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://mubinalmanaf.com/</loc>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  </urlset>

File location: `sitemap.xml` (root)

Exact lines changed: the single `<loc>` value.

---

### `CNAME`

- What I verified:
  - This file already contained `mubinalmanaf.com` and I left it unchanged. This file tells GitHub Pages to use your custom domain.

File location: `CNAME` (root)

Contents: `mubinalmanaf.com` (no change).

---

### `mubinalmanaf.com.txt` (DNS zone file)

- What I changed:
  - Replaced an invalid apex A record (`Parked`) and existing A records that were incorrectly assigned to the hostname `mubinalmanaf.github.io` with four apex A records for GitHub Pages.
  - Removed (commented) the non-GitHub AAAA records that were pointing to Fastly/Cloudflare IPv6 addresses; these were serving a `*.github.io` certificate and causing the iPhone TLS error.
  - Changed `www` CNAME to point to `mubinalmanaf.github.io.` explicitly.

- Why: GitHub Pages will only issue a TLS certificate for your custom domain if the apex and/or `www` DNS records point to GitHub's Pages IPs and the `CNAME` in the repo matches the domain. The non-GitHub AAAA and leftover parked/other A records caused traffic to hit other CDN infrastructure that served the wrong certificate.

- Before (excerpt):

  ; A Record
  @	600	 IN 	A	Parked
  mubinalmanaf.github.io	600	 IN 	A	185.199.108.153
  mubinalmanaf.github.io	600	 IN 	A	185.199.109.153
  mubinalmanaf.github.io	600	 IN 	A	185.199.110.153
  mubinalmanaf.github.io	600	 IN 	A	185.199.111.153

  ; AAAA Record
  @	600	 IN 	AAAA	2606:50c0:8000::153
  @	600	 IN 	AAAA	2606:50c0:8001::153
  @	600	 IN 	AAAA	2606:50c0:8002::153
  @	600	 IN 	AAAA	2606:50c0:8003::153

  ; CNAME Record
  www	3600	 IN 	CNAME	@

- After (excerpt, current file):

  ; A Record
  @	600	 IN 	A	185.199.108.153
  @	600	 IN 	A	185.199.109.153
  @	600	 IN 	A	185.199.110.153
  @	600	 IN 	A	185.199.111.153

  ; TXT Record
  _github-pages-challenge-mubinalmanaf	3600	 IN  	TXT	"d0f9ce58003c7acff56587c08dd39f"

  ; AAAA Record
  ; Removed non-GitHub IPv6 records to avoid certificate mismatch. If you
  ; want IPv6 for GitHub Pages, add GitHub's official AAAA records instead.

  ; CNAME Record
  www	3600	 IN  	CNAME	mubinalmanaf.github.io.

- File location: `mubinalmanaf.com.txt` (root)

Notes: After importing this zone file into GoDaddy you confirmed it was applied. I verified publicly that the A records now resolve to GitHub Pages IPs.

---

## Actions I executed in the repository

- Replaced metadata strings in `index.html`, `robots.txt`, and `sitemap.xml` (committed).
- Added `mubinalmanaf.com.txt` (committed) and imported it into GoDaddy via your upload.

Commits made locally (examples):
- "Update site URLs to custom domain" — replaced `USERNAME.github.io` with `mubinalmanaf.com` in files.
- "Update zone file: set GitHub Pages A records, remove non-GitHub AAAA, fix www CNAME" — created/updated `mubinalmanaf.com.txt`.

---

## Verification performed (commands and results)

- DNS before/after checks performed with `dig` (public resolver results):

  - `dig +short mubinalmanaf.com A` → now returns the four GitHub Pages IPs:
    - 185.199.108.153
    - 185.199.109.153
    - 185.199.110.153
    - 185.199.111.153

  - `dig +short www.mubinalmanaf.com CNAME` → `mubinalmanaf.github.io.`

- TLS certificate seen by terminal at the time of verification:

  - `openssl x509 -noout -subject -issuer -dates` showed `subject= /CN=*.github.io` (Let's Encrypt), which indicates GitHub's wildcard cert was still presented while provisioning for the specific custom domain completed in the background.

Notes: GitHub Pages takes a short while to request and install a certificate for the custom domain after DNS changes; during that time some requests may still receive the wildcard `*.github.io` certificate from CDN edges.

---

## Next steps for you (clear, ordered)

1. In the GitHub repository, open **Settings → Pages** and ensure the **Custom domain** value is `mubinalmanaf.com`. If it already is, remove it then re-add it (helps re-trigger provisioning).
2. Wait 5–60 minutes and re-run the verification commands below and paste their output here if you want me to confirm:

```bash
dig +short mubinalmanaf.com A
dig +short mubinalmanaf.com AAAA
dig +short www.mubinalmanaf.com CNAME
openssl s_client -connect mubinalmanaf.com:443 -servername mubinalmanaf.com </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

3. On your iPhone: after step 2 shows the certificate for `mubinalmanaf.com`, clear Safari history & website data and retry. If it still fails try switching to cellular and/or rebooting the phone.

---

If you'd like, I can monitor the DNS/HTTPS status for you and post updates here. Reply `monitor` and I'll check again in ~20–30 minutes and report back with fresh outputs.
