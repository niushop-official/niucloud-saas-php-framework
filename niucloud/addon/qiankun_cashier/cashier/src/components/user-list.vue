<template>
  <div class="flex" v-if="siteInfo && siteInfo.app && siteInfo.app.indexOf('shop') >= 0">
    <div class="w-[500px] bg-[#fff] rounded-[20px] flex">
      <div class="flex-1 flex flex-col">
        <div class="flex items-center justify-between m-[20px]">
          <div class="text-lg font-bold">用户列表</div>
        </div>
        <div class="flex text-sm ml-[20px] mr-[20px]">
          <input type="text"
                 class="flex-1 border-t border-l border-b border-[#f1f1f1] input h-[40px] pl-[20px]"
                 placeholder="搜索手机号/ID">
          <div class="bg-[#4781fc] text-[#fff] search w-[60px] text-center leading-[40px]">搜索</div>
        </div>

        <el-scrollbar class="flex-1 mt-[20px]">
          <div class="border-b border-[#f7f7f7] p-[20px] flex items-center cursor-pointer"
               v-for="(item, index) in 20" :key="index" :class="{ 'bg-[#f3f8ff]': activeIndex == index }">
            <el-image
                :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
            <div class="flex-1 ml-10px items-center justify-between">
              <div class="flex">
                <div class="font-bold text-sm max-w-200px text-overflow">刘超{{ item }}</div>
                <div class="text-xs ml-10px">(ID:3158)</div>
                <div class="text-xs ml-10px">手机号:15523456789</div>
              </div>
              <div class="text-sm">
                <span>余额:<span class="text-[#f5222d] ml-10px">115646.8</span></span>
                <span>积分:<span class="text-[#f5222d] ml-10px">1156446488</span></span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="flex-1 flex flex-col rounded-[20px] ml-[20px]">
      <div class="flex bg-[#f5f5f5] leading-50px relative">
        <div class="absolute w-400px bg-[#fff] h-[50%] bottom-0"></div>
        <div class="pl-30px pr-30px relative cursor-pointer"
             :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 0, 'bg-[#f5f5f5] radius-tl-20 radius-tr-20 radius-br-20': tabIndex == 1, 'bg-[#f5f5f5]': tabIndex == 2 }"
             @click="tabIndex = 0">会员详情
        </div>
        <div class="pl-30px pr-30px relative cursor-pointer"
             :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 1, 'bg-[#f5f5f5] radius-tl-20 radius-tr-20 radius-bl-20': tabIndex == 0, 'bg-[#f5f5f5] radius-br-20': tabIndex == 2 }"
             @click="tabIndex = 1">付费会员
        </div>
        <div class="pl-30px pr-30px relative cursor-pointer"
             :class="{ 'bg-[#fff] radius-tl-20 radius-tr-20': tabIndex == 2, 'bg-[#f5f5f5]': tabIndex == 0, 'bg-[#f5f5f5] radius-bl-20 radius-tr-20': tabIndex == 1 }"
             @click="tabIndex = 2">余额充值
        </div>
        <div class="pl-30px pr-30px relative bg-[#f5f5f5]" :class="{ 'radius-bl-20': tabIndex == 2 }">
        </div>
      </div>
      <el-scrollbar class="flex-1 p-[20px] bg-[#fff] rounded-[20px]" :class="{ 'radius-tl-0': tabIndex == 0 }">
        <div v-if="tabIndex == 0">
          <div class="bg-[rgba(255,119,0,.05)] flex p-[20px] rounded-[20px]">
            <el-image
                :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                class="w-[50px] h-[50px] rounded-full" fit="cover"></el-image>
            <div class="flex-1 flex flex-col justify-between items-start ml-[10px]">
              <div class="font-bold">刘超</div>
              <div class="text-sm">
                <span class="text-[#666]">15523456789</span>
                <span class="ml-[40px]">余额 <span class="text-lg text-[#f5222d]">10045.58</span></span>
                <span class="ml-[20px]">积分 <span class="text-lg text-[#f5222d]">10045</span></span>
              </div>
            </div>
          </div>

          <div class="flex mt-20px text-sm">
                        <span class="p-10px pt-5px pb-5px rounded-full text-[#666] mr-20px cursor-pointer"
                              :class="{ 'bg-[#1890ff] text-[#fff]': switchIndex == 0 }"
                              @click="switchIndex = 0">用户信息</span>
            <span class="p-10px pt-5px pb-5px rounded-full text-[#666] mr-20px cursor-pointer"
                  :class="{ 'bg-[#1890ff] text-[#fff]': switchIndex == 1 }"
                  @click="switchIndex = 1">消费记录</span>
            <span class="p-10px pt-5px pb-5px rounded-full text-[#666] mr-20px cursor-pointer"
                  :class="{ 'bg-[#1890ff] text-[#fff]': switchIndex == 2 }"
                  @click="switchIndex = 2">积分明细</span>
            <span class="p-10px pt-5px pb-5px rounded-full text-[#666] mr-20px cursor-pointer"
                  :class="{ 'bg-[#1890ff] text-[#fff]': switchIndex == 3 }"
                  @click="switchIndex = 3">持有优惠券</span>
            <span class="p-10px pt-5px pb-5px rounded-full text-[#666] mr-20px cursor-pointer"
                  :class="{ 'bg-[#1890ff] text-[#fff]': switchIndex == 4 }"
                  @click="switchIndex = 4">余额明细</span>
          </div>

          <el-form label-width="100px" v-if="switchIndex==0">
            <div class="flex mt-20px">
              <div class="w-3px bg-[#1890ff] rounded-full"></div>
              <div class="flex-1 ml-10px">用户信息</div>
            </div>
            <div class="grid3">
              <el-form-item label="用户ID">
                <el-input v-model="userInfo.member_id"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名">
                <el-input v-model="userInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="userInfo.mobile"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="userInfo.sex"></el-input>
              </el-form-item>
            </div>

            <!-- <div class="flex mt-20px">
              <div class="w-3px bg-[#1890ff] rounded-full"></div>
              <div class="flex-1 ml-10px">用户概况</div>
            </div>
            <div class="grid3">
              <el-form-item label="用户状态">
                <el-input v-model="userInfo.is_del"></el-input>
              </el-form-item>
              <el-form-item label="用户等级">
                <el-input v-model="userInfo.is_member"></el-input>
              </el-form-item>
              <el-form-item label="推广人">
                <el-input v-model="userInfo.id_card"></el-input>
              </el-form-item>
              <el-form-item label="注册时间">
                <el-input v-model="userInfo.id_card"></el-input>
              </el-form-item>
              <el-form-item label="登录时间">
                <el-input v-model="userInfo.id_card"></el-input>
              </el-form-item>
            </div> 

             <div class="flex mt-20px">
              <div class="w-3px bg-[#1890ff] rounded-full"></div>
              <div class="flex-1 ml-10px">用户备注</div>
            </div>
            <div class="grid3">
              <el-form-item label="备注">
                <el-input v-model="userInfo.mark" type="textarea"></el-input>
              </el-form-item>
            </div> -->
          </el-form>

          <div v-if="switchIndex == 1" class="mt-20px">
            <el-table empty-text="暂无消费记录" :data="orderList">
              <el-table-column prop="id" label="订单ID" width="80"></el-table-column>
              <el-table-column prop="goods" label="商品" width="250">
                <template #default="scope">
                  <div class="flex mt-10px" v-for="(item, index) in scope.row.goods" :key="index">
                    <el-image
                        :src="img(item.img)"
                        class="w-[40px] h-[40px] rounded-5px" fit="cover"></el-image>
                    <div class="flex-1 ml-5px">
                      <div class="flex-1 flex items-center">
                        <div class="flex-1 text-overflow w-0">{{ item.name }}</div>
                      </div>
                      <div class="text-sm text-[#999]">x{{ item.num }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="价格"></el-table-column>
              <el-table-column prop="discount" label="优惠"></el-table-column>
              <el-table-column prop="pay_price" label="实付"></el-table-column>
              <el-table-column prop="create_time" label="时间" width="180"></el-table-column>
            </el-table>
          </div>

          <div v-if="switchIndex == 2" class="mt-20px">
            <el-table empty-text="暂无积分记录" :data="integralList">
              <el-table-column prop="id" label="来源/用途" width="80"></el-table-column>
              <el-table-column prop="number" label="积分变化"></el-table-column>
              <el-table-column prop="after" label="变化后积分"></el-table-column>
              <el-table-column prop="create_time" label="时间" width="180"></el-table-column>
              <el-table-column prop="mark" label="备注"></el-table-column>
            </el-table>
          </div>

          <div v-if="switchIndex == 3" class="mt-20px">
            <el-table empty-text="暂无积分记录" :data="couponList">
              <el-table-column prop="title" label="优惠券名称" width="200"></el-table-column>
              <el-table-column prop="coupon_price" label="面值"></el-table-column>
              <el-table-column prop="validate" label="有效期(天)"></el-table-column>
              <el-table-column prop="create_time" label="兑换时间" width="180"></el-table-column>
            </el-table>
          </div>

          <div v-if="switchIndex == 4" class="mt-20px">
            <el-table empty-text="暂无积分记录" :data="integralList">
              <el-table-column prop="title" label="动作"></el-table-column>
              <el-table-column prop="number" label="积分变化"></el-table-column>
              <el-table-column prop="after" label="变化后积分"></el-table-column>
              <el-table-column prop="create_time" label="时间" width="180"></el-table-column>
              <el-table-column prop="mark" label="备注"></el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="tabIndex == 1">
          <div class="mt-20px">
            <span class="text-[#666]">会员时长：<span class="text-[#1890ff] ml-20px">30</span>天（2025-03-28 10:08:55 到期）</span>
          </div>
          <div class="grid mt-20px">
            <div class="item text-center" v-for="(item, index) in 10" :key="index" @click="vipIndex = index"
                 :class="{'bg-[#1890ff] text-[#fff]': vipIndex == index, 'border border-[#1890ff] text-[#1890ff]': vipIndex != index}">
              <div>月卡{{ item }}</div>
              <div>￥<span class="font-bold text-18px mt-20px mb-20px">100.00</span></div>
              <div class="line-through text-sm"
                   :class="{'text-[#fff]': vipIndex == index, 'text-[#999]': vipIndex != index}">￥120.00
              </div>
            </div>
          </div>

          <div class="lc-btn-group">
            <div class="lc-btn">点击支付</div>
          </div>
        </div>
        <div v-if="tabIndex == 2">
          <div class="flex justify-between items-center">
            <el-image
                :src="img('https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg')"
                class="w-[70px] h-[70px] rounded-full" fit="cover"></el-image>
            <div class="flex-1 flex justify-between ml-[10px]">
              <div>
                <div class="font-bold text-lg">刘超</div>
                <div class="text-sm">
                  <span>15523456789</span>
                  <span class="ml-[20px]">余额</span>
                  <span class="font-bold text-[#f5222d] text-lg ml-[5px]">15789.58</span>
                  <span class="ml-[20px]">积分</span>
                  <span class="font-bold text-[#f5222d] text-lg ml-[5px]">4864648</span>
                  <span class="ml-[20px]">付费会员到期</span>
                  <span class="ml-[5px] text-[#1890ff]">永久会员</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex mt-[40px] ml-50px mr-50px">
            <div class="text-sm w-[80px] font-bold">充值套餐</div>
            <div class="grid3 flex-1">
              <div class="rounded-[10px] p-[15px] text-center text-sm cursor-pointer"
                   :class="{ 'text-white bg-[#1890ff]': rechargeIndex == index, 'border border-[#1890ff]': rechargeIndex != index }"
                   v-for="(item, index) in 10" :key="index" @click="rechargeIndex = index">
                <div>
                  <span>￥</span>
                  <span class="text-2xl">{{ item }}</span>
                </div>
                <div class="mt-[10px]">额外赠送：￥10</div>
              </div>
            </div>
          </div>
          <div class="flex mt-[20px] items-center ml-50px mr-50px">
            <div class="text-sm w-[80px] font-bold">自定义金额</div>
            <input type="number" v-model="rechargeMoney"
                   class="h-35px border pl-10px rounded-5px w-400px max-w-[60%]">
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
  <div v-else>
    <el-empty description="商城未启用"/>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { img } from '@/utils/common'
import storage from '@/utils/storage'
import { UserInfoInterface } from '@/interface/UserInfoInterface'

const activeIndex = ref(0)
const tabIndex = ref(1)
const rechargeIndex = ref(0)
const rechargeMoney = ref(0)
const switchIndex = ref(0)
const vipIndex = ref(0)
const userInfo = ref<UserInfoInterface>({
} as UserInfoInterface)

interface SiteInfoInterface {
  app: string[]
}

const siteInfo = ref<SiteInfoInterface>({} as SiteInfoInterface)
onMounted(() => {
  siteInfo.value = storage.get('siteInfo')
})

const orderList = ref([
  {
    id: 1,
    goods: [
      {
        id: 1,
        name: '商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1',
        price: 100,
        num: 1,
        img: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg'
      },
      {
        id: 2,
        name: '商品2',
        price: 100,
        num: 1,
        img: 'https://yiyangtang.qkkj168.com/uploads/store/comment/20240908/a8c4dc0d405dee0f4026fdc97b89a98c.jpg'
      }
    ],
    total: 200,
    discount: 20,
    pay_price: 180,
    create_time: '2025-02-25 12:45:21',
  }
])

const integralList = ref([
  {
    id: 1,
    number: 20,
    after: 20,
    create_time: '2025-02-25 12:45:21',
    mark: '备注',
  },
  {
    id: 2,
    number: 20,
    after: 20,
    create_time: '2025-02-25 12:45:21',
    mark: '备注',
  },
  {
    id: 3,
    number: 20,
    after: 20,
    create_time: '2025-02-25 12:45:21',
    mark: '备注',
  },
])

const couponList = ref([
  {
    title: '测试优惠券',
    coupon_price: 20,
    validate: 20,
    create_time: '2025-02-25 12:45:21',
  },
  {
    title: '测试优惠券',
    coupon_price: 20,
    validate: 20,
    create_time: '2025-02-25 12:45:21',
  },
  {
    title: '测试优惠券',
    coupon_price: 20,
    validate: 20,
    create_time: '2025-02-25 12:45:21',
  },
])
</script>

<style scoped lang="scss">
.input {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.search {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
