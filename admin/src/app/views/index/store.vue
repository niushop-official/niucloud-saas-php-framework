<template>
	<!--应用市场-->
	<div class="main-container app-market bg-body min-h-[70vh]" v-loading="loading">
		<el-card class="box-card app-head !border-none !pb-[0]" shadow="never">
			<div class="flex flex-col mb-[8px]">
				<div class="flex items-center justify-between mb-[5px]">
					<h2 class="text-lg font-semibold">应用列表</h2>
					<i class="iconfont cursor-pointer" @click="switchShowType" :class="showType == 'card' ? 'iconliebiao' : 'iconliebiaoqiehuan'"></i>
				</div>
				<el-tabs v-model="activeName" @tab-change="activeNameTabFn">
					<el-tab-pane name="installed">
						<template #label>
							<span>已安装</span>
						</template>
					</el-tab-pane>
					<el-tab-pane name="uninstalled">
						<template #label>
							<span>未安装</span>
						</template>
					</el-tab-pane>
					<el-tab-pane name="all">
						<template #label>
							<span>已购买</span>
						</template>
					</el-tab-pane>
					<el-tab-pane name="recentlyUpdated">
						<template #label>
							<span class="relative">
								可更新
								<div
									v-if="localList.recentlyUpdated.length"
									class="w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
								></div>
							</span>
						</template>
					</el-tab-pane>
				</el-tabs>
			</div>
			
			<el-form :inline="true" :model="searchParam" ref="searchFormRef" class="search-form" v-if="!loading && !isShowDetail && (activeName == 'installed' || activeName == 'all' || activeName == 'uninstalled')">
				<el-form-item prop="type">
					<el-select v-model="searchParam.type" clearable :placeholder="t('应用类型')" class="input-width">
						<el-option :label="t('应用')" value="app" />
						<el-option :label="t('插件')" value="addon" />
					</el-select>
				</el-form-item>

				<el-form-item prop="keywords">
					<el-input v-model.trim="searchParam.keywords" class="!w-[200px]" :placeholder="t('搜索关键词')" clearable />
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="searchFn()">{{ t('search') }}</el-button>
					<el-button @click="resetForm(searchFormRef)">{{ t('重置') }}</el-button>
				</el-form-item>
			</el-form>

			<div v-if="!loading && !isShowDetail && activeName == 'recentlyUpdated'">
				<div class="flex items-center bg-[#F4F5F7] h-[80px] justify-between px-[20px]">
					<div class="flex items-center">
						<div class="w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative">
							<img class="max-w-full max-h-full" src="@/app/assets/images/app_store/system_version.png" alt="" />
							<div
								v-if="frameworkVersion != frameworkNewVersion"
								class="w-[8px] h-[8px] bg-[red] rounded-[8px] z-1 absolute top-[-2px] right-[-2px]"
							></div>
						</div>
						<div>
							<p class="flex items-center" v-if="frameworkNewVersion != frameworkVersion">
								<span class="text-[16px] font-[500] text-[#1D1F3A]">框架更新</span>
								<span class="text-[12px] text-[#9699B6] ml-[10px]">必须优先更新</span>
							</p>
							<p class="flex items-center" v-else>
								<span class="text-[16px] font-[500] text-[#1D1F3A]">当前框架为最新版 V{{frameworkVersion}}</span>
							</p>
							<p class="text-[14px] text-[#374151]">
								<span v-if="frameworkNewVersion != frameworkVersion" class="">框架 V{{ frameworkVersion }}</span>
								<span v-if="frameworkNewVersion != frameworkVersion" class="iconfont iconjiang-right text-[#F09000] mx-[2px]"></span>
								<span v-if="frameworkNewVersion != frameworkVersion" class="text-[#F09000] mr-[4px]">{{ frameworkNewVersion }}</span>
								<span v-if="frameworkNewVersion != frameworkVersion" class="mr-[4px]">和</span>
								<span class="text-[#F09000] mr-[4px]">{{batchUpgradeApp.length}}</span>
								<span>个应用可更新</span>
							</p>
						</div>
					</div>
					
					<el-button class="ml-[auto]" @click="updateInformationFn({ key: 'niucloud-admin' })">
						<el-icon class="mr-[5px]">
							<DocumentCopy />
						</el-icon>
						更新记录
					</el-button>
					<el-button
						type="primary"
						v-show="activeName == 'recentlyUpdated' || (frameworkVersion != frameworkNewVersion && activeName != 'uninstalled')"
						@click="batchUpgrade"
					>
						一键升级<span v-if="batchUpgradeApp.length"
							>({{ batchUpgradeApp.length }})</span
						>
					</el-button>
				</div>
				<div class="flex items-center justify-between mt-[14px] mb-[6px]">
					<p class="flex items-center text-[12px]">
						<span>共</span>
						<span class="text-[#EF3826]">{{batchUpgradeApp.length}}</span>
						<span>个应用更新</span>
					</p>
					<el-checkbox
						label="全选"
						:model-value="localList[activeName].length && localList[activeName].length == batchUpgradeApp.length"
						@change="appKeyAllSelect"
						value="Value A"
						class="ml-[12px]"
					/>
				</div>
			</div>
		</el-card>
		<div class="flex mb-4 flex-wrap" v-show="showType == 'card' && !isShowDetail">
			<template v-if="localList[activeName].length && !loading">
				<div
					class="rounded-md p-[16px] app-card mb-[20px] ml-[20px] cursor-pointer product-card-item flex justify-between items-start"
					@click="openDetail(row)"
					:class="{ selected: batchUpgradeApp.includes(row.key), 'hidden': row.isHideen}"
					v-for="row in localList[activeName]"
					:key="row.key"
				>
					<div class="flex items-start flex-1 w-0">
						<div class="w-[42px] h-[42px] bg-purple-100 rounded flex items-center justify-center mr-2 relative">
							<div class="w-full h-full overflow-hidden rounded">
								<el-image class="w-full h-full overflow-hidden rounded" :src="row.icon" fit="contain">
									<template #error>
										<div class="flex items-center w-full h-full">
											<img class="max-w-full max-h-full" src="@/app/assets/images/icon-addon-one.png" alt="" />
										</div>
									</template>
								</el-image>
							</div>
						</div>
						<div class="flex-1 w-0">
							<div class="flex items-center">
								<p class="text-[16px] text-[#374151] truncate leading-[20px]" :title="row.title">{{ row.title }}</p>	
								<span :class="{'app-ident': row.type == 'app', 'addon-ident': row.type == 'addon'}">{{row.type == 'app' ? '应用' : '插件'}}</span>
							</div>
							<p class="text-xs text-[#4F516D] truncate mt-[2px] font-bold" :title="row.key">{{ row.key }}</p>
							<div class="text-[#374151] text-[12px] leading-[16px] mt-[4px]">
								<span>当前版本：</span>
								<span>{{ row.install_info && Object.keys(row.install_info)?.length ? row.install_info.version : row.version }}</span>
								<span v-if="row.install_info && Object.keys(row.install_info)?.length && row.install_info.version != row.version && activeName == 'recentlyUpdated'" class="text-[#374151] ml-[5px] text-[12px]">最新版本：{{ row.version }}</span>
							</div>
						</div>
					</div>
					<view class="w-[25px] flex items-end flex-col h-full justify-between" :class="{ 'w-[40px]': !row.is_download && downloading == row.key }">
						<template v-if="activeName == 'recentlyUpdated'">
							<el-checkbox class="!h-[auto] leading-[1]" v-if="batchUpgradeApp.includes(row.key)" checked @click.stop="appKeySingleSelect($event, row.key)" />
							<el-checkbox class="!h-[auto] leading-[1]" v-else @click.stop="appKeySingleSelect($event, row.key)" />
						</template>
						<template v-if="activeName == 'installed' || activeName == 'all' || activeName == 'uninstalled'">
							<el-button
								v-if="!row.is_download"
								class="!text-[#0766F5] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]"
								:loading="downloading == row.key"
								:disabled="downloading != ''"
								@click.stop="downEvent(row)"
								>安装
							</el-button>
							<el-button v-else-if="!row.install_info || Object.keys(row.install_info).length == 0" class=" mt-[auto] !text-[#0766F5] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]" @click.stop="installAddonFn(row.key)">安装</el-button>
							<el-button class=" mt-[auto] !text-[#4F516D] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]" v-if="row.install_info && Object.keys(row.install_info)?.length"
								link @click.stop="uninstallAddonFn(row.key)"
								>{{ t('unload') }}
							</el-button>
						</template>
						<template v-else>
							<el-button
								class="!text-[#008C1E] mt-[auto] !p-0 !border-[0] !bg-transparent !text-[12px] !h-[20px]"
								@click.stop="upgradeAddonFn(row)"
								v-if="row.install_info.version != row.version"
							>
								升级
							</el-button>
						</template>
					</view>
				</div>
			</template>
		</div>

		<div class="relative px-[20px] pb-[20px]" v-show="showType == 'list' && !isShowDetail">
			<el-table
				v-if="localList[activeName].length && !loading && !isShowDetail"
				ref="tableRef"
				:tree-props="{ children: 'children' }"
				:default-expand-all="true"
				:data="info[activeName]"
				row-key="key"
				size="large"
			>
				<el-table-column width="24">
					<template #default="{ row }">
						<div
							class="tree-child-cell"
							:class="{
								'is-tree-parent': row.children?.length,
								'is-tree-child': typeof row.support_app === 'string' && row.support_app !== '' && visibleRowKeys.has(row.support_app),
							}"
						>
							<span style="opacity: 0">.</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column v-if="activeName === 'recentlyUpdated'" width="60px">
					<template #default="{ row }">
						<el-checkbox
							@click.stop
							:model-value="batchUpgradeApp.includes(row.key)"
							:value="row.key"
							@change="appKeySingleSelect($event, row.key)"
						></el-checkbox>
					</template>
				</el-table-column>
				<el-table-column :label="t('appName')" align="left" width="300">
					<template #default="{ row }">
						<div class="flex items-center cursor-pointer relative left-[-10px]" @click="openDetail(row)">
							<el-image class="w-[54px] h-[54px] rounded-[5px]" :src="row.icon" fit="contain">
								<template #error>
									<div class="flex items-center w-full h-full rounded-[5px]">
										<img class="max-w-full max-h-full" src="@/app/assets/images/icon-addon-one.png" alt="" />
									</div>
								</template>
							</el-image>
							<div class="flex-1 w-0 flex flex-col justify-center pl-[20px] font-500 text-[13px]">
								<div class="w-[236px] truncate leading-[18px]">{{ row.title }}</div>
								<div
									class="w-[236px] truncate leading-[18px] mt-[6px]"
									v-if="row.install_info && Object.keys(row.install_info)?.length"
								>
									{{ row.install_info.version }}
								</div>
								<div class="w-[236px] truncate leading-[18px] mt-[6px]" v-else>{{ row.version }}</div>
								<div class="mt-[3px] flex flex-nowrap">
									<el-tag
										type="danger"
										size="small"
										v-if="
											activeName == 'recentlyUpdated' &&
											row.install_info &&
											Object.keys(row.install_info)?.length &&
											row.install_info.version != row.version
										"
									>
										{{ t('newVersion') }}{{ row.version }}
									</el-tag>
									<el-tooltip
										v-if="versionJudge(row) && activeName == 'recentlyUpdated'"
										effect="dark"
										:content="`该插件适配框架版本为${row.support_version}，与已安装框架版本${frameworkVersion}不完全兼容`"
										placement="top-start"
									>
										<el-tag type="warning" size="small" class="app-list-tip ml-[3px] overflow-hidden"
											>该插件适配框架版本为{{ row.support_version }}，与已安装框架版本{{ frameworkVersion }}不完全兼容
										</el-tag>
									</el-tooltip>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column align="left" min-width="150">
					<template #header>
						<div class="flex items-center">
							<span class="font-500 text-[13px] mr-[5px]">{{ t('appIdentification') }}</span>
							<el-tooltip class="box-item" effect="light" :content="t('tipText')" placement="bottom">
								<el-icon class="cursor-pointer text-[16px] text-[#a9a9a9]">
									<QuestionFilled />
								</el-icon>
							</el-tooltip>
						</div>
					</template>
					<template #default="{ row }">
						<span class="font-500 text-[13px]">{{ row.key }}</span>
					</template>
				</el-table-column>

				<el-table-column :label="t('introduction')" align="left" min-width="250">
					<template #default="{ row }">
						<span class="font-500 text-[13px] multi-hidden">{{ row.desc }}</span>
					</template>
				</el-table-column>

				<el-table-column :label="t('type')" align="left" min-width="80">
					<template #default="{ row }">
						<span class="font-500 text-[13px] multi-hidden">{{ row.type === 'app' ? t('app') : t('addon') }}</span>
					</template>
				</el-table-column>

				<el-table-column :label="t('author')" align="left" min-width="80">
					<template #default="{ row }">
						<span class="font-500 text-[13px]">{{ row.author }}</span>
					</template>
				</el-table-column>

				<el-table-column :label="t('operation')" fixed="right" align="right" min-width="200">
					<template #default="{ row }">
						<template v-if="activeName == 'installed' || activeName == 'all' || activeName == 'uninstalled'">
							<el-button
								class="!text-[13px]"
								v-if="row.install_info && Object.keys(row.install_info)?.length"
								type="primary"
								link
								@click="uninstallAddonFn(row.key)"
								>{{ t('unload') }}
							</el-button>
							<template v-if="row.is_download && (!row.install_info || !Object.keys(row.install_info).length)">
								<el-button class="!text-[13px]" type="primary" link @click="installAddonFn(row.key)">{{ t('install') }}</el-button>
							</template>
							<el-button
								class="!text-[13px]"
								v-if="!row.is_download"
								:loading="downloading == row.key"
								:disabled="downloading != ''"
								type="primary"
								link
								@click.stop="downEvent(row)"
							>
								<span>{{ t('down') }}</span>
							</el-button>
						</template>
						<template v-else>
							<el-button
								class="!text-[13px]"
								v-if="
									activeName == 'recentlyUpdated' &&
									row.install_info &&
									Object.keys(row.install_info)?.length &&
									row.install_info.version != row.version
								"
								type="primary"
								link
								@click="upgradeAddonFn(row)"
								>{{ t('升级') }}
							</el-button>
						</template>
						<el-button class="!text-[13px]" type="primary" link @click="openDetail(row)">{{ t('detail') }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="data-loading" v-if="loading || !localList[activeName].length">
				<el-table :data="[]" size="large" class="pt-[5px]">
					<el-table-column :label="t('appName')" align="left" width="320" />
					<el-table-column align="left" min-width="120" />
					<el-table-column :label="t('introduction')" align="left" min-width="200" />
					<el-table-column :label="t('type')" align="left" min-width="100" />
					<el-table-column :label="t('author')" align="left" min-width="100" />
					<el-table-column :label="t('operation')" fixed="right" align="right" width="150" />
					<!-- <template #empty>
						<span></span>
					</template> -->
				</el-table>
				<div class="h-[100px]" v-loading="loading" v-if="loading"></div>
			</div>
		</div>

		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && activeName == 'installed' && !authLoading && !isShowDetail">
			<template #image>
				<div class="w-[230px] mx-auto">
					<img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="" />
				</div>
			</template>
			<template #description>
				<p class="flex items-center">{{ t('installed-empty') }}</p>
			</template>
		</el-empty>
		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && activeName == 'uninstalled' && !authLoading && !isShowDetail">
			<template #image>
				<div class="w-[230px] mx-auto">
					<img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="" />
				</div>
			</template>
			<template #description>
				<p class="flex items-center">
					<span>{{ t('descriptionLeft') }}</span>
					<el-link type="primary" @click="goRouter" class="mx-[5px]">{{ t('link') }}</el-link>
					<span>{{ t('descriptionRight') }}</span>
				</p>
			</template>
		</el-empty>
		<div
			v-if="!localList.all.length && !loading && !authinfo && activeName == 'all' && !authLoading && !isShowDetail"
			class="mx-auto overview-empty flex flex-col items-center pt-14 pb-6"
		>
			<div class="mb-[20px] text-sm text-[#888]">检测到当前账号尚未绑定授权，请先绑定授权！</div>
			<div class="flex flex-1 flex-wrap justify-center relative">
				<el-button class="w-[154px] !h-[48px] mt-[8px]" type="primary" @click="authCodeApproveFn">授权码认证</el-button>
				<el-popover ref="getAuthCodeDialog" placement="bottom" :width="478" trigger="click" class="mt-[8px]">
					<div class="px-[18px] py-[8px]">
						<p class="leading-[32px] text-[14px]">
							您在官方应用市场购买任意一款应用，即可获得授权码。输入正确授权码认证通过后，即可支持在线升级和其它相关服务
						</p>
						<div class="flex justify-end mt-[36px]">
							<el-button class="w-[182px] !h-[48px]" plain @click="market">去应用市场逛逛</el-button>
							<el-button class="w-[100px] !h-[48px]" plain @click="getAuthCodeDialog.hide()">关闭</el-button>
						</div>
					</div>
					<template #reference>
						<el-button
							class="w-[154px] !h-[48px] mt-[8px] !text-[var(--el-color-primary)] hover:!text-[var(--el-color-primary)] !bg-transparent"
							plain
							type="primary"
							>如何获取授权码?
						</el-button>
					</template>
				</el-popover>
			</div>
		</div>
		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && authinfo && activeName == 'all' && !authLoading && !isShowDetail">
			<template #image>
				<div class="w-[230px] mx-auto">
					<img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="" />
				</div>
			</template>
			<template #description>
				<p class="flex items-center">
					<span>{{ t('buyDescriptionLeft') }}</span>
					<el-link type="primary" @click="goRouter" class="mx-[5px]">{{ t('link') }}</el-link>
					<span>{{ t('descriptionRight') }}</span>
				</p>
			</template>
		</el-empty>
		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && activeName == 'recentlyUpdated' && !isShowDetail">
			<template #image>
				<div class="w-[230px] mx-auto">
					<img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="" />
				</div>
			</template>
			<template #description>
				<p class="flex items-center">{{ t('recentlyUpdatedEmpty') }}</p>
			</template>
		</el-empty>

		<el-dialog v-model="authCodeApproveDialog" title="授权码认证" width="400px">
			<el-form :model="formData" label-width="0" ref="formRef" :rules="formRules" class="page-form">
				<el-card class="box-card !border-none" shadow="never">
					<el-form-item prop="auth_code">
						<el-input
							v-model.trim="formData.auth_code"
							:placeholder="t('authCodePlaceholder')"
							class="input-width"
							clearable
							size="large"
						/>
					</el-form-item>

					<div class="mt-[20px]">
						<el-form-item prop="auth_secret">
							<el-input
								v-model.trim="formData.auth_secret"
								clearable
								:placeholder="t('authSecretPlaceholder')"
								class="input-width"
								size="large"
							/>
						</el-form-item>
					</div>

					<div class="text-sm mt-[10px] text-info">{{ t('authInfoTips') }}</div>

					<div class="mt-[20px]">
						<el-button type="primary" class="w-full" size="large" :loading="saveLoading" @click="save(formRef)">
							{{ t('confirm') }}
						</el-button>
					</div>
					<div class="mt-[10px] text-right">
						<el-button type="primary" link @click="market">{{ t('notHaveAuth') }}</el-button>
					</div>
				</el-card>
			</el-form>
		</el-dialog>

		<!-- 安装弹窗 -->
		<el-dialog
			v-model="installShowDialog"
			:title="t('addonInstall')"
			width="850px"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:before-close="installShowDialogClose"
		>
			<el-steps
				:space="200"
				:active="installStep"
				class="number-of-steps"
				process-status="process"
				align-center
				v-if="installStep != 2 && !errorDialog"
			>
				<el-step :title="t('envCheck')" class="flex-1" />
				<el-step :title="t('installProgress')" class="flex-1" />
				<el-step :title="t('installComplete')" class="flex-1" />
			</el-steps>
			<div v-show="installStep == 0" v-loading="!installCheckResult.dir">
				<!-- <el-scrollbar max-height="50vh"> -->
				<div class="min-h-[150px]">
					<el-scrollbar style="height: calc(50vh); overflow: auto">
						<div class="mt-3" v-if="installCheckResult.dir">
							<p class="pt-[20px] pl-[20px]">{{ t('dirPermission') }}</p>
							<div
								v-if="!installCheckResult.file_permission_is_pass"
								class="mt-[10px] mx-[20px] text-[14px] cursor-pointer text-primary flex items-center justify-between bg-[#EFF6FF] rounded-[4px] p-[10px]"
								@click="cloudBuildCheckDirFn"
							>
								<div class="flex items-center">
									<el-icon :size="17">
										<QuestionFilled />
									</el-icon>
									<span class="ml-[5px] leading-[20px]">编译权限错误，查看解决方案</span>
								</div>
								<div class="border-[1px] border-primary rounded-[3px] w-[72px] h-[26px] leading-[25px] text-center">立即查看</div>
							</div>
							<div class="px-[20px] pt-[10px] text-[14px]">
								<el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
									<el-col :span="18">
										<span>{{ t('path') }}</span>
									</el-col>
									<el-col :span="3">
										<span>{{ t('demand') }}</span>
									</el-col>
									<el-col :span="3">
										<span>{{ t('status') }}</span>
									</el-col>
								</el-row>
								<el-row class="pb-[10px] items pl-[15px]" v-for="(item, index) in installCheckResult.dir.is_readable" :key="index">
									<el-col :span="18">
										<span>{{ item.dir }}</span>
									</el-col>
									<el-col :span="3">
										<span>{{ t('readable') }}</span>
									</el-col>
									<el-col :span="3">
										<span v-if="item.status">
											<el-icon color="green">
												<Select />
											</el-icon>
										</span>
										<span v-else>
											<el-icon color="red">
												<CloseBold />
											</el-icon>
										</span>
									</el-col>
								</el-row>
								<el-row class="pb-[10px] items pl-[15px]" v-for="(item, index) in installCheckResult.dir.is_write" :key="index">
									<el-col :span="18">
										<span>{{ item.dir }}</span>
									</el-col>
									<el-col :span="3">
										<span>{{ t('write') }}</span>
									</el-col>
									<el-col :span="3">
										<span v-if="item.status" class="text-right">
											<el-icon color="green">
												<Select />
											</el-icon>
										</span>
										<span v-else>
											<el-icon color="red">
												<CloseBold />
											</el-icon>
										</span>
									</el-col>
								</el-row>
							</div>
						</div>
						<div class="my-3" v-if="installCheckResult.addon_check && installCheckResult.addon_check.length">
							<p class="pl-[20px]">插件验证</p>
							<div class="px-[20px] pt-[10px] text-[14px]">
								<el-alert class="!mb-[10px]" v-for="item in installCheckResult.addon_check" type="error" :closable="false">
									<div v-html="item.msg"></div>
								</el-alert>
							</div>
						</div>
					</el-scrollbar>
				</div>
				<!-- </el-scrollbar> -->
				<div class="flex justify-end">
					<el-tooltip effect="dark" placement="top">
						<template #content>
							<div class="w-[400px]">
								{{ t('installTips') }}
							</div>
						</template>
						<el-button :disabled="!installCheckResult.is_pass || cloudInstalling" :loading="localInstalling" @click="handleInstall"
							>{{ t('localInstall') }}
						</el-button>
					</el-tooltip>
					<el-tooltip effect="dark" placement="top">
						<template #content>
							<div class="w-[400px]">
								{{ t('cloudInstallTips') }}
							</div>
						</template>
						<el-button
							type="primary"
							:disabled="!installCheckResult.is_pass || localInstalling"
							:loading="cloudInstalling"
							@click="handleCloudInstall"
							>{{ t('cloudInstall') }}
						</el-button>
					</el-tooltip>
				</div>
			</div>
			<div v-show="installStep == 1 && !errorDialog" class="h-[50vh] mt-[20px]">
				<div class="flex flex-col h-full">
					<div class="flex-1 h-0">
						<terminal
							ref="terminalRef"
							:name="`install-${terminalId}`"
							:context="currAddon"
							:init-log="null"
							:show-header="false"
							:show-log-time="true"
							@exec-cmd="onExecCmd"
						/>
					</div>
					<div class="flex justify-end mt-[20px]">
						<el-button type="primary" :loading="true" class="!w-[140px]">已用时 {{ formatUpgradeDuration }}</el-button>
					</div>
				</div>
			</div>
			<div v-show="installStep == 2" class="h-[50vh] mt-[20px] flex flex-col">
				<!-- <el-result icon="success" :title="t('addonInstallSuccess')"></el-result> -->
				<!-- 提示信息 -->
				<!-- <div v-for="(item, index) in installAfterTips" class="mb-[10px]" :key="index">
            <el-alert :title="item" type="error" :closable="false" />
        </div> -->
				<el-result icon="success" :title="t('addonInstallSuccess')">
					<template #icon>
						<img src="@/app/assets/images/success_icon.png" alt="" />
					</template>
					<template #extra>
						<div v-for="(item, index) in installAfterTips" class="mb-[10px]" :key="index">
							<div class="text-[16px] text-[#4F516D] mt-[5px]">{{ item }}</div>
						</div>
						<div class="text-[16px] text-[#9699B6] mt-[10px]" v-if="upgradeDuration > 0">本次安装用时{{ formatUpgradeDuration }}</div>
						<div class="mt-[20px]">
							<el-button @click="handleBack()" v-if="installType == 'cloud'" class="!w-[90px]">返回</el-button>
							<el-button @click="installShowDialog = false" type="primary" class="!w-[90px]">完成</el-button>
						</div>
					</template>
				</el-result>
			</div>
			<div class="h-[50vh] mt-[20px] flex flex-col" v-show="errorDialog">
				<el-result icon="error" :title="t('安装失败')">
					<template #icon>
						<img src="@/app/assets/images/error_icon.png" alt="" />
					</template>
					<template #extra>
						<el-scrollbar class="max-h-[120px] !overflow-auto text-[15px] text-[#4F516D] mb-[15px] mt-[-15px]">
							{{ errorMsg }}
						</el-scrollbar>
						<el-button @click="handleBack()" v-if="installType == 'cloud'" class="!w-[90px]">错误信息</el-button>
						<el-button @click="installShowDialog = false" type="primary" class="!w-[90px]">完成</el-button>
					</template>
				</el-result>
			</div>
		</el-dialog>

		<el-dialog
			v-model="uninstallShowDialog"
			:title="t('addonUninstall')"
			width="850px"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
		>
			<el-scrollbar max-height="50vh">
				<div class="min-h-[150px]">
					<div class="bg-[#fff] my-3" v-if="uninstallCheckResult.dir">
						<p class="pt-[20px] pl-[20px]">{{ t('dirPermission') }}</p>
						<div class="px-[20px] pt-[10px] text-[14px]">
							<el-row class="py-[10px] items table-head-bg pl-[15px] mb-[10px]">
								<el-col :span="18">
									<span>{{ t('path') }}</span>
								</el-col>
								<el-col :span="3">
									<span>{{ t('demand') }}</span>
								</el-col>
								<el-col :span="3">
									<span>{{ t('status') }}</span>
								</el-col>
							</el-row>
							<el-row class="pb-[10px] items pl-[15px]" v-for="(item, index) in uninstallCheckResult.dir.is_readable" :key="index">
								<el-col :span="18">
									<span>{{ item.dir }}</span>
								</el-col>
								<el-col :span="3">
									<span>{{ t('readable') }}</span>
								</el-col>
								<el-col :span="3">
									<span v-if="item.status">
										<el-icon color="green">
											<Select />
										</el-icon>
									</span>
									<span v-else>
										<el-icon color="red">
											<CloseBold />
										</el-icon>
									</span>
								</el-col>
							</el-row>
							<el-row class="pb-[10px] items pl-[15px]" v-for="(item, index) in uninstallCheckResult.dir.is_write" :key="index">
								<el-col :span="18">
									<span>{{ item.dir }}</span>
								</el-col>
								<el-col :span="3">
									<span>{{ t('write') }}</span>
								</el-col>
								<el-col :span="3">
									<span v-if="item.status">
										<el-icon color="green">
											<Select />
										</el-icon>
									</span>
									<span v-else>
										<el-icon color="red">
											<CloseBold />
										</el-icon>
									</span>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</el-scrollbar>
		</el-dialog>

		<!-- 下载提示 -->
		<el-dialog v-model="unloadHintDialog" title="下载提示" width="30%">
			<span>本地已经存在该插件/应用，再次下载会覆盖该插件/应用。</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="unloadHintDialog = false">取消</el-button>
					<el-button type="primary" @click="downEventHintFn">确定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-card class="box-card app-detail-static !border-none" shadow="never" v-if="!loading && isShowDetail">
			<div class="flex items-center text-[14px] text-primary cursor-pointer mb-[20px]" @click="closeDetail">
				<el-icon class="mr-[6px]"><ArrowLeft /></el-icon>
				<span>返回应用列表</span>
			</div>

			<div class="border-[1px] border-solid border-[#EBEEF5] p-[20px]">

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<div class="w-[42px] h-[42px] rounded-[6px] flex items-center justify-center mr-[10px] overflow-hidden">
							<el-image class="w-full h-full" :src="detailAddon?.icon" fit="contain">
								<template #error>
									<div class="flex items-center w-full h-full">
										<img class="max-w-full max-h-full" src="@/app/assets/images/icon-addon-one.png" alt="" />
									</div>
								</template>
							</el-image>
						</div>
						<div>
							<div class="text-[16px] font-[500] leading-[20px]">{{ detailAddon?.title || '-' }}</div>
							<div class="text-[12px] text-[#374151] leading-[18px] mt-[5px]">{{ detailAddon?.key || '-' }}</div>
						</div>
					</div>
					<div class="flex items-center ml-[auto] gap-[10px] detail-btn-box">
						<template v-if="detailAddon.key != 'niucloud-admin'">
							<el-button v-if="!detailAddon.is_download"
								type="primary"
								class="download-btn !bg-[#0766F5]"
								:loading="downloading == detailAddon.key"
								:disabled="downloading != ''"
								@click.stop="downEvent(detailAddon)"
								>安装
							</el-button>
							<el-button v-else-if="!detailAddon.install_info || Object.keys(detailAddon.install_info).length == 0" type="primary" class="!bg-[#0766F5]" @click.stop="installAddonFn(detailAddon.key)">安装</el-button>
							<el-button
								type="warning"
								@click.stop="upgradeAddonFn(detailAddon)"
								v-else-if="detailAddon.install_info.version != detailAddon.version"
							>
								升级
							</el-button>
							<el-button type="info" v-if="detailAddon.is_download && (!detailAddon.install_info || !Object.keys(detailAddon.install_info).length)" @click="deleteAddonFn(detailAddon.key)"> 删除 </el-button>
							<el-button type="info" v-if="detailAddon.is_download && detailAddon.install_info && Object.keys(detailAddon.install_info).length" @click="uninstallAddonFn(detailAddon.key)"> 卸载 </el-button>
						</template>
						<template v-else>
							<el-button
								type="warning"
								@click.stop="upgradeAddonFn(detailAddon)"
								v-if="detailAddon.install_info.version != detailAddon.version"
							>
								升级
							</el-button>
						</template>
					</div>
				</div>

				<div class="app-section-header mt-[20px] mb-[12px]" v-if="detailAddon?.type || detailAddon?.desc">
					<div class="app-section-title">应用信息</div>
					<div class="app-section-line"></div>
				</div>
				<div class="space-y-[10px] text-[14px]" v-if="detailAddon?.type || detailAddon?.desc">
					<div class="flex items-center">
						<div class="w-[84px] text-[#9699B6]">应用类型：</div>
						<div class="text-[#374151]">{{ detailAddon?.type == 'app' ? '应用' : '插件' }}</div>
					</div>
					<div class="flex items-start">
						<div class="w-[84px] text-[#9699B6] pt-[2px]">应用简介：</div>
						<div class="text-[#374151] flex-1">{{ detailAddon?.desc || '-' }}</div>
					</div>
				</div>

				<div class="app-section-header mt-[20px] mb-[12px]">
					<div class="app-section-title">服务周期</div>
					<div class="app-section-line"></div>
				</div>
				<div class="space-y-[10px] text-[14px]">
					<div class="flex items-center">
						<div class="w-[84px] text-[#9699B6]">有效期至：</div>
						<div class="text-[#374151] flex items-center">
							<div class="text-[#374151]">{{ detailAddon.expire_time || '--' }}</div>
							<div class="ml-[10px] flex items-center gap-[3px]" v-if="detailAddon.app_id">
								<span class="iconfont icongouwuche text-[var(--el-color-primary)]"></span>
								<span class="text-[var(--el-color-primary)] text-[14px] cursor-pointer" @click="toLink('pc')">续费应用</span>
							</div>
						</div>
					</div>
				</div>

				<template v-if="detailAddon?.author || detailAddon?.author_phone">
					<div class="app-section-header mt-[20px] mb-[12px]">
						<div class="app-section-title">开发者信息</div>
						<div class="app-section-line"></div>
					</div>
					<div class="space-y-[10px] text-[14px]">
						<div class="flex items-center">
							<div class="w-[84px] text-[#9699B6]">开发者：</div>
							<div class="text-[#374151]">{{ detailAddon?.author || '-' }}</div>
						</div>
						<div class="flex items-center" v-if="detailAddon?.author_phone">
							<div class="w-[84px] text-[#9699B6]">联系方式：</div>
							<div class="text-[#374151] inline-flex items-center">
								{{detailAddon?.author_phone}}
								<el-icon class="ml-[6px] text-primary"><Phone /></el-icon>
							</div>
						</div>
					</div>
				</template>

				<div class="app-section-header mt-[20px] mb-[12px]" v-if="detailAddon.key != 'niucloud-admin' && detailAddon.app_id">
					<div class="app-section-title">访问应用</div>
					<div class="app-section-line"></div>
				</div>
				<div class="flex gap-[30px]" v-if="detailAddon.key != 'niucloud-admin' && detailAddon.app_id">
					<div class="bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer" @click="toLink('pc')">
						<div class="flex items-center">
							<div class="w-[28px] h-[28px] flex items-center justify-center mr-[2px]">
								<el-icon><Monitor /></el-icon>
							</div>
							<div class="text-[14px] text-[#374151]">PC端应用主页</div>
						</div>
						<span class="iconfont iconjiang-right"></span>
					</div>
					<div class="bg-[#F5F5F5] w-[336px] h-[60px] px-[20px] flex items-center justify-between cursor-pointer" @click="toLink('pc')">
						<div class="flex items-center">
							<div class="w-[28px] h-[28px] flex items-center justify-center mr-[2px]">
								<el-icon><Cellphone /></el-icon>
							</div>
							<div class="text-[14px] text-[#374151]">移动端应用主页</div>
						</div>
						<span class="iconfont iconjiang-right"></span>
					</div>
				</div>

				<div class="app-section-header mt-[20px] mb-[12px]">
					<div class="app-section-title">应用版本</div>
					<div class="app-section-line"></div>
				</div>
				<div class="flex items-center text-[14px]">
					<div class="w-[84px] text-[#9699B6]">当前版本：</div>
					<div class="text-[#374151]">{{ detailCurrentVersion }}</div>
				</div>

				<div class="app-section-header mt-[20px] mb-[12px]">
					<div class="app-section-title">更新历史</div>
					<div class="app-section-line"></div>
				</div>
				<div class="detail-upgrade-log -mx-[20px] h-[500px] overflow-auto" v-loading="detailLogLoading">
					<el-scrollbar class="px-[20px]">
						<el-timeline style="width: 100%" v-if="detailVersionList.length">
							<el-timeline-item v-for="(item, index) in detailVersionList" :key="item.version_no || index" placement="left">
								<el-collapse v-model="detailLogActive" accordion>
									<el-collapse-item :name="index">
										<template #title>
											<div class="flex items-center justify-between flex-1">
												<div class="flex flex-col items-baseline">
													<p class="text-[#1D1F3A] text-[14px]">版本：V{{ item.version_no }} </p>
													<div class="flex items-center leading-[1] mt-[2px]">
														<span class="text-[#9699B6] text-[14px]">{{ timeSplit(item.release_time)[0] }}</span>
														<span class="text-[#9699B6] text-[14px] ml-[3px]">{{ timeSplit(item.release_time)[1] }}</span>
													</div>
												</div>
												<div class="flex items-center collapse-arrow">
													<span class="expand text-[14px] !text-[#374151]">更新内容</span>
													<span class="fold-up text-[14px] !text-[#374151]">收起</span>
													<span class="nc-iconfont nc-icon-xiaV6xx ml-[2px] text-[#9699B6]"></span>
												</div>
											</div>
										</template>
										<div class="timeline-log-wrap" v-if="item.upgrade_log">
											<div v-html="item.upgrade_log"></div>
										</div>
									</el-collapse-item>
								</el-collapse>
							</el-timeline-item>
						</el-timeline>
						<el-empty v-else description="暂无版本更新信息" />
					</el-scrollbar>
				</div>
			</div>
		</el-card>
	</div>
	<upgrade-log :upgradeKey="upgradeKey" ref="upgradeLogRef" />
	<upgrade ref="upgradeRef" @complete="upgradeCompleteFn" @cloudbuild="handleCloudBuild" />
	<cloud-build ref="cloudBuildRef" />
</template>

<script lang="ts" setup>
import { ref, reactive, watch, h, computed, nextTick } from 'vue'
import { t } from '@/lang'
import {
	getAddonLocal,
	uninstallAddon,
	installAddon,
	preInstallCheck,
	cloudInstallAddon,
	getAddonInstalltask,
	getAddonCloudInstallLog,
	preUninstallCheck,
	cancelInstall,
	getAddonInit,
} from '@/app/api/addon'
import { deleteAddonDevelop } from '@/app/api/tools'
import { downloadVersion, getAuthInfo, setAuthInfo, getFrameworkNewVersion, getAppVersionList } from '@/app/api/module'
import { getVersions } from '@/app/api/auth'
import { ElMessage, ElMessageBox, ElNotification, FormInstance, FormRules } from 'element-plus'
import 'vue-web-terminal/lib/theme/dark.css'
import { Terminal, TerminalFlash } from 'vue-web-terminal'
import { findFirstValidRoute } from '@/router/routers'
import storage from '@/utils/storage'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import Upgrade from '@/app/components/upgrade/index.vue'
import CloudBuild from '@/app/components/cloud-build/index.vue'
import UpgradeLog from '@/app/components/upgrade-log/index.vue'
import { deepClone } from '@/utils/common'

const tableRef = ref(null)
const router = useRouter()
const route = useRoute()
const terminalId = ref(Date.now())
const activeName = ref(storage.get('storeActiveName') || 'installed')
const upgradeRef = ref(null)
const cloudBuildRef = ref(null)
const loading = ref<Boolean>(true)
const downloading = ref('')
const installAfterTips = ref<string[]>([])
const userStore = useUserStore()
const unloadHintDialog = ref(false)
const terminalRef = ref(null)
const frameworkVersion = ref('')
const frameworkVersionCode = ref('')
const upgradeLogRef = ref<any>(null)
const showType = ref(storage.get('storeShowType') || 'card')
const frameworkNewVersion = ref('')
const searchParam = reactive({
	keywords: '',
	type: '',
})
const getFrameworkInfo = ()=>{
	getVersions().then((res) => {
		frameworkVersion.value = res.data.version.version
		frameworkVersionCode.value = res.data.version.code
	})
	getFrameworkNewVersion().then(({ data }) => {
		frameworkNewVersion.value = data.last_version
	})
}
getFrameworkInfo()



const upgradeCompleteFn = ()=>{
	getFrameworkInfo()
	localListFn()
}

const switchShowType = () => {
	showType.value = showType.value == 'card' ? 'list' : 'card'
	storage.set({ key: 'storeShowType', data: showType.value })
}

const typeList = ref({})
const getAddonInitFn = () => {
	getAddonInit().then((res) => {
		typeList.value = res.data.type_list
	})
}
getAddonInitFn()
const currDownData = ref()
const downEventHintFn = () => {
	downEvent(currDownData.value, true)
}

const batchUpgradeApp = ref<String[]>([])

const activeNameTabFn = (data: any) => {
	activeName.value = data
	storage.set({ key: 'storeActiveName', data })

	if (data == 'recentlyUpdated' && localList.value[activeName.value].length) {
		batchUpgradeApp.value = localList.value[activeName.value].map((item) => item.key)
	} else {
		batchUpgradeApp.value = []
	}
	if (isShowDetail.value){
		closeDetail()
	}
}
if (route.query.id) {
	activeNameTabFn(route.query.id)
}
const downEvent = (param: Record<string, any>, isDown = false) => {
	if (param.is_download && activeName.value == 'all' && !isDown) {
		unloadHintDialog.value = true
		currDownData.value = param
		return false
	}

	if (downloading.value) return
	downloading.value = param.key

	downloadVersion({ addon: param.key, version: param.version })
		.then(() => {
			unloadHintDialog.value = false
			installAddonFn(param.key)
			localListFn()
			downloading.value = ''
		})
		.catch(() => {
				downloading.value = ''
		})
}

const authCode = ref('')
getAuthInfo().then((res) => {
	if (res.data.data && res.data.data.auth_code) {
		authCode.value = res.data.data.auth_code
	}
})

/**
 * 本地下载的插件列表
 */
const search_name = ref('')
const search_type = ref('')
// 表格展示数据
const info = ref({
	installed: [],
	uninstalled: [],
	all: [],
	recentlyUpdated: [],
})
const buildInfo = (list: any[]) => {
	const map = new Map()
	const result: any[] = []

	// 所有插件都先放进 map，初始化 children
	list.forEach((item) => {
		if(!item.isHideen){
			map.set(item.key, { ...item, children: [] })
		}
	})

	// 第二次遍历构建父子关系
	list.forEach((item) => {
		if (!item.isHideen && item.support_app && map.has(item.support_app)) {
			const parent = map.get(item.support_app)
			parent.children.push(map.get(item.key)) // 直接取已经构建好的对象
		}
	})

	// 最终收集那些没有作为子插件挂载出去的插件（即顶层插件）
	map.forEach((item: any) => {
		if (!item.support_app || !map.has(item.support_app)) {
			result.push(item)
		}
	})

	return result
}

const query = () => {
	const name = search_name.value
	const type = search_type.value

	// 如果没填搜索关键词也没选类型，重置所有列表
	if ((!name || name === '') && (type === '' || type == null)) {
		info.value.installed = buildInfo(localList.value.installed)
		info.value.uninstalled = buildInfo(localList.value.uninstalled)
		info.value.all = buildInfo(localList.value.all)
		info.value.recentlyUpdated = buildInfo(localList.value.recentlyUpdated)
		return
	}

	// 公共筛选函数
	const filterList = (list: any[]) => {
		return list.filter((el: any) => {
			const matchName = !name || el.title.includes(name)
			const matchType = !type || el.type === type
			return matchName && matchType
		})
	}

	info.value.installed = buildInfo(filterList(localList.value.installed))
	info.value.uninstalled = buildInfo(filterList(localList.value.uninstalled))
	info.value.all = buildInfo(filterList(localList.value.all))
	info.value.recentlyUpdated = buildInfo(filterList(localList.value.recentlyUpdated))
}

const localList = ref({
	installed: [],
	uninstalled: [],
	all: [],
	recentlyUpdated: [],
	error: '',
})

const localListFn = () => {
	loading.value = true
	getAddonLocal({})
		.then((res) => {
			const data = res.data.list
			localList.value.error = res.data.error
			localList.value.installed = []
			localList.value.uninstalled = []
			localList.value.all = []
			localList.value.recentlyUpdated = []
			for (const i in data) {
				if (data[i].is_local == false) localList.value.all.push(data[i])

				if (data[i].install_info && Object.keys(data[i].install_info)?.length) {
					localList.value.installed.push(data[i])
					if (data[i].install_info.version != data[i].version) {
						localList.value.recentlyUpdated.push(data[i])
					}
				} else {
					if (data[i].is_download == true) localList.value.uninstalled.push(data[i])
				}
			}
			query()
			userStore.routers.forEach((item, index) => {
				if (item.children && item.children.length) {
					item.name = findFirstValidRoute(item.children)
					appLink.value[item.meta.app] = findFirstValidRoute(item.children)
				} else {
					appLink.value[item.meta.app] = item.name
				}
			})
			activeNameTabFn(activeName.value)
			loading.value = false
		})
		.catch(() => {
			loading.value = false
		})
}
localListFn()

const noAppLen = computed(()=>{
	let num = 0
	if(localList.value[activeName.value] && localList.value[activeName.value].length){
		localList.value[activeName.value].forEach(item=>{
			if(item.isHideen){
				num++
			}
		})
	}
	return num == localList.value[activeName.value].length
})

const searchFormRef = ref<FormInstance>()
const searchFn = ()=>{
	localList.value[activeName.value].forEach(item=>{
		item.isHideen = true
		let keywords = searchParam.keywords;
		let type = searchParam.type;
		const typeMatch = !type || item.type === type;
		const keywordsMatch = !keywords || item.title.indexOf(keywords) !== -1;
		if(typeMatch && keywordsMatch){
			item.isHideen = false
		}
	})

	if(showType.value != 'card') query()
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
	searchParam.keywords = ''
	searchParam.type = ''
	searchFn()
}

// 点击应用可以进系统
const appLink: any = ref({})
const itemPath = (data: any) => {
	if (data.type == 'app' && Object.keys(data.install_info).length) {
		storage.set({ key: 'menuAppStorage', data: data.key })
		storage.set({ key: 'plugMenuTypeStorage', data: '' })
		const appMenuList = userStore.appMenuList
		appMenuList.push(data.key)
		userStore.setAppMenuList(appMenuList)
		const name: any = appLink.value[data.key]
		router.push({ name })
	}
}

const currAddon = ref('')

// 安装面板弹窗
const installShowDialog = ref(false)

// 安装步骤
const installStep = ref(0)

// 安装检测结果
const installCheckResult = ref({})

let flashInterval = null
const terminalFlash = new TerminalFlash()
const onExecCmd = (key, command, success, failed, name) => {
	if (command == '开始安装插件') {
		success(terminalFlash)
		const frames = makeIterator(['/', '——', '\\', '|'])
		flashInterval = setInterval(() => {
			terminalFlash.flush('> ' + frames.next().value)
		}, 150)
	}
}

function makeIterator(array: string[]) {
	let nextIndex = 0
	return {
		next() {
			if (nextIndex + 1 == array.length) {
				nextIndex = 0
			}
			return { value: array[nextIndex++] }
		},
	}
}

/**
 * 安装
 * @param key
*/
const installAddonFn = (key: string) => {
	currAddon.value = key

	preInstallCheck(key).then((res) => {
		installStep.value = 0
		isBack.value = false
		errorDialog.value = false
		installType.value = ''
		installShowDialog.value = true
		installAfterTips.value = []
		installCheckResult.value = res.data
		userStore.clearRouters()
	})
}

/**
 * 获取正在进行的安装任务
 */
const upgradeStartTime = ref<number | null>(null)
const upgradeDuration = ref(0) // 单位：秒
let upgradeTimer: ReturnType<typeof setInterval> | null = null
let notificationEl = null

const getInstallTask = (first: boolean = true) => {
	getAddonInstalltask()
		.then((res) => {
			if (res.data) {
				if (first) {
					installLog = []
					currAddon.value = res.data.addon
					if (!installShowDialog.value) {
						notificationEl = ElNotification.success({
							title: t('warning'),
							dangerouslyUseHTMLString: true,
							message: h('div', {}, [
								t('installingTips'),
								h(
									'span',
									{
										class: 'text-primary cursor-pointer',
										onClick: checkInstallTask,
									},
									[t('installPercent')],
								),
							]),
							duration: 0,
							showClose: false,
						})
					}
					if (upgradeTimer) clearInterval(upgradeTimer)
					upgradeDuration.value = parseInt(Date.now() / 1000) - res.data.timestamp
					upgradeTimer = setInterval(() => {
						upgradeDuration.value++
					}, 1000)
				}
				if (res.data.error) {
					terminalRef.value?.pushMessage({ content: res.data.error, class: 'error' })
					errorMsg.value = res.data.error
					errorDialog.value = true
					if (upgradeTimer) {
						clearInterval(upgradeTimer)
						upgradeTimer = null
					}
					// ElMessage({ message: '插件安装失败', type: 'error', duration: 5000 })
					return
				}
				if (res.data.mode == 'cloud') {
					getCloudInstallLog()
				}
				setTimeout(() => {
					getInstallTask(false)
				}, 2000)
			} else {
				if (!first) {
					installStep.value = 2
					if (upgradeTimer) {
						clearInterval(upgradeTimer)
						upgradeTimer = null
					}
					localListFn()
					userStore.clearRouters()
					notificationEl?.close()
				}
			}
		})
		.catch((e) => {
			console.log(e)
			terminalRef.value?.pushMessage({ content: e.message, class: 'error' })
		})
}

getInstallTask()

const isBack = ref(false)
const handleBack = () => {
	isBack.value = true
	installStep.value = 1
	errorDialog.value = false
}

const formatUpgradeDuration = computed(() => {
	const s = upgradeDuration.value
	const h = Math.floor(s / 3600)
	const m = Math.floor((s % 3600) / 60)
	const sec = s % 60
	return [h > 0 ? `${h}小时` : '', m > 0 ? `${m}分钟` : '', `${sec}秒`].filter(Boolean).join('')
})

const checkInstallTask = () => {
	installShowDialog.value = true
	installStep.value = 1
}

const localInstalling = ref(false)
/**
 * 安装插件
 */
const installType = ref('')
const handleInstall = () => {
	if (!installCheckResult.value.is_pass || localInstalling.value) return
	installType.value = 'local'
	localInstalling.value = true
	upgradeStartTime.value = Date.now()
	upgradeDuration.value = 0
	if (upgradeTimer) clearInterval(upgradeTimer)
	upgradeTimer = setInterval(() => {
		upgradeDuration.value++
	}, 1000)

	installAddon({ addon: currAddon.value })
		.then((res) => {
			installStep.value = 2
			if (upgradeTimer) {
				clearInterval(upgradeTimer)
				upgradeTimer = null
			}
			localListFn()
			localInstalling.value = false
			if (res.data.length) installAfterTips.value = res.data
		})
		.catch((res) => {
			localInstalling.value = false
		})
}

const cloudInstalling = ref(false)

/**
 * 云安装插件
 */
const handleCloudInstall = () => {
	if (!authCode.value) {
		authElMessageBox()
		return
	}

	if (!installCheckResult.value.is_pass || cloudInstalling.value) return
	cloudInstalling.value = true
	installType.value = 'cloud'

	cloudInstallAddon({ addon: currAddon.value })
		.then((res) => {
			installStep.value = 1
			terminalRef.value.execute('clear')
			terminalRef.value.execute('开始安装插件')
			if (res.data.length) installAfterTips.value = res.data
			getInstallTask()
			cloudInstalling.value = false
		})
		.catch((res) => {
			cloudInstalling.value = false
		})
}

const authElMessageBox = () => {
	ElMessageBox.confirm(t('authTips'), t('warning'), {
		distinguishCancelAndClose: true,
		confirmButtonText: t('toBind'),
		cancelButtonText: t('toNiucloud'),
	})
		.then(() => {
			authCodeApproveFn()
		})
		.catch((action: string) => {
			if (action === 'cancel') {
				window.open('https://www.niucloud.com/app')
			}
		})
}
const errorDialog = ref(false)
const errorMsg = ref('')
let installLog: string[] = []
const getCloudInstallLog = () => {
	getAddonCloudInstallLog(currAddon.value)
		.then((res) => {
			const data = res.data.data ?? []
			if (data[0] && data[0].length && installShowDialog.value == true) {
				data[0].forEach((item) => {
					if (!installLog.includes(item.action)) {
						terminalRef.value.pushMessage({ content: `${item.action}` })
						installLog.push(item.action)

						if (item.code == 0) {
							terminalRef.value.pushMessage({ content: item.msg, class: 'error' })
						}
					}
				})
			}
		})
		.catch(() => {
			notificationEl?.close()
		})
}

watch(currAddon, (nval) => {
	installCheckResult.value = {}
})

// 卸载面板弹窗
const uninstallShowDialog = ref(false)

// 卸载环境检测结果
const uninstallCheckResult = ref({})

/**
 * 卸载
 * @param key
 */
const uninstallAddonFn = (key: string) => {
	ElMessageBox.confirm(t('uninstallTips'), t('warning'), {
		confirmButtonText: t('confirm'),
		cancelButtonText: t('cancel'),
		type: 'warning',
	}).then(() => {
		handleUninstallAddon(key)
	})
}

/**
 * 插件升级
 * @param key
 */
const upgradeAddonFn = (data: any) => {
	upgradeRef.value?.open(data.key,null,data)
}

/**
 * 云编译
 */
const handleCloudBuild = () => {
	if (!authCode.value) {
		authElMessageBox()
		return
	}
	if (cloudBuildRef.value.cloudBuildTask) {
		cloudBuildRef.value?.open()
		return
	}
	ElMessageBox.confirm(t('cloudBuildTips'), t('warning'), {
		confirmButtonText: t('confirm'),
		cancelButtonText: t('cancel'),
		type: 'warning',
	}).then(() => {
		cloudBuildRef.value?.open()
	})
}

const handleUninstallAddon = (key: string) => {
	preUninstallCheck(key).then(({ data }) => {
		if (data.is_pass) {
			uninstallAddon({ addon: key })
				.then((res) => {
					localListFn()
					userStore.clearRouters()
					loading.value = false
				})
				.catch(() => {
					loading.value = false
				})
		} else {
			uninstallCheckResult.value = data
			uninstallShowDialog.value = true
		}
	})
}

const market = () => {
	window.open('https://www.niucloud.com/app')
}

/**
 * 安装弹窗关闭提示
 * @param done
 */
const installShowDialogClose = (done: () => {}) => {
	if (installStep.value == 1 && !isBack.value && !errorDialog.value) {
		ElMessageBox.confirm(t('installShowDialogCloseTips'), t('warning'), {
			confirmButtonText: t('confirm'),
			cancelButtonText: t('cancel'),
			type: 'warning',
		}).then(() => {
			cancelInstall(currAddon.value)
			if (upgradeTimer) {
				clearInterval(upgradeTimer)
				upgradeTimer = null
			}
			isBack.value = false
			installType.value = ''
			errorDialog.value = false
			done()
		})
	} else if (installStep.value == 2) {
		activeNameTabFn('installed')
		location.reload()
	} else {
		done()
	}

	flashInterval && clearInterval(flashInterval)
}

// 更新信息
const updateInformationFn = (data: any) => {
	data.version = frameworkNewVersion.value
	data.title = '框架'
	data.install_info = {
		version: frameworkVersion.value
	}
	openDetail(data)
}
// 授权
const authCodeApproveDialog = ref(false)
const authinfo = ref('')
const getAuthCodeDialog = ref(null)
const saveLoading = ref(false)
const authLoading = ref(true)
const checkAppMange = () => {
	authLoading.value = true
	getAuthInfo()
		.then((res) => {
			authLoading.value = false
			if (res.data.data && res.data.data.length != 0) {
				authinfo.value = res.data.data
			}
		})
		.catch(() => {
			authLoading.value = false
			authCodeApproveDialog.value = false
		})
}

checkAppMange()
const authCodeApproveFn = () => {
	authCodeApproveDialog.value = true
}

const formData = reactive<Record<string, string>>({
	auth_code: '',
	auth_secret: '',
})
const formRef = ref<FormInstance>()

// 表单验证规则
const formRules = reactive<FormRules>({
	auth_code: [{ required: true, message: t('authCodePlaceholder'), trigger: 'blur' }],
	auth_secret: [{ required: true, message: t('authSecretPlaceholder'), trigger: 'blur' }],
})

const save = async (formEl: FormInstance | undefined) => {
	if (saveLoading.value || !formEl) return

	await formEl.validate(async (valid) => {
		if (valid) {
			saveLoading.value = true

			setAuthInfo(formData)
				.then(() => {
					saveLoading.value = false
					setTimeout(() => {
						location.reload()
					}, 1000)
				})
				.catch(() => {
					saveLoading.value = false
				})
		}
	})
}

const goRouter = () => {
	window.open('https://www.niucloud.com/app')
}

const cloudBuildCheckDirFn = () => {
	window.open(
		'https://doc.press.niucloud.com/php/v6-shop/use/chang-jian-wen-ti-chu-li/er-shi-wu-3001-sheng-7ea7-yun-bian-yi-mu-lu-du-xie-quan-xian-zhuang-tai-bu-tong-guo-ru-he-chu-li.html',
	)
}

const deleteAddonFn = (key: string) => {
	ElMessageBox.confirm(t('deleteAddonTips'), t('warning'), {
		confirmButtonText: t('confirm'),
		cancelButtonText: t('cancel'),
		type: 'warning',
	}).then(() => {
		deleteAddonDevelop(key).then(() => {
			localListFn()
		})
	})
}

const versionJudge = (row: any) => {
	if (!row.support_version) return false
	const supportVersionApp = row.support_version.split('.')
	const frameworkVersionArr = frameworkVersion.value.split('.')
	if (parseFloat(`${supportVersionApp[0]}.${supportVersionApp[1]}`) < parseFloat(`${frameworkVersionArr[0]}.${frameworkVersionArr[1]}`)) return true
	return false
}

const appKeyAllSelect = () => {
	if (localList.value[activeName.value].length) {
		if (localList.value[activeName.value].length == batchUpgradeApp.value.length) {
			batchUpgradeApp.value = []
		} else {
			batchUpgradeApp.value = localList.value[activeName.value].map((item) => item.key)
		}
	}
}

const appKeySingleSelect = (event: any, key: string) => {
	if (activeName.value != 'recentlyUpdated' && activeName.value != 'uninstalled') return
	if (batchUpgradeApp.value.includes(key)) {
		batchUpgradeApp.value.splice(batchUpgradeApp.value.indexOf(key), 1)
	} else {
		batchUpgradeApp.value.push(key)
	}
}

const batchUpgrade = () => {
	const appKeys = deepClone(batchUpgradeApp.value)
	if (frameworkVersion.value != frameworkNewVersion.value) {
		appKeys.unshift('niucloud-admin')
	}
	if (!appKeys.length) {
		ElMessage({
			message: localList.recentlyUpdated.length ? '请先勾选要升级的插件' : '当前已是最新版',
			type: 'error',
			duration: 5000,
		})
		return
	}
	upgradeAddonFn({'key': appKeys.toString()})
}

const batchInstall = () => {
	const appKeys = batchUpgradeApp.value
	if (!appKeys.length) {
		ElMessage({ message: '请先勾选要安装的插件', type: 'error', duration: 5000 })
		return
	}
	installAddonFn(appKeys.toString())
}

const visibleRowKeys = computed(() => {
	return new Set((info.value[activeName.value] || []).map((row) => row.key))
})

// 应用详情  ------ start
const isShowDetail = ref(false)
const detailAddon = ref<any>(null)

const detailInstalled = computed(() => {
	const installInfo = detailAddon.value?.install_info
	return Boolean(installInfo && Object.keys(installInfo).length)
})
const detailCurrentVersion = computed(() => {
	const installInfo = detailAddon.value?.install_info
	if (installInfo && Object.keys(installInfo).length) return installInfo.version || '-'
	return detailAddon.value?.version || '-'
})

const detailVersionList = ref<any[]>([])
const detailLogLoading = ref(false)
const detailLogActive = ref(0)

const timeSplit = (str: string) => {
	if (!str) return ['-', '-']
	const [date, time] = str.split(' ')
	if (!time) return [date || '-', '-']
	const [hours, minutes] = time.split(':')
	return [date, `${hours}:${minutes}`]
}

const getDetailVersionList = async (appKey: string) => {
	detailLogLoading.value = true
	try {
		const { data } = await getAppVersionList({ app_key: appKey })
		detailVersionList.value = Array.isArray(data) ? data : []
	} finally {
		detailLogLoading.value = false
	}
}

const openDetail = (row: any) => {
	detailAddon.value = row
	isShowDetail.value = true
	detailLogActive.value = 0
	detailVersionList.value = []
	if (row?.key) getDetailVersionList(row.key)
}

const closeDetail = () => {
	isShowDetail.value = false
	detailAddon.value = null
	detailVersionList.value = []
}
// 应用详情  ------ end

const toLink = (type)=>{
	if(type=='pc'){
		window.open(`https://www.niucloud.com/app/detail/?id=${detailAddon.value.app_id}`)
	}else{
		window.open(`https://wap.niucloud.com/pages/product/detail?id=${detailAddon.value.app_id}`)
	}
}
</script>

<style lang="scss" scoped>
.multi-hidden {
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

// 插件安装-弹窗-表格样式
.table-head-bg {
	background: #f5f7f9;
}

html.dark .table-head-bg {
	background: #141414;
}

.el-alert .el-alert__title {
	font-size: 16px;
	line-height: 18px;
}

:deep(.terminal .t-log-box span) {
	white-space: pre-wrap;
}

:deep(.data-loading) {
	.el-table__body-wrapper {
		// display: none !important;
	}
}

:deep(.hide-expand .el-table__expand-icon > .el-icon) {
	visibility: hidden;
	pointer-events: none;
}

:deep(.el-input__wrapper) {
	box-shadow: none !important;
	border-radius: 4px !important;
	border: 1px solid #d1d5db !important;
	height: 32px !important;
}

:deep(.el-select__wrapper) {
	box-shadow: none !important;
	border-radius: 4px !important;
	border: 1px solid #d1d5db !important;
	height: 32px !important;
}

:deep(.el-button) {
	border-radius: 4px !important;
}

/* 设置 el-select 的 placeholder 颜色 */
:deep(.search-form .el-select__placeholder.is-transparent) {
	color: #c4c7da;
	font-size: 12px;
}

/* 设置 el-select 选中后的颜色 */
:deep(.search-form .el-select__placeholder) {
	color: #4f516d;
	font-size: 12px;
}

/* 设置 el-input 的 placeholder 颜色 */
:deep(.search-form .el-input__inner::placeholder) {
	color: #c4c7da;
	font-size: 12px;
}

/* 设置 el-input 输入内容后的颜色 */
:deep(.search-form .el-input__inner) {
	color: #4f516d;
	font-size: 12px;
}

/* 设置 el-date-picker 的 placeholder 颜色 */
:deep(.search-form .el-date-editor .el-range-input::placeholder) {
	color: #c4c7da;
	font-size: 12px;
}

/* 设置 el-date-picker 的输入内容颜色 */
:deep(.search-form .el-date-editor .el-range-input) {
	color: #4f516d;
	font-size: 12px;
}

:deep(.el-table tr td:first-child) {
	border-bottom: none;
	// background-color: inherit !important;
	height: 100px;
}

:deep(.el-table__body tr:hover td:first-child) {
	// border-bottom: 1px solid var(--el-table-border-color);
}

:deep(.el-table__body tr) {
	position: relative;
}

:deep(.el-table__body td:first-child::before) {
	opacity: 0;
	content: '';
	position: absolute;
	top: -1px;
	left: 0;
	right: 0;
	height: 1px;
	background-color: var(--el-table-border-color);
	// transition: opacity 0.2s;
	z-index: 1;
}

:deep(.el-table__body td:first-child) {
	position: relative;
}

:deep(.el-table__body tr:hover td:first-child::before) {
	opacity: 1;
}

/* 创建伪元素当作 hover 边框线，默认隐藏 */
:deep(.el-table__body td:first-child::after) {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 1px;
	background-color: var(--el-table-border-color);
	opacity: 0;
	// transition: opacity 0.2s ease;
	pointer-events: none;
	z-index: 1;
}

/* 悬浮时显示这条伪边框线 */
:deep(.el-table__body tr:hover td:first-child::after) {
	opacity: 1;
}

:deep(.el-table__fixed-body-wrapper .el-table__row .el-table__cell) {
	overflow: visible;
}

:deep(.el-table .el-table__expand-icon) {
	position: relative;
	top: 12.5px;
	left: -13px;
	z-index: 99;
	margin: 3px;
	overflow: hidden;
}

:deep(.el-table__fixed-body-wrapper .el-table__cell:first-child) {
	background-color: inherit !important; /* 从行继承背景色 */
}

:deep(.el-table tr td:nth-child(1)::before) {
	overflow: hidden !important;
}

:deep(.tree-child-cell) {
	position: relative;
	height: 100%;
}

:deep(.el-table .cell) {
	overflow: visible !important;
}

:deep(.tree-child-cell.is-tree-child::before) {
	content: '';
	position: absolute;
	left: -5px;
	top: -99px;
	bottom: 0;
	width: 1px;
	height: 100px;
	background-color: #f5f5f5;
}

:deep(.tree-child-cell.is-tree-child::after) {
	content: '';
	position: absolute;
	top: 0;
	left: -5px;
	width: 8px;
	height: 1px;
	background-color: #f5f5f5;
}

:deep(.hidden-selection-column .cell) {
	display: none;
}

:deep(.el-dialog__title) {
	font-size: 20px;
	font-weight: bold;
}

:deep(.el-result__title p) {
	font-size: 25px;
	color: #1d1f3a;
	font-weight: 500;
}

:deep(.el-result__subtitle p) {
	font-size: 15px;
	color: #4f516d;
	font-weight: 500;
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

:deep(.number-of-steps) {
	.el-step__line {
		margin: 0 25px;
		background: #dddddd;
	}

	.el-step__head {
		margin-top: 10px;
	}

	.is-success {
		color: var(--el-color-primary);
		border-color: var(--el-color-primary);

		.el-step__icon {
			background: var(--el-color-primary);
			color: #fff;
			// box-shadow: 0 0 0 4px var(--el-color-primary-light-9);

			i {
				color: #fff;
			}
		}

		.el-step__line {
			margin: 0 25px;
			background: var(--el-color-primary);
		}
	}

	.is-finish {
		color: var(--el-color-primary);
		border-color: var(--el-color-primary);

		.el-step__icon {
			background: var(--el-color-primary) !important;
			color: #fff !important;
			// box-shadow: 0 0 0 4px var(--el-color-primary-light-9);

			i {
				color: #fff;
			}
		}

		.el-step__line {
			margin: 0 25px;
			background: var(--el-color-primary);
		}
	}

	.is-process {
		color: var(--el-color-primary);
		font-weight: inherit;

		// font-size: 18px;
		.el-step__icon {
			padding: 10px;
			border: 1px solid var(--el-color-primary);
			background: var(--el-color-primary) !important;
			color: #fff !important;
			// box-shadow: 0 0 0 4px var(--el-color-primary-light-9);
		}
	}

	.is-wait {
		color: #333;
	}
}

.app-card {
	width: calc((100% - 120px) / 5);
	min-width: 260px;

	&.selected {
		background-color: #f9f9f9;
		border-color: #f9f9f9;
	}
}
.product-card-item{
	border: 1px solid #F1F1F1;
	&:hover{
		background-color: #f8f8f8;
		border-color: #f8f8f8;
	}
}
.app-ident{
	margin: 0 3px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 32px;
	width: 32px;
	height: 16px;
	border-radius: 3px;
	background: #F3321D;
	font-size: 12px;
	color: #fff;
	white-space: nowrap;
}
.addon-ident{
	margin: 0 3px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 32px;
	width: 32px;
	height: 16px;
	border-radius: 3px;
	background: #8031F0;
	font-size: 12px;
	color: #fff;
	white-space: nowrap;
}

.app-section-header {
	display: flex;
	align-items: center;
	gap: 20px;
}

.app-section-title {
	font-size: 16px;
	font-weight: 400;
	line-height: 20px;
	white-space: nowrap;
	color: #374151;
}

.app-section-line {
	flex: 1;
	height: 1px;
	background: #EBEEF5;
}
:deep(.app-detail-static .el-card__body){
	padding-top: 0 !important;
}
:deep(.detail-upgrade-log .el-timeline-item) {
	min-height: 75px;
}

:deep(.detail-upgrade-log .el-timeline-item__node--normal) {
	top: 32px;
	left: 0;
	width: 18px;
	height: 18px;
	background: #DCDDE6 !important;
	border-radius: 50%;
	position: relative;
}

:deep(.detail-upgrade-log .el-timeline-item__node--normal::before) {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 8px;
	height: 8px;
	background-color: #9699B6;
	border-radius: 50%;
	transform: translate(-50%, -50%);
}

:deep(.detail-upgrade-log .el-timeline-item__tail) {
	top: 35px;
	left: 8px;
	border-left-color: #dddddd;
	border-left-style: solid;
	margin: 14px 0 0px;
	height: calc(100% - 14px);
}

:deep(.detail-upgrade-log .el-timeline-item__wrapper) {
	top: -15px !important;
	padding-left: 32px !important;
}

:deep(.detail-upgrade-log .el-collapse) {
	margin-left: 0;
	background: #F9F9FB;
	border: 1px solid #F1F1F8;
	border-radius: 4px;
}

:deep(.detail-upgrade-log .el-collapse-item__header) {
	border: none;
	line-height: 25px;
	height: auto;
	position: relative;
	z-index: 999;
	background-color: transparent;
	padding: 14px 16px;
}

:deep(.detail-upgrade-log .el-collapse-item__content) {
	margin-top: 0;
	padding-bottom: 0 !important;
}
:deep(.detail-upgrade-log .el-collapse-item .el-collapse-item__wrap){
    border: 0;
	border-top: 1px solid #F1F1F8;
	background-color: transparent;
	padding: 14px 16px;
}
:deep(.detail-upgrade-log .el-collapse-item .el-collapse-item__arrow){
	display: none;
}
:deep(.detail-upgrade-log .el-collapse-item .collapse-arrow .expand){
	display: block;
}
:deep(.detail-upgrade-log .el-collapse-item .collapse-arrow .fold-up){
	display: none;
}
:deep(.detail-upgrade-log .el-collapse-item.is-active .collapse-arrow .expand){
	display: none;
}
:deep(.detail-upgrade-log .el-collapse-item.is-active .collapse-arrow .fold-up){
	display: block;
}
:deep(.app-list-tip .el-tag__content){
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.detail-btn-box button{
	width: 90px;
	height: 36px;
	font-size: 14px !important;
	border: 0;
	&.el-button--info{
		background-color: #ddd;
		color: #666;
	}
	&.el-button--warning{
		background-color: #03C92E;
	}
}
</style>

<style>
.app-market .app-head .el-card__body{
	padding-bottom: 3px !important;
}
.el-empty .el-empty__image {
	width: auto;
}
</style>
