<template>
    <div class="grupoitem-admin">
         <b-form>
             <input id="grupoitem-id" type="hidden" v-model="grupoitem.id" />
            
             <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="grupoitem-name"  >
                        <b-form-input id="grupoitem-name" type="text" ref="search"
                            v-model="grupoitem.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Grupo de Item..." />
                    </b-form-group>
                    <b-form-group label="Grupo de Item Pai:" label-for="grupoitem-parentId">
                        <b-form-select v-if="mode === 'save'"
                            id="grupoitem-parentId"
                            :options="grupoitems" v-model="grupoitem.parentId" />
                    <b-form-input v-else id="grupoitem-parentId" type="text" v-model="grupoitem.path" readonly />
                    </b-form-group>
                    <b-form-checkbox id="grupoitem-sintetico" v-show="mode === 'save'"
                        v-model="grupoitem.sintetico" class="mt-3 mb-3">
                        Sintético?
                    </b-form-checkbox>
                    
                     <b-row>
                    <b-form-group label="Imagem QrCode" label-for="grupoitem-qrcode" >
                        <div>
                            <qrcode-vue v-model="grupoitem.name" :size="size" ></qrcode-vue>
                        </div>
                    </b-form-group>    
                      <b-form-group class="ml-5" label="Imagem Código de Barra" label-for="grupoitem-barcode" >
                        <div  >
                          <barcode value="1234567866" :options="{ displayValue: false }"></barcode>
                        </div>
                    </b-form-group> 
                     </b-row>
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
         <hr>
            <div class="col-sm-4">
                <div class="form-group">
                    <label class="control-label"> <i class="fa fa-search"></i>  Pesquisar os Grupos de Item</label>
                    <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Grupo de Item" class="form-control">
                </div>
            </div>
        <hr>
        <a href='#' @click="printNow()">Print</a>
        <b-table hover striped :items="filteredList" :fields="fields">
        <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadGrupoitem(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
                <b-button variant="danger" @click="loadGrupoitem(data.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>
        </template>   
        </b-table>    
        </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import VueBarcode from '@xkeshi/vue-barcode';
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {

    name: 'GrupoItemAdmin',
    components:{QrcodeVue, 'barcode': VueBarcode},
    data: function() {
        return {
            mode: 'save',
            search: '',
            grupoitem: {},
            grupoitems: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: true },
                { key: 'sintetico', label: 'Sintético', sortable: true,
                  formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ],
            size: 150,
            barcodeValue: '123456789012'
        }
    },
     computed: {
        filteredList() {
        return this.grupoitems.filter(grupoitem => {
        return grupoitem.path.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods: {
        loadGrupoitems() {
            const url = `${baseApiUrl}/grupoitems`
            axios.get(url).then(res => {
               // this.categories = res.data
                this.grupoitems = res.data.map(grupoitem => {
                    return { ...grupoitem, value: grupoitem.id, text: grupoitem.path }})
            })
            this.$refs.search.focus();
        },
        reset() {
            this.mode = 'save'
            this.grupoitem = {}
            this.loadGrupoitems()
        },
        save() {
            const method = this.grupoitem.id ? 'put' : 'post'
            const id = this.grupoitem.id ? `/${this.grupoitem.id}` : ''
            axios[method](`${baseApiUrl}/grupoitems${id}`, this.grupoitem)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.grupoitem.id
            axios.delete(`${baseApiUrl}/grupoitems/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadGrupoitem(grupoitem, mode = 'save') {
            this.mode = mode
            this.grupoitem = { 
               id: grupoitem.id,
               name: grupoitem.name,
               parentId: grupoitem.parentId,
               sintetico: grupoitem.sintetico
             }
            this.$refs.search.focus();
        },
        printNow(value){
            this.grupoitems = value
            window.print()
        }
    },
    mounted() {
        this.loadGrupoitems()
    }
}
</script>

<style>
    .control-label{
       font-size: 1.rem;
    }
</style>
