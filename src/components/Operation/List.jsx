import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import OperationItem from './Item';

const OperationsList = ({ accountId, onEdit, onDelete, onRefresh }) => {
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
        
        // Ordenar por fecha de más reciente a más antigua
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOperations(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchOperations();
    }
  }, [accountId, onRefresh]);

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
          <OperationItem
            key={operation.id}
            operation={operation}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default OperationsList;
