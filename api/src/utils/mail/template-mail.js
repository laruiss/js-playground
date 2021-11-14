/**
 *Renvoi le contenu html du courriel
 *
 * @function
 *
 * @param {string} content - Contenu du corps du mail
 *
 *
 */

export const getHtmlBody = (content) => `<!DOCTYPE html>
<html>
  <head>
  <title>Email de JS Deep lover</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta content="width=device-width">
  <style type="text/css">
  /* Fonts and Content */
  body, td { font-family: 'Poppins', Arial, Helvetica, Geneva, sans-serif; font-size:14px; color:rgba(0,0,0, 0.54); }
  body { background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; }
  h2{ padding-top:12px; /* ne fonctionnera pas sous Outlook 2007+ */color:rgba(0,0,0, 0.54); font-size:22px; }

  @media only screen and (max-width: 480px) {
      table[class=w275], td[class=w275], img[class=w275] { width:135px !important; }
      table[class=w30], td[class=w30], img[class=w30] { width:10px !important; }
      table[class=w580], td[class=w580], img[class=w580] { width:280px !important; }
      table[class=w640], td[class=w640], img[class=w640] { width:300px !important; }
      img{ height:auto;}
      /*illisible, on passe donc sur 3 lignes */
      table[class=w180], td[class=w180], img[class=w180] {
          width:280px !important;
          display:block;
      }
      td[class=w20]{ display:none; }
  }

  </style>
  <body style="margin: 0; padding: 0;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td style="padding: 10px 0 20px 0;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                  <tr>
                      <td align="left" style="font-size: 20px; font-family: Arial, sans-serif;">
                        <h1 class="title" >
                          <strong style="padding: 10px; color: #A542D4;">
                            JS Deep lover
                          </strong>
                        </h1>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                      ${content}
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td bgcolor="#A542D4" style="padding: 30px 30px 30px 30px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;" width="75%">
                                      &copy; 2021 JS Deep lover<br/>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
</body>
</html>`
