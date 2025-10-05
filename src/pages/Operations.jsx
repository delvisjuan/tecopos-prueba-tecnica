import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Wallet } from 'lucide-react';
import Layout from '../layout/Layout';
import OperationsList from '../components/Operation/List';
import Modal from '../components/Modal';
import OperationForm from '../components/Operation/Form';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

const Operations = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);
  const [accountCurrency, setAccountCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [operationToDelete, setOperationToDelete] = useState(null);
  const [operationToDeleteData, setOperationToDeleteData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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
        setAccountBalance(data.balance);
        setAccountCurrency(data.currency);
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

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOperation(null);
  };

  const handleEditOperation = (operation) => {
    setEditingOperation(operation);
    setIsModalOpen(true);
  };

  const handleDeleteOperation = async (operationId) => {
    // Primero obtenemos los datos de la operación para saber cuánto revertir
    try {
      const response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}/operacion/${operationId}`);
      if (response.ok) {
        const operationData = await response.json();
        setOperationToDeleteData(operationData);
        setOperationToDelete(operationId);
        setIsConfirmModalOpen(true);
      }
    } catch (error) {
      console.error('Error al obtener la operación:', error);
    }
  };

  const confirmDeleteOperation = async () => {
    if (!operationToDelete || !operationToDeleteData) return;

    try {
      const response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}/operacion/${operationToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la operación');
      }

      // Actualizar el saldo de la cuenta revirtiendo la operación
      let newBalance = accountBalance;
      if (operationToDeleteData.type === 'EXPENSE') {
        newBalance += operationToDeleteData.amount; // Devolvemos el dinero
      } else {
        newBalance -= operationToDeleteData.amount; // Quitamos el ingreso
      }

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

      setToastMessage('Operación eliminada exitosamente');
      setShowToast(true);
      setRefreshKey(prev => prev + 1);
      fetchAccountInfo();
    } catch (error) {
      console.error('Error al eliminar la operación:', error);
      setToastMessage('Error al eliminar la operación');
      setShowToast(true);
    } finally {
      setOperationToDelete(null);
      setOperationToDeleteData(null);
    }
  };

  const handleOperationSubmit = (operationData, isEditing) => {
    if (isEditing) {
      setToastMessage('Operación actualizada exitosamente');
    } else {
      setToastMessage('Operación creada exitosamente');
    }
    setShowToast(true);
    setRefreshKey(prev => prev + 1);
    handleCloseModal();
    
    fetchAccountInfo();
  };

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch(`https://68e171938943bf6bb3c4393a.mockapi.io/api/cuenta/${accountId}`);
      if (response.ok) {
        const data = await response.json();
        setAccountBalance(data.balance);
      }
    } catch (error) {
      console.error('Error al actualizar el saldo:', error);
    }
  };

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
            </div>
          </div>
        </div>
         
         <div className="flex items-center justify-end">
         <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nueva Operación
          </button>
         </div>

        {!loading && (
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Saldo Actual</p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(accountBalance, accountCurrency)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Moneda</p>
                <p className="text-xl font-semibold">{accountCurrency}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <OperationsList 
            accountId={accountId}
            onEdit={handleEditOperation}
            onDelete={handleDeleteOperation}
            onRefresh={refreshKey}
          />
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingOperation ? "Editar Operación" : "Nueva Operación"}
      >
        <OperationForm
          onSuccess={handleOperationSubmit}
          onCancel={handleCloseModal}
          editingOperation={editingOperation}
          accountId={accountId}
          accountBalance={accountBalance}
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

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeleteOperation}
        title="Eliminar Operación"
        message="¿Estás seguro de que quieres eliminar esta operación? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </Layout>
  );
};

export default Operations;
