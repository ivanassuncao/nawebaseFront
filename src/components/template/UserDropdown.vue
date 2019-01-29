<template>
    <div class="user-dropdown" >
        <div class="user-button">          
            <span class="d-none d-sm-block" >
                <!--img v-if="emp.caminhoImagem"  :src="`img/${emp.caminhoImagem}`"  class="image"  width="70" alt="logo"/-->
                <!--img width="70" alt="logo" class="image" src="@/assets/waforman.png">
                <img width="70" alt="logo" class="image" src="@/assets/wastylus.png">
                <img width="70" alt="logo" class="image" src="@/assets/wakids.png"-->
                 {{compan.fantasyName || ''}} / {{ user.name || ''}}
                 </span>
            <div class="user-dropdown-img">
                 <Gravatar :email="user.email || ''" alt="User" />   
            </div>
            <i class="fa fa-angle-down" ></i> 
        </div>
         <div class="user-dropdown-content">
                 <b-btn size="sm" v-b-modal.modalCompany @click.prevent=" loadCompanys" v-b-popover.hover = "'Selecione a Empresa que deseja trabalhar!'"  title = "Escolha a Empresa" >Empresa</b-btn>
                <router-link to='/admin' v-if="user.admin" > <i class="fa fa-cogs"></i> Administração </router-link>
                <router-link to='/supervisor' v-if="user.supervisor" > <i class="fa fa-users"></i> Supervisor </router-link>
                <a href @click.prevent="logout" > <i class="fa fa-sign-out"></i> Sair
                </a>
        </div>
        <b-modal id="modalCompany"
            ref="modal"
            title="Informe a Empresa"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            @ok="setCompany"
            >
            <b-form-select id="company-id" :options="companys" v-model="company.id" />
        </b-modal>
    </div>
</template>

<script>
import {userKey, companykey} from '@/global'
import {mapState} from 'vuex'
import Gravatar from 'vue-gravatar'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'UserDropdown',
     data: function(){
        return {
            company: {},
            companys: [],
            headerBgVariant: 'primary',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'warning',
            footerTextVariant: 'dark'
        }
    },
    components: {Gravatar},
    computed: mapState(['user','compan']),
    methods:{
        logout(){

            localStorage.removeItem(userKey)
            localStorage.removeItem(companykey)
            this.$store.commit('setUser',null)
            this.$store.commit('setCompan',null)
            this.$router.push({name: 'auth'})

        },
        setCompany() {
            axios.post(`${baseApiUrl}/setCompany`, this.company)
                .then(res => {
                    localStorage.removeItem(companykey)
                    this.$store.commit('setCompan', res.data)
                    localStorage.setItem(companykey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                   
                })
                .catch(showError)
        },
         loadCompanys() {
            const url = `${baseApiUrl}/companys`
            axios.get(url).then(res => {
                this.companys = res.data.map(company => {
                    return { ...company, value: company.id, text: company.name_company }})
            })
        }
    }
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
        font-size: 0.8rem;
    }

  .user-dropdown button {
        font-size: 0.8rem;
    }

    .user-dropdown select {
        font-size: 0.8rem;
    }  

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
        font-size: 0.8rem;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a{
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

      .user-dropdown-content a:hover{
        text-decoration: none;
        color: #000;
        background-color: #EDEDED;

      }

</style>
