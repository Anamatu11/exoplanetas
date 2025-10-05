import { useState, useEffect } from 'react';

interface AccessibilitySettings {
  narrator: boolean;
  dyslexicFont: boolean;
  signLanguage: boolean;
  largeCursor: boolean;
  readingLine: boolean;
  highlightLinks: boolean;
  highContrast: boolean;
  fontSize: string;
}

const defaultSettings: AccessibilitySettings = {
  narrator: false,
  dyslexicFont: false,
  signLanguage: false,
  largeCursor: false,
  readingLine: false,
  highlightLinks: false,
  highContrast: false,
  fontSize: '1.0'
};

export const useAccessibility = () => {
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(defaultSettings);

  // Cargar configuración desde localStorage al inicio
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setAccessibilitySettings(parsed);
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  // EFECTO PRINCIPAL: Aplicar todos los estilos y funcionalidades
  useEffect(() => {
    // Guardar en localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));

    // Crear o actualizar el estilo global
    const styleId = 'accessibility-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // Aplicar tamaño de fuente
    document.documentElement.style.fontSize = `${parseFloat(accessibilitySettings.fontSize) * 100}%`;

    // Construir estilos CSS
    const styles = `
      /* Fuente disléxica */
      body.dyslexic-font {
        font-family: 'Comic Sans MS', cursive, sans-serif !important;
        letter-spacing: 0.05em !important;
        line-height: 1.6 !important;
      }

      /* Alto contraste */
      body.high-contrast {
        filter: contrast(1.3) brightness(1.2) !important;
        background: #000000 !important;
        color: #FFFFFF !important;
      }

      body.high-contrast * {
        background-color: #000000 !important;
        color: #FFFFFF !important;
        border-color: #FFFFFF !important;
      }

      /* Cursor grande - FLECHA BLANCA */
      body.large-cursor, 
      body.large-cursor * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M3 3 L21 12 L12 12 L12 21 Z" fill="%23FFFFFF" stroke="%23000" stroke-width="1.5"/></svg>') 8 8, auto !important;
      }

      /* Línea de lectura */
      #reading-line {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: #EF4444;
        opacity: 0.9;
        pointer-events: none;
        z-index: 9999;
        transform: translateY(-50%);
        box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
        display: none;
      }

      /* Resaltado de enlaces */
      ${accessibilitySettings.highlightLinks ? `
        a, button, [role="button"] {
          outline: 2px solid #3B82F6 !important;
          outline-offset: 1px !important;
        }
      ` : ''}
    `;

    styleElement.textContent = styles;

    // Aplicar/remover clases al body
    const bodyClasses = {
      'dyslexic-font': accessibilitySettings.dyslexicFont,
      'high-contrast': accessibilitySettings.highContrast,
      'large-cursor': accessibilitySettings.largeCursor
    };

    Object.entries(bodyClasses).forEach(([className, shouldAdd]) => {
      if (shouldAdd) {
        document.body.classList.add(className);
      } else {
        document.body.classList.remove(className);
      }
    });

    return () => {
      // Limpiar solo el style element
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [accessibilitySettings]);

  // LÍNEA DE LECTURA - Effect separado
  useEffect(() => {
    // Crear el elemento de la línea de lectura si no existe
    let readingLine = document.getElementById('reading-line');
    if (!readingLine) {
      readingLine = document.createElement('div');
      readingLine.id = 'reading-line';
      document.body.appendChild(readingLine);
    }

    if (accessibilitySettings.readingLine) {
      // Mostrar la línea
      readingLine.style.display = 'block';
      
      const handleMouseMove = (e: MouseEvent) => {
        readingLine!.style.top = `${e.clientY}px`;
      };

      document.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    } else {
      // Ocultar la línea
      readingLine.style.display = 'none';
    }
  }, [accessibilitySettings.readingLine]);

  // Narrador (Text-to-Speech)
  useEffect(() => {
    if (!accessibilitySettings.narrator) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target && target.textContent && target.textContent.trim()) {
        const text = target.textContent.trim();
        
        if (text.length < 2 || text.length > 500) return;
        
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'es-ES';
          utterance.rate = 0.8;
          utterance.volume = 0.8;
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [accessibilitySettings.narrator]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const resetSettings = () => {
    setAccessibilitySettings(defaultSettings);
  };

  return {
    accessibilitySettings,
    updateSettings,
    resetSettings
  };
};