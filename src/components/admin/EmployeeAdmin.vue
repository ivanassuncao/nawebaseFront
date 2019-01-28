<template>
     <div class="employee-admin">
            <b-form  v-show="mode === 'save' || mode === 'remove' || mode === 'read'">
                  <input id="employee-id" type="hidden" v-model="employee.id" />
                  <b-row>
                        <b-col md="5" sm="12">
                            <b-form-group label="Nome:" label-for="employee-name">
                                <b-form-input id="employee-name" type="text" ref="searchFocus"
                                    v-model="employee.name" required
                                    size="sm"
                                    :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    placeholder="Nome..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="3" sm="12">
                            <b-form-group label="CPF:" label-for="employee-cpf">

                                <b-form-input v-mask="['###.###.###-##']" id="employee-cnpj" type="text"
                                    v-model="employee.cpf" required
                                    size="sm"
                                    :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    placeholder="CPF..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="3" sm="12">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" v-model="employee.blocked" true-value="1" false-value="0" type="checkbox" id="employee-blocked"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    >
                                    <label class="form-check-label" for="employee-blocked">
                                        Bloqueado?
                                    </label>
                                </div>
                            </div>
                       </b-col>  
                    </b-row>
                    
                <b-card no-body>
                    <b-tabs pills card vertical small>
                        <b-tab title="Registro" active>
                        <b-form>
                             <b-row>
                                <b-col md="3" sm="12">
                                    <b-form-group label="CTPS:" label-for="employee-ctps">
                                        <b-form-input id="employee-ctps" type="text"
                                            v-model="employee.ctps" 
                                            size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="CTPS" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Data da CTPS:" label-for="employee-ctps_date">
                                    <b-form-input id="employee-ctps_date" type="date"
                                        v-model="employee.ctps_date" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    />
                                    
                                    </b-form-group>
                                </b-col>
                                 <b-col md="3" sm="12">
                                    <b-form-group label="RG:" label-for="employee-rg">
                                        <b-form-input id="employee-rg" type="text"
                                            v-model="employee.rg" 
                                            size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="RG" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Data do RG:" label-for="employee-rg_date">
                                    <b-form-input id="employee-rg_date" type="date"
                                        v-model="employee.rg_date" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                    />
                                    </b-form-group>
                                </b-col>
                                </b-row>
                                 <b-row>
                                    <b-col md="3" sm="12">
                                        <b-form-group label="Matrícula:" label-for="employee-registration">
                                            <b-form-input id="employee-registration" type="text"
                                                v-model="employee.registration" 
                                                size="sm"
                                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                                placeholder="Matrícula" />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="3" sm="12">
                                        <b-form-group label="Data de Admissão:" label-for="employee-admission_date">
                                        <b-form-input id="employee-admission_date" type="date"
                                            v-model="employee.admission_date" 
                                            size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        />
                                        </b-form-group>
                                    </b-col>
                                    <b-col md="3" sm="12">
                                        <b-form-group label="Data de Demissão:" label-for="employee-date_of_resignation">
                                        <b-form-input id="employee-date_of_resignation" type="date"
                                            v-model="employee.date_of_resignation" 
                                            size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        />
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            <b-row>
                                <b-col md="4" sm="12">
                                    <b-form-group 
                                        label="Cargo/Função:" label-for="employee-office_id">
                                        <b-form-select id="employee-office_id"
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="offices" v-model="employee.office_id" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" sm="12">
                                    <b-form-group 
                                        label="Empresa:" label-for="employee-company_id">
                                        <b-form-select id="employee-company_id"
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="companys" v-model="employee.company_id" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" sm="12">
                                    <b-form-group 
                                        label="Usuário:" label-for="employee-user_id">
                                        <b-form-select id="employee-user_id"
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="users" v-model="employee.user_id" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-form>

                    </b-tab>
                    <b-tab title="Endereço">
                        <b-form>
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Endereço:" label-for="employee-adress">
                                        <b-form-input id="employee-adress" type="text"
                                        v-model="employee.adress" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Endereço..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Complemento:" label-for="employee-complement">
                                        <b-form-input id="employee-complement" type="text"
                                        v-model="employee.complement" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Complemento..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group label="Número:" label-for="employee-number">
                                        <b-form-input id="employee-number" type="text"
                                         v-model="employee.number" 
                                         size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder=" Número..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>   
                            <b-row>
                                
                                <b-col md="4" sm="12">
                                    <b-form-group label="Bairro:" label-for="employee-neighborhood">
                                        <b-form-input id="employee-neighborhood" type="text"
                                        v-model="employee.neighborhood" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Bairro" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group 
                                        label="Estado:" label-for="employee-state_id">
                                        <b-form-select id="employee-state_id"
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="states" v-model="employee.state_id" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group 
                                        label="Cidade:" label-for="employee-city_id">
                                        <b-form-select id="employee-city_id"
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="citys" v-model="employee.city_id" />
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
                                    <b-form-group label="CEP:" label-for="employee-zip_code">
                                    <b-form-input v-mask="['#####-###']" id="employee-zip_code" type="text"
                                    v-model="employee.zip_code" 
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
                                    <b-form-group label="E-mail:" label-for="employee-email">
                                        <b-form-input id="employee-email" type="text"
                                        v-model="employee.email" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="E-mail" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="4" sm="12">
                                    <b-form-group label="Telefone:" label-for="employee-telephone">
                                        <b-form-input id="employee-telephone" type="text"
                                        v-model="employee.telephone" 
                                        size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Telefone" />
                                    </b-form-group>
                                </b-col>
                                 <b-col md="3" sm="12">
                                        <b-form-group label="Data de Nascimento:" label-for="employee-birth_date">
                                        <b-form-input id="employee-birth_date" type="date"
                                            v-model="employee.birth_date" 
                                            size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        />
                                        </b-form-group>
                                </b-col>   
                            </b-row>
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Imagem do Funcionário:" label-for="employee-photo">
                                        <b-form-file size="sm" v-model="employee.photo" id="employee-photo" class="mt-3" accept=".jpg, .png, .gif" ></b-form-file>
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
                    <b-button size="sm" variant="outline-success" class="mr-2" v-show="mode !== 'save' && mode !== 'remove'"
                        @click="alterModo">Adicionar</b-button>
                    <b-button size="sm" variant="outline-primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button size="sm" variant="outline-danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button size="sm" btn-sm variant="outline-secondary" class="ml-2"  v-if="mode === 'remove' || mode === 'save' || mode === 'read' "
                    @click="reset">Cancelar</b-button>
                </b-col>
                </b-row>
            <hr>
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label">  Pesquisar os Funcionários</label> <b-button size="sm" class=" ml-2 mb-2 fa" :class="icon" @click="[loadEmployees(),showTable = !showTable]" variant="outline-secondary" ></b-button>
                        <input size="sm" type="text" icon="search" v-model="search" placeholder="Informe o nome do Funcionário" 
                        class="form-control">
                    </div>
                </div>
            <transition  name="slide" type="animation" appear> 
              <b-table class="table-responsive" v-show="showTable" hover key="slide" striped :items="filteredList" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button title = "Detalhe do registro" size="sm" variant="outline-secondary" @click="loadEmployee(data.item, 'read')" class="mr-2 mt-2">
                        <i class="fa fa-drivers-license-o"></i>
                    </b-button>
                    <b-button title = "Editar registro" size="sm" variant="outline-warning" @click="loadEmployee(data.item, 'save')" class="mr-2 mt-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button title = "Excluir registro" size="sm" variant="outline-danger" @click="loadEmployee(data.item, 'remove')" class="mr-2 mt-2">
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
var moment = require('moment')
export default {
         name: 'EmployeeAdmin',
            directives: {mask,moment},
                data: function() {
                return {
                    mode: 'insert',
                    employee: {},
                    employees: [],
                    states: [],
                    citys: [],
                    offices:[],
                    companys:[],
                    users:[],
                    search: '',
                    showTable: false,
                    fields: [
                        { key: 'id', label: 'Código', sortable: true },
                        { key: 'name', label: 'Nome', sortable: true },
                        { key: 'cpf', label: 'CPF', sortable: false },
                        { key: 'telephone', label: 'Telefone', sortable: false },
                        { key: 'adress', label: 'Endereço', sortable: false },
                        { key: 'blocked', label: 'Bloqueado', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },
                        { key: 'actions', label: 'Ações' }
                    ]
                }
            },
            computed: {
                filteredList() {
                    return this.employees.filter(employee => {
                    return employee.name.toLowerCase().includes(this.search.toLowerCase())
                    })
                },
                icon() {
                    return this.showTable ? "fa-retweet" : "fa-search"
                }
            },
            methods: {
                 loadEmployees() {
                    const url = `${baseApiUrl}/employees`
                    axios.get(url).then(res => {
                        this.employees = res.data
                        
                    })
                },
                formatDate (date) {
                return moment(date).format('YYYY-MM-DD')
                },
                loadStates() {
                    const url = `${baseApiUrl}/states`
                    axios.get(url).then(res => {
                        this.states = res.data.map(state => {
                            return { value: state.id, text: state.initials }
                        })
                    })
                },
                loadOffices() {
                    const url = `${baseApiUrl}/offices`
                    axios.get(url).then(res => {
                        this.offices = res.data.map(office => {
                            return { value: office.id, text: office.name }
                        })
                    })
                },
                loadCompanys() {
                    const url = `${baseApiUrl}/companys`
                    axios.get(url).then(res => {
                        this.companys = res.data.map(company => {
                            return { value: company.id, text: company.name_company }
                        })
                    })
                },
                loadUsers() {
                    const url = `${baseApiUrl}/users`
                    axios.get(url).then(res => {
                        this.users = res.data.map(user => {
                            return { value: user.id, text: user.name }
                        })
                    })
                },
                loadCitys() {
                    const id = this.employee.state_id
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
                        //this.employee = {}
                        this.mode = 'insert'
                        this.loadEmployees()
                },
                alterModo() {
                        this.mode = 'save'
                        this.employee = {}
                        this.$refs.searchFocus.focus();
                },
                remove() {
                    const id = this.employee.id
                    axios.delete(`${baseApiUrl}/employees/${id}`)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
                },
                save() {
                    const method = this.employee.id ? 'put' : 'post'
                    const id = this.employee.id ? `/${this.employee.id}` : ''
                    axios[method](`${baseApiUrl}/employees${id}`, this.employee)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
                },
                loadEmployee(employee, mode = 'save') {
                    this.mode = mode
                    if(employee.ctps_date) employee.ctps_date = this.formatDate(employee.ctps_date)
                    if(employee.rg_date) employee.rg_date = this.formatDate(employee.rg_date)
                    if(employee.birth_date) employee.birth_date = this.formatDate(employee.birth_date)
                    if(employee.admission_date) employee.admission_date = this.formatDate(employee.admission_date)
                    if(employee.date_of_resignation) employee.date_of_resignation = this.formatDate(employee.date_of_resignation)
                    
                    this.employee = {...employee }
                    this.loadCitys()
                    this.$refs.searchFocus.focus();
                }

             },
            mounted() {
                this.loadStates(),
                this.loadOffices(),
                this.loadCompanys(),
                this.loadUsers()
            }
    }       
</script>

<style>

    .employee-admin select{
        font-size: 0.8rem;
    }
    .employee-admin input{
        font-size: 0.8rem;
    }
     .employee-admin button{
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
