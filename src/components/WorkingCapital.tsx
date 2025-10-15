import React, { useEffect } from "react";
import { useWorkingCapitalStore } from "../stores/useWorkingCapitalStore";
import Spinner from "./Spinner";
import WorkingCapitalChart from "./WorkingCapitalChart";

const WorkingCapital: React.FC = () => {
  const { workingCapital, loading, error, fetchWorkingCapital } = useWorkingCapitalStore();

  useEffect(() => {
    if (!workingCapital) fetchWorkingCapital();
  }, [fetchWorkingCapital, workingCapital]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!workingCapital) return null;

  return (
    <>
      <WorkingCapitalChart data={workingCapital.data} currency={workingCapital.currency} />
    </>
  );
};

export default WorkingCapital;