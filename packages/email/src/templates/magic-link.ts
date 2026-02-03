export function MagicLinkEmail(url: string) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Se connecter - La Brocante Scoute</title>
    </head>
    <body>
      <p>Bonjour,</p>
      <p>Vous pouvez vous connecter en cliquant sur le lien ci-dessous.</p>
      <a href="${url}">Se connecter</a>
      <p>Si vous n'avez pas demandé cette vérification, vous pouvez l'ignorer.</p>
    </body>
  </html>
  `;
}
