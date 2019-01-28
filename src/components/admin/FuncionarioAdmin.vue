<template>
     <div class="funcionario-admin">
          <b-form> 
            <input id="funcionario-id" type="hidden" v-model="funcionario.id" />
        <b-row>
            <b-col md="6" sm="12">
                <b-form-group label="Nome:" label-for="funcionario-nome">
                    <b-form-input id="funcionario-nome" type="text"
                        v-model="funcionario.nome" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome..." />
                </b-form-group>
            </b-col>
            <b-col md="3" sm="12">
                <b-form-group label="CPF:" label-for="funcionario-cpf">
                    <b-form-input id="funcionario-cpf" type="text"
                        v-model="funcionario.cpf" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o CPF..." />
                </b-form-group>
            </b-col>       
            <b-col md="3" sm="12">
                <b-form-group label="Matrícula:" label-for="funcionario-matricula">
                <b-form-input id="funcionario-matricula" type="text"
                    v-model="funcionario.matricula" 
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Matrícula..." />
                </b-form-group>
            </b-col>   
            </b-row>
          </b-form>
        <b-card no-body>
            <b-tabs pills card vertical>

            <b-tab title="Registro" active>
             <b-form>

            <b-row>
                <b-col md="2" sm="12">
                    <b-form-group label="Data de Admissão:" label-for="funcionario-dataadmissao">
                    <b-form-input id="funcionario-dataadmissao" type="date"
                        v-model="funcionario.dataadmissao" 
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
                 <b-col md="2" sm="12">
                    <b-form-group label="CTPS:" label-for="funcionario-ctps">
                    <b-form-input id="funcionario-ctps" type="text"
                        v-model="funcionario.ctps" 
                        :readonly="mode === 'remove'"
                        placeholder="Informe o CTPS..." />
                    </b-form-group>
                </b-col> 
                <b-col md="2" sm="12">
                    <b-form-group label="Data de Expedição CTPS:" label-for="funcionario-dataexpedicaoctps">
                    <b-form-input id="funcionario-dataexpedicaoctps" type="date"
                        v-model="funcionario.dataexpedicaoctps" 
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col> 
                 <b-col md="2" sm="12">
                    <b-form-group label="RG:" label-for="funcionario-rg">
                    <b-form-input id="funcionario-rg" type="text"
                        v-model="funcionario.rg" 
                        :readonly="mode === 'remove'"
                        placeholder="Informe o RG..." />
                    </b-form-group>
                </b-col> 
                <b-col md="2" sm="12">
                    <b-form-group label="Data de Expedição RG:" label-for="funcionario-dataexpedicaorg">
                    <b-form-input id="funcionario-dataexpedicaorg" type="date"
                        v-model="funcionario.dataexpedicaorg" 
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col> 
                 <b-col md="2" sm="12">
                    <b-form-group label="PIS:" label-for="funcionario-pis">
                    <b-form-input id="funcionario-pis" type="text"
                        v-model="funcionario.pis" 
                        :readonly="mode === 'remove'"
                        placeholder="Informe o PIS..." />
                    </b-form-group>
                </b-col>
            </b-row>    
             <b-row>
                <b-col md="3" sm="12">
                    <b-form-group label="Cargo:" label-for="funcionario-cargo">
                        <b-form-input id="funcionario-cargo" type="text"
                            v-model="funcionario.cargo" 
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Cargo..." />
                    </b-form-group>
                </b-col>
                <b-col md="2" sm="12">
                    <b-form-group label="Título de Eleitor:" label-for="funcionario-tituloeleitor">
                        <b-form-input id="funcionario-tituloeleitor" type="text"
                            v-model="funcionario.tituloeleitor" 
                            :readonly="mode === 'remove'"
                            placeholder="Informe o número do Título..." />
                    </b-form-group>
                </b-col>
                 <b-col md="2" sm="12">
                    <b-form-group label="Certificado Reservista:" label-for="funcionario-certificadoreservista">
                        <b-form-input id="funcionario-certificadoreservista" type="text"
                            v-model="funcionario.certificadoreservista" 
                            :readonly="mode === 'remove'"
                            placeholder="Informe o número do certificado..." />
                    </b-form-group>
                </b-col>
                 <b-col md="2" sm="12">
                    <b-form-group label="Data de Demissão:" label-for="funcionario-datademissao">
                    <b-form-input id="funcionario-datademissao" type="date"
                        v-model="funcionario.datademissao" 
                        :readonly="mode === 'remove'" />
                    </b-form-group>
                </b-col>
                 <b-col md="3" sm="12">
                    <b-form-group v-if="mode === 'save'" 
                        label="Empresa:" label-for="funcionario-empresaId">
                        <b-form-select id="funcionario-empresaId"
                        :options="empresas" v-model="funcionario.empresaId" />
                    </b-form-group>
                </b-col>
             </b-row>
            <b-form-checkbox id="funcionario-ativo" v-show="mode === 'save'"
                v-model="funcionario.ativo" class="mt-3 mb-3">
                Ativo?
            </b-form-checkbox> 
        
         </b-form>

        </b-tab>
        <b-tab title="Endereço">
            <b-form>
                <b-row>
                     <b-col md="6" sm="12">
                        <b-form-group label="Endereço:" label-for="funcionario-endereco">
                            <b-form-input id="funcionario-endereco" type="text"
                                v-model="funcionario.endereco" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Endereço" />
                        </b-form-group>
                     </b-col>
                </b-row>   
                <b-row>
                    <b-col md="1" sm="12">
                        <b-form-group label="Número:" label-for="funcionario-endnumero">
                            <b-form-input id="funcionario-endnumero" type="text"
                                v-model="funcionario.endnumero" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o número ..." />
                        </b-form-group>
                    </b-col>
                    <b-col md="3" sm="12">
                        <b-form-group label="Bairro:" label-for="funcionario-endbairro">
                            <b-form-input id="funcionario-endbairro" type="text"
                                v-model="funcionario.endbairro" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Bairro" />
                        </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12">
                        <b-form-group label="Cidade:" label-for="funcionario-endcidade">
                            <b-form-input id="funcionario-endcidade" type="text"
                                v-model="funcionario.endcidade" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe a Cidade" />
                        </b-form-group>
                    </b-col>
                        <b-col md="2" sm="12">
                        <b-form-group label="Estado:" label-for="funcionario-endestado">
                            <b-form-input id="funcionario-endestado" type="text"
                                v-model="funcionario.endestado" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe a Estado" />
                        </b-form-group>
                    </b-col>
                        <b-col md="2" sm="12">
                        <b-form-group label="CEP:" label-for="funcionario-cep">
                            <b-form-input v-mask="['#####-###']" id="funcionario-cep" type="text"
                                v-model="funcionario.cep" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o CEP" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>    
        </b-tab>
            <b-tab title="Filiação">
            <b-form>
                 <b-row>
                   <b-col md="2" sm="12">
                        <b-form-group label="Data de Nascimento:" label-for="funcionario-datanascimento">
                        <b-form-input id="funcionario-datanascimento" type="date"
                            v-model="funcionario.datanascimento" 
                            :readonly="mode === 'remove'" />
                        </b-form-group>
                    </b-col>
                 </b-row>
                 <b-row>
                     <b-col md="6" sm="12">
                        <b-form-group label="Nome da Mãe:" label-for="funcionario-nomemae">
                            <b-form-input id="funcionario-nomemae" type="text"
                                v-model="funcionario.nomemae" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Nome da Mãe" />
                        </b-form-group>
                    </b-col>
                     <b-col md="6" sm="12">
                        <b-form-group label="Nome do Pai:" label-for="funcionario-nomepai">
                            <b-form-input id="funcionario-nomepai" type="text"
                                v-model="funcionario.nomepai" 
                                :readonly="mode === 'remove'"
                                placeholder="Informe o Nome do Pai" />
                        </b-form-group>
                    </b-col>

                 </b-row>
                 <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group v-if="mode === 'save'" 
                        label="Usuário:" label-for="funcionario-userId">
                        <b-form-select id="funcionario-userId"
                        :options="users" v-model="funcionario.userId" />
                        </b-form-group>
                    </b-col>
                 </b-row>    
            </b-form>
            </b-tab>

            </b-tabs>
        </b-card>

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
        <hr>
         <b-table class="table-responsive" hover striped :items="funcionarios" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadFuncionario(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadFuncionario(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import {mask} from 'vue-the-mask'

export default {
    name: 'FuncionarioAdmin',
    directives: {mask},
    data: function() {
        return {
            mode: 'save',
            funcionario: {},
            funcionarios: [],
            users: [],
            empresas: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'cpf', label: 'CPF', sortable: true },
                { key: 'matricula', label: 'Matricula', sortable: true },
                { key: 'ativo', label: 'Ativo', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadFuncionarios() {
            const url = `${baseApiUrl}/funcionarios`
            axios.get(url).then(res => {
            this.funcionarios = res.data
            })
        },
        reset() {
                this.mode = 'save'
                this.funcionario = {}
                this.loadFuncionarios()
        },
        save() {
            const method = this.funcionario.id ? 'put' : 'post'
            const id = this.funcionario.id ? `/${this.funcionario.id}` : ''
            axios[method](`${baseApiUrl}/funcionarios${id}`, this.funcionario)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.funcionario.id
            axios.delete(`${baseApiUrl}/funcionarios/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadFuncionario(funcionario, mode = 'save') {
            this.mode = mode
    
            this.funcionario = { ...funcionario }
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        },
         loadEmpresas() {
            const url = `${baseApiUrl}/empresas`
            axios.get(url).then(res => {
                this.empresas = res.data.map(empresa => {
                    return { ...empresa, value: empresa.id, text: empresa.razaosocial }})
            })
        }
     },
    mounted() {
        this.loadFuncionarios(),
        this.loadUsers(),
        this.loadEmpresas()
    }
}
</script>

<style>

</style>
