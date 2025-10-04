import { useState, useEffect } from 'react';
import { Wallet, Plus } from 'lucide-react';
import Layout from '../layout/Layout';
import AccountCard from '../components/AccountCard';
import SkeletonCard from '../components/SkeletonCard';
import Modal from '../components/Modal';
import CreateAccountForm from '../components/CreateAccountForm';
import Toast from '../components/Toast';

const Accounts = () => {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta');
        if (!response.ok) {
          throw new Error('Error al cargar las cuentas');
        }
        const data = await response.json();
        setCuentas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
  }, []);

  const handleCreateSuccess = (newAccount) => {
    setCuentas(prev => [...prev, newAccount]);
    setIsModalOpen(false);
    setToastMessage('¡Cuenta creada exitosamente!');
    setShowToast(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Cuentas</h1>
            <p className="text-gray-600 mt-1">Gestiona tus cuentas financieras</p>
          </div>
          <div className="flex items-center gap-3">
            {!loading && (
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Wallet className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">{cuentas.length} Cuentas</span>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Nueva Cuenta
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : cuentas.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay cuentas disponibles</h3>
            <p className="text-gray-600">Aún no tienes cuentas registradas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuentas.map((cuenta) => (
              <AccountCard key={cuenta.id} cuenta={cuenta} />
            ))}
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Crear Nueva Cuenta"
      >
        <CreateAccountForm 
          onSuccess={handleCreateSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </Layout>
  );
};

export default Accounts;
