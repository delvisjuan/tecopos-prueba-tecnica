import { useAuth } from '../context/AuthContext';
import { User, LayoutDashboard } from 'lucide-react';
import Layout from '../layout/Layout';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      
    </Layout>
  );
};

export default Dashboard;
