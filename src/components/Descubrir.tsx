// src/components/Descubrir.tsx
import React, { useState, useRef } from 'react';
import { Search, Upload, Database, BarChart3, Plane, Star, Target, Zap, Download, FileText } from 'lucide-react';

interface ExoplanetData {
  name: string;
  characteristics: {
    pl_rade: number;
    pl_bmasse: number | null;
    pl_orbper: number;
    pl_eqt: number | null;
    st_teff: number;
    st_mass: number;
    st_rad: number;
    sy_dist: number;
  };
  prediction: {
    class: string;
    probabilities: {
      CANDIDATE: number;
      CONFIRMED: number;
      FALSE_POSITIVE: number;
    };
  };
  physicalQualities: string[];
}

interface AnalysisResult {
  name: string;
  probabilities: {
    CANDIDATE: number;
    CONFIRMED: number;
    FALSE_POSITIVE: number;
  };
  classification: string;
  confidence: number;
  discoveryDate: string;
}

const Descubrir: React.FC = () => {
  const [searchType, setSearchType] = useState<'name' | 'upload' | 'manual' | null>(null);
  const [planetName, setPlanetName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [exoplanetData, setExoplanetData] = useState<ExoplanetData | null>(null);
  const [searchPath, setSearchPath] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  // Estados para la subida de archivos
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState('');
  const [dataSource, setDataSource] = useState('Kepler');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [showUploadResults, setShowUploadResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameSearch = async () => {
    if (!planetName.trim()) return;
    
    setIsSearching(true);
    setShowResults(false);
    setSearchPath(`C:\\Users\\Equipo\\Desktop\\exoplanetas_ia\\data\\raw\\kepler\\kepler_ds.csv`);
    
    // Simulación de búsqueda
    setTimeout(() => {
      const mockData: ExoplanetData = {
        name: planetName,
        characteristics: {
          pl_rade: 0.79,
          pl_bmasse: null,
          pl_orbper: 1.916944254,
          pl_eqt: null,
          st_teff: 5239.0,
          st_mass: 0.84,
          st_rad: 0.8,
          sy_dist: 415.218
        },
        prediction: {
          class: "CONFIRMED",
          probabilities: {
            CANDIDATE: 0.41,
            CONFIRMED: 0.47,
            FALSE_POSITIVE: 0.12
          }
        },
        physicalQualities: [
          "Planeta rocoso terrestre",
          "Gigante gaseoso", 
          "Muy caliente",
          "Órbita muy cercana (planeta caliente)",
          "Orbita una estrella tipo Sol"
        ]
      };
      
      setExoplanetData(mockData);
      setIsSearching(false);
      setTimeout(() => setShowResults(true), 100);
    }, 2000);
  };

  // Funciones para la subida de archivos
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      setUploadedFile(file);
      setDatasetName(file.name.replace('.csv', ''));
      setAnalysisResults([]);
      setShowUploadResults(false);
    } else {
      alert('Por favor, sube solo archivos CSV');
    }
  };

  const handleUpload = () => {
    if (!uploadedFile) {
      alert('Por favor, selecciona un archivo primero');
      return;
    }
    
    setIsSearching(true);
    // Simulación de procesamiento con múltiples resultados organizados por clasificación
    setTimeout(() => {
      const mockResults: AnalysisResult[] = [
        {
          name: "TOI-1234 b",
          probabilities: {
            CANDIDATE: 0.15,
            CONFIRMED: 0.72,
            FALSE_POSITIVE: 0.13
          },
          classification: "CONFIRMED",
          confidence: 0.89,
          discoveryDate: "2023-05-15"
        },
        {
          name: "KELT-567 c",
          probabilities: {
            CANDIDATE: 0.65,
            CONFIRMED: 0.25,
            FALSE_POSITIVE: 0.10
          },
          classification: "CANDIDATE",
          confidence: 0.78,
          discoveryDate: "2024-01-20"
        },
        {
          name: "GJ-891 d",
          probabilities: {
            CANDIDATE: 0.08,
            CONFIRMED: 0.12,
            FALSE_POSITIVE: 0.80
          },
          classification: "FALSE_POSITIVE",
          confidence: 0.92,
          discoveryDate: "2023-11-08"
        },
        {
          name: "HD-209458 c",
          probabilities: {
            CANDIDATE: 0.45,
            CONFIRMED: 0.48,
            FALSE_POSITIVE: 0.07
          },
          classification: "CONFIRMED",
          confidence: 0.85,
          discoveryDate: "2024-02-14"
        },
        {
          name: "TRAPPIST-1 h",
          probabilities: {
            CANDIDATE: 0.55,
            CONFIRMED: 0.35,
            FALSE_POSITIVE: 0.10
          },
          classification: "CANDIDATE",
          confidence: 0.72,
          discoveryDate: "2023-09-30"
        },
        {
          name: "Kepler-186 f",
          probabilities: {
            CANDIDATE: 0.20,
            CONFIRMED: 0.68,
            FALSE_POSITIVE: 0.12
          },
          classification: "CONFIRMED",
          confidence: 0.91,
          discoveryDate: "2024-03-01"
        }
      ];
      
      setAnalysisResults(mockResults);
      setIsSearching(false);
      setTimeout(() => setShowUploadResults(true), 100);
    }, 2000);
  };

  // Función para exportar una clasificación específica
  const exportClassificationToCSV = (classification: string) => {
    const filteredResults = analysisResults.filter(result => result.classification === classification);
    const headers = ['Exoplaneta', 'Prob_Confirmado', 'Confianza', 'Fecha_Descubrimiento'];
    const csvContent = [
      headers.join(','),
      ...filteredResults.map(result => [
        result.name,
        result.probabilities.CONFIRMED,
        result.confidence,
        result.discoveryDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${datasetName}_${classification.toLowerCase()}_results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Función para exportar todos los resultados
  const exportAllToCSV = () => {
    const headers = ['Exoplaneta', 'Clasificacion', 'Prob_Confirmado', 'Confianza', 'Fecha_Descubrimiento'];
    const csvContent = [
      headers.join(','),
      ...analysisResults.map(result => [
        result.name,
        result.classification,
        result.probabilities.CONFIRMED,
        result.confidence,
        result.discoveryDate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${datasetName}_all_results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetSearch = () => {
    setSearchType(null);
    setPlanetName('');
    setExoplanetData(null);
    setSearchPath('');
    setShowResults(false);
    setUploadedFile(null);
    setDatasetName('');
    setDataSource('Kepler');
    setAnalysisResults([]);
    setShowUploadResults(false);
  };

  return (
    <section id="descubrir" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 min-h-screen py-16">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-purple-500/10"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
            <Plane className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Descubre Exoplanetas
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explora mundos distantes con tecnología de inteligencia artificial avanzada. 
            Analiza datos de misiones espaciales y descubre nuevos candidatos a exoplanetas.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Menú principal de opciones */}
          {!searchType ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Search,
                  title: 'Buscar por Nombre',
                  description: 'Encuentra exoplanetas conocidos en nuestra base de datos',
                  color: 'from-blue-600 to-cyan-600',
                  onClick: () => setSearchType('name')
                },
                {
                  icon: Upload,
                  title: 'Subir Datos',
                  description: 'Analiza curvas de luz desde archivos CSV , VOTable ,IPAC , Tab-Separated',
                  color: 'from-purple-600 to-pink-600',
                  onClick: () => setSearchType('upload')
                },
                {
                  icon: Database,
                  title: 'Ingreso Manual',
                  description: 'Introduce características específicas para análisis',
                  color: 'from-emerald-600 to-teal-600',
                  onClick: () => setSearchType('manual')
                }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`group relative bg-gradient-to-br ${item.color} rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>
                  <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:translate-x-20 transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-left">{item.title}</h3>
                    <p className="text-gray-200 text-left text-sm leading-relaxed opacity-90">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : searchType === 'name' ? (
            // Sección de búsqueda por nombre
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Búsqueda por Nombre</h3>
                    <p className="text-gray-300 mt-1">Ingresa el nombre del exoplaneta que deseas explorar</p>
                  </div>
                </div>
                <button
                  onClick={resetSearch}
                  className="text-blue-400 hover:text-white transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-blue-500/20 px-4 py-3 rounded-xl border border-white/10 hover:border-blue-500/30"
                >
                  <span>Volver</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-4 text-lg font-semibold flex items-center gap-2">
                    <Star className="w-5 h-5 text-blue-400" />
                    Nombre del Exoplaneta
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={planetName}
                      onChange={(e) => setPlanetName(e.target.value)}
                      placeholder="Ej: Kepler-1222 b, TRAPPIST-1e, HD 209458 b"
                      className="w-full px-6 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700 transition-all duration-300"
                      onKeyPress={(e) => e.key === 'Enter' && handleNameSearch()}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleNameSearch}
                  disabled={!planetName.trim() || isSearching}
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Buscando en la galaxia...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Iniciar Búsqueda</span>
                    </>
                  )}
                </button>
                
                {searchPath && (
                  <div className="text-sm text-blue-300 bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 flex items-start gap-3">
                    <span className="text-blue-400">
                      <FileText className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-semibold mb-1">Fuente de datos:</p>
                      <p className="text-xs text-blue-200 break-all">{searchPath}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resultados de búsqueda por nombre */}
              {exoplanetData && (
                <div className={`mt-8 space-y-6 transition-all duration-700 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="text-center py-8 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent rounded-2xl border-y border-blue-500/20">
                    <h3 className="text-4xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                      <Target className="w-8 h-8 text-blue-400" />
                      {exoplanetData.name}
                    </h3>
                    <p className="text-gray-300 text-lg font-semibold">Exoplaneta Analizado</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/20">
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-blue-400" />
                        Características Principales
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: 'Radio Planetario', value: exoplanetData.characteristics.pl_rade, unit: 'R⊕' },
                          { label: 'Masa Planetaria', value: exoplanetData.characteristics.pl_bmasse, unit: 'M⊕' },
                          { label: 'Período Orbital', value: exoplanetData.characteristics.pl_orbper, unit: 'días' },
                          { label: 'Temp. Equilibrio', value: exoplanetData.characteristics.pl_eqt, unit: 'K' },
                          { label: 'Temp. Estelar', value: exoplanetData.characteristics.st_teff, unit: 'K' },
                          { label: 'Masa Estelar', value: exoplanetData.characteristics.st_mass, unit: 'M☉' },
                          { label: 'Radio Estelar', value: exoplanetData.characteristics.st_rad, unit: 'R☉' },
                          { label: 'Distancia Sistema', value: exoplanetData.characteristics.sy_dist, unit: 'pc' }
                        ].map(({ label, value, unit }) => (
                          <div key={label} className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all duration-200 group">
                            <span className="text-gray-300 font-medium">{label}:</span>
                            <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-200">
                              {value ?? 'N/A'} <span className="text-blue-400 text-sm">{value ? unit : ''}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <Target className="w-6 h-6 text-purple-400" />
                        Predicción del Modelo
                      </h4>
                      <div className="space-y-6">
                        <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                          <p className="text-gray-300 mb-3 text-sm font-semibold">Clasificación</p>
                          <span className={`px-6 py-3 rounded-full text-lg font-bold inline-block shadow-lg transition-all duration-300 hover:scale-110 ${
                            exoplanetData.prediction.class === 'CONFIRMED' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                              : exoplanetData.prediction.class === 'CANDIDATE'
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                              : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                          }`}>
                            {exoplanetData.prediction.class === 'CONFIRMED' ? '✓ ' : exoplanetData.prediction.class === 'CANDIDATE' ? '◐ ' : '✗ '}
                            {exoplanetData.prediction.class}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-gray-300 mb-4 font-semibold flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Distribución de Probabilidades
                          </p>
                          <div className="space-y-4">
                            {Object.entries(exoplanetData.prediction.probabilities).map(([key, value]) => (
                              <div key={key}>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium text-gray-300">{key}</span>
                                  <span className="text-blue-400 font-bold text-lg">
                                    {(value * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <div className="w-full bg-purple-500/20 rounded-full h-3 overflow-hidden border border-purple-500/30">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-purple-400 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                                    style={{ width: showResults ? `${value * 100}%` : '0%' }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl p-6 border border-indigo-500/20">
                    <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Plane className="w-6 h-6 text-indigo-400" />
                      Posibles Cualidades Físicas
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {exoplanetData.physicalQualities.map((quality, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 p-4 bg-indigo-500/10 rounded-xl hover:bg-indigo-500/20 transition-all duration-200 border border-indigo-500/0 hover:border-indigo-500/30 group cursor-default"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">✨</span>
                          <span className="text-sm font-medium text-white">{quality}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <button
                      onClick={resetSearch}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl inline-flex items-center gap-3"
                    >
                      <Search className="w-5 h-5" />
                      Nueva Búsqueda
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : searchType === 'upload' ? (
            // Sección de subida de archivos
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">Subir Dataset</h3>
                    <p className="text-gray-300 mt-1">Analiza datos de tránsitos planetarios desde archivos CSV , VOTable , IPAC , Tab-Separated</p>
                  </div>
                </div>
                <button
                  onClick={resetSearch}
                  className="text-purple-400 hover:text-white transition-all duration-300 flex items-center gap-2 bg-white/5 hover:bg-purple-500/20 px-4 py-3 rounded-xl border border-white/10 hover:border-purple-500/30"
                >
                  <span>Volver</span>
                </button>
              </div>

              {!showUploadResults ? (
                <div className="space-y-8">
                  {/* Área de subida de archivos */}
                  <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                      isDragging 
                        ? 'border-purple-400 bg-purple-500/10' 
                        : uploadedFile 
                        ? 'border-green-400 bg-green-500/10' 
                        : 'border-gray-400 bg-white/5 hover:border-purple-400/50 hover:bg-purple-500/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".csv"
                      className="hidden"
                    />
                    
                    <div className="w-20 h-20 bg-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Upload className={`w-10 h-10 ${
                        uploadedFile ? 'text-green-400' : 'text-purple-400'
                      }`} />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-3">
                      {uploadedFile ? 'Archivo Listo' : 'Subir Datos de Curvas de Luz'}
                    </h4>
                    
                    <p className="text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
                      {uploadedFile 
                        ? `Archivo seleccionado: ${uploadedFile.name}`
                        : 'Arrastra y suelta archivos CSV o haz clic para explorar'
                      }
                    </p>
                    
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Formatos soportados: CSV , VOTable ,IPAC , Tab-Separated</p>
                      <p>Tamaño máximo: 100MB</p>
                    </div>
                  </div>

                  {/* Información del dataset */}
                  {uploadedFile && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-3 font-semibold">Nombre del Dataset</label>
                        <input
                          type="text"
                          value={datasetName}
                          onChange={(e) => setDatasetName(e.target.value)}
                          placeholder="Ingresa un nombre descriptivo"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-700 transition-all duration-300"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white mb-3 font-semibold">Fuente de Datos</label>
                        <select
                          value={dataSource}
                          onChange={(e) => setDataSource(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-gray-700 transition-all duration-300"
                        >
                          <option value="Kepler">Kepler</option>
                          <option value="TESS">TESS</option>
                          <option value="CoRoT">CoRoT</option>
                          <option value="Other">Otro</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Botón de subida */}
                  <button
                    onClick={handleUpload}
                    disabled={!uploadedFile || isSearching}
                    className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Procesando datos...</span>
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5" />
                        <span>Procesar Datos</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                /* Resultados del análisis de archivos */
                <div className={`space-y-8 transition-all duration-700 ${showUploadResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {/* Header de resultados */}
                  <div className="text-center py-8 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent rounded-2xl border-y border-purple-500/20">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Análisis Completado</h3>
                    <p className="text-gray-300 mb-4">Resultados del procesamiento de {uploadedFile?.name}</p>
                    
                    {/* Estadísticas generales - DATOS ACTUALIZADOS */}
                    <div className="flex justify-center gap-8 mt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">
                          5,466
                        </div>
                        <div className="text-sm text-gray-300">Confirmados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">
                          4,546
                        </div>
                        <div className="text-sm text-gray-300">Candidatos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-400">
                          2,342
                        </div>
                        <div className="text-sm text-gray-300">Falsos Positivos</div>
                      </div>
                    </div>
                  </div>

                  {/* Botón de exportación general */}
                  <div className="flex justify-center">
                    <button
                      onClick={exportAllToCSV}
                      className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Exportar Todos los Resultados (CSV)
                    </button>
                  </div>

                  {/* Tabla de CONFIRMED */}
                  {analysisResults.filter(r => r.classification === 'CONFIRMED').length > 0 && (
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-green-400" />
                          </div>
                          Exoplanetas Confirmados
                          <span className="text-green-400 text-sm font-normal ml-2">
                            (5,466 resultados)
                          </span>
                        </h4>
                        <button
                          onClick={() => exportClassificationToCSV('CONFIRMED')}
                          className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg border border-green-500/30 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          Exportar CSV
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-green-500/20">
                              <th className="text-left py-4 px-4 text-green-300 font-semibold">Exoplaneta</th>
                              <th className="text-center py-4 px-4 text-green-300 font-semibold">Prob. Confirmado</th>
                              <th className="text-center py-4 px-4 text-green-300 font-semibold">Confianza</th>
                              <th className="text-center py-4 px-4 text-green-300 font-semibold">Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            {analysisResults
                              .filter(result => result.classification === 'CONFIRMED')
                              .map((result, index) => (
                              <tr key={index} className="border-b border-green-500/10 hover:bg-green-500/5 transition-all duration-200">
                                <td className="py-4 px-4 text-white font-medium">{result.name}</td>
                                <td className="py-4 px-4 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="text-green-400 font-bold text-lg">{(result.probabilities.CONFIRMED * 100).toFixed(1)}%</span>
                                    <div className="w-24 bg-green-500/20 rounded-full h-2 mt-1">
                                      <div 
                                        className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full"
                                        style={{ width: `${result.probabilities.CONFIRMED * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span className="text-emerald-300 font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                                </td>
                                <td className="py-4 px-4 text-center text-gray-300">{result.discoveryDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Tabla de CANDIDATES */}
                  {analysisResults.filter(r => r.classification === 'CANDIDATE').length > 0 && (
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-yellow-400" />
                          </div>
                          Candidatos a Exoplanetas
                          <span className="text-yellow-400 text-sm font-normal ml-2">
                            (4,546 resultados)
                          </span>
                        </h4>
                        <button
                          onClick={() => exportClassificationToCSV('CANDIDATE')}
                          className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg border border-yellow-500/30 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          Exportar CSV
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-yellow-500/20">
                              <th className="text-left py-4 px-4 text-yellow-300 font-semibold">Exoplaneta</th>
                              <th className="text-center py-4 px-4 text-yellow-300 font-semibold">Prob. Candidato</th>
                              <th className="text-center py-4 px-4 text-yellow-300 font-semibold">Confianza</th>
                              <th className="text-center py-4 px-4 text-yellow-300 font-semibold">Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            {analysisResults
                              .filter(result => result.classification === 'CANDIDATE')
                              .map((result, index) => (
                              <tr key={index} className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-all duration-200">
                                <td className="py-4 px-4 text-white font-medium">{result.name}</td>
                                <td className="py-4 px-4 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="text-yellow-400 font-bold text-lg">{(result.probabilities.CANDIDATE * 100).toFixed(1)}%</span>
                                    <div className="w-24 bg-yellow-500/20 rounded-full h-2 mt-1">
                                      <div 
                                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                                        style={{ width: `${result.probabilities.CANDIDATE * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span className="text-orange-300 font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                                </td>
                                <td className="py-4 px-4 text-center text-gray-300">{result.discoveryDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Tabla de FALSE_POSITIVES */}
                  {analysisResults.filter(r => r.classification === 'FALSE_POSITIVE').length > 0 && (
                    <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-2xl p-6 border border-red-500/20">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-bold text-white flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <Target className="w-4 h-4 text-red-400" />
                          </div>
                          Falsos Positivos
                          <span className="text-red-400 text-sm font-normal ml-2">
                            (2,342 resultados)
                          </span>
                        </h4>
                        <button
                          onClick={() => exportClassificationToCSV('FALSE_POSITIVE')}
                          className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg border border-red-500/30 transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          Exportar CSV
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-red-500/20">
                              <th className="text-left py-4 px-4 text-red-300 font-semibold">Exoplaneta</th>
                              <th className="text-center py-4 px-4 text-red-300 font-semibold">Prob. Falso Positivo</th>
                              <th className="text-center py-4 px-4 text-red-300 font-semibold">Confianza</th>
                              <th className="text-center py-4 px-4 text-red-300 font-semibold">Fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            {analysisResults
                              .filter(result => result.classification === 'FALSE_POSITIVE')
                              .map((result, index) => (
                              <tr key={index} className="border-b border-red-500/10 hover:bg-red-500/5 transition-all duration-200">
                                <td className="py-4 px-4 text-white font-medium">{result.name}</td>
                                <td className="py-4 px-4 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="text-red-400 font-bold text-lg">{(result.probabilities.FALSE_POSITIVE * 100).toFixed(1)}%</span>
                                    <div className="w-24 bg-red-500/20 rounded-full h-2 mt-1">
                                      <div 
                                        className="bg-gradient-to-r from-red-400 to-rose-400 h-2 rounded-full"
                                        style={{ width: `${result.probabilities.FALSE_POSITIVE * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                  <span className="text-rose-300 font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                                </td>
                                <td className="py-4 px-4 text-center text-gray-300">{result.discoveryDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="text-center pt-6">
                    <button
                      onClick={resetSearch}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl inline-flex items-center gap-3"
                    >
                      <Upload className="w-5 h-5" />
                      Analizar Otro Dataset
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>F
      </div>
    </section>
  );
};

export default Descubrir;