Vue.component('blog-images', {
    props: ['name', 'description', 'url', 'iframe'],
    template: `
                    <div class="col-lg-4 col-sm-6 portfolio-item"  >
                        <div class="card h-100">
                            <a href="#"><img class="card-img-top" v-bind:src="url" alt=""></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                <a href="#">{{name}} </a>
                                </h4>
                                <p class="card-text">{{description}} </p>
                            </div>
                        </div>
                        <div class="fb-share-button" v-bind:data-href="url" data-layout="button_count" data-size="large" data-mobile-iframe="false"><a target="_blank" v-bind:href="iframe" class="fb-xfbml-parse-ignore">Bagikan</a></div>
                    </div>
                    `
})

var app = new Vue({
    el:"#app",
    data: {
        title: "pollimagePoint",
        page: "admin-panel",
        escapePage:"Dashboard",
        role: 'admin',
        user: {},
        isLogin: false,
        file : null,
        images: []
    },
    created: function(){
        this.getImages(),
        this.checkToken()
    },

    methods: {
        pageChanger: function(escape){
            if(escape=='Dashboard'){
                this.page = "admin-panel"
                this.escapePage = 'Home'
                // alert(this.page)
            } else if(escape=='Home'){
                this.page = 'home'
                this.escapePage = 'Dashboard'
                // alert(this.page)
            }
        },

        login(e) {
            e.preventDefault()
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users',
                data: this.user
            })
            .then( response => {
                this.isLogin = true
                localStorage.setItem("jToken" , JSON.stringify(response.data))
                localStorage.setItem('isLogin' , true)
            })
            .catch( error => {
                console.log(error)
                console.log(`ini feedback catch ${error}`)
                this.showError = true
                this.errorMessage = error.message
            })
        },

        checkToken () {
            let token = localStorage.getItem('jToken')
            if ( token ) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },

        uploadimage (event){
            console.log(`lewat upload image======================`)
            let image = event.target.files[0]
            this.file = image
            //console.log(this.file)
            let uploaddata = new FormData()
            uploaddata.append("image", this.file) // name of parameter in your server
            //console.log('Upload access----') 
            // console.log(uploaddata)
            axios.post('http://localhost:3000/images/upload', uploaddata, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then( response => {
                console.log( response )
            })
            .catch( error => {
                console.log( error.response.data)
            })
        },


        // upload (e) {
        //     e.preventDefault()
        //     axios({
        //         method: 'POST',
        //         url: 'http://localhost:3000/images/upload',
        //         data: this.user
        //     })
        //     .then( response => {
        //         this.isLogin = true
        //         localStorage.setItem("jToken" , JSON.stringify(response.data))
        //         localStorage.setItem('isLogin' , true)
        //     })
        //     .catch( error => {
        //         console.log(error)
        //         console.log(`ini feedback catch ${error}`)
        //         this.showError = true
        //         this.errorMessage = error.message
        //     })
        // },

        signOut(){
            localStorage.clear()
            this.isLogin = false
        },
        getImages: function(){
            axios
                .get('http://localhost:3000/images')
                .then((response)=>{
                    this.images = response.data
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        generateFbButton:function(url){
            
           return `https://www.facebook.com/plugins/share_button.php?href=${url}&layout=button_count&size=large&mobile_iframe=false&width=98&height=28&appId" width="98" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media` 
        }
    },

})


