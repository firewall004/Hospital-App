<template>
  <v-sheet class="mb-8 mt-1">
    <v-card elevation="4" class="py-lg-5 py-sm-3">
      <v-card-subtitle class="title">Kidney Function Test</v-card-subtitle>
      <v-card-text class="px-lg-16 px-sm-8">
        <v-form>
          <v-text-field
            v-model="totalProteins"
            type="number"
            label="Total Proteins*"
            :rules="fieldValidation"
            hint="(6.00-8.30) gms/dl"
            placeholder="(Method-Biuret)*"
          ></v-text-field>
          <v-text-field
            v-model="albumin"
            type="number"
            label="Albumin*"
            :rules="fieldValidation"
            hint="(3.50-5.50) gms/dl"
            placeholder="(Method-BCG)*"
          ></v-text-field>
          <v-text-field
            v-model="globulin"
            type="number"
            label="Globulin*"
            :rules="fieldValidation"
            hint="(2.00-3.50) gms/dl"
          ></v-text-field>
          <v-text-field
            v-model="albByGlob"
            type="number"
            label="Albumin/Globulin*"
            :rules="fieldValidation"
            hint="(1.00-2.03)"
          ></v-text-field>
          <v-text-field
            v-model="sUricAcid"
            type="number"
            label="S. Uric Acid*"
            :rules="fieldValidation"
            hint="2.50-7.20 mg/dl"
            placeholder="(Method-TBHBA)*"
          ></v-text-field>
          <v-text-field
            v-model="sUrea"
            type="number"
            label="S. Urea*"
            :rules="fieldValidation"
            hint="15.0-50.0 mg/dl"
            placeholder="(Method-Enzymatic UV)*"
          ></v-text-field>
          <v-text-field
            v-model="sCreatinine"
            type="number"
            label="S. Creatinine*"
            :rules="fieldValidation"
            hint="0.50-1.10 mg/dl"
            placeholder="(Method-Enzymatic)*"
          ></v-text-field>
          <v-text-field
            v-model="calcium"
            type="number"
            label="Calcium(Ca+)*"
            :rules="fieldValidation"
            hint="2.60-4.50 mg/dl"
            placeholder="(Method-ARESENAZO III)*"
          ></v-text-field>
          <v-text-field
            v-model="sPhosphorous"
            type="number"
            label="S. Phosphorous*"
            :rules="fieldValidation"
            hint="2.60-4.50 mg/dl"
            placeholder="(Method-Photomatric UV)*"
          ></v-text-field>
          <v-text-field
            v-model="sSodium"
            type="number"
            label="S.Sodium*"
            :rules="fieldValidation"
            hint="135-155 mEq/L"
          ></v-text-field>
          <v-text-field
            v-model="sPotassium"
            type="number"
            label="S. Potassium*"
            :rules="fieldValidation"
            hint="3.50-5.50 mEq/L"
          ></v-text-field>
          <v-text-field
            v-model="sChloride"
            type="number"
            label="S.Chloride*"
            :rules="fieldValidation"
            hint="96-107 mEq/L"
          ></v-text-field>
          <v-text-field
            v-model="srIonisedCalcium"
            type="number"
            label="Sr. Ionised Calcium*"
            :rules="fieldValidation"
            hint="1.12 TO 1.32 mmol/L"
          ></v-text-field>
          <v-card-subtitle class="title">BIOCHEMISTRY</v-card-subtitle>
          <v-text-field
            v-model="srIonisedCalcium"
            type="number"
            label="Sr. Ionised Calcium*"
            :rules="fieldValidation"
            hint="6.0-8.3 gm/dl"
            placeholder="(Method-Biuret)*"
          ></v-text-field>
          <v-text-field
            v-model="srAlbumin"
            type="number"
            label="Sr. Albumin*"
            :rules="fieldValidation"
            hint="3.5-5.5 gm/dl"
            placeholder="(Method-BCG)*"
          ></v-text-field>
          <v-text-field
            v-model="bioGlobulin"
            type="number"
            label="Globulin*"
            :rules="fieldValidation"
            hint="2.0-3.5 gm/dl"
          ></v-text-field>
          <v-text-field
            v-model="agRatio"
            type="number"
            label="A/G Ratio*"
            :rules="fieldValidation"
            hint="1.0-2.3"
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
  name: 'RenalReport',
  props: {
    patientId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      totalProteins: null,
      albumin: null,
      globulin: null,
      albByGlob: null,
      sUricAcid: null,
      sUrea: null,
      sCreatinine: null,
      calcium: null,
      sPhosphorous: null,
      sPotassium: null,
      sSodium: null,
      sChloride: null,
      srIonisedCalcium: null,
      srTotalProteins: null,
      srAlbumin: null,
      agRatio: null,
      bioGlobulin: null,

      fieldValidation: [(v) => !!v || 'This field is required'],
    }
  },
  methods: {
    submitHandler() {
      this.$axios
        .post('/v3/api/staff/patient/blood/report', {
          blood_report: null,
          patient_id: null,
          protein: this.totalProteins,
          albumin: this.albumin,
          globulin: this.globulin,
          alu_glo: this.albByGlob,
          uric_acid: this.sUricAcid,
          urea: this.sUrea,
          creatinine: this.sCreatinine,
          calcium: this.calcium,
          phosphorous: this.sPhosphorous,
          potassium: this.sPotassium,
          sodium: this.sSodium,
          chloride: this.sChloride,
          ionised_cal: this.srIonisedCalcium,
          bio_protein: this.srTotalProteins,
          bio_albumin: this.srAlbumin,
          bio_globulin: this.bioGlobulin,
          ag_ratio: this.agRatio,
        })
        .then((response) => {
          alert(response)
        })
        .catch((error) => {
          alert(error)
        })
    },
  },
}
</script>
