import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Calendar, FileText } from 'lucide-react';

const OperationsList = ({ accountId }) => {
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}/operacion`);
        if (!response.ok) {
          throw new Error('Error al cargar las operaciones');
        }
        const data = await response.json();
        setOperations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchOperations();
    }
  }, [accountId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const SkeletonItem = () => (
    <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-100 animate-pulse">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-20"></div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-0">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-2">
          <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
        </div>
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  if (operations.length === 0) {
    return (
      <div className="p-8 text-center">
        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No hay operaciones</h3>
        <p className="text-gray-600 text-sm">Aún no se han registrado operaciones para esta cuenta</p>
      </div>
    );
  }

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <div className="divide-y divide-gray-100">
        {operations.map((operation) => (
          <div
            key={operation.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              operation.type === 'INCOME' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {operation.type === 'INCOME' ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {operation.concept}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <p className="text-xs text-gray-500">
                  {formatDate(operation.date)}
                </p>
              </div>
            </div>

            <div className={`text-right font-bold ${
              operation.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
            }`}>
              <p className="text-sm">
                {operation.type === 'INCOME' ? '+' : '-'} {formatCurrency(operation.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationsList;
