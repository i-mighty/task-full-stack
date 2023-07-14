import { useAtom, useSetAtom } from "jotai";
import {
  fetchSharedChartDataAtom,
  sharedChartDataAtom,
  sharedChartDataErrorAtom,
} from "../atoms/sharedChartData";
import { useEffect } from "react";

export const useSharedChartData = () => {
  const [chartData] = useAtom(sharedChartDataAtom);
  const fetchChartData = useSetAtom(fetchSharedChartDataAtom);
  const [sharedChartDataError, setSharedChartDataError] = useAtom(
    sharedChartDataErrorAtom
  );

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (sharedChartDataError) {
      timeOut = setTimeout(() => {
        setSharedChartDataError("");
      }, 5000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [sharedChartDataError]);
  return { chartData, fetchChartData, sharedChartDataError };
};
