import { useEffect, useState } from "react";
import GraphDaily from "./GraphDaily";
import GraphMonthly from "./GraphMonthly";
import "./graphs.css";

const Graphs = () => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fetchDataForAllLines = async () => {
    try {
      // Use Promise.all() to fetch data for all production lines concurrently
      const responses = await Promise.all(
        productionLineIds.map(async (lineId) => {
          const response = await fetch(
            `https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/${lineId}`,
            {
              headers: {
                Authorization:
                  "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch data for line ${lineId}`);
          }

          const data = await response.json();
          return { lineId, data };
        })
      );

      const allData = responses.reduce((acc, { lineId, data }) => {
        acc[lineId] = data;
        return acc;
      }, {});

      setTotalData(allData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataForAllLines();

    const interval = setInterval(() => {
      fetchDataForAllLines();
    }, 780000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const percentDay62100 =
    Object.keys(totalData).length > 0
      ? Math.round(totalData[62100][0].procent) || 0
      : 0;
  const percentDay62200 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[62200][0].procent) || 0
      : 0;
  const percentDay63000 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[63000][0].procent) || 0
      : 0;
  const percentDay63200 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[63200][0].procent) || 0
      : 0;
  const percentDay65200 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[65200][0].procent) || 0
      : 0;
  const percentDay65300 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[65300][0].procent) || 0
      : 0;

  const percentMonth62100 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[62100][1].procent) || 0
      : 0;
  const percentMonth62200 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[62200][1].procent) || 0
      : 0;
  const percentMonth63000 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[63000][1].procent) || 0
      : 0;
  const percentMonth63200 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[63200][1].procent) || 0
      : 0;
  const percentMonth65200 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[65200][1].procent) || 0
      : 0;
  const percentMonth65300 =
    Object.keys(totalData).length > 0 > 0
      ? Math.round(totalData[65300][1].procent) || 0
      : 0;

  console.log(percentDay62100);
  console.log(totalData);

  return (
    <div className="main__graphs">
      <GraphDaily
        line62100={percentDay62100}
        line62200={percentDay62200}
        line63000={percentDay63000}
        line63200={percentDay63200}
        line65200={percentDay65200}
        line65300={percentDay65300}
      />
      <GraphMonthly
        line62100={percentMonth62100}
        line62200={percentMonth62200}
        line63000={percentMonth63000}
        line63200={percentMonth63200}
        line65200={percentMonth65200}
        line65300={percentMonth65300}
      />
    </div>
  );
};

export default Graphs;
