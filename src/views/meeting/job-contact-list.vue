<!-- 创建的工作联系单 -->
<template>
    <div class="job-contact-list">
        <!-- 协作事由 -->
        <van-cell-group>
            <van-field
                v-model="collaborationForMsg"
                rows="3"
                autosize
                label="协作事由"
                type="textarea"
                placeholder="请输入需要协作的工作"
            />
        </van-cell-group>

        <!-- 发起方 -->
        <van-cell title="发起方" is-link :value="initiator.value" @click="initiator.showPopup=true"/>

        <!-- 协作明细 -->
        <div v-for="(item,index) in collaboration.details" :key="index">
            <!-- title -->
            <van-cell-group class="collaboration-title">
                <van-cell :title="`| 协作明细（${index+1}）`" title-class="blue">
                    <van-icon name="delete" @click="collaboration.details.splice(index, 1)" />
                </van-cell>
            </van-cell-group>
            <!-- 协作方 -->
            <van-cell-group>
                <van-cell
                    title="协作方"
                    is-link
                    :value="item.value"
                    @click="collaboration.showPopup=true,
                    collaboration.detailsIndex=index"
                />
            </van-cell-group>
            <!-- 协作事项 -->
            <van-cell-group class="collaboration-matters">
                <!-- 选择协作事项 -->
                <van-cell
                    title="协作事项"
                    is-link
                    value="请选择"
                    value-class="add-width"
                    @click="collaborationDetails(index)"
                >
                    <span slot="default" v-for="(each,index2) in item.mattersList" :key="index2">
                        <span v-if="index2==0">{{each}}</span>
                        <span v-else>、{{each}}</span>
                    </span>
                </van-cell>

                <van-field
                    v-for="(i,index3) in item.mattersList"
                    :key="index3"
                    v-model="item.matters[index3]"
                    rows="3"
                    autosize
                    :label="i"
                    type="textarea"
                    placeholder="请输入事项内容"
                    right-icon="delete"
                    color="#5ca2f8"
                    @click-right-icon="removeMatters(index,index3)"
                />
            </van-cell-group>
            <!-- 备注 -->
            <van-cell-group>
                <van-field
                    v-model="item.remarks"
                    rows="2"
                    autosize
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注"
                />
            </van-cell-group>
            <!-- 完成日期 -->
            <van-cell-group>
                <van-cell
                    title="完成日期"
                    is-link :value="item.finishTime"
                    required
                    @click="dateTime.showPopup=true,collaboration.detailsIndex=index"
                />
            </van-cell-group>
        </div>

        <!-- 增加协作明细 按钮 -->
        <van-button
            class="margin-b"
            icon="add-o"
            size="large"
            type="default"
            @click="addCollaborationDetails"
        >增加协作明细</van-button>

        <!-- 其他 -->
        <van-cell-group class="margin-b">
            <van-field
                v-model="restsMsg"
                rows="2"
                autosize
                label="其他"
                type="textarea"
                placeholder="请输入其他需要的信息"
            />
        </van-cell-group>

        <!-- 图片上传 -->
        <van-cell-group class="uploader-img margin-b">
            <van-cell title="图片">
                <van-uploader slot="default" :after-read="afterRead" />
            </van-cell>
        </van-cell-group>

        <!-- 审批人 -->
        <van-cell-group class="margin-b">
            <van-cell title="审批人" value="张丽丽（主管理员）" />
        </van-cell-group>

        <!-- 重置和提交按钮 -->
        <van-row>
            <van-col span="12">
                <van-button type="default">重置</van-button>
            </van-col>
            <van-col span="12">
                <van-button type="info">提交</van-button>
            </van-col>
        </van-row>



        <!-- 发起方 部门弹窗 -->
        <van-popup
            v-model="initiator.showPopup"
            position="bottom"
            @click-overlay="onInitiatorCancel"
        >
            <van-row>
                <van-col span="12">
                    <van-button type="default" @click="onInitiatorCancel">取消</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="info" @click="onInitiatorConfirm">确定</van-button>
                </van-col>
            </van-row>
            <van-radio-group v-model="initiator.radio">
                <van-cell-group>
                    <van-cell title="客服部" clickable @click="initiator.radio = '客服部'">
                        <van-radio slot="right-icon" name="客服部" />
                    </van-cell>
                    <van-cell title="工程部" clickable @click="initiator.radio = '工程部'">
                        <van-radio slot="right-icon" name="工程部" />
                    </van-cell>
                    <van-cell title="保卫部" clickable @click="initiator.radio = '保卫部'">
                        <van-radio slot="right-icon" name="保卫部" />
                    </van-cell>
                    <van-cell title="餐饮部" clickable @click="initiator.radio = '餐饮部'">
                        <van-radio slot="right-icon" name="餐饮部" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>

        <!-- 协作方 部门弹窗 -->
        <van-popup
            v-model="collaboration.showPopup"
            position="bottom"
            @click-overlay="onCollaborationCancel"
        >
            <van-row>
                <van-col span="12">
                    <van-button type="default" @click="onCollaborationCancel">取消</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="info" @click="onCollaborationConfirm">确定</van-button>
                </van-col>
            </van-row>
            <van-radio-group
                v-if="collaboration.details && collaboration.details.length>0"
                v-model="collaboration.details[collaboration.detailsIndex].radio"
            >
                <van-cell-group>
                    <van-cell
                        v-for="(item,index) in collaboration.section.list"
                        :key="index"
                        :title="item.dictLabel"
                        clickable
                        @click="collaboration.details[collaboration.detailsIndex].radio = item.dictLabel,
                        collaboration.details[collaboration.detailsIndex].serType = item.dictValue"
                    >
                        <van-radio slot="right-icon" :name="item.dictLabel" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-popup>

        <!-- 协作事项弹窗 -->
        <van-popup
            v-model="showMattersPopup"
            position="bottom"
            @click-overlay="onMattersCancel"
        >
            <van-row>
                <van-col span="12">
                    <van-button type="default" @click="onMattersCancel">取消</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="info" @click="onMattersConfirm">确定</van-button>
                </van-col>
            </van-row>
            <van-checkbox-group v-model="checkboxResult">
                <van-cell-group>
                    <van-cell v-for="(item, index) in checkboxList.list"
                        :key="index"
                        clickable
                        :title="item.serviceName"
                        @click="toggle(index)"
                    >
                        <van-checkbox
                            :name="item.serviceName"
                            ref="checkboxes"
                            slot="right-icon"
                        />
                    </van-cell>
                </van-cell-group>
            </van-checkbox-group>
        </van-popup>

        <!-- 时间日期弹窗 -->
        <van-popup
            v-model="dateTime.showPopup"
            position="bottom"
            click-overlay="dateTime.currentDate=new Date()"
        >
            <van-datetime-picker
                v-model="dateTime.currentDate"
                type="datetime"
                :min-date="dateTime.minDate"
                :max-date="dateTime.maxDate"
                @cancel="dateTime.showPopup=false,dateTime.currentDate=new Date()"
                @confirm="onDateTimePopupConfirm"
            />
        </van-popup>

    </div>
</template>

<script>
    import dayjs from 'dayjs'
    import request from '@/plugin/axios'
    import { saveJobConnect } from '@/api/meeting/meetingApi.js'
    import { getCollaboration } from '@/api/meeting/meetingApi.js'
    import { getCollaborationService } from '@/api/meeting/meetingApi.js'
    export default {
        name: "job-contact-list",
        components: {},
        data(){
            return {

                collaborationForMsg: '',  // 协作事由 文本框

                initiator: {  // 发起方
                    showPopup: false,  // 发起方 部门弹窗 显示与隐藏
                    value: '客服部',  // 发起方 单元格内容
                    radio: '客服部',  // 发起方 部门单选框 默认项
                },

                collaboration: {  // 协作方
                    showPopup: false,  // 协作方 部门弹窗 显示与隐藏
                    detailsIndex: 0,  // 协作明细 索引
                    details: [],  // 创建协作明细
                    section: [],  // 协作部门
                },

                checkboxList: [],  // 协作事项 名称列表
                checkboxResult: [],  // 协作事项复选框 选中数组

                showMattersPopup:false,  // 协作事项弹窗 显示与隐藏

                restsMsg: '',  // 其他 文本框

                dateTime: {  // 日期时间弹窗
                    showPopup: false,  // 显示与隐藏
                    minHour: 10,
                    maxHour: 20,
                    minDate: new Date(2010, 0, 1),
                    maxDate: new Date(2030, 0, 1),
                    currentDate: new Date(),
                },
            }
        },
        computed: {

        },
        mounted(){
            this.collaborationSection();
        },
        methods: {

            async collaborationSection(){
                this.collaboration.section=await getCollaboration({'dictType':'meeting_service_type'});
            },

            // 删除服务项
            removeMatters(n1,n2){
                this.collaboration.details[n1].mattersList.splice(n2,1);
                this.collaboration.details[n1].matters.splice(n2,1);
            },

            // 点击 增加协作明细 按钮
            addCollaborationDetails(){
                this.collaboration.details.push({
                    value: '请选择',  // 协作方 单元格内容
                    radio: '请选择',  // 协作方 部门单选框 默认项

                    confirmSerType: '',  // 确认后的 协作方关联的服务项
                    serType: '',  // 关联的服务项

                    mattersList: [], // 确定要创建的 协作事项 数组
                    matters: [],
                    remarks: '',  // 备注
                    finishTime: '请选择',  // 完成时间

                })
            },

            // 点击协作事项单元格
            collaborationDetails(n){
                if (this.collaboration.details[n].value==='请选择'){
                    this.$toast('请先选择协作部门')
                } else {
                    if(this.checkboxList.list.length == 0){
                        this.$toast('该部门无关联服务项')
                    } else {
                        this.showMattersPopup=true;
                    }
                    this.checkboxResult=this.collaboration.details[n].mattersList;
                }
            },

            // 点击 协作方部门弹窗中的 取消按钮
            onCollaborationCancel(){
                this.collaboration.showPopup=false;
                this.collaboration.details[this.collaboration.detailsIndex].radio=
                this.collaboration.details[this.collaboration.detailsIndex].value;

                this.collaboration.details[this.collaboration.detailsIndex].serviceType=
                this.collaboration.details[this.collaboration.detailsIndex].confirmServiceType;
            },

            // 点击 协作方部门弹窗中的 确认按钮
            async onCollaborationConfirm(){
                this.collaboration.showPopup=false;
                if (this.collaboration.details[this.collaboration.detailsIndex].value==
                    this.collaboration.details[this.collaboration.detailsIndex].radio){

                } else {
                    this.collaboration.details[this.collaboration.detailsIndex].value=
                    this.collaboration.details[this.collaboration.detailsIndex].radio;

                    this.collaboration.details[this.collaboration.detailsIndex].confirmSerType=
                    this.collaboration.details[this.collaboration.detailsIndex].serType;

                    this.checkboxList= await getCollaborationService({
                        'type':this.collaboration.details[this.collaboration.detailsIndex].confirmSerType
                    });
                    this.collaboration.details[this.collaboration.detailsIndex].mattersList=[];
                }

                console.log(this.collaboration);
                console.log(this.checkboxList);
            },

            // 点击 协作事项弹窗中的 取消按钮
            onMattersCancel(){
                this.showMattersPopup=false;
                this.collaboration.details[this.collaboration.detailsIndex].checkboxResult=
                this.collaboration.details[this.collaboration.detailsIndex].mattersList;
            },

            // 点击 协作事项弹窗中的 确认按钮
            onMattersConfirm(){
                this.showMattersPopup=false;
                this.collaboration.details[this.collaboration.detailsIndex].mattersList= this.checkboxResult;
                this.checkboxResult=[];
            },



            // 点击 发起方部门弹窗中的 取消按钮
            onInitiatorCancel(){
                this.initiator.showPopup=false;
                this.initiator.radio=this.initiator.value;
            },

            // 点击 发起方部门弹窗中的 确认按钮
            onInitiatorConfirm(){
                this.initiator.showPopup=false;
                this.initiator.value=this.initiator.radio;
            },

            // 点击 日期时间弹窗中的 确认按钮
            onDateTimePopupConfirm(){
                this.dateTime.showPopup=false;
                this.collaboration.details[this.collaboration.detailsIndex].finishTime=
                dayjs(this.dateTime.currentDate).format('YYYY-MM-DD HH:mm');
                this.dateTime.currentDate=new Date();
            },

            // 复选框 toggle 切换
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },

            // 图片上传
            afterRead(file) {
                console.log(file);
            },

        }
    }
</script>

<style lang="less">
    .job-contact-list{
        min-height: 100%;
        .van-cell.van-field {
            display: block;
        }
        .van-row {
            border-top: 1px solid @gray-light;
            .van-button {
                border-radius: 0;
            }
            .van-button--normal{
                padding: 0;
                width: 100%;
                border: none;
                outline: none;
                font-size: @font-size-base;
            }
        }
        .van-field {
            .van-cell__value {
                overflow: visible;
            }
            .van-field__right-icon {
                position: absolute;
                right: 2px;
                top:-24px;
                .van-icon-delete {
                    font-size: 20px;
                }
            }
            .van-icon.van-icon-delete {
                color: #5ca2f8;
            }
        }
        .collaboration-matters {
            .van-cell__title.van-field__label {
                padding-left: 8px;
            }
            .van-field__body {
                border: 1px solid #ebedf0;
                padding: 4px 8px;
            }
            .van-cell:not(:last-child)::after {
                border: none;
            }
        }
        .van-cell__title.blue {
            color: #5ca2f8;
            font-size: 16px;
        }
        .van-cell__value.add-width {
            flex: 3;
        }
        .van-popup--bottom {
            padding-bottom: 20px;
        }
        .margin-b {
            margin-bottom: @spacing-4;
        }
        .margin-b.van-button {
            color: #5ca2f8;
            border: none;
        }
        .uploader-img {
            .van-cell {
                display: block;
            }
            .van-uploader {
                display: block;
            }
        }
        .collaboration-title {
            .van-cell {
                background-color: @background-color;
            }
        }
    }
</style>