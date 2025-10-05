import React, { useState } from 'react';

const Educators = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const educationalCategories = [
    { 
      label: 'Primaria', 
      subtitle: '6-11 años',
      description: 'Introducción a la astronomía con actividades prácticas y visuales'
    },
    { 
      label: 'Secundaria', 
      subtitle: '12-15 años',
      description: 'Análisis de datos y comprensión del método científico aplicado'
    },
    { 
      label: 'Bachillerato', 
      subtitle: '16-18 años',
      description: 'Investigación avanzada y análisis de curvas de luz reales'
    },
    { 
      label: 'Universidad', 
      subtitle: 'Educación superior',
      description: 'Metodologías profesionales y publicación científica colaborativa'
    }
  ];

  // Recursos específicos para cada nivel educativo
  const resourcesByCategory = {
    0: [ // Primaria
      {
        category: 'Plan de clase',
        title: 'Mi Primer Exoplaneta',
        code: 'PRI-001',
        duration: '45 min',
        level: 'Principiante',
        description: 'Introducción básica a los planetas fuera del sistema solar con actividades prácticas y visuales para niños.',
        materials: ['Linterna', 'Pelota', 'Cartulina'],
        activities: ['Simulación de tránsito', 'Dibujo del sistema solar', 'Juego de adivinanzas']
      },
      {
        category: 'Actividad práctica',
        title: 'Cazadores de Planetas',
        code: 'PRI-002',
        duration: '60 min',
        level: 'Principiante',
        description: 'Cómo los científicos descubren nuevos mundos mediante observación y análisis simple.',
        materials: ['Telescopio de juguete', 'Gráficos impresos'],
        activities: ['Observación simulada', 'Análisis de curvas de luz simples']
      },
      {
        category: 'Juego educativo',
        title: 'Aventura Espacial',
        code: 'PRI-003',
        duration: '30 min',
        level: 'Principiante',
        description: 'Juego interactivo para aprender sobre los planetas y sus características.',
        materials: ['Tablero de juego', 'Fichas', 'Tarjetas educativas'],
        activities: ['Recorrido planetario', 'Preguntas y respuestas', 'Memoria espacial']
      }
    ],
    1: [ // Secundaria
      {
        category: 'Laboratorio',
        title: 'Métodos de Detección de Exoplanetas',
        code: 'SEC-001',
        duration: '90 min',
        level: 'Intermedio',
        description: 'Exploración de técnicas científicas para encontrar exoplanetas usando datos reales simplificados.',
        materials: ['Software de simulación', 'Datos reales simplificados'],
        activities: ['Análisis de curvas de luz', 'Cálculo de períodos orbitales']
      },
      {
        category: 'Proyecto',
        title: 'Análisis de Curvas de Luz',
        code: 'SEC-002',
        duration: '120 min',
        level: 'Intermedio',
        description: 'Análisis práctico de datos reales de tránsitos planetarios usando herramientas básicas.',
        materials: ['Computadora', 'Software de análisis', 'Dataset Kepler'],
        activities: ['Interpretación de gráficos', 'Identificación de tránsitos', 'Cálculo de tamaños']
      },
      {
        category: 'Investigación',
        title: 'Zona de Habitabilidad',
        code: 'SEC-003',
        duration: '75 min',
        level: 'Intermedio',
        description: 'Estudio de las condiciones necesarias para la vida en otros planetas.',
        materials: ['Diagramas estelares', 'Calculadoras', 'Tablas de datos'],
        activities: ['Cálculo de distancias', 'Análisis de temperaturas', 'Evaluación de condiciones']
      }
    ],
    2: [ // Bachillerato
      {
        category: 'Investigación avanzada',
        title: 'Análisis de Curvas de Luz Avanzado',
        code: 'BAC-001',
        duration: '90 min',
        level: 'Avanzado',
        description: 'Análisis profundo de curvas de luz reales con herramientas profesionales de astronomía.',
        materials: ['Software especializado', 'Datasets complejos', 'Calculadora científica'],
        activities: ['Procesamiento de datos', 'Ajuste de curvas', 'Análisis estadístico']
      },
      {
        category: 'Simulación',
        title: 'Sistemas Multi-Planetarios',
        code: 'BAC-002',
        duration: '120 min',
        level: 'Avanzado',
        description: 'Simulación y estudio de sistemas planetarios complejos similares a TRAPPIST-1.',
        materials: ['Software de simulación', 'Modelos físicos', 'Computadora de alto rendimiento'],
        activities: ['Modelado orbital', 'Simulación de tránsitos', 'Análisis de estabilidad']
      },
      {
        category: 'Proyecto final',
        title: 'Detección de Exoplanetas Reales',
        code: 'BAC-003',
        duration: '180 min',
        level: 'Avanzado',
        description: 'Proyecto completo de detección e identificación de candidatos a exoplanetas.',
        materials: ['Datos TESS/Kepler', 'Software profesional', 'Guías de análisis'],
        activities: ['Búsqueda sistemática', 'Validación de candidatos', 'Presentación de resultados']
      }
    ],
    3: [ // Universidad
      {
        category: 'Metodología profesional',
        title: 'Técnicas Avanzadas de Detección',
        code: 'UNI-001',
        duration: '120 min',
        level: 'Experto',
        description: 'Metodologías profesionales para la detección y caracterización de exoplanetas.',
        materials: ['Papers científicos', 'Software especializado', 'Datasets de investigación'],
        activities: ['Revisión de literatura', 'Análisis espectral', 'Caracterización atmosférica']
      },
      {
        category: 'Publicación científica',
        title: 'Redacción de Artículos Científicos',
        code: 'UNI-002',
        duration: '150 min',
        level: 'Experto',
        description: 'Guía completa para la publicación científica colaborativa en astronomía.',
        materials: ['Plantillas de papers', 'Guías de estilo', 'Ejemplos publicados'],
        activities: ['Estructuración de papers', 'Análisis de datos', 'Revisión por pares']
      },
      {
        category: 'Investigación colaborativa',
        title: 'Proyecto de Ciencia Ciudadana',
        code: 'UNI-003',
        duration: '240 min',
        level: 'Experto',
        description: 'Diseño e implementación de proyectos de ciencia ciudadana en astrofísica.',
        materials: ['Plataformas colaborativas', 'Herramientas de análisis', 'Bases de datos públicas'],
        activities: ['Diseño experimental', 'Coordinación de equipos', 'Publicación de resultados']
      }
    ]
  };

  // Videos y lecturas recomendadas por nivel
  const mediaByCategory = {
    0: { // Primaria
      videos: [
        {
          title: '¿Qué es un Exoplaneta?',
          thumbnail: 'https://i.ytimg.com/vi/cB3aF47Aoxs/maxresdefault.jpg',
          duration: '5:30',
          views: '15.2K',
          description: 'Explicación animada para niños sobre planetas fuera del sistema solar'
        },
        {
          title: 'El Sistema Solar para Niños',
          thumbnail: 'https://static.vecteezy.com/system/resources/previews/029/128/143/non_2x/cartoon-solar-system-cute-planets-with-funny-faces-on-orbits-around-sun-astronomy-and-space-learning-illustration-for-kids-vector.jpg',
          duration: '7:15',
          views: '23.4K',
          description: 'Recorrido interactivo por nuestro sistema solar'
        },
        {
          title: 'Cómo Encontrar Planetas',
          thumbnail: 'https://i.ytimg.com/vi/pqmS8QGWQek/maxresdefault.jpg',
          duration: '4:45',
          views: '12.1K',
          description: 'Métodos simples de detección explicados para niños'
        }
      ],
      readings: [
        {
          title: 'Guía del Pequeño Astrónomo',
          type: 'PDF',
          pages: '24',
          level: 'Básico',
          description: 'Libro ilustrado sobre astronomía para niños'
        },
        {
          title: 'Cuentos del Cosmos',
          type: 'PDF',
          pages: '18',
          level: 'Básico',
          description: 'Historias educativas sobre el espacio'
        },
        {
          title: 'Actividades Espaciales',
          type: 'PDF',
          pages: '32',
          level: 'Básico',
          description: 'Manual de experimentos caseros de astronomía'
        }
      ]
    },
    1: { // Secundaria
      videos: [
        {
          title: 'El Método del Tránsito',
          thumbnail: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/09/the_wasp-189_system_as_seen_by_cheops/22228624-1-eng-GB/The_WASP-189_system_as_seen_by_Cheops_pillars.jpg',
          duration: '12:30',
          views: '45.6K',
          description: 'Explicación detallada del método de tránsito para detectar exoplanetas'
        },
        {
          title: 'Análisis de Curvas de Luz',
          thumbnail: 'https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/07/2022-102_AAS_LHS475b_Transit_Esp-jpeg.webp',
          duration: '15:20',
          views: '32.1K',
          description: 'Cómo interpretar datos de telescopios espaciales'
        },
        {
          title: 'Zonas de Habitabilidad',
          thumbnail: 'https://e01-elmundo.uecdn.es/assets/multimedia/imagenes/2013/11/04/13835860524073.jpg',
          duration: '10:45',
          views: '28.9K',
          description: 'Qué hace que un planeta sea potencialmente habitable'
        }
      ],
      readings: [
        {
          title: 'Introducción a la Exoplanetología',
          type: 'PDF',
          pages: '45',
          level: 'Intermedio',
          description: 'Manual completo sobre métodos de detección'
        },
        {
          title: 'Casos de Estudio Kepler',
          type: 'PDF',
          pages: '38',
          level: 'Intermedio',
          description: 'Análisis de descubrimientos reales de la misión Kepler'
        },
        {
          title: 'Guía de Análisis de Datos',
          type: 'PDF',
          pages: '52',
          level: 'Intermedio',
          description: 'Tutorial paso a paso para analizar datos astronómicos'
        }
      ]
    },
    2: { // Bachillerato
      videos: [
        {
          title: 'Técnicas Avanzadas de Detección',
          thumbnail: 'https://inteligenciaartificial360.com/wp-content/uploads/2024/01/img-OqwemUbdvP1gZc2lLvh8MUoj.png',
          duration: '25:15',
          views: '18.7K',
          description: 'Métodos espectroscópicos y de velocidad radial'
        },
        {
          title: 'Simulación de Sistemas Planetarios',
          thumbnail: 'https://www3.gobiernodecanarias.org/medusa/ecoescuela/recursosdigitales/files/formidable/27-10-2014-19-38-06.jpg',
          duration: '20:30',
          views: '14.3K',
          description: 'Uso de software profesional para modelado orbital'
        },
        {
          title: 'Análisis Estadístico en Astronomía',
          thumbnail: 'https://estadistica.itam.mx/sites/default/files/estadisticaastronomia.jpg',
          duration: '18:45',
          views: '12.8K',
          description: 'Aplicación de métodos estadísticos en datos astronómicos'
        }
      ],
      readings: [
        {
          title: 'Astrofísica Computacional',
          type: 'PDF',
          pages: '68',
          level: 'Avanzado',
          description: 'Introducción a la programación en astronomía'
        },
        {
          title: 'Métodos de Caracterización',
          type: 'PDF',
          pages: '55',
          level: 'Avanzado',
          description: 'Técnicas para determinar propiedades de exoplanetas'
        },
        {
          title: 'Investigación con Datos TESS',
          type: 'PDF',
          pages: '72',
          level: 'Avanzado',
          description: 'Guía para usar datos del telescopio TESS'
        }
      ]
    },
    3: { // Universidad
      videos: [
        {
          title: 'Espectroscopía de Alta Resolución',
          thumbnail: 'https://www.eso.org/public/archives/images/screen/spectroscopy-oli-6.jpg',
          duration: '35:20',
          views: '8.9K',
          description: 'Técnicas avanzadas para análisis atmosférico'
        },
        {
          title: 'Publicación Científica en Astronomía',
          thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGGYL6j43i8lmY2-USFbA7SS-uQXHkGPCx4g&s',
          duration: '28:45',
          views: '6.7K',
          description: 'Proceso completo desde investigación hasta publicación'
        },
        {
          title: 'Colaboraciones Internacionales',
          thumbnail: 'https://images.nature.com/lw1200/magazine-assets/d41586-019-02964-z/d41586-019-02964-z_17249998.jpg',
          duration: '32:10',
          views: '5.2K',
          description: 'Cómo participar en proyectos de investigación globales'
        }
      ],
      readings: [
        {
          title: 'Review de Métodos de Detección',
          type: 'PDF',
          pages: '85',
          level: 'Experto',
          description: 'Revisión científica completa de técnicas actuales'
        },
        {
          title: 'Análisis de Datos de JWST',
          type: 'PDF',
          pages: '92',
          level: 'Experto',
          description: 'Guía avanzada para datos del telescopio James Webb'
        },
        {
          title: 'Ética en la Investigación Astronómica',
          type: 'PDF',
          pages: '45',
          level: 'Experto',
          description: 'Consideraciones éticas en la ciencia moderna'
        }
      ]
    }
  };

  const stats = [
    { number: '2,847', label: 'Educadores registrados' },
    { number: '156', label: 'Recursos disponibles' },
    { number: '89%', label: 'Tasa de éxito' },
    { number: '24', label: 'Países participantes' }
  ];

  const styles = {
    container: {
      background: '#FFFFFF',
      minHeight: '100vh',
      padding: '80px 40px 60px',
      color: '#1A1A1A',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: '1.6'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '80px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '400',
      marginBottom: '20px',
      color: '#1A1A1A',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666666',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '30px',
      marginBottom: '80px',
      maxWidth: '1000px',
      margin: '0 auto'
    },
    statItem: {
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: '300',
      color: '#1A1A1A',
      marginBottom: '8px',
      fontFamily: "'Georgia', serif"
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#666666',
      fontWeight: '400',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    section: {
      maxWidth: '1200px',
      margin: '0 auto 80px'
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#666666',
      letterSpacing: '0.1em',
      marginBottom: '40px',
      textTransform: 'uppercase' as const,
      textAlign: 'center' as const
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '60px'
    },
    categoryCard: (isSelected: boolean) => ({
      background: isSelected ? '#1A1A1A' : '#F8F8F8',
      color: isSelected ? '#FFFFFF' : '#1A1A1A',
      padding: '30px 25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid #E5E5E5',
      textAlign: 'center' as const
    }),
    categoryLabel: {
      fontSize: '1.1rem',
      fontWeight: '500',
      marginBottom: '8px'
    },
    categorySubtitle: {
      fontSize: '0.9rem',
      color: '#666666',
      marginBottom: '12px',
      fontWeight: '400'
    },
    categoryDescription: {
      fontSize: '0.8rem',
      lineHeight: '1.4',
      color: '#666666'
    },
    resourcesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '30px',
      marginBottom: '60px'
    },
    resourceCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      padding: '0',
      transition: 'all 0.3s ease'
    },
    resourceContent: {
      padding: '30px'
    },
    resourceCategory: {
      fontSize: '0.8rem',
      fontWeight: '500',
      color: '#666666',
      letterSpacing: '0.1em',
      marginBottom: '15px',
      textTransform: 'uppercase' as const
    },
    resourceTitle: {
      fontSize: '1.3rem',
      fontWeight: '400',
      color: '#1A1A1A',
      marginBottom: '20px',
      lineHeight: '1.3',
      fontFamily: "'Georgia', serif"
    },
    resourceMeta: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px',
      marginBottom: '20px',
      paddingBottom: '20px',
      borderBottom: '1px solid #E5E5E5'
    },
    resourceMetaItem: {
      fontSize: '0.85rem',
      color: '#666666',
      fontWeight: '400'
    },
    resourceDescription: {
      fontSize: '0.9rem',
      color: '#666666',
      lineHeight: '1.5',
      marginBottom: '25px'
    },
    materialsList: {
      fontSize: '0.8rem',
      color: '#666666',
      marginBottom: '15px',
      lineHeight: '1.4'
    },
    activitiesList: {
      fontSize: '0.8rem',
      color: '#666666',
      marginBottom: '20px',
      lineHeight: '1.4'
    },
    button: {
      background: 'transparent',
      border: '1px solid #1A1A1A',
      color: '#1A1A1A',
      padding: '12px 24px',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '100%',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    mediaSection: {
      background: '#F8F8F8',
      padding: '40px',
      borderRadius: '8px',
      marginBottom: '40px'
    },
    mediaGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    mediaCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    },
    videoThumbnail: {
      width: '100%',
      height: '160px',
      objectFit: 'cover' as const
    },
    videoContent: {
      padding: '20px'
    },
    videoTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '8px'
    },
    videoMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.8rem',
      color: '#666666',
      marginBottom: '8px'
    },
    videoDescription: {
      fontSize: '0.85rem',
      color: '#666666',
      lineHeight: '1.4'
    },
    readingCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.3s ease'
    },
    readingTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '8px'
    },
    readingMeta: {
      display: 'flex',
      gap: '15px',
      fontSize: '0.8rem',
      color: '#666666',
      marginBottom: '8px'
    },
    readingDescription: {
      fontSize: '0.85rem',
      color: '#666666',
      lineHeight: '1.4'
    },
    ctaSection: {
      background: '#F8F8F8',
      padding: '60px 40px',
      textAlign: 'center' as const,
      marginTop: '60px',
      borderTop: '1px solid #E5E5E5'
    },
    ctaTitle: {
      fontSize: '2rem',
      fontWeight: '400',
      marginBottom: '20px',
      color: '#1A1A1A',
      fontFamily: "'Georgia', serif"
    },
    ctaSubtitle: {
      fontSize: '1.1rem',
      color: '#666666',
      maxWidth: '600px',
      margin: '0 auto 30px',
      lineHeight: '1.6'
    }
  };

  // Obtener los recursos para la categoría seleccionada
  const currentResources = resourcesByCategory[selectedCategory as keyof typeof resourcesByCategory] || [];
  const currentMedia = mediaByCategory[selectedCategory as keyof typeof mediaByCategory];

  return (
    <section id="educadores" style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Recursos Educativos</h1>
        <p style={styles.subtitle}>
          Materiales especializados para la enseñanza de exoplanetología y métodos 
          de detección astronómica, diseñados para diferentes niveles educativos.
        </p>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statItem}>
            <div style={styles.statNumber}>{stat.number}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Niveles Educativos */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Niveles Educativos</div>
        <div style={styles.categoriesGrid}>
          {educationalCategories.map((category, index) => (
            <div
              key={index}
              style={styles.categoryCard(selectedCategory === index)}
              onClick={() => setSelectedCategory(index)}
              onMouseEnter={(e) => {
                if (selectedCategory !== index) {
                  e.currentTarget.style.background = '#1A1A1A';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== index) {
                  e.currentTarget.style.background = '#F8F8F8';
                  e.currentTarget.style.color = '#1A1A1A';
                }
              }}
            >
              <div style={styles.categoryLabel}>{category.label}</div>
              <div style={{
                ...styles.categorySubtitle,
                color: selectedCategory === index ? '#CCCCCC' : '#666666'
              }}>
                {category.subtitle}
              </div>
              <div style={{
                ...styles.categoryDescription,
                color: selectedCategory === index ? '#CCCCCC' : '#666666'
              }}>
                {category.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recursos específicos por categoría */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Recursos para {educationalCategories[selectedCategory].label}
        </div>
        <div style={styles.resourcesGrid}>
          {currentResources.map((resource, index) => (
            <div 
              key={index} 
              style={styles.resourceCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={styles.resourceContent}>
                <div style={styles.resourceCategory}>{resource.category}</div>
                <h3 style={styles.resourceTitle}>{resource.title}</h3>
                
                <div style={styles.resourceMeta}>
                  <span style={styles.resourceMetaItem}>Código: {resource.code}</span>
                  <span style={styles.resourceMetaItem}>Duración: {resource.duration}</span>
                  <span style={styles.resourceMetaItem}>Nivel: {resource.level}</span>
                </div>
                
                <p style={styles.resourceDescription}>
                  {resource.description}
                </p>

                {/* Materiales necesarios */}
                {resource.materials && (
                  <div style={styles.materialsList}>
                    <strong>Materiales: </strong>
                    {resource.materials.join(', ')}
                  </div>
                )}

                {/* Actividades */}
                {resource.activities && (
                  <div style={styles.activitiesList}>
                    <strong>Actividades: </strong>
                    {resource.activities.join(', ')}
                  </div>
                )}
                
                <button 
                  style={styles.button}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1A1A1A';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#1A1A1A';
                  }}
                >
                  Descargar Recurso
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Videos Recomendados */}
      {currentMedia && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Videos Recomendados para {educationalCategories[selectedCategory].label}
          </div>
          <div style={styles.mediaSection}>
            <div style={styles.mediaGrid}>
              {currentMedia.videos.map((video, index) => (
                <div 
                  key={index} 
                  style={styles.mediaCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    style={styles.videoThumbnail}
                  />
                  <div style={styles.videoContent}>
                    <h4 style={styles.videoTitle}>{video.title}</h4>
                    <div style={styles.videoMeta}>
                      <span>{video.duration}</span>
                      <span>{video.views} vistas</span>
                    </div>
                    <p style={styles.videoDescription}>{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lecturas Recomendadas */}
      {currentMedia && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            Lecturas Recomendadas para {educationalCategories[selectedCategory].label}
          </div>
          <div style={styles.mediaSection}>
            <div style={styles.mediaGrid}>
              {currentMedia.readings.map((reading, index) => (
                <div 
                  key={index} 
                  style={styles.readingCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h4 style={styles.readingTitle}>{reading.title}</h4>
                  <div style={styles.readingMeta}>
                    <span>{reading.type}</span>
                    <span>{reading.pages} páginas</span>
                    <span>{reading.level}</span>
                  </div>
                  <p style={styles.readingDescription}>{reading.description}</p>
                  <button 
                    style={{
                      ...styles.button,
                      marginTop: '15px',
                      padding: '8px 16px',
                      fontSize: '0.8rem'
                    }}
                  >
                    Descargar PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>¿Listo para inspirar?</h2>
        <p style={styles.ctaSubtitle}>
          Únete a nuestra comunidad de educadores y accede a recursos exclusivos 
          para la enseñanza de la astronomía moderna
        </p>
        <button 
          style={{
            ...styles.button,
            background: '#1A1A1A',
            color: '#FFFFFF',
            maxWidth: '300px',
            margin: '0 auto'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1A1A1A';
          }}
        >
          Registrarse como Educador
        </button>
      </div>

    </section>
  );
};

export default Educators;