import React, { useState } from 'react';
import { 
  Volume2, Type, Languages, MousePointer, Eye, Link,
  RotateCcw, Phone, Minus, Plus, X 
} from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

// Definir el tipo para las opciones de accesibilidad
type AccessibilityOptionId = 
  | 'narrator' 
  | 'dyslexicFont' 
  | 'signLanguage' 
  | 'largeCursor' 
  | 'readingLine' 
  | 'highlightLinks';

const AccessibilityBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { accessibilitySettings, updateSettings, resetSettings } = useAccessibility();

  const accessibilityOptions: {
    id: AccessibilityOptionId;
    label: string;
    icon: any;
    description: string;
    active: boolean;
  }[] = [
    {
      id: 'narrator',
      label: 'Narrador',
      icon: Volume2,
      description: 'Lectura de texto en voz alta',
      active: accessibilitySettings.narrator
    },
    {
      id: 'dyslexicFont',
      label: 'Fuente Disléxica',
      icon: Type,
      description: 'Tipografía especial para dislexia',
      active: accessibilitySettings.dyslexicFont
    },
    {
      id: 'signLanguage',
      label: 'Lengua de Señas',
      icon: Languages,
      description: 'Traducción a lengua de señas',
      active: accessibilitySettings.signLanguage
    },
    {
      id: 'largeCursor',
      label: 'Cursor Grande',
      icon: MousePointer,
      description: 'Aumentar tamaño del cursor',
      active: accessibilitySettings.largeCursor
    },
    {
      id: 'readingLine',
      label: 'Línea de Lectura',
      icon: Eye,
      description: 'Guía visual para lectura',
      active: accessibilitySettings.readingLine
    },
    {
      id: 'highlightLinks',
      label: 'Resaltar Enlaces',
      icon: Link,
      description: 'Destacar todos los enlaces',
      active: accessibilitySettings.highlightLinks
    }
  ];

  // Función corregida para alternar opciones
  const toggleOption = (optionId: AccessibilityOptionId) => {
    const currentValue = accessibilitySettings[optionId];
    updateSettings({ 
      [optionId]: !currentValue 
    });
  };

  // Función debug para verificar que se está ejecutando
  const handleOptionClick = (optionId: AccessibilityOptionId) => {
    console.log('Toggle option:', optionId, 'current value:', accessibilitySettings[optionId]);
    toggleOption(optionId);
  };

  const increaseFontSize = () => {
    const currentSize = parseFloat(accessibilitySettings.fontSize);
    updateSettings({ fontSize: Math.min(currentSize + 0.1, 2).toFixed(1) });
  };

  const decreaseFontSize = () => {
    const currentSize = parseFloat(accessibilitySettings.fontSize);
    updateSettings({ fontSize: Math.max(currentSize - 0.1, 0.8).toFixed(1) });
  };

  // Estilos en línea - SIN TAILWIND
  const styles = {
    button: {
      position: 'fixed' as const,
      bottom: '24px',
      right: '24px',
      width: '56px',
      height: '56px',
      background: 'white',
      border: 'none',
      borderRadius: '50%',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: '#2563eb',
      zIndex: 10000,
      transition: 'all 0.3s ease'
    },
    panel: {
      position: 'fixed' as const,
      bottom: '96px',
      right: '24px',
      width: '320px',
      maxHeight: '70vh',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      border: '1px solid #e5e7eb',
      overflowY: 'auto' as const,
      zIndex: 10000
    },
    panelHeader: {
      padding: '16px',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    optionItem: (active: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px',
      borderRadius: '12px',
      border: `1px solid ${active ? '#bfdbfe' : '#e5e7eb'}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      background: active ? '#dbeafe' : '#f9fafb',
      marginBottom: '8px'
    })
  };

  return (
    <>
      {/* Botón de Accesibilidad - VISIBLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        }}
        aria-label="Abrir herramientas de accesibilidad"
      >
        🚹
      </button>

      {/* Panel de Accesibilidad */}
      {isOpen && (
        <div style={styles.panel}>
          {/* Header */}
          <div style={styles.panelHeader}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <span style={{ color: '#2563eb', fontSize: '20px' }}>🚹</span>
              Accesibilidad
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{ padding: '4px', background: 'none', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#6b7280' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Control de Tamaño de Texto */}
          <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
            <h4 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '12px', fontSize: '14px', margin: 0 }}>Tamaño de Texto</h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button
                onClick={decreaseFontSize}
                style={{ padding: '8px', background: '#f8fafc', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', color: '#374151' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                {Math.round(parseFloat(accessibilitySettings.fontSize) * 100)}%
              </span>
              <button
                onClick={increaseFontSize}
                style={{ padding: '8px', background: '#f8fafc', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', color: '#374151' }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Opciones de Accesibilidad */}
          <div style={{ padding: '16px' }}>
            {accessibilityOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  style={styles.optionItem(option.active)}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={20} color={option.active ? '#2563eb' : '#6b7280'} />
                    <div>
                      <div style={{ fontWeight: '500', color: option.active ? '#1e40af' : '#1f2937', fontSize: '14px' }}>
                        {option.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {option.description}
                      </div>
                    </div>
                  </div>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    border: `2px solid ${option.active ? '#2563eb' : '#d1d5db'}`, 
                    borderRadius: '4px',
                    background: option.active ? '#2563eb' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {option.active && (
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Botón Reiniciar */}
            <button
              onClick={resetSettings}
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px', 
                padding: '12px', 
                background: 'none', 
                border: 'none', 
                color: '#6b7280',
                cursor: 'pointer',
                borderRadius: '8px',
                marginTop: '16px'
              }}
            >
              <RotateCcw size={16} />
              <span>Restablecer</span>
            </button>
          </div>
        </div>
      )}

      {/* Avatar de Lengua de Señas */}
      {accessibilitySettings.signLanguage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          width: '128px',
          height: '128px',
          background: 'black',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ color: 'white', textAlign: 'center' }}>
            <Languages size={32} style={{ margin: '0 auto 8px', display: 'block' }} />
            <div style={{ fontSize: '12px' }}>Intérprete LSC</div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityBar;