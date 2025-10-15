import  { useEffect } from 'react'
import { useFinancialSummaryStore } from '../stores/useFinancialSummaryStore';
import Spinner from './Spinner';
import FinancialSummary from './FinancialSummary';
import WorkingCapital from './WorkingCapital';
import RecentTransaction from './RecentTransaction';
import Wallet from './Wallet';
import ScheduledTransfers from './ScheduledTransfers';

const DashboardContent = () => {
  const { loading, error, summary, fetchSummary } = useFinancialSummaryStore();

  useEffect(() => {
    if (!summary) {
      fetchSummary();
    }
  }, [fetchSummary, summary]);

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className='flex flex-col lg:flex-row w-full h-full'>
        <div className='w-full lg:w-4/5 px-4 md:px-8 py-4 md:py-6 gap-6 md:gap-10'>
          <FinancialSummary summary={summary} />
          <WorkingCapital />
          <RecentTransaction />
        </div>
        <div className='w-full lg:w-auto px-4 md:px-5 gap-2 md:gap-4'>
          <Wallet />
          <ScheduledTransfers />
        </div>
      </div>

    </>
  );
}

export default DashboardContent