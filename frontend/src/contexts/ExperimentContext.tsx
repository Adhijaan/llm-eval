import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Experiment } from "../types";
import { getExperiments } from "../api";

interface ExperimentContextType {
  experiments: Experiment[];
  loading: boolean;
  error: string | null;
  refreshExperiments: () => Promise<void>;
}

const ExperimentContext = createContext<ExperimentContextType | undefined>(undefined);

export function ExperimentProvider({ children }: { children: ReactNode }) {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshExperiments = async () => {
    try {
      setLoading(true);
      const data = await getExperiments();
      setExperiments(data);
    } catch (err) {
      setError("Failed to fetch experiments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshExperiments();
  }, []);

  return (
    <ExperimentContext.Provider value={{ experiments, loading, error, refreshExperiments }}>
      {children}
    </ExperimentContext.Provider>
  );
}

export const useExperiments = () => {
  const context = useContext(ExperimentContext);
  if (!context) throw new Error("useExperiments must be used within ExperimentProvider");
  return context;
};
