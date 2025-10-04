import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const CreateAccountForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    balance: '',
    currency: 'USD',
    userId: '1'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre de la cuenta es requerido');
      return;
    }

    if (!formData.balance || parseFloat(formData.balance) < 0) {
      setError('El saldo debe ser un número válido mayor o igual a 0');
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        name: formData.name.trim(),
        balance: parseFloat(formData.balance),
        currency: formData.currency,
        userId: formData.userId,
        createdAt: new Date().toISOString()
      };

      const response = await fetch('https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al crear la cuenta');
      }

      const newAccount = await response.json();
      
      // Resetear formulario
      setFormData({
        name: '',
        balance: '',
        currency: 'USD',
        userId: '1'
      });

      onSuccess(newAccount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la cuenta *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Ej: Gastos Generales"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
          Saldo inicial *
        </label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="0.00"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
          Moneda *
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          disabled={loading}
        >
          <option value="USD">USD - Dólar Estadounidense</option>
          <option value="EUR">EUR - Euro</option>
          <option value="MXN">MXN - Peso Mexicano</option>
          <option value="COP">COP - Peso Colombiano</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creando...
            </>
          ) : (
            'Crear Cuenta'
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
