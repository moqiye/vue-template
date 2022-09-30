<template>
  <div class="wrap">
    <div class="topLevel">
      <div
        :class="{ isActiveLevel: activeTab === 'common' }"
        @click="activeTab = 'common'"
      >
        普通事件
      </div>
      <div
        :class="{ isActiveLevel: activeTab === 'fx' }"
        @click="activeTab = 'fx'"
      >
        防汛防台事件
      </div>
    </div>
    <van-form ref="refForm" @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formValue.originator"
          name="originator"
          label="发起人"
          placeholder="发起人"
          required
          readonly
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.department"
          name="department"
          key="department"
          label="部门"
          is-link
          readonly
          placeholder="部门"
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
          @click="handlePickerDepartment"
        />
        
        <van-field
          key="contact"
          v-model="formValue.contact"
          name="contact"
          label="联系方式"
          placeholder="联系方式"
          required
          :rules="[{ pattern: /\d{11}/, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.unifiedAddress"
          key="unifiedAddress"
          name="unifiedAddress"
          label="统一地址"
          placeholder="统一地址"
          readonly
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.unifiedCode"
          key="unifiedCode"
          name="unifiedCode"
          label="统一地址码"
          readonly
          placeholder="统一地址码"
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.county"
          key="county"
          name="county"
          label="区县"
          placeholder="区县"
          required
          readonly
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.town"
          key="town"
          name="town"
          label="镇街"
          placeholder="镇街"
          required
          readonly
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.village"
          key="village"
          name="village"
          label="村社"
          placeholder="村社"
          required
          readonly
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.grid"
          key="grid"
          name="grid"
          label="网格"
          placeholder="网格"
          required
          is-link
          readonly
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
          @click="handleCascaderGrid"
        />
      
        <van-field
          v-model="formValue.longitude"
          key="longitude"
          name="longitude"
          label="经度"
          placeholder="经度"
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.latitude"
          key="latitude"
          name="latitude"
          label="纬度"
          placeholder="纬度"
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <van-field
          v-model="formValue.eventType"
          key="eventType"
          name="eventType"
          label="事件类型"
          placeholder="事件类型"
          required
          is-link
          readonly
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
          @click="handleCascaderEventType"
        />
       
        <van-field
          v-model="formValue.eventNature"
          name="eventNature"
          key="eventNature"
          label="事件性质"
          is-link
          readonly
          placeholder="事件性质"
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
          @click="handlePickerEventNature"
        />
       
        <div v-if="activeTab === 'fx'">
          <van-field
            v-model="mapDangerousType[formValue.dangerousType]"
            name="dangerousType"
            key="dangerousType"
            label="险情类型"
            is-link
            readonly
            placeholder="险情类型"
            required
            :rules="[{ required: true, message: `请填写险情类型` }]"
            input-align="right"
            @click="handlePickerDangerousType(item)"
          />
         
        </div>
        <van-field
          v-model="degreeMap[formValue.eventDegree]"
          key="eventDegree"
          name="eventDegree"
          label="紧急程度"
          placeholder="紧急程度"
          required
          :rules="[{ required: true, message: `请填写` }]"
          input-align="right"
        />
        <div class="custom-header">
          <span class="requiredStar">事件描述</span>
        </div>
        <div class="custom-wrap">
          <van-field
            v-model="formValue.eventDescription"
            key="eventDescription"
            name="eventDescription"
            label=""
            :rows="3"
            autosize
            type="textarea"
            placeholder="事件描述"
            required
            :rules="[{ required: true, message: `请填写` }]"
            input-align="left"
          />
        </div>
      </van-cell-group>
    </van-form>
    <div style="margin: 16px">
      <van-button block type="primary" @click="handleReport('1')">
        自办结
      </van-button>
    </div>
    <div style="margin: 16px">
      <van-button block type="primary" @click="handleReport('2')">
        上报
      </van-button>
    </div>
    <div style="margin: 16px">
      <van-button block type="success" @click="handleReport('3')">
        一键上报
      </van-button>
    </div>
  </div>

  <van-popup v-model:show="showDeptPicker" position="bottom">
          <van-picker
            :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
            :columns-field-names="{
              text: 'label',
              values: 'value',
              children: 'children',
            }"
            @confirm="onConfirmDept"
            @cancel="showDeptPicker = false"
          />
        </van-popup>

  <van-popup v-model:show="showCascaderGrid" round position="bottom">
          <van-cascader
            v-model="formValue.grid"
            active-color="#1989fa"
            title="选择网格"
            :options="options"
            @close="showCascaderGrid = false"
            @finish="onFinishGrid"
          />
        </van-popup>
        <van-popup v-model:show="showCascaderEventType" round position="bottom">
          <van-cascader
            v-model="cascaderValueEventType"
            title="选择事件类型"
            :options="options"
            @close="showCascaderEventType = false"
            @finish="onFinishEventType"
          />
        </van-popup>
        <van-popup v-model:show="showEventNaturePicker" position="bottom">
          <van-picker
          :columns="['杭州', '宁波', '温州', '嘉兴', '湖州']"
          
            @confirm="onConfirmEventNature"
            @cancel="showEventNaturePicker = false"
          />
        </van-popup>
        <van-popup v-model:show="showDangerousTypePicker" position="bottom">
            <van-picker
              :columns="columnsDangerousType"
              :columns-field-names="{
                text: 'label',
                values: 'value',
                children: 'children',
              }"
              @confirm="onConfirmDangerousType"
              @cancel="showDangerousTypePicker = false"
            />
          </van-popup>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from "vue";

import { Dialog } from "vant";



const activeTab = ref<string>("common");

  const options = [
      {
        text: '浙江省',
        value: '330000',
        children: [{ text: '杭州市', value: '330100' }],
      },
      {
        text: '江苏省',
        value: '320000',
        children: [{ text: '南京市', value: '320100' }],
      },
    ];


// new
const generateForm = () => {
  return {
    originator: "",
    department: "",
    unifiedAddress: "杭州市余杭区瓶窑镇窑北村山茅坞公交站旁3号厂房",
    unifiedCode: "330110110239004006741",
    county: "",
    countyCode: "",
    town: "",
    townCode: "",
    village: "",
    villageCode: "",
    grid: "",
    gridCode: "",
    longitude: "119.9386654",
    latitude: "30.40718236",
    eventType: "",
    eventTypeCode: "",
    eventNature: "",
    eventDegree: "",
    dangerousType: "",
  };
};
const formValue = ref(generateForm());
// 部门
const showDeptPicker = ref(false);

const currentDeptPicker = ref();
const handlePickerDepartment = (item: any) => {
  showDeptPicker.value = true;
};

const onConfirmDept = (value: any) => {
  formValue.value.department = value;
  showDeptPicker.value = false;
};

const fieldValueCas = ref<string>("");
const mapGrid = ref({});
const showCascaderGrid = ref(false);
const casOptionsGrid = ref([]);
const cascaderValueGrid = ref("");
const fieldNamesGrid = ref({
  text: "label",
  value: "value",
  children: "children",
});
const handleCascaderGrid = (item: any) => {
  // const val = formValue.value.grid
  // if(val) {
  //   cascaderValueGrid.value = val
  // }
  showCascaderGrid.value = true;
};
const onFinishGrid = ({ value, selectedOptions }: any) => {
  formValue.value.grid = value;
  showCascaderGrid.value = false;
  // findParentNodes(value)
};

const changeLabelValue = (root: any) => {
  if (root.children !== null && root.children?.length === 0) {
    root.children = null;
  }
  root.label = root.name;
  root.value = root.id;
  root.children?.forEach((item: any) => changeLabelValue(item));
};

const createMap = (dataO: any) => {
  const data = dataO;
  const tempMap: any = {};
  const dfs = (root: any, key: string, value: string) => {
    tempMap[root[key]] = root[value];
    if (root.children !== null && root.children?.length === 0) {
      root.children = null;
    }
    root.children?.forEach((item: any) => dfs(item, key, value));
  };
  const tempData = {
    value: "119888a",
    label: "top0",
    children: data,
  };
  dfs(tempData, "value", "label");
  return tempMap;
};

// 事件类型
const mapEventType = ref({});
const showCascaderEventType = ref(false);
const casOptionsEventType = ref([]);
const cascaderValueEventType = ref("");
const fieldNamesEventType = ref({
  text: "label",
  value: "value",
  children: "children",
});
const handleCascaderEventType = (item: any) => {
  const val = formValue.value.eventType;
  if (val) {
    cascaderValueEventType.value = val;
  }
  showCascaderEventType.value = true;
};
const onFinishEventType = ({ value, selectedOptions }: any) => {
  formValue.value.eventType = value;
  formValue.value.eventTypeCode = value;
  showCascaderEventType.value = false;
};

// 紧急程度
const degreeMap = ref({});

// 事件性质
const showEventNaturePicker = ref(false);
const mapEventNature = ref({});
const columnsEventNature = ref([]);
const currentEventNaturePicker = ref();
const handlePickerEventNature = (item: any) => {
  showEventNaturePicker.value = true;
};

const onConfirmEventNature = (value: any) => {
  formValue.value.eventNature = value;
  showEventNaturePicker.value = false;
};

// 险情类型
const showDangerousTypePicker = ref(false);
const mapDangerousType = ref({});
const columnsDangerousType = ref([]);
const handlePickerDangerousType = (item: any) => {
  showDangerousTypePicker.value = true;
};

const onConfirmDangerousType = (value: any) => {
  const item = JSON.parse(JSON.stringify(value))[0];
  formValue.value.dangerousType = item.value;
  showDangerousTypePicker.value = false;
};

const refForm = ref();
const dynamicForm = ref();

interface IForm {
  originator: string;
  pictures: any[];
  [key: string]: any;
}

const distParams = [
  // 'time_config',
  // 'sex',
  // 'event_type',
  "item_properties",
  // 'item_source',
  // 'purpose',
  // 'pivot_center',
  // 'person_type',
  // 'delegate_type',
  // 'document_type',
  // 'assigned_window',
  "danger_type",
  // 'event_level',
  // 'event_status',
  // 'emergency_degree',
  // 'assigned_window',
];

onMounted(() => {});

watch(activeTab, (newVal: string) => {
  currentTaskId.value = null;
});

const findParentNodes = (childCode: string | number) => {
  const results: any = [];
  const queue = [childCode];
  const options: any = casOptionsGrid.value;
  const dfs: any = (root: any, currentCode: string) => {
    if (root.value === currentCode) {
      results.push(root);
      if (root.parentId !== "0") {
        queue.push(root.parentId);
      }
    } else {
      root.children?.forEach((item: any) => dfs(item, currentCode));
    }
  };

  while (queue.length) {
    const head = queue.shift();
    if (!head) {
      break;
    }
    dfs(options[0], head);
  }
  if (results.length === 4) {
    formValue.value.county = results[3].name;
    formValue.value.countyCode = results[3].value;

    formValue.value.town = results[2].name;
    formValue.value.townCode = results[2].value;

    formValue.value.village = results[1].name;
    formValue.value.villageCode = results[1].value;

    // dynamicForm.value.formModel.grid = results[0].name
    formValue.value.gridCode = results[0].value;
  }
};

// 提交相关
const selfRef = ref(); // 自办结
const reRef = ref(); // 上报
const reportRef = ref();

const handleReport = (type: string) => {
  reportType.value = type;
  refForm.value
    ?.validate()
    .catch((err) => {
      Dialog.alert({
        message: "表单填写不完整",
        theme: "round-button",
      }).then(() => {
        //
      });
    })
    .then(() => {
      refForm.value?.submit();
    });
};

const currentTaskId = ref<string | null>(null); // 当前录入后返回的事件ID
const reportType = ref("1");
const onSubmit = async (values: IForm) => {};

const submitDes = async (values: IForm) => {
  // console.log(currentTaskId.value, values);
  // todo:: 根据reportType判断提交类型
  // 参数： form、事件id
  // console.log(values, dynamicForm.value.formModel);
  const finalForm = {
    ...values,
    // ...dynamicForm.value.formModel
  };
  if (activeTab.value === "common") {
    delete finalForm.dangerousType; // 普通事件删除险情字段
  }
  const types: any = {
    // 不同上报的参数
    "1": 0,
    "2": 1,
    "3": 3,
  };
  const params = {
    taskId: currentTaskId.value,
    ...values,
    handleType: types[reportType.value],
  };
  finalSub(params);
};
// 处理、自办结、一键上报
const finalSub = async (params: any) => {};
</script>

<style scoped lang="less">
.wrap {
  background: #fff;
  padding: 15px 0;
  height: 100vh;
  overflow-y: auto;
}
:deep(.van-button) {
  border-radius: 6px;
}
.topLevel {
  display: flex;
  margin: 0px 55px 6px;
  border-radius: 20px;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  border: 1px solid var(--van-button-primary-border-color);
  color: var(--van-button-primary-border-color);
  > div {
    flex: 1;
    text-align: center;
  }
}
.isActiveLevel {
  background: var(--van-button-primary-border-color);
  color: #fff;
}
:deep(.van-icon) {
  line-height: 24px;
}
.custom-header {
  padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  color: var(--van-field-label-color);
  font-size: var(--van-cell-font-size);
}
.custom-wrap {
  padding: 0 var(--van-cell-horizontal-padding);
  :deep(.van-cell) {
    background: #f8f8f8;
    border-radius: 6px;
    margin-top: 10px;
    margin-top: 0;
  }
  :deep(.van-cell:after) {
    display: none;
  }
}
.requiredStar:before {
  margin-right: 2px;
  color: var(--van-field-required-mark-color);
  content: "*";
}
:deep(.van-cell-group--inset) {
  margin: 4px;
}
</style>
