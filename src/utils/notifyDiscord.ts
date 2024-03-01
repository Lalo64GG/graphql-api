import fetch from "node-fetch"; 

export const notifyDiscord = async (message: string) => {
  const webhookURL = "https://discord.com/api/webhooks/1212931448818892830/6D0U34r_aofCXr4VuFalsuPFfIZqdgGHbfimbeeYUfaWp02i_Hyz2jpzbVun_EBKyowc"; 

  const body = {
    content: message,
  };

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("Error al enviar el mensaje a Discord:", response.statusText);
      return false;
    }

    console.log("Mensaje enviado a Discord con éxito");
    return true;
  } catch (error) {
    console.error("Error al enviar el mensaje a Discord:", error);
    return false;
  }
};
