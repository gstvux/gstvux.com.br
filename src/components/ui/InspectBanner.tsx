"use client";

import { useEffect } from "react";

export function InspectBanner() {
  useEffect(() => {
    const banner = `
    
 ██████╗ ███████╗████████╗██╗   ██╗  ██╗   ██╗██╗  ██╗
██╔════╝ ██╔════╝╚══██╔══╝██║   ██║  ██║   ██║╚██╗██╔╝
██║  ███╗███████╗   ██║   ██║   ██║  ██║   ██║ ╚███╔╝
██║   ██║╚════██║   ██║   ╚██╗ ██╔╝  ██║   ██║ ██╔██╗
╚██████╔╝███████║   ██║    ╚████╔╝██╗╚██████╔╝██╔╝ ██╗
 ╚═════╝ ╚══════╝   ╚═╝     ╚═══╝ ╚═╝ ╚═════╝ ╚═╝  ╚═╝

  🚀 Product Designer & Front-end Developer
  --------------------------
  Olá! 👋 Que bom te ver por aqui. Se você está vendo isso, 
  provavelmente é um(a) desenvolvedor(a) curioso(a).

  Não tome decisões precipitadas: eu tenho autoria e domínio sobre
  cada decisão por detrás desse portifólio.
  
  Sinta-se em casa e, se quiser trocar uma ideia, 
  me chama no LinkedIn: linkedin.com/in/gstvux
`;

    console.log(
      `%c${banner}`,
      "color: #888; font-family: monospace; font-weight: bold; line-height: 1.2;"
    );

  }, []);

  return (
    <>
      <div
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{
          __html: `<!-- 
  Olá curioso(a)! 👋 
  Se você está vendo isso, saiba que o site foi construído com muito esmero e dedicação. 
  Sinta-se à vontade para explorar os componentes e o console!
  - gstvux
-->`,
        }}
      />
    </>
  );
}
