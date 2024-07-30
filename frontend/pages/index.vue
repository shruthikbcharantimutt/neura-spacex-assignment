<template>
  <client-only>
    <Spinner v-if="loading" />
    <div v-else>
      <AlertBox
        v-if="showAlert"
        :message="alertMessage"
        @close="showAlert = false"
      />
      <section class="text-center">
        <div class="container jumbotron">
          <h1 class="jumbotron-heading">SpaceX All Flights</h1>
          <p>
            <NuxtLink class="btn btn-success my-2" to="/saved"
              >View Launched Flights</NuxtLink
            >
          </p>
        </div>
      </section>
      <div v-if="launches.length === 0">
        <h5 class="text-center">No Flights found!!!</h5>
      </div>
      <div v-else class="bg-light">
        <div class="table-container container py-2">
          <table class="table table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>Flight Number</th>
                <th width="35%">Launch Name</th>
                <th>Launch Date</th>
                <th></th>
              </tr>
            </thead>
            <div class="table-body">
              <table class="table table-striped table-hover">
                <tbody>
                  <tr v-for="launch in launches" :key="launch.flight_number">
                    <td>{{ launch.flight_number }}</td>
                    <td width="35%">{{ launch.name }}</td>
                    <td>{{ formatDate(launch.date_utc) }}</td>
                    <td>
                      <button
                        v-if="isLaunchSaved(launch)"
                        class="btn btn-sm rounded-pill"
                        disabled
                      >
                        <i class="bi bi-rocket-takeoff-fill"></i>

                        Already Launched!
                      </button>
                      <button
                        v-else
                        @click="handleSave(launch)"
                        class="btn btn-outline-success btn-sm rounded-pill"
                      >
                        <i class="bi bi-rocket-fill"></i>

                        Launch Now
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </table>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { Launch } from "../stores/launches";
import { formatDate } from "../utils/utils";
import { useLaunchesStore } from "../stores/launches";
import AlertBox from "../components/AlertBox.vue";
import Spinner from "../components/spinner.vue";
import "bootstrap-icons/font/bootstrap-icons.css";

const store = useLaunchesStore();
const launches = ref<Launch[]>([]);
const savedLaunches: Array<Launch> = ref<Launch[]>([]);
const error = ref<string | null>(null);
const showAlert: boolean = ref(false);
const alertMessage: string = ref("");
const loading: boolean = ref(true);

const fetchLaunches = async () => {
  loading.value = true;
  try {
    await store.fetchLaunches();
    launches.value = store.launches;
    await store.fetchSavedLaunches();
    savedLaunches.value = store.savedLaunches;
  } catch (err) {
    error.value = err.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};

const handleSave = async (launch: Launch) => {
  if (!isLaunchSaved(launch)) {
    await store.saveLaunch(launch);
  }
  await fetchLaunches();
  showAlert.value = true;
  alertMessage.value = `Flight successfully launched!!`;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

const isLaunchSaved = (launch: Launch): boolean => {
  return savedLaunches.value.some(
    (savedLaunch) => savedLaunch.flight_id === launch.flight_id
  );
};

onMounted(fetchLaunches);
</script>

<style scoped>
.jumbotron {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.table-container {
  width: 100%;
  overflow-x: auto;
}
.table-container table {
  width: 100%;
  margin-bottom: 0;
}
.thead-dark {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.table-body {
  display: block;
  max-height: 57vh;
  overflow-y: auto;
}
.table-body table {
  width: 100%;
  table-layout: fixed;
}
.table-body th,
.table-body td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.icon-link {
  color: unset;
}
</style>
