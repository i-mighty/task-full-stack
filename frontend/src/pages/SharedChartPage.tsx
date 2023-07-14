import { Chart } from "../components/Chart";
import { ChartPageLayout } from "../components/ChartPageLayout";
import { EmailValidation } from "../components/EmailValidation";
import TokenExpired from "../components/features/TokenExpiredError";
import { useLinkExpired } from "../data/hooks/useLinkExpired";
import { useSharedChartData } from "../data/hooks/useSharedChartData";

export const SharedChartPage = () => {
  const { chartData, fetchChartData, sharedChartDataError } =
    useSharedChartData();
  const token = window.location.pathname.split("/").pop() || "";
  const { expired } = useLinkExpired(token || "");
  if (chartData === null) {
    if (expired) {
      return (
        <div>
          <TokenExpired />
        </div>
      );
    } else {
      return (
        <div>
          <EmailValidation onAction={fetchChartData} />
        </div>
      );
    }
  }

  return <ChartPageLayout main={<Chart data={chartData} />} />;
};
