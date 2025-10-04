import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import Layout from '../layout/Layout';
import OperationsList from '../components/OperationsList';

const Operations = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}`);
        if (!response.ok) {
          throw new Error('Error al cargar la cuenta');
        }
        const data = await response.json();
        setAccountName(data.name);
      } catch (err) {
        console.error('Error al cargar la cuenta:', err);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchAccountInfo();
    }
  }, [accountId]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/Accounts')}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Volver a cuentas"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {loading ? 'Cargando...' : `Operaciones - ${accountName}`}
              </h1>
              <p className="text-gray-600 mt-1">Gestiona las operaciones de esta cuenta</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nueva Operación
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <OperationsList accountId={accountId} />
        </div>
      </div>
    </Layout>
  );
};

export default Operations;
