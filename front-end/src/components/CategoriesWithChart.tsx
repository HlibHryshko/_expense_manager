// src/components/CategoriesWithChart.tsx

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchCategories } from "../store/slices/categoriesSlice";
import { RootState } from "../store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAppDispatch } from "../hooks/useAppDispatch";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoriesWithChart: React.FC = () => {
  const dispatch = useAppDispatch(); // Use the custom hook instead of useDispatch
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    console.log("in use effect");

    const startDate = "2024-01-01"; // example date
    const endDate = "2024-09-30"; // example date
    dispatch(fetchCategories({ startDate, endDate }));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(categories.length);

  const categoriesData = categories.map((category) => category.category);
  const categoriesData2 = categories.map((category) => category.totalAmount);

  // Prepare data for the Pie chart
  const pieData = {
    labels: categoriesData,
    datasets: [
      {
        data: categoriesData2,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ], // You can customize colors here
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Expenses by Category</h1>

      <div className="w-1/2">
        <Pie data={pieData} />
      </div>

      <div className="mt-6">
        <ul className="list-disc">
          {categories.map((category) => (
            <li key={category.categoryId} className="text-lg">
              {category.category}: ${category.totalAmount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesWithChart;
