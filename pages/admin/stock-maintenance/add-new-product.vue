<template>
  <div class="d-flex align-center flex-column">
    <v-card v-if="show" class="mx-auto my-12" width="700" outlined>
      <v-form ref="form" @submit.prevent="addProduct">
        <h3 class="text-center #752b59--text my-3">Add Product</h3>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Name:</p>
          </v-col>
          <v-col cols="7">
            <v-card height="120" class="scroll">
              <v-btn-toggle
                v-model="form.product_name"
                group
                dense
                required
                mandatory
                borderless
                color="brown"
                class="align-center"
              >
                <v-row class="pl-2">
                  <v-col v-for="(item, index) in productNames" :key="index">
                    <v-btn :elevation="3" large :value="item">
                      {{ item }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-btn-toggle>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-right py-3">
          <v-btn color="#752b59" class="white--text" @click="show = !show">Add Product</v-btn>
        </div>
        <v-row v-if="show2" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Center:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="8">
                <v-select
                  v-model="form.branch_name"
                  :items="branchOptionsForMicroCenters"
                  outlined
                  :rules="fieldRules"
                  :menu-props="{ offsetY: true }"
                  label="Select center"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-btn color="#752b59" class="white--text" @click="show2 = !show2">HD Patients</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="!show2" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Center:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="8">
                <v-select
                  v-model="form.branch_name"
                  :items="branchOptionsForHDPatients"
                  outlined
                  :rules="fieldRules"
                  :menu-props="{ offsetY: true }"
                  label="Select HD Patient"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-btn color="#752b59" class="white--text" @click="show2 = !show2">MicroCenters</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="show3" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Brand:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="10">
                <v-select
                  v-model="form.brand"
                  :items="brandOptions"
                  outlined
                  :rules="fieldRules"
                  :menu-props="{ offsetY: true }"
                  label="Select brand"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-btn color="#752b59" class="white--text" @click="show3 = !show3"><v-icon>mdi-plus</v-icon> </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="!show3" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Brand:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.brand" :rules="fieldRules" label="brand" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="show4" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Category:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="10">
                <v-select
                  v-model="form.category"
                  :items="categoryOptions"
                  outlined
                  :rules="fieldRules"
                  :menu-props="{ offsetY: true }"
                  label="Select Category"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-btn color="#752b59" class="white--text" @click="show4 = !show4"><v-icon>mdi-plus</v-icon> </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="!show4" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Category:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.category" :rules="fieldRules" label="Category" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Billable:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.bill"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> Yes </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> No </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Cost Price:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.cost"
              :rules="fieldRules"
              label="Enter Cost Price"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">GST:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.gst"
              :rules="fieldRules"
              label="Enter GST%"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Arrived:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.arrived"
              :rules="fieldRules"
              label="Enter Arrived Count"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Private Selling Price:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.private_selling_price"
              :rules="fieldRules"
              label="Enter Private SP"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">MJPJAY Selling Price:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.mjpjay_selling_price"
              :rules="fieldRules"
              label="Enter MJPJAY SP"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center py-3">
          <v-btn color="#752b59" class="white--text" type="submit">Add Product</v-btn>
        </div>
      </v-form>
    </v-card>

    <v-card v-if="!show" class="mx-auto my-12" width="700" outlined>
      <v-form ref="form" @submit.prevent="addProduct">
        <h3 class="text-center #752b59--text my-3">Add product</h3>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Name:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.product_name"
              :rules="fieldRules"
              label="Enter Product Name"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="show2" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Center:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="8">
                <v-select
                  v-model="form.branch_name"
                  :items="branchOptionsForMicroCenters"
                  outlined
                  :rules="fieldRules"
                  :menu-props="{ offsetY: true }"
                  label="Select center"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-btn color="#752b59" class="white--text" @click="show2 = !show2">HD Patients</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="!show2" no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Center:</p>
          </v-col>
          <v-col cols="7">
            <v-row>
              <v-col cols="8">
                <v-select
                  v-model="form.branch_name"
                  :items="branchOptionsForHDPatients"
                  outlined
                  :rules="fieldRules"
                  :menu-props="{ offsetY: true }"
                  label="Select HD Patient"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-btn color="#752b59" class="white--text" @click="show2 = !show2">Micro Centers</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Brand:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.brand" :rules="fieldRules" label="brand" outlined dense></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Category:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="form.category" :rules="fieldRules" label="Category" outlined dense></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Billable:</p>
          </v-col>
          <v-col cols="7">
            <v-btn-toggle
              v-model="form.bill"
              group
              dense
              required
              mandatory
              borderless
              color="brown"
              class="align-center"
            >
              <v-btn :elevation="3" :value="'1'"> Yes </v-btn>
              <v-btn :elevation="3" rounded :value="'0'"> No </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Cost Price:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.cost"
              :rules="fieldRules"
              label="Enter Cost Price"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">GST:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.gst"
              :rules="fieldRules"
              label="Enter GST%"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Arrived:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.arrived"
              :rules="fieldRules"
              label="Enter Arrived Count"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">Private Selling Price:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.private_selling_price"
              :rules="fieldRules"
              label="Enter Private SP"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters justify="center">
          <v-col cols="3" class="pt-2">
            <p class="h5">MJPJAY Selling Price:</p>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="form.mjpjay_selling_price"
              :rules="fieldRules"
              label="Enter MJPJAY SP"
              type="number"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center py-3">
          <v-btn color="#752b59" class="white--text" type="submit">Add Product</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fieldRules: [(v) => !!v || 'This field is required'],
      show: true,
      show2: true,
      show3: true,
      show4: true,
      form: {
        product_name: '',
        branch_name: '',
        category: '',
        brand: '',
        bill: '',
        cost: '',
        gst: '',
        calculated_cost_price: '',
        arrived: '',
        private_selling_price: '',
        mjpjay_selling_price: '',
      },
      productNames: ['aaaaaaaaaaaaaaaaaaaa', 'bb', 'cc', 'DD', 'EE', 'FF', 'GG'],
      branchOptionsForHDPatients: ['Branch1', 'Branch2', 'Branch3'],
      branchOptionsForMicroCenters: ['Branch1', 'Branch2', 'Branch3'],
      brandOptions: ['brand1', 'brand2'],
      categoryOptions: ['Category1', 'Category2'],
    }
  },
  head() {
    return {
      title: 'Add New Product',
    }
  },
  methods: {
    addProduct() {
      if (this.$refs.form.validate()) {
        alert(this.form.product_name)
      }
    },
  },
}
</script>
<style scoped>
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
