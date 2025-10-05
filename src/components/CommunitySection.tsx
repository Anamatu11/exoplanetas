import React, { useState } from 'react'; 
import { Trophy, Star, Search, Medal, Award, TrendingUp, Users, MessageCircle, Clock, Flame, Group, Plus, Sparkles, MapPin, School, Calendar, Target, Users as UsersIcon, BookOpen, Award as AwardIcon } from 'lucide-react';

interface Contributor {
  name: string;
  photo: string;
  contributions: number;
  discoveries: number;
  reputation: number;
  medal?: "gold" | "silver" | "bronze" | "star";
  hasBorder?: boolean;
  borderColor?: string;
}

interface ForumTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  timeAgo: string;
  isPopular: boolean;
}

interface SuccessStory {
  id: number;
  title: string;
  author: string;
  role: string;
  location: string;
  date: string;
  image: string;
  description: string;
  achievement: string;
  timeInvested: string;
  collaborators: number;
  publications: number;
  impact: {
    title: string;
    description: string;
  };
  tags: string[];
}

const contributors: Contributor[] = [
  {
    name: "Dr. María González",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjIk77nLmVEugd5bwQne3fo14iNagqepNB3WXCJGCuR2UQMCr4Wzm9TkhFS3cfhLUo4LTdHVQdNZJ5X4r13TpLgPkQ7sQyV6HZ90_g-dB5Fi0yuxh2OZ5WXOAiGTWw-AFlQnQ7IOnw06fXTZNwsanw-DFLGlUysVwGnRAmO6drAONbCdQflq9YWMM7LHralnvs3Xm9sKXWrCL774p79_xXLyHDYMoOxDPDIUgP07ndkVwzkRCGJb5EUg-8Ewq3L1mViQiQJ0FWohwa",
    contributions: 2847,
    discoveries: 23,
    reputation: 9850,
    medal: "gold",
  },
  {
    name: "Alex Chen",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXPtJiWxMHLgzEO-zgpSqQxaeSZahBbZzfraw-wqRw-xoCSlh1BZLFXPMYuWsc0syD3qlOJVMo_-jw3uuiGYCZw4YfZJJgltCCsBCNKKMlgVm87czp8UUp28rW-Kesta2xmcxe4OPcfLJZEDy6LPGSZoFrPFlUrPwbAangA5743htbc8hg464Wj4PBrYeLeii4PWMBlY40cWHb2TeR-LWrTj54LzXuMiKZVbSaz55aUbx2uNdwMr0DWGqeTP3ezbD-KPGPa4gk74dX",
    contributions: 2156,
    discoveries: 18,
    reputation: 8920,
    medal: "silver",
  },
  {
    name: "Prof. James Wilson",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArRU9egm-tvSb8DYltrPvVHLsMh5ARfxI6zH6jBtEBbC7cpOK9ksPGVs50ZSI97wAHfrC_v8x1eb_4I8sqSdqjQs5XvU-cURAID4MHsj_eMlmdlHOIqa_VxwjK7BxYj97APMbQsbaKI-6Mz78OQKKSO9E2sunoMxcpsfhMXAkH0n1KC9kMif2mah6HO89qk0y8yFePkTK3W4kvnoWuwaFthnyhwWJ5tLvks2LOSzTx03UB4NQan3Ph6XKfig759KpVXdH0d2S9Sndb",
    contributions: 1934,
    discoveries: 15,
    reputation: 8340,
    medal: "bronze",
  },
];

const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "¿Cómo interpretar curvas de luz con ruido alto?",
    author: "AstroNovice2024",
    category: "Análisis de Datos",
    replies: 23,
    timeAgo: "hace 2 horas",
    isPopular: true
  },
  {
    id: 2,
    title: "Nuevo candidato prometedor en TOI-3456",
    author: "PlanetHunter",
    category: "Descubrimientos",
    replies: 45,
    timeAgo: "hace 4 horas",
    isPopular: true
  },
  {
    id: 3,
    title: "Técnicas para reducir falsos positivos",
    author: "Dr.ExpertAnalyst",
    category: "Metodología",
    replies: 67,
    timeAgo: "hace 6 horas",
    isPopular: false
  },
  {
    id: 4,
    title: "Propuesta: Nuevo sistema de clasificación",
    author: "InnovativeResearcher",
    category: "Propuestas",
    replies: 34,
    timeAgo: "hace 1 día",
    isPopular: false
  }
];

const successStories: SuccessStory[] = [
  {
    id: 1,
    title: "Estudiante de 16 años descubre exoplaneta potencialmente habitable",
    author: "Pedro Rodríguez",
    role: "Estudiante de Bachillerato",
    location: "Madrid, España",
    date: "15 de marzo, 2025",
    image: "https://media.istockphoto.com/id/518090422/es/foto/retrato-de-ni%C3%B1o-sonriente-sobre-fondo-amarillo.jpg?s=612x612&w=0&k=20&c=8PVq_E6yZd_91pTvE0SlAaHY_ZRBV6ZwT6FgKu0bgFM=",
    description: "Pedro, estudiante de bachillerato en Madrid, identificó un candidato a exoplaneta en la zona habitable de su estrella usando COSMIC EXPLORERS durante sus clases de física.",
    achievement: "Primer exoplaneta identificado por un estudiante de secundaria en España",
    timeInvested: "3 meses",
    collaborators: 2,
    publications: 1,
    impact: {
      title: "Impacto Científico:",
      description: "Su descubrimiento está siendo verificado por astrónomos profesionales del Instituto de Astrofísica de Canarias y podría llevar a su primera publicación científica."
    },
    tags: ["Estudiante", "Exoplaneta", "Zona Habitable", "Descubrimiento"]
  },
  {
    id: 2,
    title: "Profesor jubilado contribuye al descubrimiento de sistema planetario múltiple",
    author: "Roberto Martínez",
    role: "Profesor de Física Jubilado",
    location: "Barcelona, España",
    date: "8 de febrero, 2024",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa2UnLFdygPxOARqUsHhs5IoRnu35SkESi3VjAbVoFFZgytPQ1ftdDlv4QlVKVVeUN3mpgK92lTJIUIzdAb_nHKQDszLnCWwrnFFY0yEP6MRpZQujFKxhPiSddeDCwe9qdwVwvlxYta4yiHBxhjjtrXME9erPiSUZsbW4Uh55PYer8VTGQTDd1n8yDOCxA8RM43TWFTT0cvxsnht4RbZ29kc2hbVFSsV3IS9HbIEY4em-ZKiaeOTp5a-bcvHUEVbzHn7wOWAVTRPI",
    description: "Roberto, profesor de física jubilado con 40 años de experiencia, identificó patrones complejos en datos de TESS que llevaron al descubrimiento de un sistema con 4 planetas orbitando una estrella similar al Sol.",
    achievement: "Sistema multiplanetario TOI-5678 confirmado",
    timeInvested: "8 meses",
    collaborators: 12,
    publications: 2,
    impact: {
      title: "Impacto Académico:",
      description: "Su análisis contribuyó a una publicación científica en 'Astronomy & Astrophysics' en colaboración con la Universidad de Barcelona y el equipo científico de la misión TESS."
    },
    tags: ["Jubilado", "Sistema Multiplanetario", "TESS", "Colaboración"]
  },
  {
    id: 3,
    title: "Ingeniera peruana lidera equipo que identifica 15 nuevos candidatos exoplanetarios",
    author: "Laura Mendoza",
    role: "Ingeniera de Software",
    location: "Lima, Perú",
    date: "22 de enero, 2024",
    image: "https://media.istockphoto.com/id/1474897178/es/foto/retrato-de-una-hermosa-mujer-latina-sonriendo-al-aire-libre-con-la-luz-del-atardecer-imagen.jpg?s=612x612&w=0&k=20&c=B6l8KDJpSOz2m8N8NSEbjpjQN6MbVcoWw_S1MswU5po=",
    description: "Laura combinó sus habilidades en programación con su pasión por la astronomía para desarrollar algoritmos que mejoraron la detección de señales exoplanetarias en datos de Kepler.",
    achievement: "Récord de candidatos identificados en un solo mes",
    timeInvested: "6 meses",
    collaborators: 8,
    publications: 3,
    impact: {
      title: "Impacto Tecnológico:",
      description: "Sus algoritmos han sido adoptados por la comunidad científica y han aumentado la eficiencia en la detección de exoplanetas en un 40%."
    },
    tags: ["Algoritmos", "Kepler", "Liderazgo", "Innovación"]
  }
];

export const CommunitySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ranking' | 'stories' | 'forum'>('ranking');

  const styles = {
    container: {
      background: '#FFFFFF',
      padding: '80px 40px 60px',
      color: '#1A1A1A',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      lineHeight: '1.6'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '60px',
      maxWidth: '800px',
      margin: '0 auto'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '400',
      marginBottom: '20px',
      color: '#1A1A1A',
      letterSpacing: '-0.02em',
      fontFamily: "'Georgia', serif"
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#666666',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    section: {
      maxWidth: '1000px',
      margin: '0 auto 80px'
    },
    navigation: {
      display: 'flex',
      justifyContent: 'center',
      borderBottom: '1px solid #E5E5E5',
      marginBottom: '40px',
      paddingBottom: '20px'
    },
    navLinks: {
      display: 'flex',
      gap: '40px'
    },
    navLink: (isActive: boolean) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.9rem',
      color: isActive ? '#1A1A1A' : '#666666',
      textDecoration: 'none',
      padding: '12px 0',
      borderBottom: isActive ? '2px solid #1A1A1A' : '2px solid transparent',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }),
    mainTitle: {
      fontSize: '1.8rem',
      fontWeight: '400',
      color: '#1A1A1A',
      textAlign: 'center' as const,
      marginBottom: '40px',
      fontFamily: "'Georgia', serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    // Ranking Styles
    contributorCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      padding: '30px',
      borderRadius: '8px',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '20px'
    },
    contributorImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover' as const,
      border: '2px solid #E5E5E5'
    },
    contributorInfo: {
      flex: '1'
    },
    contributorName: {
      fontSize: '1.3rem',
      fontWeight: '400',
      color: '#1A1A1A',
      marginBottom: '15px',
      fontFamily: "'Georgia', serif"
    },
    contributorStats: {
      display: 'flex',
      gap: '30px'
    },
    statItem: {
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '300',
      color: '#1A1A1A',
      marginBottom: '4px',
      fontFamily: "'Georgia', serif"
    },
    statLabel: {
      fontSize: '0.8rem',
      color: '#666666',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    // Forum Styles
    forumHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px'
    },
    forumTitle: {
      fontSize: '1.5rem',
      fontWeight: '400',
      color: '#1A1A1A',
      fontFamily: "'Georgia', serif",
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    newTopicButton: {
      background: 'transparent',
      border: '1px solid #1A1A1A',
      color: '#1A1A1A',
      padding: '12px 24px',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    topicCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      padding: '25px',
      borderRadius: '12px',
      marginBottom: '15px',
      transition: 'all 0.3s ease'
    },
    topicCategory: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.8rem',
      color: '#666666',
      marginBottom: '10px'
    },
    popularBadge: {
      background: '#FEF2F2',
      color: '#DC2626',
      fontSize: '0.7rem',
      fontWeight: '600',
      padding: '4px 8px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      marginRight: '8px'
    },
    topicTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '12px',
      lineHeight: '1.4'
    },
    topicMeta: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.8rem',
      color: '#666666',
      gap: '15px'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    // Stories Styles
    storyCard: {
      background: '#FFFFFF',
      border: '1px solid #E5E5E5',
      borderRadius: '16px',
      marginBottom: '32px',
      overflow: 'hidden' as const,
      transition: 'all 0.3s ease'
    },
    storyContent: {
      display: 'flex',
      flexDirection: 'row' as const
    },
    storyImageContainer: {
      flexShrink: 0,
      width: '280px',
      position: 'relative' as const
    },
    storyImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const
    },
    storyText: {
      padding: '32px',
      flex: 1
    },
    storyHeader: {
      marginBottom: '20px'
    },
    storyMeta: {
      fontSize: '0.875rem',
      color: '#666666',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap' as const
    },
    metaItemStory: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    storyTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '16px',
      lineHeight: '1.3'
    },
    storyDescription: {
      fontSize: '1rem',
      color: '#666666',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    achievementSection: {
      background: '#F0F9FF',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    achievementTitle: {
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginBottom: '20px'
    },
    statBox: {
      background: '#F8F8F8',
      padding: '16px',
      borderRadius: '8px',
      textAlign: 'center' as const
    },
    statNumberStory: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '4px'
    },
    statLabelStory: {
      fontSize: '0.75rem',
      color: '#666666',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    storyImpact: {
      background: '#F8F4FF',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    impactTitle: {
      fontWeight: '600',
      color: '#1A1A1A',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    impactDescription: {
      fontSize: '0.9rem',
      color: '#666666',
      lineHeight: '1.5'
    },
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      marginBottom: '20px'
    },
    tag: {
      background: '#E5E7EB',
      color: '#374151',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    readMoreLink: {
      display: 'inline-block',
      color: '#8B5CF6',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      fontSize: '0.9rem'
    },
    // Common Styles
    button: {
      background: 'transparent',
      border: '1px solid #1A1A1A',
      color: '#1A1A1A',
      padding: '12px 24px',
      fontSize: '0.85rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
      borderRadius: '4px'
    },
    expertSection: {
      background: '#F8F8F8',
      padding: '40px',
      borderRadius: '12px',
      textAlign: 'center' as const,
      marginTop: '40px'
    },
    expertTitle: {
      fontSize: '1.3rem',
      fontWeight: '400',
      color: '#1A1A1A',
      marginBottom: '15px',
      fontFamily: "'Georgia', serif"
    },
    expertDescription: {
      fontSize: '0.9rem',
      color: '#666666',
      lineHeight: '1.5',
      marginBottom: '20px',
      maxWidth: '600px',
      margin: '0 auto'
    },
    expertButton: {
      background: '#1A1A1A',
      color: '#FFFFFF',
      padding: '14px 32px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderRadius: '4px',
      border: '1px solid #1A1A1A'
    },
    medalIcon: {
      width: '24px',
      height: '24px'
    }
  };

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case "gold":
        return <Trophy style={styles.medalIcon} color="#D4AF37" />;
      case "silver":
        return <Medal style={styles.medalIcon} color="#C0C0C0" />;
      case "bronze":
        return <Award style={styles.medalIcon} color="#CD7F32" />;
      case "star":
        return <Star style={styles.medalIcon} color="#FFD700" />;
      default:
        return <Star style={styles.medalIcon} color="#FFD700" />;
    }
  };

  const renderRanking = () => (
    <div>
      <h2 style={styles.mainTitle}>
        <Trophy size={28} color="#D4AF37" />
        Top Contribuyentes Globales
      </h2>

      <div>
        {contributors.map((contributor, index) => (
          <div
            key={index}
            style={styles.contributorCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div>
              {getMedalIcon(contributor.medal || "star")}
            </div>
            
            <img
              src={contributor.photo}
              alt={`Foto de ${contributor.name}`}
              style={styles.contributorImage}
            />
            
            <div style={styles.contributorInfo}>
              <h3 style={styles.contributorName}>{contributor.name}</h3>
              <div style={styles.contributorStats}>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>{contributor.contributions.toLocaleString()}</div>
                  <div style={styles.statLabel}>contribuciones</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>{contributor.discoveries}</div>
                  <div style={styles.statLabel}>descubrimientos</div>
                </div>
                <div style={styles.statItem}>
                  <div style={{ ...styles.statNumber, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} color="#FFD700" />
                    {contributor.reputation.toLocaleString()}
                  </div>
                  <div style={styles.statLabel}>reputación</div>
                </div>
              </div>
            </div>
            
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
              Ver Perfil
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStories = () => (
    <div>
      <h2 style={styles.mainTitle}>
        <Sparkles size={28} color="#8B5CF6" />
        Historias Inspiradoras de Nuestra Comunidad
      </h2>

      <div>
        {successStories.map((story) => (
          <div
            key={story.id}
            style={styles.storyCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.storyContent}>
              <div style={styles.storyImageContainer}>
                <img
                  src={story.image}
                  alt={story.title}
                  style={styles.storyImage}
                />
              </div>
              <div style={styles.storyText}>
                <div style={styles.storyHeader}>
                  <div style={styles.storyMeta}>
                    <div style={styles.metaItemStory}>
                      <Calendar size={14} />
                      <span>{story.date}</span>
                    </div>
                    <div style={styles.metaItemStory}>
                      <MapPin size={14} />
                      <span>{story.location}</span>
                    </div>
                    <div style={styles.metaItemStory}>
                      <School size={14} />
                      <span>{story.role}</span>
                    </div>
                  </div>
                  <h3 style={styles.storyTitle}>{story.title}</h3>
                  <p style={styles.storyDescription}>{story.description}</p>
                </div>

                <div style={styles.achievementSection}>
                  <div style={styles.achievementTitle}>
                    <Target size={16} />
                    Logro Principal:
                  </div>
                  <p style={styles.impactDescription}>{story.achievement}</p>
                </div>

                <div style={styles.statsGrid}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumberStory}>{story.timeInvested}</div>
                    <div style={styles.statLabelStory}>Tiempo Invertido</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumberStory}>{story.collaborators}</div>
                    <div style={styles.statLabelStory}>Colaboradores</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumberStory}>{story.publications}</div>
                    <div style={styles.statLabelStory}>Publicaciones</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumberStory}>
                      <AwardIcon size={16} style={{ display: 'inline', marginRight: '4px' }} />
                      {story.tags.length}
                    </div>
                    <div style={styles.statLabelStory}>Habilidades</div>
                  </div>
                </div>

                <div style={styles.storyImpact}>
                  <div style={styles.impactTitle}>
                    <TrendingUp size={16} />
                    {story.impact.title}
                  </div>
                  <p style={styles.impactDescription}>{story.impact.description}</p>
                </div>

                <div style={styles.tagsContainer}>
                  {story.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <a 
                  href="#" 
                  style={styles.readMoreLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#7C3AED';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8B5CF6';
                  }}
                >
                  Leer historia completa y ver galería →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderForum = () => (
    <div>
      <div style={styles.forumHeader}>
        <h2 style={styles.forumTitle}>
          <MessageCircle size={24} color="#1A1A1A" />
          Peer Review Abierto
        </h2>
        <button 
          style={styles.newTopicButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1A1A1A';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#1A1A1A';
          }}
        >
          <Plus size={16} />
          Nuevo Tema
        </button>
      </div>

      <div>
        {forumTopics.map((topic) => (
          <div
            key={topic.id}
            style={styles.topicCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={styles.topicCategory}>
              {topic.isPopular && (
                <span style={styles.popularBadge}>
                  <Flame size={12} />
                  Popular
                </span>
              )}
              <span>{topic.category}</span>
            </div>
            
            <h3 style={styles.topicTitle}>{topic.title}</h3>
            
            <div style={styles.topicMeta}>
              <span>Por {topic.author}</span>
              <span style={styles.metaItem}>
                <MessageCircle size={14} />
                {topic.replies} respuestas
              </span>
              <span style={styles.metaItem}>
                <Clock size={14} />
                {topic.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.expertSection}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Group size={32} color="#1A1A1A" />
        </div>
        <h3 style={styles.expertTitle}>Conexión con Investigadores Profesionales</h3>
        <p style={styles.expertDescription}>
          Nuestro foro conecta directamente a ciudadanos científicos con investigadores profesionales 
          de instituciones como ESA, NASA, y observatorios internacionales.
        </p>
        <button 
          style={styles.expertButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1A1A1A';
          }}
        >
          Conectar con Expertos
        </button>
      </div>
    </div>
  );

  return (
    <section id="comunidad" style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Comunidad Científica</h1>
        <p style={styles.subtitle}>
          Conecta con investigadores, comparte descubrimientos y participa en discusiones científicas
        </p>
      </div>

      <div style={styles.section}>
        
        {/* Navigation Tabs */}
        <nav style={styles.navigation}>
          <div style={styles.navLinks}>
            <div 
              style={styles.navLink(activeTab === 'ranking')}
              onClick={() => setActiveTab('ranking')}
            >
              <Users size={18} />
              <span>Ranking Global</span>
            </div>
            <div 
              style={styles.navLink(activeTab === 'stories')}
              onClick={() => setActiveTab('stories')}
            >
              <Star size={18} style={{ fontVariationSettings: "'FILL' 1" }} />
              <span>Historias de Éxito</span>
            </div>
            <div 
              style={styles.navLink(activeTab === 'forum')}
              onClick={() => setActiveTab('forum')}
            >
              <MessageCircle size={18} />
              <span>Foro Científico</span>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main>
          {activeTab === 'ranking' && renderRanking()}
          {activeTab === 'stories' && renderStories()}
          {activeTab === 'forum' && renderForum()}
        </main>
      </div>
    </section>
  );
};

export default CommunitySection;