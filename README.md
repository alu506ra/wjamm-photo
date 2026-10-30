# WJAMM Photo — Strona internetowa fotografa tanecznego

Nowoczesna, wielojęzyczna strona internetowa dla fotografa tanecznego WJAMM Photo.

## Technologia

- **Next.js 16** z App Router
- **TypeScript**
- **Tailwind CSS v4**
- **next-intl** — internacjonalizacja (9 języków)
- **Resend** — wysyłanie e-maili z formularza kontaktowego
- Dark theme, w pełni responsywna, animacje CSS

## Języki

| Kod | Język |
|-----|-------|
| `pl` | Polski (domyślny) |
| `en` | English |
| `ua` | Українська |
| `ru` | Русский |
| `de` | Deutsch |
| `cz` | Čeština |
| `sk` | Slovenčina |
| `it` | Italiano |
| `sl` | Slovenščina |

## Szybki start (lokalnie)

```bash
# Sklonuj repozytorium
git clone https://github.com/wjamm-photo-manager/wjamm-photo.git
cd wjamm-photo

# Zainstaluj zależności
npm install

# Skopiuj zmienne środowiskowe
cp .env.local.example .env.local
# Uzupełnij RESEND_API_KEY i CONTACT_EMAIL w .env.local

# Uruchom deweloperski serwer
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Zmienne środowiskowe

Utwórz plik `.env.local` (wzorzec w repo):

```env
# Klucz API Resend — https://resend.com
RESEND_API_KEY=re_TWOJ_KLUCZ

# E-mail docelowy formularza kontaktowego
CONTACT_EMAIL=kontakt@wjamm-photo.pl
```

## Deployment — Vercel (zalecane)

### Opcja A: Przez CLI

```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Zaloguj się
vercel login

# Deploy (pierwsze uruchomienie — skonfiguruje projekt)
vercel

# Deployment produkcyjny
vercel --prod
```

### Opcja B: Przez GitHub (automatyczny CI/CD)

1. Wrzuć kod na GitHub (patrz niżej)
2. Wejdź na [vercel.com](https://vercel.com) → **Add New Project**
3. Zaimportuj repozytorium `wjamm-photo-manager/wjamm-photo`
4. W sekcji **Environment Variables** dodaj:
   - `RESEND_API_KEY` → Twój klucz z resend.com
   - `CONTACT_EMAIL` → kontakt@wjamm-photo.pl
5. Kliknij **Deploy** — gotowe!

Każdy push na `main` automatycznie builduje i deployuje stronę.

---

## Deployment — Cloudflare Pages

```bash
# Zainstaluj Wrangler
npm install -g wrangler

# Zaloguj się do Cloudflare
wrangler login

# Zbuduj projekt
npm run build

# Utwórz Pages project i deployuj
wrangler pages deploy .next --project-name=wjamm-photo
```

W panelu Cloudflare Pages dodaj zmienne środowiskowe (Settings → Environment Variables).

---

## Wrzucenie kodu na GitHub

```bash
# Upewnij się, że jesteś w katalogu projektu
cd /agent/wjamm-photo   # lub gdzie pobrałeś projekt

# Utwórz repozytorium na github.com (jeśli jeszcze nie istnieje)
# Zaloguj się jako wjamm-photo-manager i utwórz repo "wjamm-photo"

# Wrzuć kod
git push -u origin main
```

Jeśli GitHub wymaga uwierzytelnienia, użyj **Personal Access Token** (PAT):
1. GitHub → Settings → Developer settings → Personal access tokens → Generate new token
2. Zaznacz scope `repo`
3. Użyj tokena jako hasła podczas `git push`

---

## Co podmienić przed startem

| Co | Gdzie |
|----|-------|
| **Zdjęcie bohatera (Hero)** | Podmień gradient w `components/sections/Hero.tsx` na `<Image>` ze swoim zdjęciem tancerzy |
| **Zdjęcie fotografa (About)** | Podmień placeholder w `components/sections/About.tsx` na `<Image>` |
| **Dane turniejów** | Edytuj `lib/tournaments.ts` — zmień nazwy, daty, miasta i **linki Zalamo** (`zalamo_link`) |
| **Cennik** | Edytuj `lib/pricing.ts` — zmień progi ilościowe i ceny |
| **Telefon kontaktowy** | Zmień `+48 XXX XXX XXX` w `components/sections/Contact.tsx` |
| **E-mail** | Zmień `kontakt@wjamm-photo.pl` w `components/sections/Contact.tsx` i `.env.local` |
| **Social media URL** | Zmień linki Instagram/Facebook w `components/sections/Footer.tsx` |
| **Domena** | Zmień `https://wjamm-photo.pl` w `app/[locale]/layout.tsx` i `app/sitemap.ts` |
| **Google Maps** | Zamień placeholder w `Contact.tsx` na `<iframe>` z Google Maps |

## Struktura projektu

```
wjamm-photo/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx      # Layout z SEO i next-intl
│   │   └── page.tsx        # Strona główna
│   ├── api/contact/
│   │   └── route.ts        # API endpoint formularza (Resend)
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx            # Przekierowanie → /pl
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── sections/           # Header, Hero, About, Tournaments, Pricing, Contact, Footer
│   └── ui/                 # Logo, LanguageSwitcher
├── i18n/
│   ├── routing.ts          # Konfiguracja locales
│   └── request.ts          # Server-side i18n
├── lib/
│   ├── tournaments.ts      # Dane turniejów
│   └── pricing.ts          # Dane cennika
├── messages/               # Tłumaczenia (pl, en, ua, ru, de, cz, sk, it, sl)
├── public/
├── proxy.ts                # Next.js locale routing middleware
├── next.config.ts
├── vercel.json
└── .env.local              # Zmienne środowiskowe (nie commituj!)
```
