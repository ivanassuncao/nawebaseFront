<template>
    <div class="admin-pages" >
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
        sub="Cadastros e Configurações" />
        <div class="admin-pages-tabs">
            <b-card no-body >
                <b-tabs card>
                     <b-tab title="Usuários" active>
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Empresa">
                        <CompanyAdmin />
                    </b-tab>
                    <b-tab title="Cargos/Funções">
                        <OfficeAdmin />
                    </b-tab>
                    <b-tab title="Funcionário">
                        <EmployeeAdmin />
                    </b-tab>
                    <b-tab title="Grupo de Itens">
                        <GroupItemAdmin />
                    </b-tab>
                    <b-tab title="Grupo de Cliente/Fornecedor">
                        <GroupEntityAdmin />
                    </b-tab>
                    <!--b-tab title="Plano Conta">
                        <PlanoContaAdmin />
                    </b-tab>
                    <b-tab title="Funcionário">
                        <FuncionarioAdmin />
                    </b-tab>
                    
                    <b-tab title="Vendedor">
                        <VendedorAdmin />
                    </b-tab>
                    <b-tab title="Cliente">
                        <ClienteAdmin />
                    </b-tab>
                    <b-tab title="Grupo de Itens">
                        <GrupoItemAdmin />
                    </b-tab>
                     <b-tab title="Itens">
                        <ItemAdmin />
                    </b-tab>
                    <b-tab title="Artigos" >
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab-->
                </b-tabs>  
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'
import GroupItemAdmin from './GroupItemAdmin'
import GroupEntityAdmin from './GroupEntityAdmin'
import CompanyAdmin from './CompanyAdmin'
import VendedorAdmin from './VendedorAdmin'
import ClienteAdmin from './ClienteAdmin'
import ItemAdmin from './ItemAdmin'
import PlanoContaAdmin from './PlanoContaAdmin'
import EmployeeAdmin from './EmployeeAdmin'
import OfficeAdmin from './OfficeAdmin'

export default {
    name: 'AdminPages',
    components:{PageTitle,
                ArticleAdmin,
                CategoryAdmin,
                UserAdmin,
                GroupItemAdmin,
                CompanyAdmin,
                VendedorAdmin,
                ClienteAdmin,
                ItemAdmin,
                PlanoContaAdmin,
                EmployeeAdmin,
                OfficeAdmin,
                GroupEntityAdmin
                }
}
</script>

<style>

 .admin-pages {
            font-size: 0.8rem;
        }

</style>
