<template>
    <div class="mxlUploadFile">
        <span>
            <a href="javascript:void(0)" class="btn btn-default"> <span class="icon-zcy icon-shangchuan mr" style="height:20px"></span>上传</a>
            <input type="file" name="files" class="btn-upload"  @change="add" :multiple="more">
        </span>
        <ul>
            <li v-for="i in filesIndex" :key="i">{{ i }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'upload',
    data(){
        return {
            tag: this.$utils.tool.random('mxl-upload'),
            files: [],
            hash: {}
        };
    },
    props: {
        more: {
            default: false
        },
        auto: {
            default: true
        },
        singleUpload: {
            default: true
        },
        failAgain: {
            default: false
        }
    },
    computed: {
        filesIndex(){
            return Object.keys(this.files);
        },
        support(){
            if(!window.FormData) {
                this.$utils.system.notice('[maxilo-vue-bootstrap-component - upload | warning] FormData is not defined, nothing to do.');
                return false;
            }
        },
        fieldStatus(){
            return {
                ADD: 0,
                UPLOADING: 1,
                OK: 2,
                FAIL: 3
            };
        }
    },
    methods: {
        add(event){
            let tmp = event.target.files;
            
            Object.keys(tmp).forEach((v) => {
                let reader = new FileReader();
                reader.readAsText(tmp[v]);
                reader.onload = (e) => {
                    let hash = this.$utils.tool.md5(reader.result);
                    if(!this.hash[hash]) {
                        this.$set(this.hash, this.$utils.tool.md5(reader.result), this.$utils._.merge(tmp[v], {_s: this.fieldStatus.ADD}));
                        this.$set(this.files, this.files.length, tmp[v]);
                        if(this.auto) {
                            this.doUpload();
                        }
                    }
                }
            });
        },
        async doUpload(){
            let readyFileList = this.hash.filter(v => v._s != this.fieldStatus.OK);
            let data = new window.FormData;
        }
    }
}
</script>

<style>
    .mxlUploadFile span{
        position: relative;
        display: inline-block;
    }

    .mxlUploadFile input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        opacity: 0;
        filter: alpha(opacity=0);
    }
</style>


