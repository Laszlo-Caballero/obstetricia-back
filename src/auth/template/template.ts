export const emailTemplate = (code: string) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Código de verificación</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      align="center"
      width="640"
      style="
        border: 1px solid #20303c;
        background-color: #08131a;
        border-radius: 24px;
        padding: 29px;
      "
    >
      <tr>
        <td>
          <table role="presentation" width="100%">
            <tr>
              <td align="left" style="font-size: 0">
                <img
                  src="https://res.cloudinary.com/dl0wif5vm/image/upload/v1758509688/iconify-icon_yy8ocd.png"
                  width="18"
                  height="18"
                  alt="Logo"
                  style="display: inline-block; vertical-align: middle"
                />
                <span
                  style="
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                    vertical-align: middle;
                    margin-left: 10px;
                  "
                  >Obstetricia Portal</span
                >
              </td>
              <td align="right">
                <p
                  style="
                    font-size: 13px;
                    font-weight: bold;
                    color: #6b7e8e;
                    margin: 0;
                  "
                >
                  No responder a este correo
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td>
          <h1
            style="
              font-size: 22px;
              font-weight: bold;
              color: white;
              margin: 20px 0;
            "
          >
            Tu Código de Verificación
          </h1>
          <p
            style="
              font-size: 15px;
              font-weight: bold;
              color: #6b7e8e;
              margin: 0 0 20px;
            "
          >
            Usa este código de 6 dígitos para completar tu acceso. Expira en 2
            minutos.
          </p>
        </td>
      </tr>

      <tr>
        <td align="center">
          <table role="presentation" cellspacing="8" cellpadding="0" border="0">
            <tr>
              ${code
                .split('')
                .map((digit) => {
                  return `
                <td
                style="
                  width: 90px;
                  height: 52px;
                  border: 1px solid #20303c;
                  border-radius: 12px;
                  text-align: center;
                  font-size: 20px;
                  font-weight: bold;
                  color: white;
                "
              >
                ${digit}
              </td>`;
                })
                .join('')}
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td>
          <p
            style="
              font-size: 15px;
              font-weight: bold;
              color: #6b7e8e;
              margin-top: 20px;
            "
          >
            Si no solicitaste este código, puedes ignorar este correo.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
