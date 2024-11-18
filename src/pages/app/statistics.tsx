import { Helmet } from "react-helmet-async";
import LineChart from "../../components/statistics/line-chart";

export function Statistics() {
  return (
    <>
      <Helmet title="Estatísticas" />

      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Estatísticas de Consultas Mensais
        </h1>
        <LineChart />
      </div>
    </>
  );
}
