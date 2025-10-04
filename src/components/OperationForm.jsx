import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const OperationForm = ({ onSuccess, onCancel, editingOperation, accountId, accountBalance }) => {
  const [formData, setFormData] = useState({
    type: 'EXPENSE',
    amount: '',
    concept: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingOperation) {
      setFormData({
        type: editingOperation.type || 'EXPENSE',
        amount: editingOperation.amount || '',
        concept: editingOperation.concept || ''
      });
    } else {
      setFormData({
        type: 'EXPENSE',
        amount: '',
        concept: ''
      });
    }
  }, [editingOperation]);

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

    if (!formData.concept.trim()) {
      setError('El concepto es requerido');
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('El monto debe ser un número válido mayor a 0');
      return;
    }

    const amount = parseFloat(formData.amount);

    if (formData.type === 'EXPENSE' && amount > accountBalance) {
      setError(`El gasto no puede ser mayor al saldo disponible (${accountBalance})`);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        type: formData.type,
        amount: amount,
        concept: formData.concept.trim(),
        date: new Date().toISOString(),
        cuentaId: accountId
      };

      let response;
      if (editingOperation) {
        response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}/operacion/${editingOperation.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}/operacion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        throw new Error(`Error al ${editingOperation ? 'actualizar' : 'crear'} la operación`);
      }

      const updatedOperation = await response.json();

      // Actualizar el saldo de la cuenta
      let newBalance = accountBalance;
      
      if (editingOperation) {
        // Si estamos editando, primero revertimos la operación anterior
        if (editingOperation.type === 'EXPENSE') {
          newBalance += editingOperation.amount;
        } else {
          newBalance -= editingOperation.amount;
        }
      }
      
      // Aplicamos la nueva operación
      if (formData.type === 'EXPENSE') {
        newBalance -= amount;
      } else {
        newBalance += amount;
      }

      // Actualizamos el saldo en la cuenta
      const updateBalanceResponse = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: newBalance })
      });

      if (!updateBalanceResponse.ok) {
        throw new Error('Error al actualizar el saldo de la cuenta');
      }

      onSuccess(updatedOperation, !!editingOperation);
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
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de operación *
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          disabled={loading}
        >
          <option value="EXPENSE">Gasto</option>
          <option value="INCOME">Ingreso</option>
        </select>
      </div>

      <div>
        <label htmlFor="concept" className="block text-sm font-medium text-gray-700 mb-1">
          Concepto *
        </label>
        <input
          type="text"
          id="concept"
          name="concept"
          value={formData.concept}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="Ej: Pago de servicios"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Monto *
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="0.00"
          disabled={loading}
        />
        {formData.type === 'EXPENSE' && (
          <p className="text-xs text-gray-500 mt-1">
            Saldo disponible: {accountBalance}
          </p>
        )}
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
              {editingOperation ? 'Actualizando...' : 'Creando...'}
            </>
          ) : (
            editingOperation ? 'Actualizar Operación' : 'Crear Operación'
          )}
        </button>
      </div>
    </form>
  );
};

export default OperationForm;
