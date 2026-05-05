export interface CertificateParams {
  userName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
}

export function generateCertificate(params: CertificateParams): string {
  const { userName, courseName, completionDate, certificateId } = params;

  // Escape XML special characters
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const nameEsc = esc(userName);
  const courseEsc = esc(courseName);
  const dateEsc = esc(completionDate);
  const idEsc = esc(certificateId);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f2942;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a3a5c;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0d9488;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#14b8a6;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#bgGrad)" rx="8" />

  <!-- Inner border -->
  <rect x="20" y="20" width="760" height="560" fill="none" stroke="#0d9488" stroke-width="2" rx="4" stroke-dasharray="8 4" />
  <rect x="30" y="30" width="740" height="540" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" rx="4" />

  <!-- Top accent bar -->
  <rect x="30" y="30" width="740" height="6" fill="url(#accentGrad)" rx="3" />

  <!-- Logo text -->
  <text x="400" y="85" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="bold" fill="#0d9488">bookedai.au</text>

  <!-- Decorative line -->
  <line x1="250" y1="105" x2="550" y2="105" stroke="#0d9488" stroke-width="1" opacity="0.5" />

  <!-- Certificate title -->
  <text x="400" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="rgba(255,255,255,0.6)" letter-spacing="6">CERTIFICATE OF COMPLETION</text>

  <!-- Decorative line -->
  <line x1="200" y1="170" x2="600" y2="170" stroke="rgba(255,255,255,0.2)" stroke-width="1" />

  <!-- "This certifies that" -->
  <text x="400" y="210" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="rgba(255,255,255,0.7)">This certifies that</text>

  <!-- Recipient name -->
  <text x="400" y="260" text-anchor="middle" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="white">${nameEsc}</text>

  <!-- Name underline -->
  <line x1="180" y1="275" x2="620" y2="275" stroke="#0d9488" stroke-width="2" />

  <!-- "has successfully completed" -->
  <text x="400" y="315" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="rgba(255,255,255,0.7)">has successfully completed the course</text>

  <!-- Course name -->
  <text x="400" y="360" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#14b8a6">${courseEsc}</text>

  <!-- Date -->
  <text x="400" y="410" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="rgba(255,255,255,0.6)">Completed on ${dateEsc}</text>

  <!-- Decorative divider -->
  <line x1="300" y1="440" x2="500" y2="440" stroke="rgba(255,255,255,0.2)" stroke-width="1" />

  <!-- Signature area -->
  <text x="200" y="490" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-style="italic" fill="rgba(255,255,255,0.8)">Long Do</text>
  <line x1="120" y1="498" x2="280" y2="498" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
  <text x="200" y="515" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="rgba(255,255,255,0.5)">Founder, bookedai.au</text>

  <!-- Platform info -->
  <text x="600" y="490" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="12" fill="rgba(255,255,255,0.5)">AI-Powered Learning</text>
  <line x1="520" y1="498" x2="680" y2="498" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
  <text x="600" y="515" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="10" fill="rgba(255,255,255,0.5)">longcare.au</text>

  <!-- Bottom accent bar -->
  <rect x="30" y="564" width="740" height="6" fill="url(#accentGrad)" rx="3" />

  <!-- Certificate ID -->
  <text x="400" y="555" text-anchor="middle" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.35)">Certificate ID: ${idEsc}</text>
</svg>`;
}
