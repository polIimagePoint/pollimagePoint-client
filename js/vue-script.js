

var app = new Vue({
    el:"#app",
    data: {
        title: "pollimagePoint",
        page: "admin-panel",
        escapePage:"Dashboard",
        role: 'admin'
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
        }
    }
})
