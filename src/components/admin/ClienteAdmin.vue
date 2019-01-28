<template>
      <div class="cliente-admin">
          <b-form>
              <input id="cliente-id" type="hidden" v-model="cliente.id" />
              <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Nome:" label-for="cliente-nome">
                            <b-form-input id="cliente-nome" type="text" ref="campoBase"
                                v-model="cliente.nome" required
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Nome..." />
                        </b-form-group>
                    </b-col>
                     <b-col md="4" sm="12">
                        <b-form-group label="CPF:" label-for="cliente-cpf">

                            <b-form-input v-mask="['###.###.###-##']" id="cliente-cpf" type="text"
                                v-model="cliente.cpf" required
                                :readonly="mode === 'remove'"
                                placeholder="Informe o CPF..." />
                        </b-form-group>
                    </b-col>
                     <b-col md="4" sm="12">
                        <b-form-group label="Endereço:" label-for="cliente-endereco">
                            <b-form-input id="cliente-endereco" type="text"
                                v-model="cliente.endereco" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Endereço" />
                        </b-form-group>
                     </b-col>
                  </b-row>
                  <b-row>
                        <b-col md="1" sm="12">
                            <b-form-group label="Número:" label-for="cliente-numero">
                                <b-form-input id="cliente-numero" type="text"
                                    v-model="cliente.numero" 
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe o número ..." />
                            </b-form-group>
                        </b-col>
                            <b-col md="3" sm="12">
                                <b-form-group label="Bairro:" label-for="cliente-bairro">
                                    <b-form-input id="cliente-bairro" type="text"
                                        v-model="cliente.bairro" 
                                        :readonly="mode === 'remove'"
                                        placeholder="Informe o Bairro" />
                                </b-form-group>
                            </b-col>
                        <b-col md="4" sm="12">
                            <b-form-group label="Cidade:" label-for="cliente-cidade">
                                <b-form-input id="cliente-cidade" type="text"
                                    v-model="cliente.cidade" 
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe a Cidade" />
                            </b-form-group>
                        </b-col>
                         <b-col md="2" sm="12">
                            <b-form-group label="Estado:" label-for="cliente-estado">
                                <b-form-input id="cliente-estado" type="text"
                                    v-model="cliente.estado" 
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe a Estado" />
                            </b-form-group>
                        </b-col>
                          <b-col md="2" sm="12">
                            <b-form-group label="CEP:" label-for="cliente-cep">
                                <b-form-input v-mask="['#####-###']" id="cliente-cep" type="text"
                                    v-model="cliente.cep" 
                                    :readonly="mode === 'remove'"
                                    placeholder="Informe o CEP" />
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-form-checkbox id="cliente-ativo" v-show="mode === 'save'"
                                    v-model="cliente.ativo" class="mt-3 mb-3">
                                    Ativo?
                    </b-form-checkbox>
                    <b-form-checkbox id="cliente-permitCrediario" v-show="mode === 'save'"
                                    v-model="cliente.permitCrediario" class="mt-3 mb-3">
                                    Permitir Crediário?
                    </b-form-checkbox>
                    <b-form-checkbox id="cliente-temWatsApp" v-show="mode === 'save'"
                            v-model="cliente.temWatsApp" class="mt-3 mb-3">
                            Celular tem Whatsapp?
                    </b-form-checkbox>
                    <b-row>
                        <b-col md="4" sm="12">
                            <b-form-group label="E-mail:" label-for="cliente-email">
                            <b-form-input id="cliente-email" type="text"
                                v-model="cliente.email" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o E-mail" />
                            </b-form-group>
                        </b-col>
                        <b-col md="3" sm="12">
                            <b-form-group label="Data de Nascimento:" label-for="cliente-dataNascimento">
                            <b-form-input id="cliente-dataNascimento" type="date"
                                v-model="cliente.dataNascimento" 
                                :readonly="mode === 'remove'" />
                            </b-form-group>
                        </b-col>
                         <b-col md="3" sm="12">
                            <b-form-group label="Celular:" label-for="cliente-celular">
                            <b-form-input id="cliente-celular" type="text"
                                v-mask="['(##) ####-####', '(##) #####-####']"
                                v-model="cliente.celular" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Celular" />
                            </b-form-group>
                        </b-col>
                  
                    </b-row>
                    <b-row>
                        <b-col xs="12">
                            <b-button variant="primary" v-if="mode === 'save'"
                                @click="save" >Salvar</b-button>

                            <b-button variant="danger" v-if="mode === 'remove'"
                                @click="remove">Excluir</b-button>
                            <b-button class="ml-2" @click="reset">Cancelar</b-button>
                        </b-col>
                    </b-row>
          </b-form>
          <br>
          <div class="admin-cliente-tabs">
              <b-card no-body >
                <b-tabs card>
                     <b-tab title="Pesquisa" active>
                <hr>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label"> <i class="fa fa-search"></i>  Pesquisar o nome do cliente...</label>
                        <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Cliente" class="form-control">
                    </div>
                </div>
                <hr>
                    <b-table class="table-responsive" hover striped :items="filteredList" :fields="fields">
                        <template slot="actions" slot-scope="data">
                            <b-button variant="warning" @click="loadCliente(data.item)" class="mr-2">
                                <i class="fa fa-pencil"></i>
                            </b-button>
                            <b-button variant="danger" @click="loadCliente(data.item, 'remove')">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </template>   
                    </b-table> 
                </b-tab>  
                <b-tab title="Dependentes" >
                    <b-row>
                        <b-col xs="12">
                            <b-button variant="success" v-show="cliente.id" v-b-modal.modalDependentes >Adicionar</b-button>
                        </b-col>
                    </b-row>
                    <br>   
                    <b-table class="table-responsive" hover striped :items="clientesdependentes" :fields="fieldsDependente">
                        <template slot="actions" slot-scope="data">
                            <b-button variant="danger" @click="removeDependente(data.item)">
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </template>   
                    </b-table> 
                </b-tab>  
                <b-tab title="Crediário" >
            
                </b-tab>  

               </b-tabs>  
            </b-card>         
           
          </div>

        <b-modal id="modalDependentes"
            ref = "myModalRef"
            size="lg"
            title="Informe o Dependente"
            @ok="loadClienteDependentes"
            >
             <hr>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="control-label"> <i class="fa fa-search"></i>  Pesquisar o nome do cliente...</label>
                    <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Cliente" class="form-control">
                </div>
            </div>
            <hr>
            <b-table class="table-responsive" hover striped :items="filteredList" :fields="fieldsSmall">
                <template slot="actions" slot-scope="data">
                    <b-button variant="success" @click="saveDependente(data.item)" class="mr-2">
                        <i class="fa fa-plus"></i>
                    </b-button>
                </template>   
            </b-table> 
        </b-modal>

      </div>
</template>

<script>

import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import {mask} from 'vue-the-mask'

export default {
            name: 'ClienteAdmin',
            directives: {mask},
             data: function() {
            return {
                mode: 'save',
                search: '',
                cliente: {},
                clientes: [],
                clientesdependente: {},
                clientesdependentes: [],
                fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'cpf', label: 'CPF', sortable: true },
                    { key: 'email', label: 'E-mail', sortable: true },
                    { key: 'celular', label: 'Celular', sortable: true },
                    { key: 'bairro', label: 'Bairro', sortable: true },
                    { key: 'ativo', label: 'Ativo', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                    { key: 'actions', label: 'Ações' }
                ],
                 fieldsSmall: [
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'cpf', label: 'CPF', sortable: true },
                    { key: 'ativo', label: 'Ativo', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                    { key: 'actions', label: 'Ações' }
                ],
                fieldsDependente: [
                    { key: 'cpf', label: 'CPF', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'actions', label: 'Ações' }
                ] 
            }
             },
             computed: {
                    filteredList() {
                    return this.clientes.filter(cliente => {
                    return cliente.nome.toLowerCase().includes(this.search.toLowerCase())
                        })
                    }
                },
            methods: { 
                loadClientes() {
                    const url = `${baseApiUrl}/clientes`
                    axios.get(url).then(res => {
                        this.clientes = res.data
                    })
                },
                loadClienteDependentes() {
                if(this.cliente)
                {
                    const id = this.cliente.id
                    const url = `${baseApiUrl}/clientes/${id}/clientesdependentes`
                    axios.get(url).then(res => {
                        this.clientesdependentes = res.data
                    })
                }

                },
                reset() {
                    this.mode = 'save'
                    this.cliente = {}
                    this.loadClientes()
                },
                save() {
                    const method = this.cliente.id ? 'put' : 'post'
                    const id = this.cliente.id ? `/${this.cliente.id}` : ''
                    axios[method](`${baseApiUrl}/clientes${id}`, this.cliente)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
                },
                saveDependente(clientesdependente){

                    this.clientesdependente = clientesdependente

                    if(clientesdependente)
                    {
                        const id = this.cliente.id
                        axios.post(`${baseApiUrl}/clientes/${id}/clientesdependentes`, this.clientesdependente)
                         .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.loadClienteDependentes();   
                        })
                        .catch(showError)
                    }
  
                },
                remove() {
                    const id = this.cliente.id
                    axios.delete(`${baseApiUrl}/clientes/${id}`)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
                },
                removeDependente(clientesdependente) {

                    this.clientesdependente = clientesdependente

                    const id = this.cliente.id
                    axios.delete(`${baseApiUrl}/clientes/${id}/clientesdependentes`, this.clientesdependente)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.loadClienteDependentes()
                        })
                        .catch(showError)
                },
                 loadCliente(cliente, mode = 'save') {
                    this.mode = mode
                    this.cliente = { ...cliente }
                    this.loadClienteDependentes();
                    this.$refs.campoBase.focus();
                }
            },
            mounted() {
                this.loadClientes()
            }
}
</script>

<style>

</style>
