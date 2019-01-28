<template>
      <div class="planoconta-admin">
          <b-form>
               <input id="planoconta-id" type="hidden" v-model="planoconta.id" />
                <b-row>
                <b-col md="4" sm="12">
                    <b-form-group label="Conta Contábil:" label-for="planoconta-contaContabil">
                        <b-form-input id="planoconta-contaContabil" type="text"
                            v-model="planoconta.contaContabil" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Código da Conta..." />
                    </b-form-group>
                </b-col>
                <b-col md="8" sm="12">
                    <b-form-group label="Descrição:" label-for="planoconta-descricaoContabil">
                        <b-form-input id="planoconta-descricaoContabil" type="text"
                            v-model="planoconta.descricaoContabil" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a Descrição..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="planoconta-ativo" v-show="mode === 'save'"
                v-model="planoconta.ativo" class="mt-3 mb-3">
                Ativo?
            </b-form-checkbox>
             <b-form-checkbox id="planoconta-sintetico" v-show="mode === 'save'"
                v-model="planoconta.sintetico" class="mt-3 mb-3">
                Sintético?
            </b-form-checkbox>
          </b-form>
          <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Natureza Conta Contábil:" label-for="planoconta-naturezacontaContabil">
                        <b-form-input id="planoconta-naturezacontaContabil" type="text"
                            v-model="planoconta.naturezacontaContabil" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe a Natureza (D) ou (C) ..." />
                    </b-form-group>
                </b-col>
         </b-row>
         <b-row>
            <b-col xs="12">
                <b-button variant="primary" v-if="mode === 'save'"
                    @click="save">Salvar</b-button>
                <b-button variant="danger" v-if="mode === 'remove'"
                    @click="remove">Excluir</b-button>
                <b-button class="ml-2" @click="reset">Cancelar</b-button>
            </b-col>
        </b-row>
        <hr>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="control-label"> <i class="fa fa-search"></i>  Pesquisar o Plano de Contas</label>
                    <input type="text" icon="search" v-model="search" placeholder="Informe a descrição da conta" class="form-control">
                </div>
            </div>
        <hr>
        <b-table class="table-responsive" hover striped :items="filteredList" :fields="fields">
        <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadPlanoConta(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
                <b-button variant="danger" @click="loadPlanoConta(data.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>
         </template>   
        </b-table>    
      </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
     name: 'PlanoContaAdmin',
      data: function() {
        return {
            mode: 'save',
            search: '',
            planoconta: {},
            planocontas: [],
            fields: [
                { key: 'contaContabil', label: 'Código', sortable: true },
                { key: 'descricaoContabil', label: 'Descrição', sortable: true },
                { key: 'naturezacontaContabil', label: 'Natureza', sortable: true },
                { key: 'sintetico', label: 'Sintético', sortable: true,
                  formatter: value => value ? 'Sim' : 'Não' },
                { key: 'ativo', label: 'Ativo', sortable: true,
                  formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    computed: {
        filteredList() {
        return this.planocontas.filter(planoconta => {
        return planoconta.descricaoContabil.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {

        loadPlanoContas() {
            const url = `${baseApiUrl}/planocontas`
            axios.get(url).then(res => {
                this.planocontas = res.data
        })
        },
        reset() {
            this.mode = 'save'
            this.planoconta = {}
            this.loadPlanoContas()
        },
        save() {
            const method = this.planoconta.id ? 'put' : 'post'
            const id = this.planoconta.id ? `/${this.planoconta.id}` : ''
            axios[method](`${baseApiUrl}/planocontas${id}`, this.planoconta)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.planoconta.id
            axios.delete(`${baseApiUrl}/planocontas/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadPlanoConta(planoconta, mode = 'save') {
            this.mode = mode
            this.planoconta = { ...planoconta }
        }
    },
    mounted() {
        this.loadPlanoContas()
    }
}
</script>

<style>

</style>
