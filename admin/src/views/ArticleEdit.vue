<template>
    <div class="about">
        <h1>{{id ? '编辑':'新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <!-- <el-input v-model="model.parent"></el-input> -->
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id"
                    :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
    props: {
        id:{}
    },
    components: {
        VueEditor
    },
    data(){
        return {
            model: {},
            categories: []
        }
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)

            
        
            const formData = new FormData();
            formData.append("file", file);
        
            const res = await this.$http.post('upload', formData);
            console.log(res);
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },
        async save(){
            // this.$http.post()
            // const res = await this.$http.post('categories', this.model)
            let res;  // eslint-disable-line no-unused-vars
            if(this.id){
                res = await this.$http.put(`rest/articles/${this.id}`, this.model) 
            } else {
                res = await this.$http.post('rest/articles', this.model) 
            }
            this.$router.push('/articles/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/articles/${this.id}`)
            // console.log(res);
            this.model = res.data
        },
        async fetchCatgories() {
            const res = await this.$http.get(`rest/categories`)
            // console.log(res);
            this.categories = res.data
        }
    },
    created() {
        this.fetchCatgories()
        this.id && this.fetch()
    }
}
</script>