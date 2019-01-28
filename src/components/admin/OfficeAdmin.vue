<template>
    <div class="office-admin">
         <b-form  v-show="mode === 'save' || mode === 'remove' || mode === 'read'">
             <input id="office-id" type="hidden" v-model="office.id" />
             <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="office-name">
                        <b-form-input id="office-name" type="text" ref="searchFocus"
                            v-model="office.name" required
                            size="sm"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="Nome do Cargo/Função..." />
                    </b-form-group>
                     <b-form-group label="Decrição do Cargo/Função:" label-for="office-description">
                        <b-form-textarea id="office-acessoMenu"
                            :rows="3"
                            :max-rows="6"
                            size="sm"
                            v-model="office.description"
                            :readonly="mode === 'remove' || mode === 'read' || mode === 'insert'"
                            placeholder="" />
                    </b-form-group>
                </b-col>

             </b-row>

         </b-form>
            <hr>
              <b-row >
                  <b-col xs="12">
                    <b-button  size="sm" variant="outline-success" class="mr-2" v-show="mode !== 'save' && mode !== 'remove'"
                        @click="alterModo">Adicionar</b-button>
                    <b-button  size="sm" variant="outline-primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button  size="sm" variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button  size="sm" btn-sm variant="outline-secondary" class="ml-2"  v-if="mode === 'remove' || mode === 'save' || mode === 'read' "
                    @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
              <hr> 
                <div class="col-sm-4">
                    <div class="form-group">
                        <label class="control-label"> Pesquisar os Cargos/Funções</label> <b-button size="sm" class=" ml-2 mb-2 fa" :class="icon" @click="[loadOffices(),showTable = !showTable]" variant="outline-secondary" ></b-button>
                        <input type="text" icon="search" v-model="search" placeholder="Informe o nome do Cargo/Função" class="form-control">
                    </div>
                </div>
            <hr>
           <transition  name="slide" type="animation" appear>          
            <b-table class="table-responsive" v-show="showTable" hover key="slide" striped :items="filteredList" :fields="fields">
                <template slot="actions" slot-scope="data">
                        <b-button  size="sm" variant="outline-warning" @click="loadOffice(data.item)" class="mr-2 mt-2">
                            <i class="fa fa-pencil"></i>
                        </b-button>
                        <b-button  size="sm" variant="outline-danger" @click="loadOffice(data.item, 'remove')" class="mr-2 mt-2">
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

export default {
    name: 'OfficeAdmin',
    data: function() {
        return {
            mode: 'insert',
            search: '',
            office: {},
            offices: [],
            showTable: false,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: false },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
     computed: {
        filteredList() {
        return this.offices.filter(office => {
        return office.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
         icon() {
            return this.showTable ? "fa-retweet" : "fa-search"
        }
    },
    methods: {
        loadOffices() {
            const url = `${baseApiUrl}/offices`
            axios.get(url).then(res => {
                this.offices = res.data
            })
        },
        reset() {
            this.mode = 'insert'
            this.loadOffices()
        },
        alterModo() {
                    this.mode = 'save'
                    this.office = {}
                    this.$refs.searchFocus.focus();
            },
        save() {
            const method = this.office.id ? 'put' : 'post'
            const id = this.office.id ? `/${this.office.id}` : ''
            axios[method](`${baseApiUrl}/offices${id}`, this.office)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.office.id
            axios.delete(`${baseApiUrl}/offices/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadOffice(office, mode = 'save') {
            this.mode = mode
            this.office = { ...office }
            this.$refs.searchFocus.focus();
        }
    },
    mounted() {
       
    }
}
</script>

<style>


    .office-admin select{
        font-size: 0.8rem;
    }
    .office-admin input{
        font-size: 0.8rem;
    }
    .office-admin button{
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
