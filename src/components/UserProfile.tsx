import React, { useState } from 'react';
import { User, Award, Star, MapPin, Calendar, TrendingUp, Shield, Download, Edit3 } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Estado de productor
  const [producerData, setProducerData] = useState({
    name: 'María Isabel García',
    farmName: 'Finca La Esperanza',
    memberSince: '2020-03-15',
    region: 'Cauca, Colombia',
    altitude: '1,600 msnm',
    farmSize: '12 hectáreas',
    membershipType: 'Gratuita - Pequeño Productor',
    rating: 4.8,
    totalSales: 2850,
    activeLots: 3,
    completedOrders: 156,
    verificationLevel: 'Verificado Plus'
  });

  // Estado para edición
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(producerData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProducerData(formData);
    setIsEditing(false);
  };

  const certifications = [
    { name: 'Orgánico', issuer: 'USDA', expiry: '2025-06-30', status: 'active' },
    { name: 'Fair Trade', issuer: 'FLO', expiry: '2024-12-31', status: 'active' },
    { name: 'Rainforest Alliance', issuer: 'RA', expiry: '2025-03-15', status: 'active' },
    { name: 'UTZ Certified', issuer: 'UTZ', expiry: '2024-08-20', status: 'expiring' }
  ];

  const recentSales = [
    { id: 1, lot: 'LOT-2024-001', quantity: '500 kg', price: 45000, buyer: 'Café Amor', date: '2024-01-15', status: 'completed' },
    { id: 2, lot: 'LOT-2024-002', quantity: '300 kg', price: 42000, buyer: 'Tostaduria Premium', date: '2024-01-10', status: 'completed' },
    { id: 3, lot: 'LOT-2024-003', quantity: '750 kg', price: 48000, buyer: 'Coffee Experts', date: '2024-01-05', status: 'completed' }
  ];

  const reviews = [
    { id: 1, buyer: 'Café Amor', rating: 5, comment: 'Excelente calidad, café muy bien procesado. Notas dulces perfectas.', date: '2024-01-16' },
    { id: 2, buyer: 'Tostaduria Premium', rating: 4, comment: 'Muy buen café, llegó en perfectas condiciones. Recomendado.', date: '2024-01-12' }
  ];

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: User },
    { id: 'sales', label: 'Ventas', icon: TrendingUp },
    { id: 'certifications', label: 'Certificaciones', icon: Award },
    { id: 'reviews', label: 'Reseñas', icon: Star }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{producerData.rating}</div>
                <div className="text-blue-700 text-sm">Calificación</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">{producerData.totalSales.toLocaleString()}</div>
                <div className="text-green-700 text-sm">kg Vendidos</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="text-2xl font-bold text-amber-600">{producerData.activeLots}</div>
                <div className="text-amber-700 text-sm">Lotes Activos</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">{producerData.completedOrders}</div>
                <div className="text-purple-700 text-sm">Órdenes Completadas</div>
              </div>
            </div>

            {/* Farm Information */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Información de la Finca</h3>

              {!isEditing ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Ubicación</label>
                    <div className="font-medium">{producerData.region}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Altitud</label>
                    <div className="font-medium">{producerData.altitude}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Tamaño</label>
                    <div className="font-medium">{producerData.farmSize}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Miembro desde</label>
                    <div className="font-medium">{new Date(producerData.memberSince).toLocaleDateString()}</div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Finca</label>
                    <input
                      type="text"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Ubicación</label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Altitud</label>
                    <input
                      type="text"
                      name="altitude"
                      value={formData.altitude}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Tamaño</label>
                    <input
                      type="text"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Miembro desde</label>
                    <input
                      type="date"
                      name="memberSince"
                      value={formData.memberSince}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="col-span-2 flex gap-3 mt-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className="space-y-6">
            {/* Sales Summary */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold">$128.5M</div>
                <div className="text-green-100">Ingresos Totales</div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold">$45.2K</div>
                <div className="text-blue-100">Promedio por kg</div>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold">+15%</div>
                <div className="text-amber-100">vs. Año Anterior</div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ventas Recientes</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Lote</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Cantidad</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Precio/kg</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Comprador</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Fecha</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="border-b border-gray-100">
                        <td className="py-4 font-medium">{sale.lot}</td>
                        <td className="py-4">{sale.quantity}</td>
                        <td className="py-4">${sale.price.toLocaleString()}</td>
                        <td className="py-4">{sale.buyer}</td>
                        <td className="py-4">{new Date(sale.date).toLocaleDateString()}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Completado
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'certifications':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{cert.name}</h3>
                        <p className="text-gray-500 text-sm">Otorgado por {cert.issuer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cert.status === 'active' ? 'bg-green-100 text-green-800' :
                        cert.status === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {cert.status === 'active' ? 'Activa' :
                         cert.status === 'expiring' ? 'Por vencer' : 'Vencida'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Fecha de vencimiento:</span>
                      <div className="font-medium">{new Date(cert.expiry).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Estado:</span>
                      <div className="font-medium">{cert.status === 'active' ? 'Vigente' : 'Por renovar'}</div>
                    </div>
                    <div>
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        <span>Descargar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            {/* Rating Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-amber-600 mb-2">{producerData.rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(producerData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <div className="text-gray-500 text-sm">Basado en {reviews.length} reseñas</div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.buyer}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div 
            className="h-32 bg-gradient-to-r from-green-500 to-blue-600"
            style={{
              backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.8), rgba(37, 99, 235, 0.8)), url('https://images.pexels.com/photos/4916549/pexels-photo-4916549.jpeg')`
            }}
          ></div>
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-12">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              
              <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{producerData.name}</h1>
                <p className="text-xl text-gray-600 mb-2">{producerData.farmName}</p>
                <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {producerData.region}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Miembro desde {new Date(producerData.memberSince).getFullYear()}
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    {producerData.verificationLevel}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Editar Perfil</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Guardar Cambios</span>
                  </button>
                )}
              </div>
            </div>

            {/* Membership Badge */}
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <Award className="w-4 h-4 mr-2" />
              {producerData.membershipType}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;