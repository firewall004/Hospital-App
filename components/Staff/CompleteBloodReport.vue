<template>
  <v-sheet class="mb-8 mt-1">
    <v-card elevation="4" class="py-lg-5 py-sm-3">
      <v-card-subtitle class="title">Complete Blood Report</v-card-subtitle>
      <v-card-text class="px-lg-16 px-sm-8">
        <v-form>
          <v-text-field
            v-model="haemoglobin"
            type="number"
            label="HAEMOGLOBIN*"
            :rules="fieldValidation"
            hint="(13-18) gms/dl"
          ></v-text-field>
          <v-text-field
            v-model="rbc"
            type="number"
            label="RED BLOOD CELLS*"
            :rules="fieldValidation"
            hint="(4.50-6.50) *10*6/ul"
          ></v-text-field>
          <v-text-field
            v-model="pcv"
            type="number"
            label="PACKED CELL VOLUME*"
            :rules="fieldValidation"
            hint="(35-60) %"
          ></v-text-field>
          <v-text-field
            v-model="meanCorpuscularVolume"
            type="number"
            label="MEAN CORPUSCULAR VOLUME*"
            :rules="fieldValidation"
            hint="(76-97) fl"
          ></v-text-field>
          <v-text-field
            v-model="meanCorpuscularHb"
            type="number"
            label="MEAN CORPUSCULAR HB*"
            :rules="fieldValidation"
            hint="(27-31) Picograms"
          ></v-text-field>
          <v-text-field
            v-model="meanCorpuscularHbConc"
            type="number"
            label="MEAN CORPUSCULAR HB.CONC*"
            :rules="fieldValidation"
            hint="(33-37) %"
          ></v-text-field>
          <v-text-field
            v-model="plateletCount"
            type="number"
            label="PLATELET COUNT*"
            :rules="fieldValidation"
            hint="(150-450) *10^3/ul"
          ></v-text-field>
          <v-text-field
            v-model="rdw"
            type="number"
            label="R.D.W*"
            :rules="fieldValidation"
            hint="(11.5-16.5) %"
          ></v-text-field>
          <v-text-field
            v-model="totalWbc"
            type="number"
            label="TOTAL W.B.C COUNT*"
            :rules="fieldValidation"
            hint="(4000-11000) cells/cu-mm"
          ></v-text-field>

          <v-card-subtitle class="title underline">Differential Count</v-card-subtitle>
          <v-text-field
            v-model="neutrophils"
            type="number"
            label="NEUTROPHILS*"
            :rules="fieldValidation"
            hint="(40-75) %"
          ></v-text-field>
          <v-text-field
            v-model="lymphocytes"
            type="number"
            label="LYMPHOCYTES*"
            :rules="fieldValidation"
            hint="(20-45) %"
          ></v-text-field>
          <v-text-field
            v-model="monocytes"
            type="number"
            label="MONOCYTES*"
            :rules="fieldValidation"
            hint="(1-10) %"
          ></v-text-field>
          <v-text-field
            v-model="eosinophils"
            type="number"
            label="EOSINOPHILS*"
            :rules="fieldValidation"
            hint="(1-6) %"
          ></v-text-field>
          <v-text-field
            v-model="basophils"
            type="number"
            label="BASOPHILS*"
            :rules="fieldValidation"
            hint="(0-1) %"
          ></v-text-field>
          <v-text-field
            v-model="abWbc"
            type="number"
            label="Abnormalities of W.B.C.s*"
            :rules="fieldValidation"
          ></v-text-field>
          <v-text-field
            v-model="abRbc"
            type="number"
            label="Abnormalities of R.B.C.s*"
            :rules="fieldValidation"
          ></v-text-field>
          <v-text-field v-model="remark" label="Remark*" :rules="fieldValidation"></v-text-field>

          <v-card-subtitle class="title underline">Proteins</v-card-subtitle>
          <v-text-field
            v-model="totProteins"
            type="number"
            label="Total Proteins*"
            :rules="fieldValidation"
            hint="6.0-8.5 gm%"
          ></v-text-field>
          <v-text-field
            v-model="albumin"
            type="number"
            label="Albumin*"
            :rules="fieldValidation"
            hint="3.2-5.5 gm%"
          ></v-text-field>
          <v-text-field
            v-model="globulin"
            type="number"
            label="Globulin*"
            :rules="fieldValidation"
            hint="1.5-3.6 gm%"
          ></v-text-field>
          <v-text-field
            v-model="albByGlob"
            type="number"
            label="Albumin/Globulin*"
            :rules="fieldValidation"
            hint="1.0-2.2 gm%"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary mb-5" class="px-5 py-6" @click="submitHandler">Submit</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  name: 'CompleteBloodReport',
  props: {
    patientId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      haemoglobin: null,
      rbc: null,
      pcv: null,
      meanCorpuscularVolume: null,
      meanCorpuscularHb: null,
      meanCorpuscularHbConc: null,
      plateletCount: null,
      rdw: null,
      neutrophils: null,
      lymphocytes: null,
      monocytes: null,
      eosinophils: null,
      basophils: null,
      abRbc: null,
      abWbc: null,
      remark: null,
      totalWbc: null,
      totProteins: null,
      albumin: null,
      globulin: null,
      albByGlob: null,

      fieldValidation: [(v) => !!v || 'This field is required'],
    }
  },
  methods: {
    submitHandler() {
      this.$axios
        .post('/v3/api/staff/patient/blood/report', {
          blood_report: null,
          patient_id: null,
          haemoglobin: this.haemoglobin,
          rbc: this.rbc,
          pcv: this.pcv,
          corp_volume: this.meanCorpuscularVolume,
          corp_hb: this.meanCorpuscularHb,
          corp_hb_conc: this.meanCorpuscularHbConc,
          platelet: this.plateletCount,
          rdw: this.rdw,
          neutro: this.neutrophils,
          lympho: this.lymphocytes,
          mono: this.monocytes,
          eosino: this.eosinophils,
          baso: this.basophils,
          ab_rbc: this.abRbc,
          ab_wbc: this.abWbc,
          remark: this.remark,
          wbc: this.totalWbc,
          protein: this.totProteins,
          albumin: this.albumin,
          globulin: this.globulin,
          alb_glob: this.albByGlob,
        })
        .then((response) => {
          alert('Blood Report Submitted')
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>
