<template>
     <div class="company-admin">
            <b-form  v-show="mode === 'save' || mode === 'remove' || mode === 'read'">
                  <input id="company-id" type="hidden" v-model="company.id" />
                  <b-row>
                        <b-col md="5" sm="12">
                            <b-form-group label="Razão Social:" label-for="company-name_company">
                                <b-form-input id="company-name_company" type="text" ref="searchFocus"
                                    v-model="company.name_company" required
                                      size="sm"
                                    :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    placeholder="Razão Social..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="3" sm="12">
                            <b-form-group label="CNPJ:" label-for="company-cnpj">

                                <b-form-input v-mask="['##.###.###/####-##']" id="company-cnpj" type="text"
                                    v-model="company.cnpj" required
                                      size="sm"
                                    :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    placeholder="CNPJ..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="3" sm="12">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" v-model="company.blocked" true-value="1" false-value="0" type="checkbox" id="company-blocked"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    >
                                    <label class="form-check-label" for="company-blocked">
                                        Bloqueada?
                                    </label>
                                </div>
                            </div>
                       </b-col>  
                    </b-row>
                    
                <b-card no-body>
                    <b-tabs pills card vertical small >
                        <b-tab title="Registro" active>
                        <b-form>
                             <b-row>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Inscrição Estadual:" label-for="company-insc_state">
                                        <b-form-input id="company-insc_state" type="text"
                                            v-model="company.insc_state" 
                                              size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="Incrição Estadual" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Inscrição Municipal:" label-for="company-insc_municipal">
                                        <b-form-input id="company-insc_municipal" type="text"
                                            v-model="company.insc_municipal" 
                                              size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="Incrição Municipal" />
                                    </b-form-group>
                                </b-col>
                                 <b-col md="3" sm="12">
                                    <b-form-group label="Junta Comercial:" label-for="company-insc_joint">
                                        <b-form-input id="company-insc_joint" type="text"
                                            v-model="company.insc_joint" 
                                              size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="Incrição na Junta Comercial" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="4" sm="12">
                                <b-form-group label="Nome Fantasia:" label-for="company-fantasy_name">
                                    <b-form-input id="company-fantasy_name" type="text"
                                        v-model="company.fantasy_name" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Nome Fantasia" />
                                </b-form-group>
                                </b-col>
                            </b-row>
                        </b-form>

                    </b-tab >
                    <b-tab title="Endereço" >
                        <b-form>
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Endereço:" label-for="company-adress">
                                        <b-form-input id="company-adress" type="text"
                                        v-model="company.adress" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Endereço..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Complemento:" label-for="company-complement">
                                        <b-form-input id="company-complement" type="text"
                                        v-model="company.complement" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Complemento..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group label="Número:" label-for="company-number">
                                        <b-form-input id="company-number" type="text"
                                         v-model="company.number" 
                                           size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder=" Número..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>   
                            <b-row>
                                
                                <b-col md="4" sm="12">
                                    <b-form-group label="Bairro:" label-for="company-neighborhood">
                                        <b-form-input id="company-neighborhood" type="text"
                                        v-model="company.neighborhood" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Bairro" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group 
                                        label="Estado:" label-for="company-state_id">
                                        <b-form-select id="company-state_id"
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="states" v-model="company.state_id" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group 
                                        label="Cidade:" label-for="company-city_id">
                                        <b-form-select id="company-city_id"
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="citys" v-model="company.city_id" />
                                    </b-form-group>
                                    
                                </b-col>
                                <b-col md="1" sm="1">
                                    <b-button size="sm" variant="warning" @click="loadCitys" class="mr-2 mt-2">
                                        <i class="fa fa-search"></i>
                                    </b-button>
                                    <b-button size="sm" variant="success" @click="loadCitys" class="mr-2 mt-2">
                                        <i class="fa fa-plus"></i>
                                    </b-button>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group label="CEP:" label-for="company-zip_code">
                                    <b-form-input v-mask="['#####-###']" id="company-zip_code" type="text"
                                    v-model="company.zip_code" 
                                      size="sm"
                                    :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    placeholder="CEP" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-form>    
                    </b-tab>
                    <b-tab title="Contato">
                        <b-form>
                            <b-row>
                                 <b-col md="5" sm="12">
                                    <b-form-group label="E-mail:" label-for="company-email">
                                        <b-form-input id="company-email" type="text"
                                        v-model="company.email" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="E-mail" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" sm="12">
                                    <b-form-group label="Telefone:" label-for="company-telephone">
                                        <b-form-input id="company-telephone" type="text"
                                        v-model="company.telephone" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Telefone" />
                                    </b-form-group>
                                </b-col>
                                   
                            </b-row>
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Imagem da Empresa:" label-for="company-photo">
                                        <b-form-file v-model="company.photo" id="company-photo" class="mt-3" accept=".jpg, .png, .gif" ></b-form-file>
                                    </b-form-group>
                                </b-col> 
                            </b-row>     
                        </b-form>
                        </b-tab>
                    </b-tabs>
                </b-card>
                
            </b-form>
            <hr>
                <b-row>                   
                <b-col xs="12">
                    <b-button   size="sm" variant="outline-success" class="mr-2" v-show="mode !== 'save' && mode !== 'remove'"
                        @click="alterModo">Adicionar</b-button>
                    <b-button   size="sm" variant="outline-primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button   size="sm" variant="outline-danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button   size="sm" variant="outline-secondary" class="ml-2"  v-if="mode === 'remove' || mode === 'save' || mode === 'read' "
                    @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
            <hr>
            <div class="col-sm-4">
                    <b-form-group> 
                    <label class="control-label">   Pesquisar as Empresas  </label> <b-button size="sm" class=" ml-2 mb-2 fa" :class="icon" @click="[loadCompanys(),showTable = !showTable]" variant="outline-secondary" ></b-button>
                    <input size="sm" type="text" icon="search" v-model="search" placeholder="Informe o nome da Empresa" class="form-control">                  
                    </b-form-group>
            </div>
            <transition  name="slide" type="animation" appear>       
                <b-table class="table-responsive" v-show="showTable" hover key="slide"  striped :items="companys" :fields="fields">
                    <template slot="actions" slot-scope="data">
                        <b-button  size="sm" variant="outline-secondary" @click="loadCompany(data.item, 'read')" class="mr-2 mt-2">
                            <i class="fa fa-drivers-license-o"></i>
                        </b-button>
                        <b-button  size="sm" variant="outline-warning" @click="loadCompany(data.item)" class="mr-2 mt-2">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button   size="sm" variant="outline-danger" @click="loadCompany(data.item, 'remove')" class="mr-2 mt-2">
                            <i class="fa fa-trash"></i>
                        </b-button>
                    </template>
                </b-table>
            </transition>
      </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import {mask} from 'vue-the-mask'

export default {
         name: 'CompanyAdmin',
            directives: {mask},
                data: function() {
                return {
                    mode: 'insert',
                    company: {},
                    companys: [],
                    states: [],
                    citys: [],
                    search: '',
                    showTable: false,
                    fields: [
                        { key: 'id', label: 'Código', sortable: true },
                        { key: 'name_company', label: 'Razão Social', sortable: true },
                        { key: 'cnpj', label: 'CNPJ', sortable: false },
                        { key: 'fantasy_name', label: 'Nome Fantasia', sortable: false },
                        { key: 'adress', label: 'Endereço', sortable: false },
                        { key: 'blocked', label: 'Bloqueada', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },
                        { key: 'actions', label: 'Ações' }
                    ]
                }
            },
            computed: {
                filteredList() {
                return this.companys.filter(company => {
                return company.name_company.toLowerCase().includes(this.search.toLowerCase())
                    })
                },
                icon() {
                    return this.showTable ? "fa-retweet" : "fa-search"
                }
            },
            methods: {
                 loadCompanys() {
    
                        const url = `${baseApiUrl}/companys`
                        axios.get(url).then(res => {
                            this.companys = res.data
                        })
                },
                loadStates() {
                    const url = `${baseApiUrl}/states`
                    axios.get(url).then(res => {
                        this.states = res.data.map(state => {
                            return { value: state.id, text: state.initials }
                        })
                    })
                },
                loadCitys() {
                    const id = this.company.state_id
                    if(id){
                        const url = `${baseApiUrl}/citys/${id}`
                        axios.get(url).then(res => {
                            this.citys = res.data.map(city => {
                                return { value: city.id, text: city.name }
                            })
                        })
                    }
                  
                },
                reset() {
                        this.mode = 'insert'
                        this.loadCompanys()
                },
                alterModo() {
                        this.mode = 'save'
                        this.company = {}
                        this.$refs.searchFocus.focus();
                },
                remove() {
                    const id = this.company.id
                    axios.delete(`${baseApiUrl}/companys/${id}`)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
                },
                save() {
                    const method = this.company.id ? 'put' : 'post'
                    const id = this.company.id ? `/${this.company.id}` : ''
                    axios[method](`${baseApiUrl}/companys${id}`, this.company)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
                },
                loadCompany(company, mode = 'save') {
                    this.mode = mode
                    this.company = { ...company }
                    this.loadCitys()
                    this.$refs.searchFocus.focus();
                }

             },
            mounted() {
                this.loadStates()
            }
    }       
</script>

<style>

    .company-admin select{
        font-size: 0.8rem;
    }
    .company-admin input{
        font-size: 0.8rem;
    }
    .company-admin button{
        font-size: 0.8rem;
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
    animation: slide-in 1s ease;
        transition: opacity 1s;
    }

    .slide-leave-active {
        animation: slide-out 1s ease;
        transition: opacity 1s;
    }

    .slide-enter, .slide-leave-to{
        opacity: 0;
    }

    .fade-enter, .fade-leave-to{
    opacity: 0;
    }

    .fade-enter-active, .fade-leave-active{
    transition: opacity 1s;
    }

</style>
