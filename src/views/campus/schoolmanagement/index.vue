<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <el-form-item label="区域选择">
               <region @change="handleRegion"></region>
              </el-form-item>
              <el-form-item label="学校名称">
                <el-select v-model="schoolId" clearable filterable placeholder="选择学校" @change="handleSchool" @clear="handleClear">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option> 
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增学校</el-button>
              </el-form-item>                
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" border stripe size="mini" v-loading="loading">
        <el-table-column label="学校ID" prop="schoolId"></el-table-column>
        <el-table-column label="学校名称" prop="name">
          <template slot-scope="scope">
            <!-- <a href="javascript:;" style="color:#409EFF" @click="handleDetails(scope.row)">{{ scope.row.name }}</a> -->
            <router-link style="color:#409EFF" 
              :to="{path: `/school/details/${scope.row.schoolId}`}">{{ scope.row.name }}</router-link>
          </template>                    
        </el-table-column>
        <el-table-column label="学校性质" prop="propertyName"></el-table-column>
        <el-table-column label="学校类型" prop="typeName"></el-table-column>
        <el-table-column label="负责人" prop="headName"></el-table-column>
        <el-table-column label="负责人电话" prop="headPhone"></el-table-column>
        <el-table-column label="地址" prop="address" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button> -->
          </template>                       
        </el-table-column>        
      </el-table>
    </template>  
    <!-- 新增 -->
    <template>
      <el-dialog center width="60%" @open="show" @close="close" top="40px" title="新增学校" :visible.sync="dialogAdd" :modal-append-to-body="false">
        <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="区域选择" prop="regionId">
            <region @change="handleRegionInner" :trigger="false"></region>
          </el-form-item>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="学校名称" prop="name">
                <el-input v-model="addForm.name" placeholder="请输入学校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校性质" prop="propertyId">
                <el-select v-model="addForm.propertyId" placeholder="请选择学校性质" style="width:100%">
                  <el-option
                    v-for="item in propertyidList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>            
                </el-select>                          
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校类型" prop="typeId">
                <el-select v-model="addForm.typeId" placeholder="请选择学校类型" style="width:100%">
                  <el-option
                    v-for="item in typeidList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>            
                </el-select>                           
              </el-form-item> 
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="addForm.address" placeholder="请输入详细地址"></el-input>
              </el-form-item>  
            </el-col>
            <el-col :span="8">
              <el-form-item label="办学元年" prop="firstYear">
                <el-date-picker
                  v-model="addForm.firstYear"
                  type="year"
                  placeholder="选择办学元年" style="width:100%">
                </el-date-picker>                        
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校标语" prop="slogan">
                <el-input v-model="addForm.sloslogangan" placeholder="请输入学校标语"></el-input>
              </el-form-item> 
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校标签" prop="labelIds">
                <el-select v-model="addForm.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择学校标签" style="width:100%">
                  <el-option
                    v-for="item in labelsList"
                    :key="item.labelId"
                    :label="item.name"
                    :value="item.labelId">
                  </el-option>
                </el-select>               
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级数量" prop="classNumber">
                <el-input v-model="addForm.classNumber" placeholder="请输入班级数量"></el-input>
              </el-form-item>  
            </el-col>
            <el-col :span="8">
              <el-form-item label="学生数量" prop="studentNumber">
                <el-input v-model="addForm.studentNumber" placeholder="请输入学生数量"></el-input>
              </el-form-item>                              
            </el-col>
            <el-col :span="8">
              <el-form-item label="校长" prop="masterName">
                <el-input v-model="addForm.masterName" placeholder="请输入校长" maxlength="4"></el-input>
              </el-form-item>                             
            </el-col>
            <el-col :span="8">
              <el-form-item label="校长电话" prop="masterPhone">
                <el-input v-model="addForm.masterPhone" placeholder="请输入校长电话"></el-input>
              </el-form-item>  
            </el-col>
            <el-col :span="8">
              <el-form-item label="校长邮箱" prop="masterEmail">
                <el-input v-model="addForm.masterEmail" placeholder="请输入校长邮箱"></el-input>
              </el-form-item>                             
            </el-col>
          </el-row>
          <!-- for -->   
          <el-row v-for="(item,index) in addForm.linkMan" :key="index">
            <el-col :span="8">
              <el-form-item label="负责人" :prop="`linkMan.${index}.linkMan`" :rules="linkmanRules.linkman">
                <el-input v-model="item.linkMan" placeholder="请输入负责人" maxlength="4"></el-input>
              </el-form-item>                            
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人电话" :prop="`linkMan.${index}.phone`" :rules="linkmanRules.phone">
                <el-input v-model="item.phone" placeholder="请输入负责人电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人邮箱" :prop="`linkMan.${index}.email`" :rules="linkmanRules.email">
                <el-input v-model="item.email" placeholder="请输入负责人邮箱"></el-input>
              </el-form-item>                             
            </el-col>
          </el-row>            
          <!-- for --> 
          <el-form-item>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="addlinkMan">新增负责人</el-button>
            <!-- <el-button icon="el-icon-delete" type="danger" size="mini" v-if="addForm.link_man.length > 1" @click="dellinkMan()">删除一项</el-button> -->
          </el-form-item>  
          <el-form-item label="学校简介" prop="description">
            <el-input type="textarea" v-model="addForm.description" placeholder="请输入学校简介" :rows="3"></el-input>
          </el-form-item> 
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item prop="schoolImage">
                  <el-upload
                    class="avatar-uploader"
                    action="http://192.168.18.106:8080/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                    :multiple="false"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">上传学校荣誉牌</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="schoolImage">
                  <!-- <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">上传学校全景图</div>
                  </el-upload> -->
                </el-form-item>
            </el-col>
          </el-row>            
          <el-form-item label="栏目模板" prop="templateId">
            <el-select v-model="addForm.templateId" placeholder="请选择栏目播放模板">
              <el-option
                v-for="item in templateidList"
                :key="item.templateId"
                :label="item.name"
                :value="item.templateId">
              </el-option>            
            </el-select>    
            <a href="javascript:;" style="color:#409EFF;margin-left:10px;" v-show="addForm.templateid">预览</a>                          
          </el-form-item>           
          <el-form-item label="内容复审">
            <el-radio-group v-model="addForm.reviewFlag">
              <el-radio :label="1">需要</el-radio>
              <el-radio :label="0">不需要</el-radio>
            </el-radio-group>
          </el-form-item>                      
          <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button :loading="btnloading" size="mini" type="primary" @click="addsForm('addForm')">保存</el-button>
          </el-row>                             
        </el-form>
      </el-dialog>
    </template>
    <!-- 编辑 -->
    <template>
      <el-dialog center width="60%" @open="show" @close="close" top="40px" title="新增学校" :visible.sync="dialogEdit" :modal-append-to-body="false">
        <el-form :rules="rules" ref="addForm" :model="editForm" status-icon size="small" :label-width="formLabelWidth">
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="学校名称" prop="name">
                <el-input v-model="editForm.name" placeholder="请输入学校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校性质" prop="propertyId">
                <el-select v-model="editForm.propertyId" placeholder="请选择学校性质" style="width:100%">
                  <el-option
                    v-for="item in propertyidList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>            
                </el-select>                          
              </el-form-item>
            </el-col> 
            <el-col :span="8">
              <el-form-item label="学校类型" prop="typeId">
                <el-select v-model="editForm.typeId" placeholder="请选择学校类型" style="width:100%">
                  <el-option
                    v-for="item in typeidList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>            
                </el-select>                           
              </el-form-item> 
            </el-col>  
            <el-col :span="8">
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="editForm.address" placeholder="请输入详细地址"></el-input>
              </el-form-item>  
            </el-col>   
            <el-col :span="8">
              <el-form-item label="办学元年" prop="firstYear">
                <el-date-picker
                  v-model="editForm.firstYear"
                  type="year"
                  placeholder="选择办学元年" style="width:100%">
                </el-date-picker>                        
              </el-form-item>
            </el-col>  
            <el-col :span="8">
              <el-form-item label="学校标语" prop="slogan">
                <el-input v-model="editForm.sloslogangan" placeholder="请输入学校标语"></el-input>
              </el-form-item> 
            </el-col>  
            <el-col :span="8">
              <el-form-item label="学校标签" prop="labelIds">
                <el-select v-model="editForm.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择学校标签" style="width:100%">
                  <el-option
                    v-for="item in labelsList"
                    :key="item.labelId"
                    :label="item.name"
                    :value="item.labelId">
                  </el-option>
                </el-select>               
              </el-form-item>
            </el-col> 
            <el-col :span="8">
              <el-form-item label="班级数量" prop="classNumber">
                <el-input v-model="editForm.classNumber" placeholder="请输入班级数量"></el-input>
              </el-form-item>  
            </el-col>  
            <el-col :span="8">
              <el-form-item label="学生数量" prop="studentNumber">
                <el-input v-model="editForm.studentNumber" placeholder="请输入学生数量"></el-input>
              </el-form-item>                              
            </el-col>   
            <el-col :span="8">
              <el-form-item label="校长" prop="masterName">
                <el-input v-model="editForm.masterName" placeholder="请输入校长" maxlength="4"></el-input>
              </el-form-item>                             
            </el-col>  
            <el-col :span="8">
              <el-form-item label="校长电话" prop="masterPhone">
                <el-input v-model="editForm.masterPhone" placeholder="请输入校长电话"></el-input>
              </el-form-item>  
            </el-col>    
            <el-col :span="8">
              <el-form-item label="校长邮箱" prop="masterEmail">
                <el-input v-model="editForm.masterEmail" placeholder="请输入校长邮箱"></el-input>
              </el-form-item>                             
            </el-col>                                                                                                              
          </el-row>
        </el-form>
      </el-dialog>
    </template>
  </div>  
</template>
<script>
import {
  showSchoolList,
  addSchool,
  querySchoolInfo,
  querySchoolCategory,
  addImage
} from "@/api/school";
import { queryLabel } from "@/api/school";
import region from "@/components/region";

export default {
  name: "schoolManagement",
  components: {
    region
  },
  data() {
    return {
      loading: false,
      dialogAdd: false,
      dialogEdit: false,
      btnloading: false,
      formLabelWidth: "100px",
      query: {
        schoolId: 0,
        page: 1,
        pageSize: 10
      },
      schoolId: null,
      //学校
      schoolList: [],
      //标签列表
      labelsList: [],

      propertyidList: [],
      typeidList: [],

      templateidList: [
        {
          templateId: 1,
          name: "科普知识",
          description: "学而时习之",
          type: 0,
          postTime: "2018-05-30 15:30"
        },
        {
          templateId: 2,
          name: "国学经典",
          description: "",
          type: 1,
          postTime: "2018-05-30 15:30"
        }
      ],
      imageUrl: "",      
      tableData: [],
      editForm: {},
      addForm: {
        regionId: 0,
        reviewFlag: 0,
        linkMan: [{ linkMan: "", phone: "", email: "" }]
      },
      linkmanRules: {},
      rules: {
        regionId: [{ required: true, message: "请选择区域", trigger: "blur" }],
        name: [{ required: true, message: "请选择学校名称", trigger: "blur" }],
        propertyId: [
          { required: true, message: "请选择学校性质", trigger: "blur" }
        ],
        labelIds: [
          { required: true, message: "请选择冠名企业", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择学校类型", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        templateId: [
          { required: true, message: "请选择栏目模板", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addlinkMan() {
      if (this.addForm.linkMan.length) {
        this.addForm.linkMan.push({ linkMan: "", phone: "", email: "" });
      }
    },
    search() {
      if (this.schoolId === null) {
        this.$message({ message: "请选择学校名称", type: "warning" });
      } else {
        this.createTable();
      }
    },
    handleDetails(row) {
      //console.log(typeof row.schoolId);
      //this.$router.push({ path: `details/${row.schoolId}` });
      //this.$router.push({ path: 'details', query: {schoolId:}})
    },
    handleEdit(row) {
      this.dialogEdit = true;
    },
    handleDel(row) {},
    show() {},
    close() {},
    addsForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addForm);
          this.addSchoolAction(this.addForm);
        }else {
          return false;
        }
      });
    },
    handleRegion(list) {
      console.log(list);
      if (Array.isArray(list)) {
        this.schoolList = list;
      }
    },
    handleRegionInner(areaId) {
      this.addForm.regionId = areaId;
    },
    handleSchool(value) {
      this.query.schoolId = value;
    },
    handleClear() {
      this.query.schoolId = 0;
    },
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file); 
      // let f = new FormData();
      // f.append('url', file);
    },
    //查询标签
    getLabel() {
      queryLabel({ queryType: 1 }).then(res => {
        if (res.errorCode === 0) {
          this.labelsList = res.data;
        }
      });
    },   
    //查询学校类别
    getSchoolCateg(params = {}) {
      querySchoolCategory(params).then(res => {
        if (res.errorCode === 0) {
          if (params.queryType) {
            this.typeidList = res.data;
          }else {
            this.propertyidList = res.data;
          }
        }
      }); 
    },
    addSchoolAction(params = {}) {
      addSchool(params).then(res => {
        console.log(res);
      });
    }, 
    //显示学校列表
    createTable() {
      showSchoolList(this.query).then(res => {
        if (res.errorCode === 0) {
          this.tableData = res.data;
        }
      });
    }
  },
  mounted() {
    this.getLabel();
    this.getSchoolCateg({ queryType: 0 })
    this.getSchoolCateg({ queryType: 1 })
    this.createTable();
  }
};
</script>
<style lang="less" scoped>

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
