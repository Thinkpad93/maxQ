<template>
   <div class="page">
       <div class="page-form">
           <el-row :gutter="10">
               <el-col :span="12">
                    <el-form :model="info" status-icon size="small" :label-width="formLabelWidth">
                        <el-form-item label="学校名称">
                            <el-input v-model="info.name" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="学校性质">
                            <el-input v-model="info.propertyName" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="学校类型">
                            <el-input v-model="info.typeName" readonly></el-input>
                        </el-form-item>  
                        <el-form-item label="区域">
                            <el-input v-model="info.regionName" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="详细地址">
                            <el-input v-model="info.address" readonly></el-input>
                        </el-form-item>    
                        <el-form-item label="办学元年">
                            <el-input v-model="info.firstYear" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="学校标语">
                            <el-input v-model="info.slogan" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="学校标签">
                            <el-tag v-for="(tag, index) in info.labelName" :key="index">{{ tag }}</el-tag>
                        </el-form-item>   
                        <el-form-item label="班级数量">
                            <el-input v-model="info.classNumber" readonly></el-input>
                        </el-form-item>    
                        <el-form-item label="学校人数">
                            <el-input v-model="info.studentNumber" readonly></el-input>
                        </el-form-item>      
                        <el-form-item label="校长">
                            <el-input v-model="info.masterName" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="校长电话">
                            <el-input v-model="info.masterPhone" readonly></el-input>
                        </el-form-item> 
                        <el-form-item label="校长邮箱">
                            <el-input v-model="info.masterEmail" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="负责人">
                            <el-input v-model="info.headName" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="负责人电话">
                            <el-input v-model="info.headPhone" readonly></el-input>
                        </el-form-item> 
                        <el-form-item label="负责人邮箱">
                            <el-input v-model="info.headEmail" readonly></el-input>
                        </el-form-item>   
                        <el-form-item label="联系人列表">
                            <el-row :gutter="10">
                                <el-col :span="8" v-for="(item,index) in info.linkMan" :key="index">
                                    <div class="contact">
                                        <h3>{{ item }}</h3>
                                        <p>联系人电话：{{ info.phone[index] }}</p>
                                        <p>联系人邮箱：{{ info.email[index] }}</p>
                                    </div>
                                </el-col>
                            </el-row> 
                        </el-form-item>                                                                                                                                                                                                                                                                                         
                    </el-form>
               </el-col>
           </el-row>
       </div>
   </div> 
</template>
<script>
import { querySchoolInfo } from "@/api/school";
export default {
  name: "schoolDetails",
  data() {
    return {
      schoolId: this.$route.params.schoolId,
      info: {},
      formLabelWidth: "100px"
    };
  },
  methods: {
    schoolInfo(id) {
      querySchoolInfo({ schoolId: id }).then(res => {
        if (res.errorCode === 0) {
          this.info = Object.assign({}, res.data);
        }
      });
    }
  },
  mounted() {
    //console.log(this.schoolId);  
    //console.log("林");  
  },
  activated() {
    console.log("林"); 
    console.log(this.$route.params.schoolId); 
    this.schoolInfo(this.$route.params.schoolId);
  }
};
</script>
<style lang="less" scoped>
.contact {
  color: #fff;
  padding: 10px;
  height: 100px;
  border-radius: 4px;
  line-height: 1.5;
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#3c8ce7),
    to(#0396ff)
  );
}
</style>
