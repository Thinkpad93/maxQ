<template>
  <div class="page">
    <!-- 表单 -->
    <template>
      <el-row :gutter="10">
        <el-col :span="24">
          <div class="page-form">
            <el-form :inline="true" :model="query" size="small" label-width="70px" label-position="left">
              <!-- <el-form-item label="区域选择">
                <qx-region @last="queryRegion"></qx-region>
              </el-form-item> -->
              <!-- <el-form-item label="学校名称">
                <el-select v-model="schoolId" clearable filterable placeholder="选择学校" @change="handleSchool" @clear="handleClear">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option> 
                </el-select>
              </el-form-item> -->
              <qx-region-t @regionChange="handleRegionChange"></qx-region-t>
              <el-form-item label="学校名称">
                <el-input v-model="query.schoolName" placeholder="请输入学校名称"></el-input>
              </el-form-item>                     
              <el-form-item>
                <!-- <el-button icon="el-icon-search" type="primary" @click="search">查询</el-button> -->
                <el-button icon="el-icon-search" type="primary" @click="handleSearch">查询</el-button>
                <el-button icon="el-icon-plus" type="primary" @click="dialogAdd = true">新增学校</el-button>
              </el-form-item>                
            </el-form>
          </div>
        </el-col>
      </el-row>
    </template>
    <!-- 表格数据 -->
    <template>
      <el-table :data="tableData" style="width: 100%" :height="tableHeight" stripe size="mini">
        <el-table-column label="学校ID" prop="schoolId" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="学校名称" prop="name" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <!-- <span style="color:#409EFF;cursor:pointer;" @click="handleSchoolInfo(scope.row.schoolId)">{{ scope.row.name }}</span> -->
            <router-link style="color:#409EFF" 
              :to="{path: `/school/views/${scope.row.schoolId}`}">{{ scope.row.name }}</router-link>
          </template>                    
        </el-table-column>
        <el-table-column label="学校性质" prop="propertyName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="学校类型" prop="typeName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="负责人" prop="headName" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.headName === null">无</span>
            <span v-else>{{ scope.row.headName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人电话" prop="headPhone" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.headPhone === null">无</span>
            <span v-else>{{ scope.row.headPhone }}</span>
          </template>          
        </el-table-column>
        <el-table-column label="地址" prop="address" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>                       
        </el-table-column>        
      </el-table>
    </template>  
    <!-- 分页 -->
    <template>
      <qx-pagination 
        @page-change="pageChange" 
        @page-size="pageSize" 
        :page="query.page" 
        :pageSize="query.pageSize" 
        :total="totalCount">
      </qx-pagination>
    </template>      
    <!-- 新增 -->
    <template>
      <el-dialog center width="60%" @open="show" @close="close" top="20px" title="新增学校" :visible.sync="dialogAdd">
        <el-dialog append-to-body center width="60%" :visible.sync="previewChannel">
          <el-table :data="channelData" style="width: 100%" stripe size="mini">
            <el-table-column :resizable="false" label="栏目名称" prop="channelName" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="栏目播放时间" prop="playTime" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="滚动类型" prop="scrollType" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column :resizable="false" label="有效期" prop="validTime" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-dialog>
        <el-form :rules="rules" ref="addForm" :model="addForm" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="区域选择" prop="regionId">
            <qx-region @last="lastInnerChange" v-model="addForm.regionId"></qx-region>
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
                  format="yyyy"
                  value-format="yyyy"
                  v-model="addForm.firstYear"
                  type="year"
                  placeholder="选择办学元年" style="width:100%">
                </el-date-picker>                        
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校标语" prop="slogan">
                <el-input v-model="addForm.slogan" placeholder="请输入学校标语"></el-input>
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
            <el-col :span="8">
              <el-form-item label="负责人" prop="headName">
                <el-input v-model="addForm.headName" placeholder="请输入负责人" maxlength="4"></el-input>
              </el-form-item>                             
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人电话" prop="headPhone">
                <el-input v-model="addForm.headPhone" placeholder="请输入负责人电话"></el-input>
              </el-form-item>  
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人邮箱" prop="headEmail">
                <el-input v-model="addForm.headEmail" placeholder="请输入负责人邮箱"></el-input>
              </el-form-item>                             
            </el-col>            
          </el-row>
          <!-- for -->   
          <el-row v-for="(item,index) in addForm.linkMan" :key="index">
            <el-col :span="8">
              <el-form-item :label="`联系人`" :prop="`linkMan`" :rules="linkmanRules.linkman">
                <el-input v-model="item.linkMan" placeholder="请输入联系人" maxlength="4"></el-input>
              </el-form-item>                            
            </el-col>
            <el-col :span="8">
              <el-form-item :label="`联系人电话`" :prop="`linkMan`" :rules="linkmanRules.phone">
                <el-input v-model="item.phone" placeholder="请输入联系人电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="`联系人邮箱`" :prop="`linkMan`" :rules="linkmanRules.email">
                <el-input v-model="item.email" placeholder="请输入联系人邮箱"></el-input>
              </el-form-item>                             
            </el-col>
          </el-row>            
          <!-- for --> 
          <el-form-item>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="addlinkMan(true)">新增联系人</el-button>
          </el-form-item>  
          <el-form-item label="学校简介" prop="description">
            <el-input type="textarea" v-model="addForm.description" placeholder="请输入学校简介" :rows="4"></el-input>
          </el-form-item> 
          <el-form-item label="栏目模板" prop="channelTemplateId">
            <el-select v-model="addForm.channelTemplateId" placeholder="请选择栏目播放模板">
              <el-option
                v-for="item in templateidList"
                :key="item.templateId"
                :label="item.name"
                :value="item.templateId">
              </el-option>            
            </el-select>    
            <a href="javascript:;" style="color:#409EFF;margin-left:10px;" @click="handlePreviewChannelTemplate">栏目模板预览</a>
          </el-form-item>           
          <el-form-item label="内容复审">
            <el-radio-group v-model="addForm.reviewFlag">
              <el-radio :label="1">需要</el-radio>
              <el-radio :label="0">不需要</el-radio>
            </el-radio-group>
          </el-form-item>            
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item prop="honorImage">
                  <h4>上传学校荣誉牌</h4>
                  <el-upload
                    ref="upload"
                    :style="{ backgroundImage : addImageUrl1 }"
                    class="upload-image"
                    action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                    name="honorImage"
                    :data="{type: '0'}"
                    :multiple="false"
                    accept="image/jpeg,image/gif,image/png,image/bmp" 
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :before-upload="beforeImageUpload">
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="honorImage">
                  <h4>上传学校全景图</h4>
                  <el-upload
                    ref="upload"
                    :style="{ backgroundImage : addImageUrl2 }"
                    class="upload-image"
                    action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                    name="honorImage"
                    :data="{type: '1'}"
                    :multiple="false"
                    accept="image/jpeg,image/gif,image/png,image/bmp" 
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="handleImageSuccess"
                    :before-upload="beforeImageUpload">
                  </el-upload>
                </el-form-item>
            </el-col>
          </el-row>                                
          <!-- <el-row style="text-align:center">
            <el-button size="mini" @click="dialogAdd = false">取消</el-button>
            <el-button size="mini" type="primary" @click="addsForm('addForm')">保存</el-button>
          </el-row>                              -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogAdd = false">取消</el-button>
          <el-button size="small" type="primary" @click="addsForm('addForm')">确定</el-button>
        </span>            
      </el-dialog>
    </template>
    <!-- 编辑 -->
    <template>
      <el-dialog center width="60%" @open="show" @close="close" top="40px" title="编辑学校" :visible.sync="dialogEdit">
        <el-form :rules="rules" ref="editForm" :model="edit" status-icon size="small" :label-width="formLabelWidth">
          <el-form-item label="区域选择" prop="regionId">
            <qx-region @last="lastInnerEditChange" v-model="edit.regionId"></qx-region>
          </el-form-item>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="学校名称" prop="name">
                <el-input v-model="edit.name" placeholder="请输入学校名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校性质" prop="propertyId">
                <el-select v-model="edit.propertyId" placeholder="请选择学校性质" style="width:100%">
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
                <el-select v-model="edit.typeId" placeholder="请选择学校类型" style="width:100%">
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
                <el-input v-model="edit.address" placeholder="请输入详细地址"></el-input>
              </el-form-item>  
            </el-col>   
            <el-col :span="8">
              <el-form-item label="办学元年" prop="firstYear">
                <el-date-picker
                  v-model="edit.firstYear"
                  type="year"
                  placeholder="选择办学元年" style="width:100%">
                </el-date-picker>                        
              </el-form-item>
            </el-col>  
            <el-col :span="8">
              <el-form-item label="学校标语" prop="slogan">
                <el-input v-model="edit.slogan" placeholder="请输入学校标语"></el-input>
              </el-form-item> 
            </el-col>  
            <el-col :span="8">
              <el-form-item label="学校标签" prop="labelIds">
                <el-select v-model="edit.labelIds" value-key="labelId" multiple collapse-tags placeholder="请选择学校标签" style="width:100%">
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
                <el-input v-model="edit.classNumber" placeholder="请输入班级数量"></el-input>
              </el-form-item>  
            </el-col>  
            <el-col :span="8">
              <el-form-item label="学生数量" prop="studentNumber">
                <el-input v-model="edit.studentNumber" placeholder="请输入学生数量"></el-input>
              </el-form-item>                              
            </el-col>   
            <el-col :span="8">
              <el-form-item label="校长" prop="masterName">
                <el-input v-model="edit.masterName" placeholder="请输入校长" maxlength="4"></el-input>
              </el-form-item>                             
            </el-col>  
            <el-col :span="8">
              <el-form-item label="校长电话" prop="masterPhone">
                <el-input v-model="edit.masterPhone" placeholder="请输入校长电话"></el-input>
              </el-form-item>  
            </el-col>    
            <el-col :span="8">
              <el-form-item label="校长邮箱" prop="masterEmail">
                <el-input v-model="edit.masterEmail" placeholder="请输入校长邮箱"></el-input>
              </el-form-item>                             
            </el-col>  
            <el-col :span="8">
              <el-form-item label="负责人" prop="headName">
                <el-input v-model="edit.headName" placeholder="请输入负责人" maxlength="4"></el-input>
              </el-form-item>                             
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人电话" prop="headPhone">
                <el-input v-model="edit.headPhone" placeholder="请输入负责人电话"></el-input>
              </el-form-item>  
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人邮箱" prop="headEmail">
                <el-input v-model="edit.headEmail" placeholder="请输入负责人邮箱"></el-input>
              </el-form-item>                             
            </el-col>                                                                                                                           
          </el-row>
          <!-- for -->
            <el-row v-for="(item,index) in edit.linkMan" :key="index">
              <el-col :span="8">
                <el-form-item :label="`联系人`" :prop="`linkMan`" :rules="linkmanRules.linkman">
                  <el-input v-model="item.linkMan" placeholder="请输入联系人" maxlength="4"></el-input>
                </el-form-item>                            
              </el-col>
              <el-col :span="8">
                <el-form-item :label="`联系人电话`" :prop="`phone`" :rules="linkmanRules.phone">
                  <el-input v-model="item.phone" placeholder="请输入联系人电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="`联系人邮箱`" :prop="`email`" :rules="linkmanRules.email">
                  <el-input v-model="item.email" placeholder="请输入联系人邮箱"></el-input>
                </el-form-item>                             
              </el-col>            
            </el-row>
          <!-- for -->
          <el-form-item>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="addlinkMan(false)">新增联系人</el-button>
          </el-form-item>      
          <el-form-item label="学校简介" prop="description">
            <el-input type="textarea" v-model="edit.description" placeholder="请输入学校简介" :rows="4"></el-input>
          </el-form-item>  
          <el-row :gutter="5"></el-row>
          <el-form-item label="栏目模板">
            <el-select v-model="edit.channelTemplateId" placeholder="请选择栏目播放模板" disabled>
              <el-option
                v-for="item in templateidList"
                :key="item.templateId"
                :label="item.name"
                :value="item.templateId">
              </el-option>            
            </el-select>    
            <!-- <a href="javascript:;" style="color:#409EFF;margin-left:10px;" v-show="edit.templateid">预览</a>                           -->
          </el-form-item>       
          <el-form-item label="内容复审">
            <el-radio-group v-model="edit.reviewFlag">
              <el-radio :label="1">需要</el-radio>
              <el-radio :label="0">不需要</el-radio>
            </el-radio-group>
          </el-form-item>  
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item prop="honorImage">
                  <h4>学校荣誉牌</h4>
                  <el-upload
                    ref="upload"
                    :style="{ backgroundImage : editImageUrl3 }"
                    class="upload-image"
                    action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                    name="honorImage"
                    :data="{type: '0'}"
                    :multiple="false"
                    accept="image/jpeg,image/gif,image/png,image/bmp" 
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="handleEditImageSuccess"
                    :before-upload="beforeImageUpload">
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="honorImage">
                  <h4>学校全景图</h4>
                  <el-upload
                    ref="upload"
                    :style="{ backgroundImage : editImageUrl4 }"
                    class="upload-image"
                    action="/qxiao-cms/action/mod-xiaojiao/region/addImage.do"
                    name="honorImage"
                    :data="{type: '1'}"
                    :multiple="false"
                    accept="image/jpeg,image/gif,image/png,image/bmp" 
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="handleEditImageSuccess"
                    :before-upload="beforeImageUpload">
                  </el-upload>
                </el-form-item>
            </el-col>
          </el-row>            
          <!-- <el-row style="text-align:center">
            <el-button size="mini" @click="dialogEdit = false">取消</el-button>
            <el-button size="mini" type="primary" @click="editorForm('editForm')">保存</el-button>
          </el-row>                                              -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogEdit = false">取消</el-button>
          <el-button size="small" type="primary" @click="editorForm('editForm')">确定</el-button>
        </span>          
      </el-dialog>
    </template>
    <!-- 栏目模板详细预览 -->
    <template></template>
  </div>  
</template>
<script>
import service from "@/api";
import region from "@/components/region";
import regiont from "@/components/qxregion";
import pagination from "@/components/pagination";
import { isPhone } from "@/utils/validator";
export default {
  name: "schoolManagement",
  components: {
    "qx-region": region,
    "qx-region-t": regiont,
    "qx-pagination": pagination
  },
  data() {
    return {
      dialogAdd: false,
      dialogEdit: false,
      previewChannel: false,
      formLabelWidth: "100px",
      query: {
        queryId: "",
        queryType: "",
        schoolName: "",
        page: 1,
        pageSize: 20
      },
      totalCount: 0,
      schoolId: null,
      //学校
      schoolList: [],
      //标签列表
      labelsList: [],

      propertyidList: [],
      typeidList: [],

      templateidList: [],
      addImageUrl1: "",
      addImageUrl2: "",
      editImageUrl3: "",
      editImageUrl4: "",
      tableData: [],
      channelData: [],
      edit: {
        schoolImage: [{}, {}],
        linkMan: []
      },
      addForm: {
        channelTemplateId: null,
        regionId: [],
        reviewFlag: 0,
        masterEmail: "",
        headEmail: "",
        schoolImage: [{}, {}],
        linkMan: []
      },
      linkmanRules: {},
      rules: {
        regionId: [{ required: true, message: "请选择区域", trigger: "blur" }],
        name: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
        propertyId: [
          { required: true, message: "请选择学校性质", trigger: "blur" }
        ],
        masterEmail: [
          //{ required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            required: false,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        headEmail: [
          //{ required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur"]
          }
        ],
        typeId: [
          { required: true, message: "请选择学校类型", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
        // channelTemplateId: [
        //   { required: true, message: "请选择栏目模板", trigger: "blur" }
        // ]
      }
    };
  },
  computed: {
    //设置表格高度
    tableHeight() {
      return window.innerHeight - 255;
    }
  },
  methods: {
    pageChange(curr) {
      this.query.page = curr;
      this.showSchoolList();
    },
    pageSize(size) {
      this.query.pageSize = size;
      this.showSchoolList();
    },
    //新增联系人
    addlinkMan(flags) {
      let addLinkMan = this.addForm.linkMan;
      let editLinkMan = this.edit.linkMan;
      if (flags) {
        addLinkMan.push({ linkMan: "", phone: "", email: "" });
      } else {
        editLinkMan.push({ linkMan: "", phone: "", email: "" });
      }
    },
    handleRegionChange(queryId, queryType) {
      this.query.queryId = queryId;
      this.query.queryType = queryType;
    },
    handleSearch() {
      this.showSchoolList(this.query);
    },
    //学校删除
    handleDel(row) {
      this.$confirm(`确定要删除学校吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteSchool(row.schoolId);
        })
        .catch(error => {
          return false;
        });
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.edit = Object.assign({}, row, { regionId: [] });
      let { schoolImage } = this.edit;
      if (schoolImage[0]) {
        this.editImageUrl3 = `url(${row.schoolImage[0].imageUrl})`;
      }
      if (schoolImage[1]) {
        this.editImageUrl4 = `url(${row.schoolImage[1].imageUrl})`;
      }
      this.findRegion(row.regionId);
    },
    show() {},
    close() {
      this.$nextTick(() => {
        this.editImageUrl3 = "";
        this.editImageUrl4 = "";
      });
    },
    addsForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { regionId, ...args } = this.addForm;
          let obj = Object.assign({}, args, {
            regionId: regionId[regionId.length - 1]
          });
          this.addSchool(obj);
        } else {
          return false;
        }
      });
    },
    editorForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {
            propertyName,
            typeName,
            regionId,
            postTime,
            ...args
          } = this.edit;
          let obj = Object.assign({}, args, {
            regionId: regionId[regionId.length - 1]
          });
          this.updateSchool(obj);
        } else {
          return false;
        }
      });
    },
    lastInnerChange(value) {
      this.addForm.regionId = value;
    },
    lastInnerEditChange(value) {
      this.edit.regionId = value;
    },
    handleSchool(value) {
      this.query.schoolId = value;
    },
    handleClear() {
      this.query.schoolId = 0;
    },
    //上传成功后的函数 新增
    handleImageSuccess(response, file, fileList) {
      let schoolImage = this.addForm.schoolImage;
      let imgObj = {
        imageUrl: response.data.url,
        smallUrl: response.data.smallUrl,
        type: response.data.type
      };
      if (response.errorCode === 0) {
        if (response.data.type == "0") {
          schoolImage[0] = Object.assign({}, imgObj);
          this.addImageUrl1 = `url(${response.data.url})`;
        } else if (response.data.type == "1") {
          schoolImage[1] = Object.assign({}, imgObj);
          this.addImageUrl2 = `url(${response.data.url})`;
        }
      }
    },
    //上传成功后的函数 编辑
    handleEditImageSuccess(response, file, fileList) {
      let schoolImage = this.edit.schoolImage;
      let imgObj = {
        imageUrl: response.data.url,
        smallUrl: response.data.smallUrl,
        type: response.data.type
      };
      let type = response.data.type;
      if (response.errorCode === 0) {
        if (response.data.type == "0") {
          if (schoolImage.lenght) {
            schoolImage[0] = Object.assign({}, imgObj, {
              imageId: schoolImage[0].imageId
            });
          } else {
            schoolImage[0] = Object.assign({}, imgObj);
          }
          this.editImageUrl3 = `url(${response.data.url})`;
        } else if (response.data.type == "1") {
          if (schoolImage.lenght) {
            schoolImage[1] = Object.assign({}, imgObj, {
              imageId: schoolImage[1].imageId
            });
          } else {
            schoolImage[1] = Object.assign({}, imgObj);
          }
          this.editImageUrl4 = `url(${response.data.url})`;
        }
      }
    },
    //图片上传大小限制为2M
    beforeImageUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB!");
      }
      return isLt2M;
    },
    // async queryRegion(queryId, queryType) {
    //   let res = await service.queryRegion({ queryId, queryType });
    //   //默认查询全部
    //   if (res.errorCode === 0) {
    //     if (queryType === 0) {
    //       this.provinceList = res.data;
    //     } else if (queryType === 1) {
    //       this.cityList = res.data;
    //     } else if (queryType === 2) {
    //       this.areaList = res.data;
    //     }
    //   }
    // },
    // async queryRegion(value) {
    //   let last = value[value.length - 1];
    //   let res = await service.queryRegion({ queryId: last, queryType: 3 });
    //   if (res.errorCode === 0) {
    //     this.schoolList = res.data;
    //   } else {
    //     return false;
    //   }
    // },
    //根据区域ID查省市
    async findRegion(regionId) {
      let res = await service.findRegion({ regionId });
      if (res.errorCode === 0) {
        this.edit.regionId = [
          res.data.province,
          res.data.city,
          res.data.region
        ];
      }
    },
    //查询栏目模板
    async queryChannelTemplateAll() {
      let res = await service.queryChannelTemplateAll({});
      if (res.errorCode === 0) {
        this.templateidList = res.data;
        //设置默认栏目模板
        let d = this.templateidList.find(item => item.type === 1);
        this.addForm.channelTemplateId = d.templateId;
      }
    },
    //栏目模板详细预览
    async handlePreviewChannelTemplate() {
      let templateId = this.addForm.channelTemplateId;
      let res = await service.previewChannelTemplateDetail({ templateId });
      if (res.errorCode === 0) {
        this.previewChannel = true;
        this.channelData = res.data;
      }
    },
    //查询标签
    async queryLabel() {
      let res = await service.queryLabel({ queryType: 1 });
      if (res.errorCode === 0) {
        this.labelsList = res.data;
      }
    },
    //查询学校类别
    async querySchoolCategory(params = {}) {
      let res = await service.querySchoolCategory(params);
      if (res.errorCode === 0) {
        if (params.queryType) {
          this.typeidList = res.data;
        } else {
          this.propertyidList = res.data;
        }
      }
    },
    //新增学校
    async addSchool(params = {}) {
      let res = await service.addSchool(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogAdd = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.showSchoolList();
        this.$refs.addForm.resetFields();
      }
    },
    //编辑学校
    async updateSchool(params = {}) {
      let res = await service.updateSchool(params, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.errorCode === 0) {
        this.dialogEdit = false;
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.showSchoolList();
      }
    },
    //删除学校
    async deleteSchool(schoolId) {
      let res = await service.deleteSchool({ schoolId });
      if (res.errorCode === 0) {
        this.$message({ message: `${res.errorMsg}`, type: "success" });
        this.showSchoolList();
      }
    },
    //显示学校列表
    async showSchoolList() {
      let res = await service.showSchoolList(this.query);
      if (res.errorCode === 0) {
        this.tableData = res.data.data;
        this.totalCount = res.data.totalCount;
      } else if (res.errorCode === -1) {
      }
    }
  },
  mounted() {
    this.queryLabel();
    this.queryChannelTemplateAll();
    this.querySchoolCategory({ queryType: 0 });
    this.querySchoolCategory({ queryType: 1 });
    this.showSchoolList();
    //this.queryRegion(0, 0);
  }
};
</script>
<style lang="less" scoped>
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
