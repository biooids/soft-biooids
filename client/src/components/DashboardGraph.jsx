import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const DashboardGraph = ({ usersData, postsData, commentsData }) => {
  useEffect(() => {
    const options = {
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Users",
          data: usersData,
        },
        {
          name: "Posts",
          data: postsData,
        },
        {
          name: "Comments",
          data: commentsData,
        },
      ],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      colors: ["#00E396", "#0090FF", "#FF4560"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#area-chart"),
      options
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [usersData, postsData, commentsData]);

  return <div id="area-chart"></div>;
};

export default DashboardGraph;
