<template>
  <v-container justify-center class="text-center px-16 offline-records-steps" fluid>
    <v-card color="primary">
      <v-card-title class="text-center white--text">
        <v-container>
          <span class="text-lg-h3"> Offline Records </span>
        </v-container>
      </v-card-title>
    </v-card>

    <v-stepper v-model="stepCount" class="my-2">
      <v-stepper-header>
        <v-stepper-step :complete="stepCount > 1" step="1"> Patient Details </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount > 2" step="2"> Pre Dialysis </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount > 3" step="3"> Patient Parameters </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount > 4" step="4"> Post Dialysis </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount > 5" step="5"> Consumables </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount > 6" step="6">Pharmaceuticals </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="stepCount == 7" step="7"> Others </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items class="my-1">
        <!-- Form-1-select patient or create a new patient entry -->

        <v-stepper-content step="1">
          <v-card elevation="4" class="py-5 text-center">
            <v-card-subtitle class="title">Patient Details</v-card-subtitle>
            <v-card-text class="px-16">
              <v-autocomplete
                v-model="selectedPatient"
                :rules="fieldValidation"
                :items="patients"
                label="Select a Patient*"
              ></v-autocomplete>
              <v-autocomplete
                v-model="openingStaff"
                :rules="fieldValidation"
                :items="staffs"
                label="Openning Staff*"
              ></v-autocomplete>
              <v-autocomplete
                v-model="closingStaff"
                :rules="fieldValidation"
                :items="staffs"
                label="Closing Staff*"
              ></v-autocomplete>

              <!-- Time Pickers  -->
              <v-menu
                ref="menuStart"
                v-model="menu1"
                :rules="fieldValidation"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="startTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="startTime"
                    label="Dialysis start time*"
                    :rules="fieldValidation"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu1"
                  v-model="startTime"
                  format="24hr"
                  ampm-in-title
                  full-width
                  @click:minute="$refs.menuStart.save(startTime)"
                ></v-time-picker>
              </v-menu>
              <v-menu
                ref="menuEnd"
                v-model="menu2"
                :rules="fieldValidation"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="endTime"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    v-model="endTime"
                    label="Dialysis end time*"
                    :rules="fieldValidation"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="endTime"
                  format="24hr"
                  ampm-in-title
                  full-width
                  @click:minute="$refs.menuEnd.save(endTime)"
                ></v-time-picker>
              </v-menu>

              <!-- Date Picker -->

              <v-menu
                v-model="arrivalDateMenu"
                :rules="fieldValidation"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ on }">
                  <v-text-field
                    label="Arrival Date*"
                    :rules="fieldValidation"
                    readonly
                    :value="arrivalDateDisp"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="arrivalDateVal"
                  locale="en-in"
                  no-title
                  :min="minDate"
                  @input="arrivalDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5" @click="stepCount = 2">Next</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-2-For all the form for charges( Pre-dialysis form ) -->

        <v-stepper-content step="2">
          <v-card elevation="4" class="py-5">
            <v-btn class="primary ml-9 mt-3 v-btn--left" absolute @click="stepCount = 1"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-card-subtitle class="title">Pre Dialysis</v-card-subtitle>
            <v-card-text class="px-16">
              <v-text-field
                v-model="bpStolic"
                type="number"
                :rules="fieldValidation"
                label="BP Stolic*"
                placeholder="Enter BP Stolic"
              ></v-text-field>
              <v-text-field
                v-model="bpDiastolic"
                type="number"
                :rules="fieldValidation"
                label="BP Diastolic*"
                placeholder="Enter BP Diastolic"
              ></v-text-field>
              <v-text-field
                v-model="heartRate"
                type="number"
                :rules="fieldValidation"
                label="Heart Rate*"
                placeholder="Enter Heart Rate"
              ></v-text-field>
              <v-text-field
                v-model="patientWeight"
                type="number"
                :rules="fieldValidation"
                label="Weight*"
                placeholder="Enter Weight"
              ></v-text-field>
              <v-text-field
                v-model="spo2"
                type="number"
                :rules="fieldValidation"
                label="SPO2 %*"
                placeholder="Enter SPO2 %"
              ></v-text-field>
              <v-text-field
                v-model="reusedDialyzerCount"
                type="number"
                :rules="fieldValidation"
                label="Reused Dialyzer Count*"
                placeholder="Enter Reused Dialyzer Count"
              ></v-text-field>
              <v-autocomplete
                v-model="dialyzerId"
                :rules="fieldValidation"
                :items="dialyzerIds"
                label="Dialyzer ID*"
              ></v-autocomplete>
              <v-text-field
                v-model="reusedTubingCount"
                type="number"
                :rules="fieldValidation"
                label="Reused Tubing Count*"
                placeholder="Enter Reused Tubing Count"
              ></v-text-field>
              <v-autocomplete
                v-model="machine"
                :rules="fieldValidation"
                :items="machines"
                label="Machine*"
              ></v-autocomplete>
              <v-row class="mt-1">
                <v-col class="text-left mt-1" cols="sm" :sm="12" :lg="3">
                  <span class="subtitle-1">Appointment Type:</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="sm" :sm="12" :lg="7">
                  <v-btn-toggle v-model="appointmentType" color="primary" required mandatory dense rounded>
                    <v-row>
                      <v-col cols="sm" :sm="12" :lg="6">
                        <v-btn
                          :elevation="selectedEmergency"
                          :value="'emergency'"
                          class="mr-0"
                          @click="emergencyAppointmentHandler"
                        >
                          Emergency
                        </v-btn>
                      </v-col>
                      <v-col cols="sm" :sm="12" :lg="6">
                        <v-btn
                          :elevation="selectedScheduled"
                          :value="'scheduled'"
                          class="ml-0"
                          @click="scheduledAppointmentHandler"
                        >
                          Scheduled
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col class="col-6 text-left mt-1">
                  <span class="subtitle-1">Acces AV:</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn-toggle v-model="accesAv" color="primary" group required mandatory dense rounded>
                    <v-btn :elevation="selectedAvf" :value="'avf'" class="mr-0" @click="avfHandler"> AVF </v-btn>
                    <v-btn :elevation="selectedCath" :value="'cath'" class="ml-0" @click="cathHandler"> CATH </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col class="text-left mt-1" cols="sm" :sm="12" :lg="3">
                  <span class="subtitle-1">Conditions:</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col v-for="condition in conditions" :key="condition" cols="sm" :lg="3" :sm="12">
                    <v-btn>
                      {{ condition }}
                    </v-btn>
                  </v-col>
                  <v-text-field
                    v-model="otherDiseases"
                    type="text"
                    placeholder="Enter Other Diseases( if any )"
                  ></v-text-field>
                </v-row>
              </v-row>
              <v-textarea
                v-model="remarks"
                type="text"
                label="Remarks"
                placeholder="Enter Remarks( if any )"
                class="mt-8"
                background-color="#FFF2F2"
                filled
              ></v-textarea>
              <v-row class="mt-1">
                <v-col class="text-left mt-1" cols="sm" :sm="12" :lg="3">
                  <span class="subtitle-1">Site condition acceptable:</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn-toggle
                    v-model="siteConditionAcceptable"
                    color="primary"
                    group
                    required
                    mandatory
                    dense
                    rounded
                  >
                    <v-btn :elevation="selectedYes" :value="'yes'" class="mr-0" @click="yesHandler"> Yes </v-btn>
                    <v-btn :elevation="selectedNo" :value="'no'" class="ml-0" @click="noHandler"> No </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-textarea
                v-model="reasonForNotAcceptingSiteConditions"
                type="text"
                label="If No, Explain:"
                placeholder="Enter the explanation"
                class="mt-8"
                background-color="#FFF2F2"
                filled
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-lg-10" @click="stepCount = 1">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-lg-10" @click="stepCount = 3">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-3-Select region, location, machine, doctor and staff -->

        <v-stepper-content step="3">
          <v-card elevation="4" class="py-5">
            <v-btn class="primary ml-9 mt-3 v-btn--left" absolute @click="stepCount = 2"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-card-subtitle class="title">Patient Parameters</v-card-subtitle>

            <v-row v-for="n in 1" :key="n" style="height: 60px" no-gutters class="px-4">
              <v-col cols="1">
                <p>Time</p>
              </v-col>
              <v-col v-for="i in parameters" :key="i">
                <p>{{ i }}</p>
              </v-col>
              <v-col cols="2">
                <p>Actions</p>
              </v-col>
            </v-row>

            <v-row v-for="n in 7" :key="n" style="height: 60px" no-gutters class="px-4">
              <v-col>
                <v-text-field v-model="title" outlined type="time"></v-text-field>
              </v-col>
              <v-col v-for="i in 10" :key="i">
                <v-text-field v-model="title" outlined type="number"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field v-model="title" outlined type="text"></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-10" @click="stepCount = 2">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-10" @click="stepCount = 4">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-4-Post Dialysis -->
        <v-stepper-content step="4">
          <v-card elevation="4" class="py-5">
            <v-card-subtitle class="title">Post Dialysis Form</v-card-subtitle>
            <v-card-text class="px-lg-16 px-sm-8">
              <v-text-field
                v-model="bpStolicPost"
                type="number"
                :rules="fieldValidation"
                label="BP Systolic*"
                placeholder="Enter BP Stolic"
              ></v-text-field>
              <v-text-field
                v-model="bpDiastolicPost"
                type="number"
                :rules="fieldValidation"
                label="BP Diastolic*"
                placeholder="Enter BP Diastolic"
              ></v-text-field>
              <v-text-field
                v-model="heartRatePost"
                type="number"
                :rules="fieldValidation"
                label="Heart Rate*"
                placeholder="Enter Heart Rate"
              ></v-text-field>
              <v-text-field
                v-model="patientWeightPost"
                type="number"
                :rules="fieldValidation"
                label="Weight*"
                placeholder="Enter Weight"
              ></v-text-field>
              <v-text-field
                v-model="extraHoursPost"
                type="number"
                :rules="fieldValidation"
                label="Extra Hours*"
                placeholder="Enter extra hours"
              ></v-text-field>

              <v-autocomplete
                v-model="dischargeMode"
                :rules="fieldValidation"
                :items="dischargeModes"
                label="Mode of Discharge*"
              ></v-autocomplete>

              <v-row class="mt-1">
                <v-col class="col-6 text-left mt-1">
                  <span class="subtitle-1">Early Discharge:</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                  <v-btn-toggle v-model="earlyDischargePost" color="primary" group required mandatory dense rounded>
                    <v-btn :elevation="selectedYesPost" :value="'yes'" class="mr-0" @click="yesHandlerPost">
                      Yes
                    </v-btn>
                    <v-btn :elevation="selectedNoPost" :value="'no'" class="ml-0" @click="noHandlerPost"> No </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
              <v-row class="mt-1">
                <v-col class="col-6 text-left mt-1">
                  <span class="subtitle-1">Conditions:</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-row>
                  <v-col v-for="condition in conditions" :key="condition" cols="sm" :lg="3" :sm="12">
                    <v-btn>
                      {{ condition }}
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-row>
                    <v-col v-for="condition in conditions" :key="condition" cols="3">
                      <v-btn>
                        {{ condition }}
                      </v-btn>
                    </v-col>
                    <v-text-field
                      v-model="otherDiseasesPost"
                      type="text"
                      placeholder="Enter Other Diseases( if any )"
                    ></v-text-field>
                  </v-row>
                </v-row>
                <v-textarea
                  v-model="remarksPost"
                  type="text"
                  label="Remarks"
                  placeholder="Enter Remarks( if any )"
                  class="mt-8"
                  background-color="#FFF2F2"
                  filled
                ></v-textarea>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-lg-10" @click="stepCount = 3">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-lg-10" @click="stepCount = 5">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
        <!-- Form-5-Consumables -->

        <v-stepper-content step="5">
          <v-card elevation="4" class="py-5">
            <v-btn class="primary ml-9 mt-3 v-btn--left" absolute @click="stepCount = 4"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-card-subtitle class="title mb-8">Consumables</v-card-subtitle>
            <v-card-text class="px-lg-16 px-sm-8">
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="sixteenGNeedle"
                  :items="sixteenGNeedleList"
                  label="16g Needle"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="sixteenGNeedleQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="sixteenGNeedleQuantity--"
                  @click:append="sixteenGNeedleQuantity++"
                >
                </v-slider>
              </v-row>

              <v-row justify="space-between">
                <v-autocomplete
                  v-model="seventeenGNeedle"
                  :items="seventeenGNeedleList"
                  label="17g Needle"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="seventeenGNeedleQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="seventeenGNeedleQuantity--"
                  @click:append="seventeenGNeedleQuantity++"
                >
                </v-slider>
              </v-row>

              <v-row justify="space-between">
                <v-autocomplete
                  v-model="abPart"
                  label="A/B part"
                  placeholder="No Brand"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="abPartQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="abPartQuantity--"
                  @click:append="abPartQuantity++"
                >
                </v-slider>
              </v-row>

              <v-row justify="space-between">
                <v-autocomplete
                  v-model="bSixDialyzer"
                  label="B6 Dialyzer"
                  placeholder="No Brand"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="bSixDialyzerQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="bSixDialyzerQuantity--"
                  @click:append="bSixDialyzerQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="bedSheet"
                  :items="bedSheetList"
                  label="Bed Sheet"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="bedSheetQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="bedSheetQuantity--"
                  @click:append="bedSheetQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="bloodTubing"
                  :items="bloodTubingList"
                  label="Blood chemicalDnT"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="bloodTubingQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="bloodTubingQuantity--"
                  @click:append="bloodTubingQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="chemicalDnT"
                  :items="chemicalDnTList"
                  label="Chemical DchemicalMCT"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="chemicalDnTQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="chemicalDnTQuantity--"
                  @click:append="chemicalDnTQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="chemicalMC"
                  :items="chemicalMCList"
                  label="Chemical M/C"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="chemicalMCQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="chemicalMCQuantity--"
                  @click:append="chemicalMCQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="dialyzer"
                  label="Dialyzer"
                  placeholder="No Brand"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="dialyzerQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="dialyzerQuantity--"
                  @click:append="dialyzerQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="gloves"
                  :items="glovesList"
                  label="Gloves"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="glovesQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="glovesQuantity--"
                  @click:append="glovesQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="heparin"
                  :items="heparinList"
                  label="Heparin"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-text-field
                  v-model="heparinQuantity"
                  placeholder="Enter ML used"
                  :rules="fieldValidation"
                ></v-text-field>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="ivSet"
                  :items="ivSetList"
                  label="IV Set"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="ivSetQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="ivSetQuantity--"
                  @click:append="ivSetQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="nsThousandMl"
                  :items="nsThousandMlList"
                  label="NS1000 ML"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="nsThousandMlQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="nsThousandMlQuantity--"
                  @click:append="nsThousandMlQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="nsFiveHundredMl"
                  :items="nsFiveHundredMlList"
                  label="NS500 ML"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="nsFiveHundredMlQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="nsFiveHundredMlQuantity--"
                  @click:append="nsFiveHundredMlQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="onOffKit"
                  :items="onOffKitList"
                  label="On/Off Kit"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="onOffKitQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="onOffKitQuantity--"
                  @click:append="onOffKitQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="singleUseDialyzer"
                  :items="singleUseDialyzerList"
                  label="Single Use Dialyzer"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="singleUseDialyzerQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="singleUseDialyzerQuantity--"
                  @click:append="singleUseDialyzerQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="syringeTenMl"
                  :items="syringeTenMlList"
                  label="Syringe 10 ML"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="syringeTenMlQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="syringeTenMlQuantity--"
                  @click:append="syringeTenMlQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="syringeFiveMl"
                  placeholder="No Brand"
                  label="Syringe 5 ML"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="syringeFiveMlQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="syringeFiveMlQuantity--"
                  @click:append="syringeFiveMlQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="transducerProtector"
                  placeholder="No Brand"
                  label="Transducer Protector"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="transducerProtectorQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="transducerProtectorQuantity--"
                  @click:append="transducerProtectorQuantity++"
                >
                </v-slider>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-lg-10" @click="stepCount = 4">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-lg-10" @click="stepCount = 6">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-6-Pharmaceuticals Form-->

        <v-stepper-content step="6">
          <v-card elevation="4" class="py-5">
            <v-btn class="primary ml-9 mt-3 v-btn--left" absolute @click="stepCount = 5"
              ><v-icon>mdi-chevron-left</v-icon></v-btn
            >
            <v-card-subtitle class="title mb-8">Pharmaceuticals</v-card-subtitle>
            <v-card-text class="px-lg-16 px-sm-8">
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="epoTenK"
                  placeholder="No Brand"
                  label="EPO 10K"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="epoTenKQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="epoTenKQuantity--"
                  @click:append="epoTenKQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="epoFourK"
                  placeholder="No Brand"
                  label="EPO 4K"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="epoFourKQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="epoFourKQuantity--"
                  @click:append="epoFourKQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="injAminoAcid"
                  placeholder="No Brand"
                  label="Inj Amino Acid"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="injAminoAcidQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="injAminoAcidQuantity--"
                  @click:append="injAminoAcidQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="injAntibiotics"
                  placeholder="No Brand"
                  label="Transducer Protector"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="injAntibioticsQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="injAntibioticsQuantity--"
                  @click:append="injAntibioticsQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="injDextrose"
                  :items="injDextroseList"
                  label="Inj Dextrose 25% 100ml"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="injDextroseQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="injDextroseQuantity--"
                  @click:append="injDextroseQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="injIron"
                  :items="injIronList"
                  label="Inj Iron"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="injIronQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="injIronQuantity--"
                  @click:append="injIronQuantity++"
                >
                </v-slider>
              </v-row>
              <v-row justify="space-between">
                <v-autocomplete
                  v-model="injMultiVit"
                  :items="injMultiVitList"
                  label="Inj Multi Vit"
                  :rules="fieldValidation"
                  class="mr-lg-16 mr-md-14 mr-sm-8"
                ></v-autocomplete>
                <v-slider
                  v-model="injMultiVitQuantity"
                  track-color="grey"
                  always-dirty
                  thumb-label="always"
                  min="0"
                  max="5"
                  append-icon="mdi-plus"
                  prepend-icon="mdi-minus"
                  class="pt-7"
                  ticks="always"
                  step="1"
                  tick-size="5"
                  :tick-labels="needleTicks"
                  @click:prepend="injMultiVitQuantity--"
                  @click:append="injMultiVitQuantity++"
                >
                </v-slider>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-lg-10" @click="stepCount = 6">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-lg-10" @click="stepCount = 7">Next</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>

        <!-- Form-7- Others -->

        <v-stepper-content step="7">
          <v-card justify-center>
            <v-card-subtitle class="subtitle-1">No other items</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary mb-5" class="pa-5 ml-10" @click="stepCount = 3">Prev</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary mb-5" class="pa-5 mr-10" @click="formSubmitHandler">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  middleware: 'staff',
  data() {
    return {
      parameters: [
        'BP Systolic',
        'BP Diastolic',
        'Pulse',
        'UF Rate',
        'UF Volume',
        'BF Rate',
        'AP',
        'VP',
        'TMP',
        'Kt/v',
      ],
      stepCount: 1,

      bpStolic: '',
      bpDiastolic: '',
      heartRate: '',
      patientWeight: '',
      spo2: '',
      reusedDialyzerCount: '',
      reusedTubingCount: '',

      startTime: null,
      endTime: null,
      selectedPatient: '',
      openingStaff: '',
      closingStaff: '',
      patients: ['p1', 'p2', 'p3', 'p4', 'p5'],
      staffs: ['s1', 's2', 's3', 's4', 's5'],
      menu1: false,
      menu2: false,
      modal2: false,
      arrivalDateMenu: false,
      arrivalDateVal: null,
      minDate: '2020-01-05',
      maxDate: '2019-08-30',
      dialyzerIds: [
        'Fresenius F6',
        'Fresenius F8',
        'Brown Dove B6',
        'Brown Dove B7',
        'Brown Dove 130',
        'Nipro',
        'Dara',
      ],
      dialyzerId: 'Fresenius F6',
      machines: ['Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5'],
      machine: 'Machine 1',
      appointmentType: 'emergency',
      accesAv: 'avf',
      conditions: [
        'BP High',
        'BP Low',
        'Nausea',
        'Vomiting',
        'Short Breath',
        'Bleeding',
        'Edema',
        'Stomach Distend',
        'Diarrhea',
      ],
      selectedConditions: [],
      otherDiseases: '',
      remarks: '',
      siteConditionAcceptable: true,
      reasonForNotAcceptingSiteConditions: '',
      bpStolicPost: '',
      bpDiastolicPost: '',
      heartRatePost: '',
      patientWeightPost: '',
      extraHoursPost: '',
      dischargeMode: '',
      dischargeModes: ['By walk', 'By Wheel Chair', 'Ambulance', 'Human Support'],
      earlyDischargePost: 'no',
      otherDiseasesPost: '',
      remarksPost: '',

      fieldValidation: [(v) => !!v || 'Field is required'],

      // Used for handling selected button elevation design

      selectedEmergency: 0,
      selectedScheduled: 4,
      selectedAvf: 0,
      selectedCath: 4,
      selectedYes: 0,
      selectedNo: 4,
      selectedYesPost: 4,
      selectedNoPost: 0,
      sixteenGNeedle: '',
      sixteenGNeedleList: ['Browndove ( Available: 1 )'],
      sixteenGNeedleQuantity: 0,
      seventeenGNeedle: '',
      seventeenGNeedleList: ['Browndove ( Available: 1 )'],
      seventeenGNeedleQuantity: 0,
      abPart: '',
      abPartQuantity: 0,
      bSixDialyzer: '',
      bSixDialyzerQuantity: 0,
      bedSheet: '',
      bedSheetList: ['Bed Sheet ( Available: 1 )'],
      bedSheetQuantity: 0,
      bloodTubingList: ['Blood Tubing ( Available: 1 )'],
      bloodTubingQuantity: 0,
      bloodTubing: '',
      chemicalDnTList: ['Chemical DNT ( Available: 1 )'],
      chemicalDnTQuantity: 0,
      chemicalDnT: '',
      chemicalMCList: ['Chemical MC ( Available: 1 )'],
      chemicalMCQuantity: 0,
      chemicalMC: '',
      dialyzer: '',
      dialyzerQuantity: 0,
      glovesList: ['Glove ( Available: 1 )'],
      glovesQuantity: 0,
      gloves: '',
      heparinList: ['Heparin ( Available: 1 )'],
      heparinQuantity: 0,
      heparin: '',
      ivSet: '',
      ivSetList: ['IV Set ( Available: 1 )'],
      ivSetQuantity: 0,
      nsThousandMlList: ['NS 1000ml ( Available: 1 )'],
      nsThousandMlQuantity: 0,
      nsThousandMl: '',
      nsFiveHundredMlList: ['NS 500ml ( Available: 1 )'],
      nsFiveHundredMlQuantity: 0,
      nsFiveHundredMl: '',
      onOffKitList: ['On-Off Kit ( Available: 1 )'],
      onOffKitQuantity: 0,
      onOffKit: '',
      singleUseDialyzerList: ['Single Use Dialyzer ( Available: 1 )'],
      singleUseDialyzerQuantity: 0,
      singleUseDialyzer: '',
      syringeTenMlList: ['Syringe 10ml ( Available: 1 )'],
      syringeTenMlQuantity: 0,
      syringeTenMl: '',
      syringeFiveMl: '',
      syringeFiveMlQuantity: 0,
      transducerProtector: '',
      transducerProtectorQuantity: 0,
      epoTenK: '',
      epoTenKQuantity: 0,
      epoFourK: '',
      epoFourKQuantity: 0,
      injAminoAcid: '',
      injAminoAcidQuantity: 0,
      injAntibiotics: '',
      injAntibioticsQuantity: 0,
      injDextrose: '',
      injDextroseQuantity: 0,
      injDextroseList: ['Dextrose ( Available: 1 )'],
      injIron: '',
      injIronQuantity: 0,
      injIronList: ['Iron ( Available: 1 )'],
      injMultiVit: '',
      injMultiVitQuantity: 0,
      injMultiVitList: ['Multi Vitamin ( Available: 1 )'],

      needleTicks: ['0', '1', '2', '3', '4', '5'],

      // Used for handling selected button elevation design
    }
  },

  head() {
    return {
      title: 'Offline Record',
    }
  },
  computed: {
    arrivalDateDisp() {
      return this.arrivalDateVal
    },
  },
  methods: {
    emergencyAppointmentHandler() {
      this.appointmentType = 'emergency'
      this.selectedEmergency = 0
      this.selectedScheduled = 4
    },
    scheduledAppointmentHandler() {
      this.appointmentType = 'scheduled'
      this.selectedEmergency = 4
      this.selectedScheduled = 0
    },
    avfHandler() {
      this.accesAv = 'avf'
      this.selectedAvf = 0
      this.selectedCath = 4
    },
    cathHandler() {
      this.accesAv = 'cath'
      this.selectedAvf = 4
      this.selectedCath = 0
    },
    yesHandler() {
      this.siteConditionAcceptable = true
      this.selectedYes = 0
      this.selectedNo = 4
    },
    yesHandlerPost() {
      this.earlyDischargePost = 'yes'
      this.selectedYesPost = 0
      this.selectedNoPost = 4
    },
    noHandler() {
      this.siteConditionAcceptable = false
      this.selectedYes = 4
      this.selectedNo = 0
    },
    noHandlerPost() {
      this.earlyDischargePost = 'no'
      this.selectedYesPost = 4
      this.selectedNoPost = 0
    },
    formSubmitHandler() {
      alert('Form Submitted')
    },
  },
}
</script>
<style lang="scss">
/* stylelint-disable-next-line selector-class-pattern */
.offline-records-steps {
  & .v-stepper__step--inactive,
  .v-stepper__step--complete {
    .v-stepper__label {
      display: none !important;
    }
  }
}
</style>
