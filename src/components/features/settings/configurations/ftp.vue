<template>
  <q-form @submit="onSubmit" @reset="onReset" class=" q-mx-lg">
    <div class="row q-gutter-xl ">
      <div class="col">
        <q-input
          square
          outlined
          v-model="url"
          label="FTP/SFTP URL *"
          hint="FTP/SFTP URL"
          lazy-rules
          :rules="[(val) => !!val || 'FTP/SFTP URL is missing']"
        />
      </div>
      <div class="col">
        <q-input
          square
          outlined
          v-model="port"
          label="Port Number *"
          hint="Port Number"
          lazy-rules
          :rules="[(val) => !!val || 'Port is missing']"
        />
      </div>
    </div>
    <div class="row q-gutter-xl">
      <div class="col">
        <q-input
          square
          outlined
          v-model="username"
          label="User Name *"
          hint="User Name"
          lazy-rules
          :rules="[(val) => !!val || 'UserName is missing']"
        />
      </div>
      <div class="col">
        <q-input
          square
          outlined
          ref="passwordRef"
          type="password"
          v-model="password"
          label="Password *"
          hint="Password should be minimum 8 character"
          lazy-rules
          :rules="[
            (val) => !!val || '* Required',
            (val) => val.length >= 5 || 'Please use minimum 5 characters',
          ]"
        />
      </div>
    </div>
    <div class="q-mx-lg">
      <h5 class="q-my-sm">Scheduling</h5>
      <p class="text-caption">Setup periodic processing for your feed</p>
      <p>Run Every day at:</p>
       <q-select
            outlined
            v-model="selectedTime"
            :options="FTPTime"
            label="Download Every"
          />
      <!-- <div class="row q-gutter-xl">
        <div class="col">
          <q-select
            outlined
            v-model="downloadModel"
            :options="downloadEvery"
            label="Download Every"
          />
        </div>
        <div class="col">
          <q-input filled v-model="time" mask="time" :rules="['time']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div> -->
    </div>
    <div>
      <q-btn label="Save" class="full-width" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { api } from "boot/axios";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const passwordRef = ref(null);
    const port = ref(null);
    const url = ref(null);
    const type = ref(null);
    const selectedTime = ref(null);
    return {
      username,
      password,
      port,
      type,
      url,
      selectedTime,
      FTPTime: computed(()=> $store.getters['common/getFTPTimes']),
      // downloadModel: ref(null),
      // downloadEvery: [
      //   "Monday",
      //   "Tuesday",
      //   "Wednesday",
      //   "Thursday",
      //   "Friday",
      //   "Saturday",
      //   "Sunday",
      //   "Day",
      //   "Month",
      // ],
      time: ref("10:56"),
      options: ["FTP", "SFTP"],
      date: ref('2019/02/01'),
      onSubmit() {
        let ftpDetails = {
          url: url.value,
          userName: username.value,
          password: password.value
          // port: port.value,
          // type: type.value,
        };
        $store
          .dispatch("common/addFTP", ftpDetails)
          .then((val) => {
            $q.notify({
              color: "positive",
              position: "top",
              message: "Successfully Added",
            });
          })
          .catch(() => {
            $q.notify({
              color: "negative",
              position: "top",
              message: "Error when adding",
            });
          });
      },
    };
  },
};
</script>

<style>
</style>