<template>
    <div class="vendedor-admin">
         <b-form>
            <input id="vendedor-id" type="hidden" v-model="vendedor.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="vendedor-nome">
                        <b-form-input id="vendedor-nome" type="text"
                            v-model="vendedor.nome" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Vendedor..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="vendedor-email">
                        <b-form-input id="vendedor-email" type="text"
                            v-model="vendedor.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Vendedor..." />
                    </b-form-group>
                </b-col>          
            </b-row>
            <b-row>
                <b-col md="3" sm="12">
                    <b-form-group label="Matrícula:" label-for="vendedor-matricula">
                    <b-form-input id="vendedor-matricula" type="text"
                        v-model="vendedor.matricula" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe a Matrícula do Vendedor" />
                    </b-form-group>
                </b-col>
                  <b-col md="3" sm="12">
                    <b-form-group label="% Comissão:" label-for="vendedor-porcComissao">
                    <b-form-input id="vendedor-porcComissao" 
                        v-model="vendedor.porcComissao" 
                       type="number"
                       step="0.01"
                        pattern="([0-9]{1,3}\.)?[0-9]{1,3},[0-9]{2}$"
                        :readonly="mode === 'remove'"/>
                    </b-form-group>
                </b-col>
            </b-row>    
            <b-form-checkbox id="vendedor-ativo" v-show="mode === 'save'"
                v-model="vendedor.ativo" class="mt-3 mb-3">
                Ativo?
            </b-form-checkbox> 
            <b-form-group label="Foto do Vendedor:" label-for="vendedor-foto">
             <b-form-file v-model="vendedor.foto" class="mt-3" plain></b-form-file>
             </b-form-group>
            <hr>
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
         <b-table hover striped :items="vendedores" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadVendedor(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadVendedor(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import ImageInput from '@/components/util/ImageInput'
import Avatar from 'vue-avatar'
import {mask} from 'vue-the-mask'

export default {
    name: 'VendedorAdmin',
    components:{ImageInput,Avatar},
    directives: {mask},
    data: function() {
        return {
            mode: 'save',
            vendedor: {},
            vendedores: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'matricula', label: 'Matricula', sortable: true },
                 { key: 'porcComissao', label: '% Comissão', sortable: false },
                { key: 'ativo', label: 'Ativo', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ],
             money: {
                decimal: ',',
                precision: 2,
                masked: false 
            }
        }
    },
     methods: {
        loadVendedores() {
                const url = `${baseApiUrl}/vendedores`
                axios.get(url).then(res => {
                this.vendedores = res.data
            })
        },
        reset() {
                this.mode = 'save'
                this.vendedor = {}
                this.loadVendedores()
        },
        save() {
            const method = this.vendedor.id ? 'put' : 'post'
            const id = this.vendedor.id ? `/${this.vendedor.id}` : ''
            axios[method](`${baseApiUrl}/vendedores${id}`, this.vendedor)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.vendedor.id
            axios.delete(`${baseApiUrl}/vendedores/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadVendedor(vendedor, mode = 'save') {
            this.mode = mode
    
            this.vendedor = { ...vendedor }
        }
     }
     ,
    mounted() {
        this.loadVendedores()
    }
}
</script>

<style>

</style>
