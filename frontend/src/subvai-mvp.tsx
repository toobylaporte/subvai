import React, { useState, useEffect } from 'react';
import { Search, Building2, MapPin, Users, Calendar, Euro, ChevronRight, Mail, Lock, User, CheckCircle } from 'lucide-react';

const SubvAI = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [aids, setAids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  
  // Données de démonstration pour le MVP
  const mockAids = [
    {
      id: 1,
      name: "Aide à la transition numérique des PME",
      financer: "Région Île-de-France",
      description: "Subvention pour accompagner les PME dans leur transformation digitale",
      aid_amount: "Jusqu'à 50 000€",
      submission_deadline: "2024-12-31",
      eligibility: "PME de moins de 250 salariés",
      sectors: ["numérique", "tous secteurs"],
      regions: ["Île-de-France"],
      score: 85
    },
    {
      id: 2,
      name: "Prêt Croissance TPE",
      financer: "Bpifrance",
      description: "Prêt sans garantie pour financer les investissements des TPE",
      aid_amount: "De 10 000€ à 50 000€",
      submission_deadline: "2024-11-30",
      eligibility: "TPE de moins de 10 salariés",
      sectors: ["commerce", "artisanat", "services"],
      regions: ["National"],
      score: 92
    },
    {
      id: 3,
      name: "Aide à l'innovation",
      financer: "Conseil Départemental",
      description: "Subvention pour les projets d'innovation technologique",
      aid_amount: "30% des coûts, max 25 000€",
      submission_deadline: "2024-10-15",
      eligibility: "Entreprises innovantes",
      sectors: ["technologie", "recherche"],
      regions: ["Île-de-France"],
      score: 78
    }
  ];

  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = () => {
      // Simulation d'authentification
      setUser({ email, company: null });
      setCurrentView('onboarding');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">SubvAI</h1>
            <p className="text-gray-600">Votre radar automatique des aides publiques</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isLogin ? 'Se connecter' : 'Créer un compte'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline"
            >
              {isLogin ? 'Créer un compte' : 'Déjà un compte ?'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OnboardingForm = () => {
    const [formData, setFormData] = useState({
      companyName: '',
      sector: '',
      employees: '',
      region: '',
      description: ''
    });

    const handleSubmit = () => {
      setUser({ ...user, company: formData });
      setCurrentView('dashboard');
      
      // Simulation du matching
      setTimeout(() => {
        setMatches(mockAids.filter(aid => 
          aid.sectors.includes(formData.sector) || 
          aid.regions.includes(formData.region) || 
          aid.sectors.includes('tous secteurs') ||
          aid.regions.includes('National')
        ));
      }, 1000);
    };

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <Building2 className="inline w-6 h-6 mr-2" />
              Parlez-nous de votre entreprise
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secteur d'activité
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez un secteur</option>
                  <option value="numérique">Numérique / Tech</option>
                  <option value="commerce">Commerce</option>
                  <option value="artisanat">Artisanat</option>
                  <option value="services">Services</option>
                  <option value="industrie">Industrie</option>
                  <option value="technologie">Technologie</option>
                  <option value="recherche">Recherche</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline w-4 h-4 mr-2" />
                  Nombre d'employés
                </label>
                <select
                  value={formData.employees}
                  onChange={(e) => setFormData({...formData, employees: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez</option>
                  <option value="1-9">1-9 employés (TPE)</option>
                  <option value="10-49">10-49 employés (PE)</option>
                  <option value="50-249">50-249 employés (PME)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Région
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionnez une région</option>
                  <option value="Île-de-France">Île-de-France</option>
                  <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                  <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                  <option value="Occitanie">Occitanie</option>
                  <option value="Hauts-de-France">Hauts-de-France</option>
                  <option value="Grand Est">Grand Est</option>
                  <option value="PACA">Provence-Alpes-Côte d'Azur</option>
                  <option value="Pays de la Loire">Pays de la Loire</option>
                  <option value="Bretagne">Bretagne</option>
                  <option value="Normandie">Normandie</option>
                  <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                  <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description rapide de vos projets
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Décrivez brièvement vos projets de développement..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Trouver mes aides
                <ChevronRight className="inline w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const company = user?.company;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">SubvAI</h1>
                <span className="ml-4 text-sm text-gray-500">
                  {company?.companyName}
                </span>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="text-gray-600 hover:text-gray-900"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Aides trouvées</p>
                  <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Compatibilité élevée</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {matches.filter(m => m.score > 80).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Euro className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Montant potentiel</p>
                  <p className="text-2xl font-bold text-gray-900">125k€</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profil entreprise */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <Building2 className="inline w-5 h-5 mr-2" />
              Profil de votre entreprise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Secteur</p>
                <p className="font-medium capitalize">{company?.sector}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Taille</p>
                <p className="font-medium">{company?.employees}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Région</p>
                <p className="font-medium">{company?.region}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Statut</p>
                <p className="font-medium text-green-600">✓ Profil complet</p>
              </div>
            </div>
          </div>

          {/* Aides correspondantes */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Aides correspondant à votre profil
              </h2>
              <p className="text-gray-600 mt-2">
                Basé sur votre secteur d'activité, taille et localisation
              </p>
            </div>
            
            <div className="p-6">
              {matches.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Recherche d'aides en cours...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {matches.map((aid) => (
                    <div key={aid.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {aid.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Par {aid.financer}
                          </p>
                          <p className="text-gray-700 mb-4">
                            {aid.description}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {aid.score}% compatible
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Montant</p>
                          <p className="font-medium text-green-600">{aid.aid_amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Échéance</p>
                          <p className="font-medium text-red-600">
                            <Calendar className="inline w-4 h-4 mr-1" />
                            {aid.submission_deadline}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Éligibilité</p>
                          <p className="font-medium">{aid.eligibility}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {aid.sectors.map((sector, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                {sector}
                              </span>
                            ))}
                          </div>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Voir les détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SubvAI
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Votre radar automatique des aides publiques
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-2xl mx-auto">
              Découvrez automatiquement les subventions, prêts et aides publiques 
              adaptés à votre PME française
            </p>
            <button
              onClick={() => setCurrentView('login')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Commencer gratuitement
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En 3 étapes simples, accédez aux aides qui correspondent à votre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Créez votre profil</h3>
              <p className="text-gray-600">
                Renseignez les informations de base sur votre entreprise
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Analyse automatique</h3>
              <p className="text-gray-600">
                Notre IA analyse les 3000+ aides publiques disponibles
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Recevez vos matches</h3>
              <p className="text-gray-600">
                Découvrez les aides les plus adaptées à votre situation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à découvrir vos aides ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les PME qui ont déjà trouvé leur financement
          </p>
          <button
            onClick={() => setCurrentView('login')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Commencer maintenant
          </button>
        </div>
      </div>
    </div>
  );

  // Rendu conditionnel basé sur l'état actuel
  if (currentView === 'landing') {
    return <LandingPage />;
  }
  
  if (currentView === 'login') {
    return <LoginForm />;
  }
  
  if (currentView === 'onboarding') {
    return <OnboardingForm />;
  }
  
  if (currentView === 'dashboard') {
    return <Dashboard />;
  }

  return <LandingPage />;
};

export default SubvAI;