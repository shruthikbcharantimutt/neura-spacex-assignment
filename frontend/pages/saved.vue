<template>
  <AlertBox
    v-if="showAlert"
    :message="alertMessage"
    @close="showAlert = false"
  />
  <section class="jumbotron text-center">
    <div class="container">
      <h1 class="jumbotron-heading">SpaceX Launched Flights</h1>
      <NuxtLink class="btn btn-success my-2" to="/">Back to Home Page</NuxtLink>
    </div>
  </section>
  <Spinner v-if="loading" />
  <div v-else class="py-5 bg-light">
    <div class="container">
      <div v-if="savedLaunches.length === 0">
        <h5 class="text-center">
          No Flights Launched. Please go back to home page to launch prefered
          flight.
        </h5>
      </div>

      <div v-else class="row">
        <div class="col-md-4" v-for="launch in savedLaunches" :key="launch._id">
          <div class="card mb-4 shadow-sm">
            <div class="card-body">
              <h6 class="card-subtitle mb-2 text-muted">
                Flight Name : {{ launch.name }}
              </h6>
              <p class="card-text">
                Flight Number : {{ launch.flight_number }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-danger rounded-pill"
                    @click="handleDelete(launch._id)"
                  >
                    <i class="bi bi-archive-fill"></i>
                    Delete
                  </button>
                </div>
                <small class="text-muted">
                  {{ formatDate(launch.date_utc) }}</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { formatDate } from "../utils/utils";
import { useLaunchesStore } from "../stores/launches";
import AlertBox from "../components/AlertBox.vue";
import Spinner from "../components/spinner.vue";
import "bootstrap-icons/font/bootstrap-icons.css";

const store = useLaunchesStore();
const savedLaunches = ref<Launch[]>(store.savedLaunches);
const showAlert: boolean = ref(false);
const alertMessage: string = ref("");
const loading: boolean = ref(true);

const fetchLaunches = async () => {
  loading.value = true;
  try {
    await store.fetchSavedLaunches();
    savedLaunches.value = store.savedLaunches;
  } catch (err) {
    error.value = err.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (launchId: string) => {
  const deleteLaunch = await store.deleteLaunch(launchId);
  showAlert.value = true;
  alertMessage.value = `Flight successfully deleted!!`;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
  await fetchLaunches();
};

onMounted(fetchLaunches);
</script>
<style>
.jumbotron {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.icon-link {
  color: unset;
}
</style>
