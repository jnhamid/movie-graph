import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const ForceGraph = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const Test: NextPage = () => {
  const [data, setData] = useState<any>({});
  useEffect(() => {
    if (data.nodes) return;
    fetch("http://localhost:3001/api/names/graph")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [data]);

  console.log(data);

  if (!(data && data.nodes && data.links)) return <> </>;
  return (
    <>
      <ForceGraph graphData={data} backgroundColor={"lightgray"} />
    </>
  );
};

export default Test;
