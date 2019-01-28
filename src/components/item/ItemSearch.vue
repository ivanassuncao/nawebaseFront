<template>
     <div class="item-search">
        <PageTitle icon="fa fa-folder-o" :main="groupitem.name" sub="Grupo de Item" />
            <b-form v-show="mode === 'save' || mode === 'remove' || mode === 'read'" >
             <input id="item-id" type="hidden" v-model="item.id" />
             <b-row>
                <b-col md="5" sm="12">
                    <b-form-group label="Nome:" label-for="item-name">
                        <b-form-input id="item-name" type="text" ref="searchFocus"
                            v-model="item.name" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Nome do Item..." />
                    </b-form-group>
                </b-col>    
                <b-col md="3" sm="12">    
                     <b-form-group label="Código Interno:" label-for="item-internal">
                        <b-form-input id="item-internal_code" type="text"
                            v-model="item.internal_code" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Código..." />
                    </b-form-group>
                </b-col>
                  <b-col md="1" sm="12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" v-model="item.stock" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="item-stock"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="item-stock">
                                Estoque?
                            </label>
                        </div>
                    </div>
                </b-col> 
                <b-col md="1" sm="12">
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" v-model="item.blocked" true-value="1" false-value="0" 
                                type="checkbox" 
                                id="item-blocked"
                                :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            >
                            <label class="form-check-label" for="item-blocked">
                                Bloqueado?
                            </label>
                        </div>
                    </div>
                </b-col>  
              
             </b-row>
             <b-row>
                <b-col md="6" sm="12">
                <b-form-group label="Decrição do Item:" label-for="item-description">
                    <b-form-textarea id="item-acessoMenu"
                        :rows="3"
                        :max-rows="6"
                        size="sm"
                        v-model="item.description"
                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                        placeholder="" />
                </b-form-group>
                </b-col>
            </b-row>
             <b-row>
                  <b-col md="3" sm="12">    
                     <b-form-group label="NCM:" label-for="item-ncm">
                        <b-form-input id="item-ncm" type="text"
                            v-model="item.ncm" 
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Código NCM..." />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="12">    
                     <b-form-group label="CEST:" label-for="item-cest">
                        <b-form-input id="item-cest" type="text"
                            v-model="item.cest" 
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Código CEST..." />
                    </b-form-group>
                </b-col>
                <b-col md="1" sm="12">
                    <b-form-group 
                        label="Unidade:" label-for="item-unit_measure_id">
                        <b-form-select id="item-unit_measure_id"
                        size="sm"
                        :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                        :options="unitmeasures" v-model="item.unit_measure_id" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
               
            </b-row>
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
                    <label class="control-label"> <i class="fa fa-search"></i>  Pesquisar os Items</label>
                    <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Item" class="form-control">
                </div>
            </div>
            </b-row>
           
         <b-table class="table-responsive" hover striped :items="filteredList" :fields="fields">
               <template slot="actions" slot-scope="data">
                    <b-button size="sm" variant="outline-secondary" @click="loaditem(data.item, 'read')" class="mr-2 mt-2">
                        <i class="fa fa-drivers-license-o"></i>
                    </b-button>
                    <b-button size="sm" variant="outline-warning" @click="loaditem(data.item)" class="mr-2 mt-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                     <b-button size="sm" variant="outline-danger" @click="loaditem(data.item, 'remove')" class="mr-2 mt-2">
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

export default {
    name: 'ItemSearch',
    components: {PageTitle },
    data: function() {
        return {
                mode: 'insert',
                search: '',
                groupitem: {},
                item: {},
                items: [],
                unitmeasures: {},
                fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'internal_code', label: 'Código Interno', sortable: false },
                { key: 'stock', label: 'Estoque', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },        
                { key: 'blocked', label: 'Bloqueado', sortable: false,
                        formatter: value => value ? 'Sim' : 'Não' },               
                { key: 'actions', label: 'Ações' }
            ]
            }
        },
        computed: {
            filteredList() {
                return this.items.filter(item => {
                    return item.name.toLowerCase().includes(this.search.toLowerCase())
                    })
            }
        },
        methods:{
             getGroupItem(){
                const url = `${baseApiUrl}/groupitems/${this.groupitem.id}`
                axios(url).then(res=> this.groupitem = res.data)
            },
            getItems(){
                const url = `${baseApiUrl}/groupitems/${this.groupitem.id}/items`
                axios(url).then(res =>{
                     this.items = res.data
                })
            },
            alterModo() {
                    this.mode = 'save'
                    this.item = {}
                    this.$refs.searchFocus.focus();
            },
             reset() {
                this.mode = 'insert'
                this.getItems()
            },
            save() {
                if(this.groupitem.id){

                    this.item.group_item_id = this.groupitem.id
                }
                const method = this.item.id ? 'put' : 'post'
                const id = this.item.id ? `/${this.item.id}` : ''
                axios[method](`${baseApiUrl}/items${id}`, this.item)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
            },
            remove() {
                    const id = this.item.id
                    axios.delete(`${baseApiUrl}/items/${id}`)
                        .then(() => {
                            this.$toasted.global.defaultSuccess()
                            this.reset()
                        })
                        .catch(showError)
            },
            loadUnitMeasure() {
                    const url = `${baseApiUrl}/unitmeasures`
                    axios.get(url).then(res => {
                        this.unitmeasures = res.data.map(unitmeasure => {
                            return { value: unitmeasure.id, text: unitmeasure.initials }
                        })
                    })
            },
            loaditem(item, mode = 'save') {
                this.mode = mode
                this.item = { ...item }
                this.$refs.searchFocus.focus();
            }
        },
        watch:{
            $route(to){
                this.groupitem.id = to.params.id
                this.items = []
                this.getGroupItem()
                this.getItems()
            }
        },
        mounted(){
            this.groupitem.id = this.$route.params.id
            this.getGroupItem()
            this.getItems()
            this.loadUnitMeasure()
        }
}
</script>

<style>

    .item-search{
        font-size: 0.8rem;
   
    }

    .item-search button{
        font-size: 0.8rem;
    }

    .item-search input{
        font-size: 0.8rem;
    }

</style>
