<template>
  <v-form ref="form" @submit.prevent="submitPreDialysisForm">
    <v-card tile class="py-5 px-lg-16 px-sm-8">
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field
            v-model="form.bp_systolic"
            :rules="fieldRules"
            type="number"
            label="Enter BP Systolic"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field
            v-model="form.bp_diasystolic"
            :rules="fieldRules"
            type="number"
            label="Enter BP Diastolic"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field
            v-model="form.heart_rate"
            :rules="fieldRules"
            type="number"
            label="Enter Heart Rate"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field
            v-model="form.weight"
            :rules="fieldRules"
            type="number"
            label="Enter Weight"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field v-model="form.spo2" :rules="fieldRules" type="number" label="Enter SPO2 %" dense></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field
            v-model="form.reused_dialyzer"
            :rules="fieldRules"
            type="number"
            label="Enter Reused Dialyzer"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-select
            v-model="form.dialyzer"
            :items="dialyzerOptions"
            :menu-props="{ offsetY: true }"
            label="Select Dialyzer ID "
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-text-field
            v-model="form.reused_tubing"
            :rules="fieldRules"
            type="number"
            label="Enter Reused Tubing"
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-select
            v-model="form.machine_id"
            :items="machineOptions"
            :menu-props="{ offsetY: true }"
            label="Select Machine "
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="3" class="pt-2">
          <p class="h5 font-weight-bold">Appointment Type :</p>
        </v-col>
        <v-col cols="5">
          <v-btn-toggle
            id="btnGroup"
            v-model="form.scheduled_emergency"
            group
            dense
            required
            mandatory
            borderless
            color="brown"
            class="align-start"
          >
            <v-btn active-class="btn" :elevation="3" small :value="'Emergency'"> Emergency </v-btn>
            <v-btn active-class="btn" :elevation="3" small rounded :value="'Scheduled'"> Scheduled </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="3" class="pt-2">
          <p class="h5 font-weight-bold pl-15">Access AV :</p>
        </v-col>
        <v-col cols="3" class="pl-4">
          <v-btn-toggle
            id="btnGroup"
            v-model="form.access_av"
            group
            dense
            required
            mandatory
            borderless
            color="brown"
            class="align-start"
          >
            <v-btn active-class="btn" :elevation="3" small :value="'AVF'"> AVF </v-btn>
            <v-btn active-class="btn" :elevation="3" small rounded :value="'CATH'"> CATH </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="4" class="">
          <p class="h5 font-weight-bold pt-3">Conditions :</p>
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-checkbox v-model="form.bp_high" label="Bp High" color="primary"></v-checkbox>
            <v-checkbox v-model="form.bp_low" label="Bp Low" color="primary"></v-checkbox>
            <v-checkbox v-model="form.nausea" label="Nausea" color="primary"></v-checkbox>
            <v-checkbox v-model="form.vomiting" label="Vomiting" color="primary"></v-checkbox>
            <v-checkbox v-model="form.short_breath" label="Short Breath" color="primary"></v-checkbox>
            <v-checkbox v-model="form.bleeding" label="Bleeding" color="primary"></v-checkbox>
            <v-checkbox v-model="form.edema" label="Edema" color="primary"></v-checkbox>
            <v-checkbox v-model="form.stomach_distend" label="Stomach Distend" color="primary"></v-checkbox>
            <v-checkbox v-model="form.diarrhea" label="Diarrhea" color="primary"></v-checkbox>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-textarea v-model="form.remarks" outlined label="Enter Remarks(if any)"></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="4" class="pt-2">
          <p class="h5 font-weight-bold">Site Condition Acceptable :</p>
        </v-col>
        <v-col cols="2">
          <v-btn-toggle
            id="btnGroup"
            v-model="form.site_condition"
            group
            dense
            required
            mandatory
            borderless
            color="brown"
            class="align-start"
          >
            <v-btn active-class="btn" :elevation="3" small :value="'Yes'"> Yes </v-btn>
            <v-btn active-class="btn" :elevation="3" small rounded :value="'No'"> No </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row no-gutters class="py-2">
        <v-col cols="12">
          <v-textarea v-model="form.explain" outlined label="Enter Explanation"></v-textarea>
        </v-col>
      </v-row>
      <div class="text-start py-3">
        <v-btn color="primary" class="white--text" type="submit">Start Session</v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<script>
export default {
  props: {
    patientId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        bp_diasystolic: '',
        heart_rate: '',
        weight: '',
        spo2: '',
        reused_dialyzer: '',
        dialyzer: '',
        reused_tubing: '',
        bp_high: '',
        bp_low: '',
        nausea: '',
        vomiting: '',
        short_breath: '',
        bleeding: '',
        edema: '',
        stomach_distend: '',
        diarrhea: '',
        other: '',
        machine_id: '',
        scheduled_emergency: '',
        access_av: '',
        remarks: '',
        site_condition: '',
        explain: '',
        private: '',
      },
      fieldRules: [(v) => !!v || 'This field is required'],
      machineOptions: ['1-Fresenius 4008B', '2-Nipro Surdial 55+', '3-Fresenius 4008A', '4-Fresenius 4008B'],
      dialyzerOptions: [
        'Fresenius F6',
        'Fresenius F8',
        'Brown Dove B6',
        'Brown Dove B7',
        'Brown Dove 130',
        'Nipro',
        'Dora',
      ],
    }
  },

  methods: {
    submitPreDialysisForm() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post('/api/staff/pre_dialysis/form/' + this.patientId, this.form)
          .then((response) => {
            this.$router.push('/pre-dialysis-form/' + response.data.id)
          })
          .catch((error) => {
            this.$toast.error(error.message, {
              theme: 'toasted-primary',
              position: 'top-right',
              duration: 3000,
            })
          })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/_vars.scss';

#btnGroup .btn {
  background-color: $hospital-primary-color !important;
  color: white !important;
}
</style>
