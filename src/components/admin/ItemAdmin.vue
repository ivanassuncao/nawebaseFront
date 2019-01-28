<template>
     <div class="item-admin">
           <b-form>
                <input id="item-id" type="hidden" v-model="item.id" />
                 <b-row>
                     <b-col md="6" sm="12">
                        <b-form-group label="Descrição:" label-for="item-descricaoItem">
                            <b-form-input id="item-descricaoItem" type="text"
                                v-model="item.descricaoItem" required
                                :readonly="mode === 'remove'"
                                placeholder="Informe a Descrição..." />
                        </b-form-group>
                     </b-col> 
                    <b-col md="6" sm="12">  
                        <b-form-group v-if="mode === 'save'" 
                            label="Grupo do Item:" label-for="item-grupoItemsId">
                            <b-form-select id="item-grupoItemsId"
                            :options="grupoItems" v-model="item.grupoItemsId"
                             />
                        </b-form-group>
                    </b-col> 
                         <b-form-group v-if="mode === 'save'"
                            label="Detalhamento" label-for="item-detalhamentoItem">
                            <VueEditor v-model="item.detalhamentoItem"
                                placeholder="Informe o Detalhamento do Item..." />
                        </b-form-group>
     
                    
                 </b-row>
           </b-form>
     </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { VueEditor } from "vue2-editor"

export default {
    name: 'ItemAdmin',
    components: { VueEditor },
     data: function() {
        return {
            mode: 'save',
            item: {},
            items: [],
            grupoItems: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'descricaoItem', label: 'Descrição', sortable: true },
                { key: 'qtdEstoque', label: 'Qtde. Estoque', sortable: true },
                { key: 'itemBase', label: 'Item Base', sortable: true,
                  formatter: value => value ? 'Sim' : 'Não' },
                { key: 'ativo', label: 'Ativo', sortable: true,
                  formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
         loadItems() {
                const url = `${baseApiUrl}/items`
                axios.get(url).then(res => {
                    this.items = res.data
                })
        }, 
        reset() {
                this.mode = 'save'
                this.item = {}
                this.loadItems()
        }, 
        save() {
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
        loadGrupoItems() {
            const url = `${baseApiUrl}/grupoitems`
            axios.get(url).then(res => {
                this.grupoItems = res.data.map(grupoItem => {
                    return { value: grupoItem.id, text: grupoItem.path }
                })
            })
        }
    },
    mounted() {
        this.loadItems(),
        this.loadGrupoItems()
    }
}

</script>

<style>

</style>
