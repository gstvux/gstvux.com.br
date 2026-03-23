'use client';

import React, { useState, useEffect } from 'react';

/**
 * Typewriter Component
 * 
 * Anima uma string separada por vírgulas (Ex: "Product Designer, UX Designer")
 * digitando e apagando as palavras em loop. O CSS para o cursor piscante
 * fica na classe `.typewriter-wrapper` no base.css.
 * 
 * Parâmetros de tempo (ms):
 * @param typingSpeed - Velocidade da digitação de cada letra (Padrão: 80)
 * @param erasingSpeed - Velocidade ao apagar cada letra (Padrão: 40)
 * @param delayBeforeErase - Tempo que a palavra inteira fica parada antes de apagar (Padrão: 2500)
 * @param delayBeforeNext - Tempo de pausa com a tela vazia antes de digitar a próxima palavra (Padrão: 400)
 */
export type TypewriterProps = {
  text: string;           
  typingSpeed?: number;   
  erasingSpeed?: number;  
  delayBeforeErase?: number; 
  delayBeforeNext?: number;  
  className?: string;
};

export function Typewriter({
  text,
  typingSpeed = 80,
  erasingSpeed = 40,
  delayBeforeErase = 2500,
  delayBeforeNext = 400,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const [index, setIndex] = useState(0);

  // Reseta estado se o texto base mudar (útil pra hot-reload ou troca de idioma)
  useEffect(() => {
    setDisplayText('');
    setIsErasing(false);
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (!text) return;
    
    // Suporta fallback para string única sem vírgula também
    const words = text.split(',').map(w => w.trim()).filter(Boolean);
    if (words.length === 0) return;

    const currentWord = words[index % words.length];
    
    // Usamos Array.from() (ou spreading [...]) em vez de string.slice() para suportar 
    // emojis ou caracteres compostos sem cortar os bytes na metade gerando bugs visuais ()
    const currentChars = Array.from(currentWord);
    const displayChars = Array.from(displayText);

    let timeout: NodeJS.Timeout;

    if (isErasing) {
      if (displayChars.length === 0) {
        // Terminou de apagar
        setIsErasing(false);
        setIndex((prev) => prev + 1);
        timeout = setTimeout(() => {}, delayBeforeNext);
      } else {
        // Apagando uma letra
        timeout = setTimeout(() => {
          setDisplayText(currentChars.slice(0, displayChars.length - 1).join(''));
        }, erasingSpeed);
      }
    } else {
      if (displayChars.length === currentChars.length) {
        // Terminou de digitar a palavra inteira
        // Se houver mais de uma palavra, começamos a apagar após o delay
        // Se houver apenas uma, fica estático indefinidamente
        if (words.length > 1) {
          timeout = setTimeout(() => setIsErasing(true), delayBeforeErase);
        }
      } else {
        // Digitando uma letra
        timeout = setTimeout(() => {
          setDisplayText(currentChars.slice(0, displayChars.length + 1).join(''));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isErasing, index, text, typingSpeed, erasingSpeed, delayBeforeErase, delayBeforeNext]);

  return (
    <>
      {/* 
        Texto visualmente oculto para SR (Screen Readers) e SEO (Google Bot).
        Isso garante que todos os titulos sejam indexados no SSR e que a máquina de 
        escrever não confunda pessoas com deficiência visual soletrando l-e-t-r-a por letra.
      */}
      <span className="sr-only">{text.replace(/,/g, ' and ')}</span>

      {/* A Animação real (escondida do SR) */}
      <span aria-hidden="true" className={`typewriter-wrapper ${className}`.trim()}>
        {displayText}
      </span>
    </>
  );
}
