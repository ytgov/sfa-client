<template>
  <div class="home cslft-costs-assessment">
    <v-card class="default mb-5 bg-color-blue" v-for="item, index in application.funding_requests" :key="index">
      <v-card-text class="nopadding d-flex flex-wrap top-margin low-margin">
        <div class="col-xs-12 col-sm-12 col-lg-12 nopadding d-flex flex-wrap">
          <div class="col-xs-12 col-lg-12 nopadding">
            <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
              <div class="col-xs-12 col-sm-3 col-lg-3 nopadding">
                <div class="col-xs-12 col-lg-12 nopadding">
                  <v-card-title class="nopadding-bottom">Scholastic Expenses</v-card-title>
                </div>
              </div>
              <div class="col-xs-12 col-sm-1 col-lg-1 nopadding not-displayed-sx"></div>
              <div class="col-xs-12 col-sm-2 col-lg-2 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field outlined dense background-color="white" hide-details label="Tuition Fees" @keypress="validate.isNumber($event)" v-model="tuition_fees"></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-lg-2 nopadding not-displayed-sx-md"></div>
              <div class="col-xs-12 col-sm-2 col-lg-2 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field outlined dense background-color="white" hide-details label="Books" @keypress="validate.isNumber($event)" v-model="books"></v-text-field>
                </div>
              </div>
              <div class="col-xs-12 col-sm-2 col-lg-2 nopadding xs-md-low-margin">
                <div class="col-xs-12 col-lg-12">
                  <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title class="nopadding-bottom">Capped Expenses</v-card-title>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding">
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Expense Type</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Frequency</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center flex-wrap">
                    <h3 class="nomargin col-md-12 nopadding">Max Allowable</h3>
                    <h3 class="nomargin col-md-12 nopadding">(From tables)</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin">Actual Amount</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin">Yearly Total</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Shelter/Food/Misc</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Monthly</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin col-xs-3 col-sm-3 col-lg-3 nopadding">T3</h3>
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Public Trans</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Monthly</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin col-xs-3 col-sm-3 col-lg-3 nopadding">T3</h3>
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Extended Trans</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Irregular</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-end "></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Return Trans</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">16 Weeks</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-end ">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Relocation</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Annual</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin"></div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Day Care</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Monthly</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin col-xs-3 col-sm-3 col-lg-3 nopadding">T4</h3>
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Dependent Shelter/Food/Misc</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Monthly</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin col-xs-3 col-sm-3 col-lg-3 nopadding">T3</h3>
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Dependent Public Trans</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Monthly</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin col-xs-3 col-sm-3 col-lg-3 nopadding">T3</h3>
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Discretionary Costs</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Annual</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-end ">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex flex-wrap">
            <div class="col-xs-12 col-lg-12 nopadding">
              <v-card-title class="nopadding-bottom">Uncapped Expenses</v-card-title>
            </div>
            <div class="col-xs-12 col-lg-12 nopadding">
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Expense Type</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start">
                    <h3 class="nomargin">Description</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center flex-wrap">
                    <h3 class="nomargin col-md-12 nopadding">Frequency</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin">Amount</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin">Yearly Total</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 col-lg-12 nopadding d-flex mobile-column-flex">
                <div class="col-xs-12 col-sm-12 col-lg-12 d-flex noppading-bottom margin-left">
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-start"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center"></div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <h3 class="nomargin">Total Study Costs</h3>
                  </div>
                  <div class="col-xs-2 col-sm-2 col-lg-2 nopadding d-flex align-center justify-center">
                    <div class="col-xs-9 col-sm-9 col-lg-9 nopadding xs-md-low-margin">
                      <div class="col-xs-12 col-lg-12 nopadding">
                        <v-text-field outlined dense background-color="white" hide-details @keypress="validate.isNumber($event)" v-model="assessed_amount"></v-text-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import store from "@/store";
import validator from "@/validator";
export default {
  name: "Home",
  computed: {
    application: function () {
      return store.getters.selectedApplication;
    },
  },
  async created() {
    this.validate = validator;
    this.applicationId = this.$route.params.id;
    let storeApp = store.getters.selectedApplication;
    if (this.applicationId != storeApp.HISTORY_DETAIL_ID) {
      await store.dispatch("loadApplication", this.applicationId);
    }
  }
};
</script>
<style>
  .nopadding {
    padding: 0 !important;
  }
  .nopadding-lr {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .noppading-bottom,
  .nopadding-bottom {
    padding-bottom: 0 !important;
  }
  .noppading-top {
    padding-top: 0 !important;
  }
  .nopadding-left {
    padding-left: 0 !important;
  }
  .noppading-right {
    padding-right: 0 !important;
  }
  .padding-top{
    padding-top: 17px !important;
  }
  .margin-left{
    margin-left: 15px !important;
  }
  .equalize-heights {
    height: 40px;
  }
  .border-top {
    border-top: 3px solid #ccc;
  }
  .border-container{
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  .w-auto{
    min-width: unset !important;
    width: 100%;
  }
  .bg-color-blue{
    background-color: #E2F1FD !important;
  }
  .low-margin{
    margin-bottom: 20px !important;
  }
  .low-marginx2{
    margin-bottom: 40px !important;
  }
  .top-margin{
    margin-top: 20px !important;
  }  
  .txtarea-width{
    width: 97.6% !important;
  }
  .line-jump-height{
    height: 64px;
  }
  .v-btn:not(.v-btn--round).v-size--default{
    padding: 0 8px !important;
  }
  .cslft-costs-assessment .right-block-container > div{
    border-left: 0px;
  }
  .cslft-costs-assessment .right-block-container{
    border-left: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .not-displayed-lg{
    display: none;
  }
  .v-card__title{
    font-weight: bold !important;
    font-size: 1.65rem !important;
  }
  .height-fit-content{
    height: fit-content !important;
  }
  .justify-end{
    justify-content: flex-end !important;
  }
  .justify-start{
    justify-content: flex-start !important;
  }
  .justify-center{
    justify-content: center !important;
  }
  .cslft-costs-assessment .right-block-container img{
    max-height: 80px !important;
    padding-right: 10px;
  }
  @media (max-width: 1263px) {
    .cslft-costs-assessment .right-block-container{
      border-left: 0px;
    }
    .v-card__title{
      font-size: 1.25rem !important;
    }
    .not-displayed-lg{
      display: block;
      height: 0px;
      margin: 20px 15px;
    }
    .cslft-costs-assessment .right-block-container .not-displayed-lg{
      border-top: 1px solid #ccc;
    }
    .not-displayed-sx-md,
    .d-flex.not-displayed-sx-md{
      display: none;
    }
    .not-displayed-sx-md,
    .d-flex.not-displayed-sx-md{
      height: 0px !important;
      padding: 0px !important;
    }
  }
  @media (max-width: 599px){
    .mobile-custom-border{
      padding: 10px !important;
      margin: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;;
    }
    .mobile-custom-border-2{
      padding: 10px !important;
      margin: 10px;
      border: 2px solid #ccc;
      border-radius: 5px;;
    }
    .mobile-custom-border::after{
      content: '';
      position: relative;
      left: 43%;
      top: 16px;
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 15px solid #ccc;
      clear: both;
    }
    .nopadding-left{
      padding-left: 14px !important;
    }
    .mobile-noppading-top{
      padding-top: 0px !important;
    }
    .mobile-noppading-bottom{
      padding-bottom: 0px !important;
    }
    .not-displayed-sx,
    .d-flex.not-displayed-sx{
      display: none;
    }
    .not-displayed-sx,
    .d-flex.not-displayed-sx{
      height: 0px !important;
      padding: 0px !important;
    }
    .mobile-column-flex{
      flex-direction: column;
    }
    .mobile-low-margin{
      margin-bottom: 20px !important;
    }
    .mobile-top-margin{
      margin-top: 20px !important;
    }
    .clss-st-date-re-order{
      order: 2;
    }
    .clss-en-date-re-order{
      order: 3;
    }
    .help-txt-re-order{
      order: 1;
    }
  }


</style>
