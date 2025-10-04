import { TrendingUp, TrendingDown, Calendar, Edit, Trash2 } from 'lucide-react';

const OperationItem = ({ operation, onEdit, onDelete }) => {
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

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
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

      <div className="flex gap-2">
        <button
          onClick={() => onEdit && onEdit(operation)}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          title="Editar operación"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete && onDelete(operation.id)}
          className="flex items-center justify-center w-8 h-8 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
          title="Eliminar operación"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OperationItem;
