<template>
    <div class="groupentity-admin">
         <b-form  v-show="mode === 'save' || mode === 'remove' || mode === 'read'">
             <input id="groupentity-id" type="hidden" v-model="groupentity.id" />
             <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="groupentity-name">
                        <b-form-input id="groupentity-name" type="text" ref="searchFocus"
                            v-model="groupentity.name" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Nome do Grupo..." />
                    </b-form-group>
                </b-col>    
                <b-col md="3" sm="12">    
                     <b-form-group label="Código:" label-for="groupentity-internal_code_group_entity">
                        <b-form-input id="groupentity-internal_code_group_entity" type="text"
                            v-model="groupentity.internal_code_group_entity" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Código..." />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" v-model="groupentity.blocked" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="groupentity-blocked"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="groupentity-blocked">
                                Bloqueado?
                            </label>
                        </div>
                    </div>
                </b-col>  
             </b-row>
             <b-row>
                <b-col md="3" sm="12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" 
                                v-model="groupentity.synthetic" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="groupentity-synthetic"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="groupentity-synthetic">
                                Sintético?
                            </label>
                        </div>
                    </div>
                </b-col> 
                <b-col md="3" sm="12">
                    <div class="form-group" >
                        <div class="form-check">
                            <input class="form-check-input" 
                                v-model="groupentity.sale" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="groupentity-sale"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="groupentity-sale">
                                Grupo de Venda?
                            </label>
                        </div>
                    </div>
                </b-col>  
                <b-col md="3" sm="12">
                    <div class="form-group"  >
                        <div class="form-check">
                            <input class="form-check-input" 
                                v-model="groupentity.purchase" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="groupentity-purchase"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="groupentity-purchase">
                                Grupo de Compra?
                            </label>
                        </div>
                    </div>
                </b-col>  
                <b-col md="3" sm="12">
                    <div class="form-group" >
                        <div class="form-check">
                            <input class="form-check-input" 
                                v-model="groupentity.service" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="groupentity-service"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="groupentity-service">
                                Grupo de Serviço?
                            </label>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <hr>
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
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label"> Pesquisar os Grupos de Cliente/Fornecedor</label> <b-button size="sm" class=" ml-2 mb-2 fa" :class="icon" @click="[loadgroupentitys(), showTable = !showTable]" variant="outline-secondary" ></b-button>
                        <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Grupo do Item" class="form-control">
                    </div>
                </div>
            <hr>
           <transition  name="slide" type="animation" appear>          
            <b-table class="table-responsive" v-show="showTable" hover key="slide" striped :items="filteredList" :fields="fields">
                <template slot="actions" slot-scope="data">
                        <b-button size="sm" variant="outline-secondary" @click="loadgroupentity(data.item, 'read')" class="mr-2 mt-2">
                            <i class="fa fa-drivers-license-o"></i>
                        </b-button>
                        <b-button size="sm" variant="outline-warning" @click="loadgroupentity(data.item)" class="mr-2 mt-2">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="loadgroupentity(data.item, 'remove')" class="mr-2 mt-2">
                            <i class="fa fa-trash"></i>
                        </b-button>  
                        <b-button  title = "Adicionar próximo Grupo de Cliente/Fornecedor dentro do grupo" size="sm" variant="outline-primary" @click="actionNewGroupItem(data.item)" class="mr-2 mt-2">
                            <i class="fa fa-plus"></i>
                    </b-button>                     
                </template>   
                    <template slot="accesses" slot-scope="data">
                      <b-button v-show="data.item.synthetic == 0"  size="sm" variant="outline-primary" @click="actionItem(data.item)" class="mr-2 mt-2">
                            <i class="fa fa-external-link"></i>
                    </b-button>
                 </template> 
            </b-table>    
           </transition>  
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import EntitySearch from '../entity/EntitySearch'

export default {
    name: 'groupentityAdmin',
    components: {EntitySearch},
    data: function() {
        return {
            mode: 'insert',
            search: '',
            groupentity: {},
            groupentitys: [],
            showTable: false,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'internal_code_group_entity', label: 'Código Interno', sortable: false },
                { key: 'synthetic', label: 'Sintético', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },
                { key: 'sale', label: 'Venda', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },    
                { key: 'purchase', label: 'Compra', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },     
                { key: 'service', label: 'Serviço', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },         
                { key: 'blocked', label: 'Bloqueado', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },               
                { key: 'actions', label: 'Ações' },
                { key: 'accesses', label: 'Acessos' }
            ]
        }
    },
     computed: {
        filteredList() {
        return this.groupentitys.filter(groupentity => {
        return groupentity.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
         icon() {
            return this.showTable ? "fa-retweet" : "fa-search"
        }
    },
    methods: {
        loadgroupentitys() {
            const url = `${baseApiUrl}/groupentitys`
            axios.get(url).then(res => {
                this.groupentitys = res.data
            })
        },
        reset() {
            this.mode = 'insert'
            this.loadgroupentitys()
        },
        alterModo() {
                    this.mode = 'save'
                    this.groupentity = {}
                    this.$refs.searchFocus.focus();
            },
        actionItem(groupentity) {                   
            this.$router.push({
                    name: 'entitySearch',    
                    params: {id: groupentity.id}
                })
        },  
        actionNewGroupItem(groupentity, mode = 'save') { 
            this.mode = mode
            const sizearr = groupentity.internal_code_group_entity.length
            if(sizearr === 2)
            {
                let arr = groupentity.internal_code_group_entity.substring(0,2)
                if(parseInt(arr).length === 2)
                {
                     this.groupentity.internal_code_group_entity = (parseInt(arr) + 1)
                }else{
                     this.groupentity.internal_code_group_entity = '0' + (parseInt(arr) + 1)
                }
            }
            if(sizearr === 5)
            {
                let arr = groupentity.internal_code_group_entity.substring(4,5)
                 if(parseInt(arr).length === 2)
                {
                     this.groupentity.internal_code_group_entity = groupentity.internal_code_group_entity.substring(0,2) + (parseInt(arr) + 1)
                }else{
                     this.groupentity.internal_code_group_entity = groupentity.internal_code_group_entity.substring(0,4)  + (parseInt(arr) + 1)
                }
            }
            if(sizearr === 8)
            {
                let arr = groupentity.internal_code_group_entity.substring(7,8)
                 if(parseInt(arr).length === 2)
                {
                     this.groupentity.internal_code_group_entity = groupentity.internal_code_group_entity.substring(0,4) + (parseInt(arr) + 1)
                }else{
                     this.groupentity.internal_code_group_entity = groupentity.internal_code_group_entity.substring(0,7)  + (parseInt(arr) + 1)
                }
            }

        },    
        save() {
            const method = this.groupentity.id ? 'put' : 'post'
            const id = this.groupentity.id ? `/${this.groupentity.id}` : ''
            axios[method](`${baseApiUrl}/groupentitys${id}`, this.groupentity)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.groupentity.id
            axios.delete(`${baseApiUrl}/groupentitys/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadgroupentity(groupentity, mode = 'save') {
            this.mode = mode
            this.groupentity = { ...groupentity }
            this.$refs.searchFocus.focus();
        }
    },
    mounted() {
 
    }
}
</script>

<style>


    .groupentity-admin select{
        font-size: 0.8rem;
    }
    .groupentity-admin input{
        font-size: 0.8rem;
    }
    .groupentity-admin button{
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
