

var app = new Vue({
    el:"#app",
    data: {
        title: "pollimagePoint",
        page: "admin-panel",
        escapePage:"Dashboard",
        role: 'admin',
        user: {},
        isLogin: false,
        file : null
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
    },

    created : function(){
        this.checkToken()
    }
})
