<template>
    <div class="home" >
         <PageTitle icon="fa fa-home" main="Home"
            sub="Gestão de Loja" />
        <!--nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to='/admin'>Administração </router-link></li>
                <li class="breadcrumb-item"><a href="#">Library</a></li>
                <li class="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav-->
        <PontoEletronico />
       
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import PontoEletronico from '../funcionario/PontoEletronico'

export default {
    name: 'Home',
    components:{PageTitle,PontoEletronico },
    data: function(){
        return {
        }
    },
    methods:{

    },
    mounted(){
    
    }
}
</script>

<style>

</style>
