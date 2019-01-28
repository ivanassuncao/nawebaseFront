<template>
     <div class="ponto-eletronico">
        <h2 class="titlte is-1 ">Controle de Ponto</h2>
         <b-form>
              
        <section class="sectionform">
        <b-row>
            <b-col md="4" sm="12">
            <b-form-group class="ml-2" label="Matrícula:" label-for="pontoeletronico-matricula">
                <b-form-input id="pontoeletronico-matricula" type="text"
                placeholder="Informe o número da matrícula." />
            </b-form-group>
            </b-col>
            <b-col md="8" sm="12">
            <b-button size="lg" variant="outline-primary" class="mt-4 pb-2" @click="exibir = !exibir"  >Abrir Ponto</b-button>
            </b-col>
        </b-row>
        </section>    
 
        </b-form>
        <transition name="fade" appear>    
            <section key="fade" class="section" v-show="exibir">
                <hr>
                <h3 class="title is-3 shadow" v-text="message"></h3>
                <p class="time shadow" v-text="currentTime"></p>
            </section>
        </transition> 

         <transition name="slide" type="animation" appear>   
            <b-table class="table-responsive" v-show="exibir" key="slide" hover striped :items="pontoeletronicos" :fields="fields">

            </b-table>
        </transition> 
       

     </div>
</template>

<script>
//import {baseApiUrl} from '@/global'
//import axios from 'axios'
import PageTitle from '../template/PageTitle'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

export default {
    name: 'ArticleById',
    components: {PageTitle,VueMoment,moment},
    data: function (){
        return {
            pontoeletronico:{},
            pontoeletronicos:[],
             fields: [
                { key: 'dataponto', label: 'Data', sortable: true },
                { key: 'horaponto', label: 'Hora', sortable: true },
                   { key: 'entrada', label: 'Entrada', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'comentarioponto', label: 'Comentário', sortable: true }    
            ],
            message: null,
            currentTime: null,
            exibir: false,
            descmes:[
                "Janeiro", "Fevereiro", "Março",
                "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro",
                "Novembro", "Dezembro"
            ]
        }
    },
    methods: {

        updateCurrentTime() {
        this.currentTime = moment().format('LTS')
       
        }
    },
    created() {
                      
        let dataatual = new Date()
        let dia = dataatual.getDate()
        let mes = dataatual.getMonth()
        let ano = dataatual.getFullYear()

        this.message = `${dia} de ${this.descmes[mes]} de  ${ano}`
        this.currentTime = moment().format('LTS')
        setInterval(() => this.updateCurrentTime(), 1 * 1000)

    }
}
</script>

<style>

h3.is-3, p.time {
  color: aliceblue;
  
}

h3.is-3:not(:last-child) {
  margin: 0;
  padding: 0;
}

section.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  background: rgba(49, 49, 49, 0.35);
}

section.sectionform{
     background:white ;
}

.h1{
     font-size: 10em;
}

.time {
  font-size: 5em;
}

.shadow {
  text-shadow: 0 0 15px rgba(100, 100, 100, .70);
}

.fade-enter, .fade-leave-to{
    opacity: 0;
}

.fade-enter-active, .fade-leave-active{
    transition: opacity 2s;
}

@keyframes slide-in {
    from {transform: translateY(40px);}
    to {transform: translateY(0);}
}

@keyframes slide-out {
    from {transform: translateY(0);}
    to {transform: translateY(40px);}
}

.slide-enter-active {
    animation: slide-in 2s ease;
     transition: opacity 2s;
}

.slide-leave-active {
    animation: slide-out 2s ease;
     transition: opacity 2s;
}

.slide-enter, .slide-leave-to{
    opacity: 0;
}

</style>
