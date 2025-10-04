import { Wallet, DollarSign, Euro } from 'lucide-react';

const AccountCard = ({ cuenta }) => {
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCurrencyIcon = (currency) => {
    switch (currency) {
      case 'USD':
        return <DollarSign className="w-5 h-5" />;
      case 'EUR':
        return <Euro className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
        <div className="flex items-center justify-between text-white">
          <Wallet className="w-6 h-6" />
          {getCurrencyIcon(cuenta.currency)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {cuenta.name}
        </h3>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Saldo</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(cuenta.balance, cuenta.currency)}
            </p>
          </div>
          
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Moneda:</span>
              <span className="font-semibold text-gray-900">{cuenta.currency}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-500">Creada:</span>
              <span className="font-medium text-gray-700">{formatDate(cuenta.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;



