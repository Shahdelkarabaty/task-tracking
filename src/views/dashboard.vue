<script setup lang="ts">
import { useTaskStore } from "@/stores/task-store";
import { ref } from "vue";
import { onMounted } from "vue";
import Chart from "primevue/chart";

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.getTasks();
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});
const chartData = ref();
const chartOptions = ref();
const pendingCount = taskStore.tasks.filter(
  (task) => task.status === "PENDING"
).length;
const inProgressCount = taskStore.tasks.filter(
  (task) => task.status === "IN_PROGRESS"
).length;
const completedCount = taskStore.tasks.filter(
  (task) => task.status === "COMPLETED"
).length;

const setChartData = () => {
  return {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "total",
        data: [pendingCount, inProgressCount, completedCount],
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

<template>
  <div class="p-6">
    <header class="mb-6">
      <nav class="flex justify-center">
        <RouterLink
          to="/"
          class="text-sm font-medium text-gray-700 hover:underline mx-2"
        >
          Tasks
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="text-sm font-medium text-gray-700 hover:underline mx-2"
        >
          Dashboard
        </RouterLink>
      </nav>
    </header>
    <div class="card">
      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
