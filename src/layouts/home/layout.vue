<template>
  <q-layout view="hHh lpR fFf" class="">
    <q-header
      class="bg-white row no-wrap justify-between items-center box-shadow-menu"
    >
      <q-toolbar class="col-md-3">
        <q-toolbar-title>
          <img src="~assets/sc-logo.png" style="height: 40px" />
        </q-toolbar-title>
      </q-toolbar>
      <div class="col-md-7" style="max-width: 500px">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
          active-color="primary"
          indicator-color="primary"
          class="text-weight-bold text-color"
        >
          <q-route-tab
            v-for="page in pages"
            :key="page.pageID"
            :ripple="{ color: 'secondary' }"
            :name="page.name"
            :label="page.name"
            :to="page.route"
          />
        </q-tabs>
      </div>
      <div class="col-md-2 q-pa-md text-right">
        <!-- <q-btn-dropdown split push no-caps icon="" label="">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-account-edit"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-logout"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
        </q-btn-dropdown> -->
        <!-- <q-btn color="white" text-color="primary" label="" icon=""> -->

        <q-avatar size="lg">
          <img src="~assets\images\default-user.webp" />
          <q-btn icon="mdi-menu-down" />
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            transition-duration="600"
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/profile">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-account-edit"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-avatar
                    icon="mdi-logout"
                    color="primary"
                    text-color="white"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <!-- </q-btn> -->
        </q-avatar>
      </div>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition appear name="fade" mode="out-in" duration="250">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    return {
      tab: ref("dashboard"),
      pages: computed(() => $store.getters["auth/getPages"]),
      logout() {
        $store.dispatch("auth/logout").then((val) => {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Logout Successfull",
          });
          router.push("/auth/");
        });
      },
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>