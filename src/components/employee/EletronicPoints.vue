<template>
  <div class="eletronic-points">
    <PageTitle icon="fa fa-clock-o" main="Controle de Ponto Eletônico" sub="Ponto Eletrônico"/>
    <b-form>
      <section class="sectionform">
        <b-row>
          <b-col md="3" sm="12">
            <b-form-group class="ml-2" label="Matrícula:" label-for="eletronicpoint-registration">
              <input
                class="form-control-sm"
                @keyup="registration = $event.target.value"
                size="sm"
                id="registration"
                type="text"
                placeholder="Número da matrícula."
              >
              <b-button
                v-show="this.registration"
                title="Buscar Funcionário"
                size="sm"
                variant="outline-secondary"
                @click="getEmployee"
                class="ml-2"
              >
                <i class="fa fa-drivers-license-o"></i>
              </b-button>
            </b-form-group>
          </b-col>
          <b-col md="4" sm="12">
            <b-form-group label="Nome:" label-for="employee-name">
              <b-form-input
                id="employee-name"
                type="text"
                v-model="employee.name"
                required
                size="sm"
                :readonly="true"
                placeholder="Nome..."
              />
            </b-form-group>
          </b-col>
          <b-col md="3" sm="12">
            <b-form-group
              v-show="this.employee.name"
              class="ml-2"
              label="Senha:"
              label-for="employee-passwordconfirm"
            >
              <input
                class="form-control-sm"
                size="sm"
                id="employee.passwordconfirm"
                v-model="employee.passwordconfirm"
                type="password"
                placeholder="Senha do Usuário."
              >
              <b-button
                v-show="this.registration"
                title="Verificar Permissão"
                size="sm"
                variant="outline-success"
                @click="employeeSignin"
                class="ml-2"
              >
                <i class="fa fa-key"></i>
              </b-button>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="2" sm="12">
            <b-button
              size="sm"
              v-show="allow"
              variant="outline-primary"
              class="ml-2"
              @click="exibir = !exibir"
            >Abrir Ponto</b-button>
          </b-col>
        </b-row>
      </section>
      <hr>
      <transition name="fade" appear>
        <section key="fade" class="section" v-show="exibir">
          <hr>
          <h3 class="title is-3 shadow" v-text="message"></h3>
          <p class="time shadow" v-text="currentTime"></p>
        </section>
      </transition>
      <b-button
        v-show="exibir"
        size="sm"
        variant="outline-success"
        class="mr-2 mt-2 mb-2"
        @click="save"
      >Adicionar</b-button>

      <transition name="slide" type="animation" appear>
        <b-table
          class="table-responsive"
          v-show="exibir"
          key="slide"
          hover
          striped
          :items="eletronicpoints"
          :fields="fields"
        ></b-table>
      </transition>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import VueMoment from "vue-moment";
import moment from "moment-timezone";

export default {
  name: "EletronicPoints",
  components: { PageTitle, VueMoment, moment },
  data: function() {
    return {
      eletronicpoint: {},
      employee: {},
      eletronicpoints: [],
      registration: "",
      fields: [
        { key: "data", label: "Data", sortable: false },
        { key: "time", label: "Hora", sortable: false },
        {
          key: "input_point",
          label: "Entrada",
          sortable: false,
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "comments", label: "Observação", sortable: false }
      ],
      message: null,
      currentTime: null,
      exibir: false,
      permission: false,
      allow: false,
      descmes: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ]
    };
  },
  methods: {
     loadEletronicPoints() {
         const id = this.employee.id
        const url = `${baseApiUrl}/electronicpoints/${id}/employees`
        axios.get(url).then(res => {
            this.electronicpoints = res.data
            
        })
                },
    updateCurrentTime() {
      this.currentTime = moment().format("LTS");
    },
    getEmployee() {
      axios
        .get(`${baseApiUrl}/registrationEmployee/${this.registration}`)
        .then(res => {
          this.employee = res.data;
        })
        .catch(showError);
    },
    employeeSignin() {
      axios
        .post(`${baseApiUrl}/employeeSignin`, this.employee)
        .then(() => {
          this.allow = true;
        })
        .catch(showError);
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    formatTime(time) {
      return moment(time).format("h:mm");
    },
    save() {
      const datenow = new Date();
      const timenow = datenow.getTimezoneOffset();
      const method = this.eletronicpoint.id ? "put" : "post";
      const id = this.eletronicpoint.id ? `/${this.eletronicpoint.id}` : "";
      this.eletronicpoint.employee_id = this.employee.id;
      this.eletronicpoint.date = this.formatDate(datenow);
      this.eletronicpoint.time = this.formatTime(timenow);

      axios[method](`${baseApiUrl}/eletronicpoints${id}`, this.eletronicpoint)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.loadEletronicPoints();
    }
  },
  created() {

    let dataatual = new Date();
    let dia = dataatual.getDate();
    let mes = dataatual.getMonth();
    let ano = dataatual.getFullYear();

    this.message = `${dia} de ${this.descmes[mes]} de  ${ano}`;
    this.currentTime = moment().format("LTS");
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  }
};
</script>

<style>
.eletronic-points table {
  font-size: 0.8rem;
}

.eletronic-points input {
  font-size: 0.8rem;
}

.eletronic-points label {
  font-size: 0.8rem;
}

section.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  background: linear-gradient(to right, #1e469a, #49a7c1);
}

section.sectionform {
  background: white;
}

.h1 {
  font-size: 10em;
}

.time {
  font-size: 5em;
}

.shadow {
  text-shadow: 0 0 15px rgba(100, 100, 100, 0.7);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

@keyframes slide-in {
  from {
    transform: translateY(40px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(40px);
  }
}

.slide-enter-active {
  animation: slide-in 2s ease;
  transition: opacity 2s;
}

.slide-leave-active {
  animation: slide-out 2s ease;
  transition: opacity 2s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}
</style>
