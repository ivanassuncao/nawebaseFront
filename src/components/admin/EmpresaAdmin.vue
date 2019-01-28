<template>
      <div class="empresa-admin">
            <b-form>
                  <input id="empresa-id" type="hidden" v-model="empresa.id" />
                  <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Razão Social:" label-for="empresa-razaosocial">
                            <b-form-input id="empresa-razaosocial" type="text"
                                v-model="empresa.razaosocial" required
                                :readonly="mode === 'remove'"
                                placeholder="Informe a Razão Social..." />
                        </b-form-group>
                    </b-col>
                     <b-col md="3" sm="12">
                        <b-form-group label="CNPJ:" label-for="empresa-cnpj">

                            <b-form-input v-mask="['##.###.###/####-##']" id="empresa-cnpj" type="text"
                                v-model="empresa.cnpj" required
                                :readonly="mode === 'remove'"
                                placeholder="Informe o CNPJ..." />
                        </b-form-group>
                    </b-col>
                     <b-col md="5" sm="12">
                        <b-form-group label="Endereço:" label-for="empresa-endereco">
                            <b-form-input id="empresa-endereco" type="text"
                                v-model="empresa.endereco" required
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Endereço" />
                        </b-form-group>
                     </b-col>
                  </b-row>
                  <b-row>
                        <b-col md="1" sm="12">
                            <b-form-group label="Número:" label-for="empresa-numero">
                                <b-form-input id="empresa-numero" type="text"
                                    v-model="empresa.numero" required
                                    :readonly="mode === 'remove'"
                                    placeholder="" />
                            </b-form-group>
                        </b-col>
                            <b-col md="3" sm="12">
                            <b-form-group label="Bairro:" label-for="empresa-bairro">
                                <b-form-input id="empresa-bairro" type="text"
                                    v-model="empresa.bairro" required
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe o Bairro" />
                            </b-form-group>
                        </b-col>
                        <b-col md="4" sm="12">
                            <b-form-group label="Cidade:" label-for="empresa-cidade">
                                <b-form-input id="empresa-cidade" type="text"
                                    v-model="empresa.cidade" required
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe a Cidade" />
                            </b-form-group>
                        </b-col>
                         <b-col md="2" sm="12">
                            <b-form-group label="Estado:" label-for="empresa-estado">
                                <b-form-input id="empresa-estado" type="text"
                                    v-model="empresa.estado" required
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe a Estado" />
                            </b-form-group>
                        </b-col>
                          <b-col md="2" sm="12">
                            <b-form-group label="CEP:" label-for="empresa-cep">
                                <b-form-input v-mask="['#####-###']" id="empresa-cep" type="text"
                                    v-model="empresa.cep" 
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe o CEP" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>

                    <b-col md="2" sm="12">
                    <b-form-group label="Caminho Imagem:" label-for="empresa-caminhoImagem">
                        <b-form-input id="empresa-caminhoImagem" type="text"
                            v-model="empresa.caminhoImagem" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Caminho da Imagem" />
                    </b-form-group>
                    </b-col>
                    <b-form-checkbox id="empresa-ativo" v-show="mode === 'save'"
                        v-model="empresa.ativo" class="mt-3 mb-3">
                        Empresa está Ativa?
                    </b-form-checkbox>
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
            </b-form>
            <hr>
              <b-table class="table-responsive" hover striped :items="empresas" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadEmpresa(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadEmpresa(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
      </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import {mask} from 'vue-the-mask'

export default {
       name: 'EmpresaAdmin',
       directives: {mask},
        data: function() {
        return {
            mode: 'save',
            empresa: {},
            empresas: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'razaosocial', label: 'Razão Social', sortable: true },
                { key: 'endereco', label: 'Endereço', sortable: true },
                { key: 'numero', label: 'Nº', sortable: true },
                { key: 'bairro', label: 'Bairro', sortable: true },
                { key: 'cidade', label: 'Cidade', sortable: true },
                { key: 'estado', label: 'Estado', sortable: false},
                { key: 'ativo', label: 'Ativo', sortable: true,
                  formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
     methods: {
            loadEmpresas() {
                const url = `${baseApiUrl}/empresas`
                axios.get(url).then(res => {
                    this.empresas = res.data
                })
        },
            reset() {
                this.mode = 'save'
                this.empresa = {}
                this.loadEmpresas()
        },
           save() {
            const method = this.empresa.id ? 'put' : 'post'
            const id = this.empresa.id ? `/${this.empresa.id}` : ''
            axios[method](`${baseApiUrl}/empresas${id}`, this.empresa)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
         remove() {
            const id = this.empresa.id
            axios.delete(`${baseApiUrl}/empresas/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
         loadEmpresa(empresa, mode = 'save') {
            this.mode = mode
            this.empresa = { ...empresa }
        }
     },
    mounted() {
        this.loadEmpresas()
    }
}
</script>

<style>

</style>
