<template>
     <div class="entity-search">
        <PageTitle icon="fa fa-folder-o" :main="groupentity.name" sub="Grupo de Cliente/Fornecedor" />
            <b-form v-show="mode === 'save' || mode === 'remove' || mode === 'read'" >
             <input id="entity-id" type="hidden" v-model="entity.id" />
             <b-row>
                <b-col md="5" sm="12">
                    <b-form-group label="Nome:" label-for="entity-name_entity">
                        <b-form-input id="entity-name_entity" type="text" ref="searchFocus"
                            v-model="entity.name_entity" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Nome do Cliente/Fornecedor..." />
                    </b-form-group>
                </b-col>   
                <b-col md="1" sm="12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" v-model="entity.physical_person" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="entity-physical_person"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="entity-physical_person">
                                Pessoa Física?
                            </label>
                        </div>
                    </div>
                </b-col>  
                <b-col md="3" sm="12">
                    <b-form-group label="CPF/CNPJ:" label-for="entity-cnpj_cpf">    
                        <b-form-input v-if="entity.physical_person" v-mask="['###.###.###-##']" id="entity-cnpj_cpf" type="text"
                            v-model="entity.cnpj_cpf" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="CPF..." />
                        <b-form-input v-else v-mask="['##.###.###/####-##']" id="entity-cnpj_cpf" type="text"
                            v-model="entity.cnpj_cpf" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="CNPJ..." />    
                    </b-form-group>
                </b-col>
                <b-col md="1" sm="12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" v-model="entity.blocked" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="entity-blocked"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="entity-blocked">
                                Bloqueado?
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
                                    <b-form-group label="Inscrição Estadual:" label-for="entity-insc_state">
                                        <b-form-input id="entity-insc_state" type="text"
                                            v-model="entity.insc_state" 
                                              size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="Incrição Estadual" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Inscrição Municipal:" label-for="entity-insc_municipal">
                                        <b-form-input id="entity-insc_municipal" type="text"
                                            v-model="entity.insc_municipal" 
                                              size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="Incrição Municipal" />
                                    </b-form-group>
                                </b-col>
                                 <b-col md="3" sm="12">
                                    <b-form-group label="Junta Comercial:" label-for="entity-insc_joint">
                                        <b-form-input id="entity-insc_joint" type="text"
                                            v-model="entity.insc_joint" 
                                              size="sm"
                                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                            placeholder="Incrição na Junta Comercial" />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="4" sm="12">
                                <b-form-group label="Nome Fantasia:" label-for="entity-fantasy_name">
                                    <b-form-input id="entity-fantasy_name" type="text"
                                        v-model="entity.fantasy_name" 
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
                                    <b-form-group label="Endereço:" label-for="entity-adress">
                                        <b-form-input id="entity-adress" type="text"
                                        v-model="entity.adress" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Endereço..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Complemento:" label-for="entity-complement">
                                        <b-form-input id="entity-complement" type="text"
                                        v-model="entity.complement" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Complemento..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group label="Número:" label-for="entity-number">
                                        <b-form-input id="entity-number" type="text"
                                         v-model="entity.number" 
                                           size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder=" Número..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>   
                            <b-row>
                                
                                <b-col md="4" sm="12">
                                    <b-form-group label="Bairro:" label-for="entity-neighborhood">
                                        <b-form-input id="entity-neighborhood" type="text"
                                        v-model="entity.neighborhood" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Bairro" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="2" sm="12">
                                    <b-form-group 
                                        label="Estado:" label-for="entity-state_id">
                                        <b-form-select id="entity-state_id"
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="states" v-model="entity.state_id" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group 
                                        label="Cidade:" label-for="entity-city_id">
                                        <b-form-select id="entity-city_id"
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        :options="citys" v-model="entity.city_id" />
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
                                    <b-form-group label="CEP:" label-for="entity-zip_code">
                                    <b-form-input v-mask="['#####-###']" id="entity-zip_code" type="text"
                                    v-model="entity.zip_code" 
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
                                    <b-form-group label="E-mail:" label-for="entity-email">
                                        <b-form-input id="entity-email" type="text"
                                        v-model="entity.email" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="E-mail" />
                                    </b-form-group>
                                </b-col>
                                <b-col md="3" sm="12">
                                    <b-form-group label="Telefone:" label-for="entity-telephone">
                                        <b-form-input id="entity-telephone" type="text"
                                        v-model="entity.telephone" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Telefone" />
                                    </b-form-group>
                                </b-col>
                                 <b-col md="3" sm="12">
                                    <b-form-group label="Celular:" label-for="entity-cellphone">
                                        <b-form-input id="entity-cellphone" type="text"
                                        v-model="entity.cellphone" 
                                          size="sm"
                                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                                        placeholder="Telefone" />
                                    </b-form-group>
                                </b-col>   
                            </b-row>
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Imagem da Cliente/Fornecedor:" label-for="entity-photo">
                                        <b-form-file v-model="entity.photo" id="entity-photo" class="mt-3" accept=".jpg, .png, .gif" ></b-form-file>
                                    </b-form-group>
                                </b-col> 
                            </b-row>     
                        </b-form>
                        </b-tab>
                    </b-tabs>
                </b-card>
        <br>
         </b-form>
            <b-row>
                <b-col xs="12">
                    <b-button size="sm" variant="outline-success" class="mr-2" v-show="mode !== 'save' && mode !== 'remove'"
                        @click="alterModo">Adicionar</b-button>
                    <b-button size="sm" variant="outline-primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button size="sm" variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button size="sm" variant="outline-secondary" class="ml-2"  v-if="mode === 'remove' || mode === 'save' || mode === 'read' "
                    @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
            <hr>
         <b-row>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="control-label"> <i class="fa fa-search"></i>  Pesquisar os Clientes/Fornecedores</label>
                    <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Cliente/Fornecedor" class="form-control">
                </div>
            </div>
            </b-row>
           
         <b-table class="table-responsive" hover striped :items="filteredList" :fields="fields">
               <template slot="actions" slot-scope="data">
                    <b-button title = "Detalhe do registro" size="sm" variant="outline-secondary" @click="loadentity(data.item, 'read')" class="mr-2 mt-2">
                        <i class="fa fa-drivers-license-o"></i>
                    </b-button>
                    <b-button title = "Editar registro" size="sm" variant="outline-warning" @click="loadentity(data.item)" class="mr-2 mt-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                     <b-button title = "Excluir registro" size="sm" variant="outline-danger" @click="loadentity(data.item, 'remove')" class="mr-2 mt-2">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>   
         </b-table> 
     </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import {mask} from 'vue-the-mask'

export default {
    name: 'EntitySearch',
    directives: {mask},
    components: {PageTitle },
    data: function() {
        return {
                mode: 'insert',
                search: '',
                groupentity: {},
                entity: {},
                entitys: [],
                states: [],
                citys: [],
                fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name_entity', label: 'Nome', sortable: true },
                { key: 'fantasy_name', label: 'Nome Fantasia', sortable: true },
                { key: 'cnpj_cpf', label: 'CPF/CNPJ', sortable: false },
                { key: 'email', label: 'E-mail', sortable: false },    
                { key: 'telephone', label: 'Tel.Comercial', sortable: false },   
                { key: 'cellphone', label: 'Tel.Celular', sortable: false },   
                { key: 'blocked', label: 'Bloqueado', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },               
                { key: 'actions', label: 'Ações' }
            ]
            }
        },
        computed: {
            filteredList() {
                return this.entitys.filter(entity => {
                    return entity.name_entity.toLowerCase().includes(this.search.toLowerCase())
                    })
            }
        },
        methods:{
             getgroupentity(){
                const url = `${baseApiUrl}/groupentitys/${this.groupentity.id}`
                axios(url).then(res=> this.groupentity = res.data)
            },
            getentitys(){
                const url = `${baseApiUrl}/groupentitys/${this.groupentity.id}/entitys`
                axios(url).then(res =>{
                     this.entitys = res.data
                })
            },
            alterModo() {
                    this.mode = 'save'
                    this.entity = {}
                    this.$refs.searchFocus.focus();
            },
             reset() {
                this.mode = 'insert'
                this.getentitys()
            },
            save() {
                if(this.groupentity.id){

                    this.entity.group_entity_id = this.groupentity.id
                }
                const method = this.entity.id ? 'put' : 'post'
                const id = this.entity.id ? `/${this.entity.id}` : ''
                axios[method](`${baseApiUrl}/entitys${id}`, this.entity)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            remove() {
                    const id = this.entity.id
                    axios.delete(`${baseApiUrl}/entitys/${id}`)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
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
                    const id = this.entity.state_id
                    if(id){
                        const url = `${baseApiUrl}/citys/${id}`
                        axios.get(url).then(res => {
                            this.citys = res.data.map(city => {
                                return { value: city.id, text: city.name }
                            })
                        })
                    }
                  
            },
            loadentity(entity, mode = 'save') {
                this.mode = mode
                this.entity = { ...entity }
                this.$refs.searchFocus.focus();
            }
        },
        watch:{
            $route(to){
                this.groupentity.id = to.params.id
                this.entitys = []
                this.getgroupentity()
                this.getentitys()
            }
        },
        mounted(){
            this.groupentity.id = this.$route.params.id
            this.getgroupentity()
            this.getentitys()
            this.loadStates()
        }
}
</script>

<style>

    .entity-search{
        font-size: 0.8rem;
   
    }

    .entity-search button{
        font-size: 0.8rem;
    }

    .entity-search input{
        font-size: 0.8rem;
    }

</style>
