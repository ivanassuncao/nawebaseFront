<template>
    <div class="dash-global" >
         <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Gestão da Empresa" />
        <div class="stats">
            <Stat title="Vendas" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50" />
            <Stat title="Clientes/Fornecedores" :value="stat.articles"
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" />
            <Stat title="Grupo Itens" :value="stat.grupoitems"
                icon="fa fa-th-large" color="#3282cd" />    
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import {baseApiUrl} from '@/global'

export default {
    name: 'DashGlobal',
    components:{PageTitle, Stat },
    data: function(){
        return {
            stat:{}
        }
    },
    methods:{
        getSats(){
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted(){
        this.getSats()
    }
}
</script>

<style>
      .stats{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        
    }

     .stats {
        font-size: 0.8rem;
    }
</style>
