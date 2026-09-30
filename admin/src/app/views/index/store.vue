<template>
	<!--应用市场-->
	<div class="main-container app-market min-h-[70vh]" v-loading="loading">
		<!-- 顶部框架信息栏：常驻显示，不随页签/视图切换隐藏 -->
		<div class="am-framework">
			<div class="am-framework__brand">
				<span class="am-framework__mark" aria-hidden="true">
					<!-- 框架 logo：站点静态资源里的 app.ico（niucloud/public/static/resource/icon/app.ico）
					     与插件图标同一套写法：用 img() 按 VITE_IMG_DOMAIN 拼出完整地址。
					     路径统一取 frameworkIcon，框架详情里的图标也用它，两处不会各写一份。 -->
					<img :src="img(frameworkIcon)" alt="" />
				</span>
				<div class="am-framework__info">
					<h1 class="am-framework__name">
						系统框架
						<span class="am-pill-status" :class="frameworkHasUpdate ? 'is-warn' : 'is-ok'">
							<i class="am-pill-status__dot"></i>{{ frameworkHasUpdate ? '有可用更新' : '已是最新版本' }}
						</span>
					</h1>
					<!-- 与右侧状态标签用同一个判断（frameworkHasUpdate）：已是最新时不再重复报「最新 v…」，
					     分隔点一并隐藏，避免留下孤立的 · -->
					<p class="am-framework__meta">当前 v{{ frameworkVersion || '--' }}<template v-if="frameworkHasUpdate"> · 最新 v{{ frameworkNewVersion || '--' }}</template> · {{ localList.recentlyUpdated.length ? localList.recentlyUpdated.length + ' 个应用可更新' : '无可更新应用' }}</p>
				</div>
			</div>
			<div class="am-framework__ops">
				<!-- 校验框架：检测目标只认 framework（列表里的 key 是 niucloud-admin，后端不认） -->
				<button type="button" class="am-btn am-btn--ghost" @click="openFrameworkDiff">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="8.4" />
						<path d="M8.4 12.4l2.5 2.5 4.7-5.3" />
					</svg>
					<span>{{ t('diffVerify') }}</span>
				</button>
				<button type="button" class="am-btn am-btn--ghost" @click="updateInformationFn({ key: 'niucloud-admin' })">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
						<path d="M6 3.6h8.4L19 8.2v12.2H6Z" />
						<path d="M14.2 3.6v4.8H19" />
						<path d="M9 12.6h6M9 16.2h4" />
					</svg>
					<span>更新记录</span>
				</button>
				<button
					type="button"
					class="am-btn am-btn--primary"
					:disabled="!frameworkHasUpdate && !localList.recentlyUpdated.length"
					@click="batchUpgrade"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 3.6v10.8" />
						<path d="M7.6 10l4.4 4.4L16.4 10" />
						<path d="M4.2 20.4h15.6" />
					</svg>
					<span>一键升级<span v-if="localList.recentlyUpdated.length">（{{ localList.recentlyUpdated.length }}）</span></span>
				</button>
			</div>
		</div>
		<div class="app-head">
			<div class="am-toolbar">
				<div class="am-tabs" role="tablist">
					<button
						type="button"
						role="tab"
						class="am-tab"
						:class="{ 'is-active': activeName == tab.key }"
						:aria-selected="activeName == tab.key"
						v-for="tab in storeTabs"
						:key="tab.key"
						@click="activeNameTabFn(tab.key); searchFn()"
					>
						{{ tab.label }}
						<span class="am-tab__n" :class="{ 'am-tab__n--warn': tab.warn && tab.count > 0 }">{{ tab.count }}</span>
					</button>
				</div>
				<div class="am-toolbar__right">
					<!-- 应用类型：改用 el-select，展开面板由 el-select-dropdown 渲染，
					     与项目其他下拉同源（原生 select 点开的是系统菜单，CSS 改不到） -->
					<el-select v-model="searchParam.type" class="am-select" placeholder="应用类型" clearable
						@change="searchFn()">
						<el-option label="应用" value="app" />
						<el-option label="插件" value="addon" />
					</el-select>
					<label class="am-search">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
							<circle cx="11" cy="11" r="6.8" />
							<path d="M20.2 20.2 16.4 16.4" />
						</svg>
						<input v-model.trim="searchParam.keywords" type="search" placeholder="搜索应用名称" @keyup.enter="searchFn()" @input="onKeywordsInput" />
					</label>
					<!-- 搜索按钮：与搜索框同高同圆角，复用页面已有的 .am-btn--primary -->
					<button type="button" class="am-btn am-btn--primary am-search__btn" @click="searchFn()">{{ t('search') }}</button>
					<!-- 视图切换（卡片 / 列表）：原来挂在「应用列表」标题右边，挪到搜索框后面 -->
					<i
						class="iconfont cursor-pointer !text-[16px] text-[#4f516d] transition-colors hover:text-[#0766f5]"
						:class="showType == 'card' ? 'iconliebiao' : 'iconliebiaoqiehuan'"
						:title="showType == 'card' ? '切换为列表模式' : '切换为卡片模式'"
						@click="switchShowType"
					></i>
				</div>
			</div>

			<div v-if="!loading && activeName == 'recentlyUpdated'">
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
		</div>
		<div class="am-grid" v-show="showType == 'card'">
			<template v-if="localList[activeName].length && !loading">
				<div
					class="am-card"
					@click="openDetail(row)"
					:class="{ 'am-card--selected': batchUpgradeApp.includes(row.key), 'is-hidden': row.isHideen }"
					v-for="row in localList[activeName]"
					:key="row.key"
				>
					<div class="am-card__head">
						<div class="am-card__tile">
							<el-image class="am-card__logo" :src="img(row.icon)" fit="cover">
								<template #error>
									<img class="am-card__logo-default" src="@/app/assets/images/icon-addon-one.png" alt="" />
								</template>
							</el-image>
						</div>
						<div class="am-card__info">
							<div class="am-card__title-row">
								<span class="am-card__title" :title="row.title">{{ row.title }}</span>
								<span :class="row.type == 'app' ? 'am-badge am-badge--app' : 'am-badge am-badge--addon'">{{ row.type == 'app' ? '应用' : '插件' }}</span>
							</div>
							<!-- 应用标识：空间不够时由它自己出省略号（见 .am-card__key） -->
							<div class="am-card__key-row">
								<span class="am-card__key" :title="row.key">{{ row.key }}</span>
							</div>
						</div>
						<!-- 应用状态：卡片右上角，基于「应用名称 + 应用标识」这两行垂直居中 -->
						<div class="am-card__status">
							<span
								v-if="
									row.install_info &&
									Object.keys(row.install_info)?.length &&
									row.install_info.version != row.version &&
									isNeedUpgrade(row.install_info.version, row.version)
								"
								class="am-pill am-pill--warn"
								>可升级</span
							>
							<span v-else-if="row.install_info && Object.keys(row.install_info)?.length" class="am-pill am-pill--ok"><i class="am-pill__dot"></i>已安装</span>
							<span v-else class="am-pill am-pill--muted">{{ row.is_download ? '待安装' : '未安装' }}</span>
							<el-tooltip
								v-if="versionJudge(row) && activeName == 'recentlyUpdated'"
								effect="dark"
								:content="`该插件适配框架版本为${row.support_version}，与已安装框架版本${frameworkVersion}不完全兼容`"
								placement="top"
							>
								<span class="am-pill am-pill--danger">兼容提示</span>
							</el-tooltip>
						</div>
					</div>

					<p class="am-card__desc" :title="row.desc">{{ row.desc }}</p>

					<!-- 当前版本 / 最新版本 各占一半，卡片之间标签能上下对齐 -->
					<div class="am-card__meta">
						<span class="am-card__meta-item">
							<span class="am-card__meta-k">当前版本</span>
							<!-- 已安装且就是最新：紧跟一个「最新」标记。用文本空格分隔（不是 flex gap），
							     所以正好只隔一个空格；嵌套在版本值里，它自己才能带底色 -->
							<span class="am-card__meta-v">{{ row.install_info && Object.keys(row.install_info)?.length ? row.install_info.version : row.version }} <span class="am-card__meta-uptodate" v-if="cardUpToDate(row)">最新</span></span>
						</span>
						<!-- 两段之间的竖线：只在右半边存在时显示 —— 已最新时右半边不渲染，
						     留着这根线会变成孤零零的 1px 立在中间 -->
						<span class="am-card__sep" v-if="!cardUpToDate(row)"></span>
						<!-- 不是最新才需要单独报「最新版本」（一致时上面那个「最新」标记已经说明了） -->
						<span class="am-card__meta-item" v-if="!cardUpToDate(row)">
							<span class="am-card__meta-k">最新版本</span>
							<span
								class="am-card__meta-v"
								:class="{ 'is-new': row.install_info && Object.keys(row.install_info)?.length && row.install_info.version != row.version }"
								>{{ row.version }}</span
							>
						</span>
					</div>

					<div class="am-card__foot">
						<div class="am-card__foot-left" @click.stop>
							<el-checkbox
								v-if="activeName == 'recentlyUpdated'"
								class="am-card__check"
								:model-value="batchUpgradeApp.includes(row.key)"
								@change="appKeySingleSelect($event, row.key)"
							/>
						</div>
						<div class="am-card__acts" @click.stop>
							<el-button v-if="canDiff(row)" class="am-act am-act--verify" link @click.stop="openDiff(row)">{{ t('diffVerify') }}</el-button>
							<template v-if="activeName == 'installed' || activeName == 'all' || activeName == 'uninstalled'">
								<el-button
									v-if="!row.is_download"
									class="am-act am-act--primary"
									link
									:loading="downloading == row.key"
									:disabled="downloading != ''"
									@click.stop="downEvent(row)"
									>{{ t('down') }}</el-button
								>
								<el-button
									v-else-if="!row.install_info || Object.keys(row.install_info).length == 0"
									class="am-act am-act--primary"
									link
									@click.stop="installAddonFn(row.key)"
									>{{ t('install') }}</el-button
								>
								<el-button
									v-if="row.install_info && Object.keys(row.install_info)?.length"
									class="am-act am-act--muted"
									link
									@click.stop="uninstallAddonFn(row.key)"
									>{{ t('unload') }}</el-button
								>
							</template>
							<template v-else>
								<el-button
									class="am-act am-act--ok"
									link
									v-if="
										row.install_info &&
										Object.keys(row.install_info)?.length &&
										row.install_info.version != row.version &&
										isNeedUpgrade(row.install_info.version, row.version)
									"
									@click.stop="upgradeAddonFn(row)"
									>升级</el-button
								>
							</template>
						</div>
					</div>
				</div>
			</template>
		</div>

		<div ref="pageRef" class="am-list relative pb-[20px] table-fill-page__panel" :style="pageStyle" v-show="showType == 'list'">
			<div class="table-panel table-fill-page__panel">
			<div class="table-fill-page__table">
			<el-table
				v-if="localList[activeName].length && !loading"
				height="100%"
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
							<el-image class="w-[var(--cmp-table-composite-icon-size)] h-[var(--cmp-table-composite-icon-size)] rounded-[5px]" :src="img(row.icon)" fit="contain">
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
								<span class="iconfont iconwenhao text-[#999] !text-[14px] cursor-pointer"></span>
							</el-tooltip>
						</div>
					</template>
					<template #default="{ row }">
						<span class="am-table-key font-500 text-[13px]" :title="row.key">{{ row.key }}</span>
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
						<!-- 校验：与卡片模式同一套判断（canDiff —— 已安装、非本地自有、非框架），列表模式同样放开 -->
						<el-button v-if="canDiff(row)" class="!text-[13px]" type="primary" link @click.stop="openDiff(row)">
							{{ t('diffVerify') }}
						</el-button>
						<el-button class="!text-[13px]" type="primary" link @click="openDetail(row)">{{ t('detail') }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			</div>
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
		</div>

		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && activeName == 'installed' && !authLoading">
			<template #image>
				<div class="w-[230px] mx-auto">
					<img src="@/app/assets/images/index/apply_empty.png" class="max-w-full" alt="" />
				</div>
			</template>
			<template #description>
				<p class="flex items-center">{{ t('installed-empty') }}</p>
			</template>
		</el-empty>
		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && activeName == 'uninstalled' && !authLoading">
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
			v-if="!localList.all.length && !loading && !authinfo && activeName == 'all' && !authLoading"
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
		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && authinfo && activeName == 'all' && !authLoading">
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
		<el-empty class="mx-auto overview-empty" v-if="showType == 'card' && noAppLen && !loading && activeName == 'recentlyUpdated'">
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
				<div class="p-[20px]">
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
				</div>
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
			<div v-show="installStep == 0">
				<!-- 安装前校验（统一校验组件）：SSE 实时推送各项检测结果 -->
				<div class="min-h-[150px]">
					<el-scrollbar style="height: calc(50vh); overflow: auto">
						<verify-panel ref="installCheckRef" class="mt-3" v-if="installShowDialog" scene="addon_install" :params="{ addon: currAddon }"
							:show-footer="false" @done="onInstallCheckDone"
							@passed="installCheckPass = true" @failed="installCheckPass = false" />
					</el-scrollbar>
				</div>
				<div class="flex items-center justify-end gap-[10px] mt-[20px]">
					<span v-if="installCheckDone && !installCheckPass" class="text-[12px] text-[#f56c6c]">
						存在未通过的必检项，请处理后再继续
					</span>
					<el-button v-if="installCheckDone && !installCheckPass" :loading="installCheckRetrying" @click="reCheckInstall">
						重新校验
					</el-button>
					<el-button type="primary" class="!w-[140px]" :disabled="!installCheckPass || cloudInstalling" :loading="localInstalling" @click="handleInstall">{{ t('install') }}</el-button>
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
			<div class="min-h-[150px] px-[10px]">
				<!-- 卸载前校验（统一校验组件）：通过后自动执行卸载 -->
				<verify-panel v-if="uninstallShowDialog" scene="addon_uninstall" :params="{ addon: uninstallAddonKey }"
					:auto-next="true" :show-prev="false" :next-text="t('confirm')" @next="doUninstall" />
			</div>
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

		<!-- 应用详情抽屉：内容沿用原整页详情 -->
		<el-drawer v-model="isShowDetail" class="am-drawer" direction="rtl" size="560px" :with-header="false" @closed="resetDetail">
			<div class="am-detail" v-if="detailAddon">
				<div class="am-detail__head">
					<div class="am-detail__head-main">
						<span class="am-detail__tile">
							<!-- 与卡片（am-card__logo）一致：cover 铺满整个图标块，不留白边 -->
							<el-image class="am-detail__logo" :src="img(detailIcon)" fit="cover">
								<template #error>
									<img class="am-detail__tile-default" src="@/app/assets/images/icon-addon-one.png" alt="" />
								</template>
							</el-image>
						</span>
						<div class="am-detail__ident">
							<h2 class="am-detail__title" :title="detailAddon?.title || '-'">{{ detailAddon?.title || '-' }}</h2>
							<p class="am-detail__key" :title="detailAddon?.key || ''">{{ detailAddon?.key || '-' }}</p>
							<div class="am-detail__badges">
								<span class="am-pill am-pill--muted">{{ detailAddon?.type == 'app' ? '应用' : '插件' }}</span>
								<span v-if="detailInstalled" class="am-pill am-pill--ok"><i class="am-pill__dot"></i>已安装</span>
								<span v-else class="am-pill am-pill--muted">未安装</span>
								<span v-if="detailCanUpgrade" class="am-pill am-pill--warn">可升级</span>
							</div>
						</div>
					</div>
					<button type="button" class="am-detail__close" aria-label="关闭" @click="closeDetail">
						<el-icon><Close /></el-icon>
					</button>
				</div>

				<div class="am-detail__body">
					<p class="am-detail__desc" v-if="detailAddon?.desc">{{ detailAddon.desc }}</p>

					<div class="am-detail__block">
						<h3 class="am-detail__block-title">应用信息</h3>
						<dl class="am-kv">
							<div v-if="detailAddon?.type">
								<dt>应用类型</dt>
								<dd>{{ detailAddon.type == 'app' ? '应用' : '插件' }}</dd>
							</div>
							<div v-if="detailAddon?.key">
								<dt>应用标识</dt>
								<dd :title="detailAddon.key">{{ detailAddon.key }}</dd>
							</div>
							<div>
								<dt>当前版本</dt>
								<dd>{{ detailCurrentVersion }}</dd>
							</div>
						</dl>
					</div>

					<div class="am-detail__block">
						<h3 class="am-detail__block-title">服务周期</h3>
						<dl class="am-kv">
							<div>
								<dt>有效期至</dt>
								<dd>
									<span>{{ detailAddon.expire_time || '--' }}</span>
									<span class="am-kv__link" v-if="detailAddon.app_id" @click="toLink('pc')">续费应用</span>
								</dd>
							</div>
						</dl>
					</div>

					<div class="am-detail__block" v-if="detailAddon?.author || detailAddon?.author_phone">
						<h3 class="am-detail__block-title">开发者信息</h3>
						<dl class="am-kv">
							<div v-if="detailAddon?.author">
								<dt>开发者</dt>
								<dd :title="detailAddon.author">{{ detailAddon.author }}</dd>
							</div>
							<div v-if="detailAddon?.author_phone">
								<dt>联系方式</dt>
								<dd>{{ detailAddon.author_phone }}</dd>
							</div>
						</dl>
					</div>

					<div class="am-detail__block" v-if="detailAddon.key != 'niucloud-admin' && detailAddon.app_id">
						<h3 class="am-detail__block-title">访问应用</h3>
						<div class="am-chips">
							<button type="button" class="am-chip" @click="toLink('pc')">
								<el-icon><Monitor /></el-icon>
								PC端应用主页
							</button>
							<button type="button" class="am-chip" @click="toLink('wap')">
								<el-icon><Cellphone /></el-icon>
								移动端应用主页
							</button>
						</div>
					</div>

					<div class="am-detail__block">
						<h3 class="am-detail__block-title">更新历史</h3>
						<div class="am-log-wrap" v-loading="detailLogLoading">
							<ol class="am-log" v-if="detailVersionList.length">
								<li v-for="(item, index) in detailVersionList" :key="item.version_no || index">
									<div class="am-log__head">
										<span>v{{ item.version_no }}</span>
										<span class="am-log__time">{{ timeSplit(item.release_time)[0] }}</span>
									</div>
									<div class="am-log__body" v-if="item.upgrade_log" v-html="item.upgrade_log"></div>
								</li>
							</ol>
							<p class="am-log__empty" v-else>暂无版本更新信息</p>
						</div>
					</div>
				</div>

				<div class="am-detail__foot">
					<!-- 校验：框架的检测目标只认 framework（列表 key 是 niucloud-admin，后端不认），走 openFrameworkDiff；
					     插件走原有的 canDiff + openDiff。两者占同一个位置、同一个样式，和插件弹框保持一致 -->
					<button v-if="isFrameworkDetail" type="button" class="am-btn am-btn--outline" @click="openFrameworkDiff">
						{{ t('diffVerify') }}
					</button>
					<button v-else-if="canDiff(detailAddon)" type="button" class="am-btn am-btn--outline" @click="openDiff(detailAddon)">
						{{ t('diffVerify') }}
					</button>
					<template v-if="!isFrameworkDetail">
						<button
							v-if="!detailAddon.is_download"
							type="button"
							class="am-btn am-btn--primary"
							:disabled="downloading != ''"
							@click.stop="downEvent(detailAddon)"
						>
							{{ downloading == detailAddon.key ? '安装中…' : '安装' }}
						</button>
						<button
							v-else-if="!detailAddon.install_info || Object.keys(detailAddon.install_info).length == 0"
							type="button"
							class="am-btn am-btn--primary"
							@click.stop="installAddonFn(detailAddon.key)"
						>
							安装
						</button>
						<button
							v-else-if="detailAddon.install_info.version != detailAddon.version"
							type="button"
							class="am-btn am-btn--primary"
							@click.stop="upgradeAddonFn(detailAddon)"
						>
							升级
						</button>
					</template>
					<!-- 框架：有新版才显示升级。detailCanUpgrade 用 isNeedUpgrade 逐段比较版本，
					     比原来直接比 != 更稳（也顺带挡住 install_info 缺失的情况） -->
					<button
						v-else-if="detailCanUpgrade"
						type="button"
						class="am-btn am-btn--primary"
						@click.stop="upgradeAddonFn(detailAddon)"
					>
						升级
					</button>
					<span class="am-detail__spacer"></span>
					<button
						v-if="detailAddon.key != 'niucloud-admin' && detailAddon.is_download && (!detailAddon.install_info || !Object.keys(detailAddon.install_info).length)"
						type="button"
						class="am-btn am-btn--danger"
						@click="deleteAddonFn(detailAddon.key)"
					>
						删除
					</button>
					<button
						v-else-if="detailAddon.key != 'niucloud-admin' && detailAddon.is_download && detailAddon.install_info && Object.keys(detailAddon.install_info).length"
						type="button"
						class="am-btn am-btn--danger"
						@click="uninstallAddonFn(detailAddon.key)"
					>
						卸载
					</button>
				</div>
			</div>
		</el-drawer>
	</div>
	<!-- 文件差异弹框（公共组件）：传入应用标识与图标 -->
	<file-diff v-model:show="diffVisible" :target="diffTarget" :icon="diffIcon" />
	<upgrade-log :upgradeKey="upgradeKey" ref="upgradeLogRef" />
	<upgrade ref="upgradeRef" @complete="upgradeCompleteFn" @cloudbuild="handleCloudBuild" />

	<!-- 云编译前校验（统一校验组件） -->
	<el-dialog v-model="cloudCheckVisible" title="编译环境校验" width="580px" :destroy-on-close="true" append-to-body>
	    <verify-panel scene="cloud_build" :show-footer="false" />
	</el-dialog>
	</template>

<script lang="ts" setup>
import { ref, reactive, watch, h, computed, nextTick } from 'vue'
import { t } from '@/lang'
import {
	getAddonLocal,
	uninstallAddon,
	installAddon,
	cloudInstallAddon,
	getAddonInstalltask,
	getAddonCloudInstallLog,
	cancelInstall,
	getAddonInit
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
import VerifyPanel from '@/app/components/verify-panel/index.vue'
import UpgradeLog from '@/app/components/upgrade-log/index.vue'
import FileDiff from '@/components/file-diff/index.vue'
import { deepClone, img } from '@/utils/common'
import { useTablePageHeight } from '@/hooks/useTablePageHeight'

// 列表模式的表格占满剩余空间，超出部分在表格内部滚动（卡片模式仍保持整页滚动）
const { pageRef, pageStyle, refreshTablePageHeight } = useTablePageHeight()

const tableRef = ref(null)
const router = useRouter()
const route = useRoute()
const terminalId = ref(Date.now())
const activeName = ref(storage.get('storeActiveName') || 'installed')
const upgradeRef = ref(null)
/** 云编译前校验弹窗（统一校验组件） */
const cloudCheckVisible = ref(false)
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

// 应用详情  ------ start
const isShowDetail = ref(false)
const detailAddon = ref<any>(null)
	

/**
 * Only regard a version as updatable when both values are valid semantic
 * version strings. The version request is asynchronous, so either value can
 * temporarily be empty while the "recentlyUpdated" tab is rendering.
 */
const isNeedUpgrade = (currVersion: unknown, onlineVersion: unknown) => {
	if (typeof currVersion !== 'string' || typeof onlineVersion !== 'string') return false

	const current = currVersion.match(/^\d+(?:\.\d+)*$/)?.[0]?.split('.').map(Number)
	const online = onlineVersion.match(/^\d+(?:\.\d+)*$/)?.[0]?.split('.').map(Number)
	if (!current || !online) return false

	const length = Math.max(current.length, online.length)
	for (let index = 0; index < length; index++) {
		const difference = (online[index] ?? 0) - (current[index] ?? 0)
		if (difference !== 0) return difference > 0
	}
	return false
}

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

/** 是否存在框架更新（与页面原有判断口径保持一致） */
const frameworkHasUpdate = computed(
	() => frameworkVersion.value != frameworkNewVersion.value && isNeedUpgrade(frameworkVersion.value, frameworkNewVersion.value)
)



const upgradeCompleteFn = ()=>{
	getFrameworkInfo()
	localListFn()
}

const switchShowType = () => {
	showType.value = showType.value == 'card' ? 'list' : 'card'
	storage.set({ key: 'storeShowType', data: showType.value })
	// 只有列表模式需要撑满：切过来时元素刚由隐藏变为可见，重新量一次剩余高度
	if (showType.value == 'list') nextTick(refreshTablePageHeight)
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
	// 页签切换会改变头部高度（如「可更新」多一行汇总），重算表格剩余高度
	nextTick(refreshTablePageHeight)
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
	// 取筛选区的真实状态（输入框 / 应用类型下拉都绑定在 searchParam 上）
	const name = searchParam.keywords
	const type = searchParam.type

	// 如果没填搜索关键词也没选类型，重置所有列表
	if (!name && !type) {
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
					if (data[i].install_info.version != data[i].version && isNeedUpgrade(data[i].install_info.version, data[i].version)) {
						localList.value.recentlyUpdated.push(data[i])
					}
				} else {
					if (data[i].is_download == true) localList.value.uninstalled.push(data[i])
				}
			}
			// 走 searchFn：数据重新加载后依然套用当前的关键词 / 应用类型筛选
			searchFn()
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

/** 应用市场页签（带数量徽标） */
const storeTabs = computed(() => [
	{ key: 'installed', label: '已安装', count: localList.value.installed.length, warn: false },
	{ key: 'uninstalled', label: '未安装', count: localList.value.uninstalled.length, warn: false },
	{ key: 'all', label: '已购买', count: localList.value.all.length, warn: false },
	{ key: 'recentlyUpdated', label: '可更新', count: localList.value.recentlyUpdated.length, warn: true },
])

const searchFn = ()=>{
	const keywords = searchParam.keywords
	const type = searchParam.type
	localList.value[activeName.value].forEach(item=>{
		const typeMatch = !type || item.type === type;
		const keywordsMatch = !keywords || item.title.indexOf(keywords) !== -1;
		item.isHideen = !(typeMatch && keywordsMatch)
	})

	// 卡片模式靠 isHideen 隐藏卡片，列表模式的数据源是 info，两种模式都要同步一遍
	query()
}

/**
 * 输入框内容变化
 *
 * 搜索改成「点『搜索』或回车」提交之后，清空输入框必须自己把列表恢复回来 ——
 * 否则用户把关键字删干净，列表还是筛剩的那几条，会以为界面坏了。
 * 只在清空时触发：输入过程中不再发请求（列表模式下 searchFn() 会去打接口，
 * 原来每敲一个字就发一次）。
 */
const onKeywordsInput = () => {
	if (!searchParam.keywords) searchFn()
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

// 安装前校验是否通过（由统一校验组件的 passed / failed 事件驱动）
const installCheckPass = ref(false)

/** 安装前校验组件实例（用于「重新校验」触发组件内部的 retry） */
const installCheckRef = ref<any>(null)
/** 校验是否已出结果：未通过时才展示「重新校验」入口 */
const installCheckDone = ref(false)
/** 重新校验中（按钮 loading） */
const installCheckRetrying = ref(false)

/** 校验结束（通过 / 未通过都会触发 done） */
const onInstallCheckDone = () => {
	installCheckDone.value = true
}

/**
 * 重新校验：清空上一次结论并原地重跑一轮
 * （组件内部会重建清单、重连 SSE，未通过项处理完即可直接通过）
 */
const reCheckInstall = async () => {
	if (installCheckRetrying.value) return

	installCheckRetrying.value = true
	installCheckPass.value = false
	installCheckDone.value = false
	try {
		await installCheckRef.value?.retry()
	} finally {
		installCheckRetrying.value = false
	}
}

let flashInterval = null
const terminalFlash = new TerminalFlash()
let cloudQueue = null

const onExecCmd = (key, command, success, failed, name) => {
	if (command == '开始安装插件') {
		success(terminalFlash)
		const frames = makeIterator(['/', '——', '\\', '|'])
		flashInterval = setInterval(() => {
            if (cloudQueue) {
                terminalFlash.flush(cloudQueue + '<br>> ' + frames.next().value)
            } else {
                terminalFlash.flush('> ' + frames.next().value)
            }
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

	// 安装前校验交由统一校验组件（弹窗内 SSE 实时推送各项结果）
	installCheckPass.value = false
	installCheckDone.value = false
	installStep.value = 0
	isBack.value = false
	errorDialog.value = false
	installType.value = ''
	installShowDialog.value = true
	installAfterTips.value = []
	userStore.clearRouters()
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
							title: '提示',
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
				}, 5000)
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
	if (!installCheckPass.value || localInstalling.value) return
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

	if (!installCheckPass.value || cloudInstalling.value) return
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
            if (res.code && res.code == 601) {
                ElMessageBox.confirm(
                    '云编译服务未启动，必须在启动后进行云编译！',
                    '提示',
                    {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '重新检测',
                        cancelButtonText: '查看操作手册',
                        type: 'warning'
                    }
                ).then(() => {
                    handleCloudInstall()
                }).catch((action) => {
                    action == 'cancel' && window.open('https://doc.press.niucloud.com/php/saas-framework/use/other/third-party-cloud-compilation.html', '_blank')
                })
            } else {
                ElMessage({ message: res.msg, type: 'error' })
            }
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
                        if (item.action.indexOf('云编译任务正在排队') != -1) {
                            cloudQueue = item.action
                            installLog.push(item.action)
                            return
                        } else {
                            cloudQueue = null
                        }
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
	installCheckPass.value = false
})

// 卸载面板弹窗
const uninstallShowDialog = ref(false)

// 当前待卸载的插件标识（传给统一校验场景）
const uninstallAddonKey = ref('')

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
		// 卸载前校验交由统一校验组件：打开弹窗逐项校验，通过后自动执行卸载
		uninstallAddonKey.value = key
		uninstallShowDialog.value = true
	})
}

/**
 * 执行卸载：由统一校验组件校验通过后触发
 */
const doUninstall = () => {
	const key = uninstallAddonKey.value
	if (!key) return

	uninstallAddon({ addon: key })
		.then((res) => {
			localListFn()
			userStore.clearRouters()
			loading.value = false
			uninstallShowDialog.value = false
		})
		.catch(() => {
			loading.value = false
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
	ElMessageBox.confirm(t('cloudBuildTips'), t('warning'), {
		confirmButtonText: t('confirm'),
		cancelButtonText: t('cancel'),
		type: 'warning',
	}).then(() => {
		// 编译前校验统一由通用校验组件完成（SSE 实时推送各项结果）
		cloudCheckVisible.value = true
	})
}

// 卸载前校验由统一校验组件承担（scene=addon_uninstall），通过后执行 doUninstall()

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
	// 顶部框架栏常驻：未勾选任何应用时，默认升级全部可更新应用
	const selected = batchUpgradeApp.value.length
		? batchUpgradeApp.value
		: localList.value.recentlyUpdated.map((item: any) => item.key)
	const appKeys = deepClone(selected)
	if (frameworkHasUpdate.value && !appKeys.includes('niucloud-admin')) {
		appKeys.unshift('niucloud-admin')
	}
	if (!appKeys.length) {
		ElMessage({
			message: '当前已是最新版',
			type: 'error',
			duration: 5000,
		})
		return
	}
	upgradeAddonFn({ key: appKeys.toString() })
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


/** 框架 logo：站点静态资源里的 app.ico —— 顶部框架栏与框架详情共用同一份，避免两处各写一个路径 */
const frameworkIcon = '/static/resource/icon/app.ico'

/**
 * 详情头部展示的图标
 *
 * 框架在应用列表里的 key 是 niucloud-admin，它没有云端图标 ——
 * 顶部框架栏「更新记录」入口造的那条数据里压根没有 icon，
 * 直接用 detailAddon.icon 会落到兜底图 icon-addon-one 上，
 * 和外面的框架栏（app.ico）不是一个东西。
 */
const detailIcon = computed(() =>
	detailAddon.value?.key === 'niucloud-admin' ? frameworkIcon : detailAddon.value?.icon || ''
)

const detailInstalled = computed(() => {
	const installInfo = detailAddon.value?.install_info
	return Boolean(installInfo && Object.keys(installInfo).length)
})
const detailCanUpgrade = computed(() => {
	const installInfo = detailAddon.value?.install_info
	if (!installInfo || !Object.keys(installInfo).length) return false
	const latest = detailAddon.value?.version
	return Boolean(latest) && installInfo.version != latest && isNeedUpgrade(installInfo.version, latest)
})

/** 当前详情打开的是不是框架（应用列表里框架的 key 是 niucloud-admin） */
const isFrameworkDetail = computed(() => detailAddon.value?.key === 'niucloud-admin')
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
}

/** 抽屉关闭动画结束后再清理数据，避免关闭过程中内容闪空 */
const resetDetail = () => {
	if (isShowDetail.value) return
	detailAddon.value = null
	detailVersionList.value = []
}

/** 「文件差异」弹框：只有已安装、且不是框架的条目才有本地文件可比对 */
const diffVisible = ref(false)
const diffTarget = ref('')
const diffIcon = ref('')

/**
 * 是否显示「文件差异」入口
 *
 * - 未安装 / 未下载的条目本地没有文件，检测没有意义；
 * - is_local = 本地自有（云端商城里没有这个应用）：云端没有它的官方包，
 *   清单与官方内容都取不到，比不了；
 * - 框架在应用列表里的 key 是 niucloud-admin，而检测目标只认 framework，
 *   直接传会被后端以「未找到检测目标」拒绝，所以先不对框架开放。
 */
const canDiff = (row: any) => {
	if (!row?.key || row.key === 'niucloud-admin') return false
	// 本地自有应用（is_local=true）云端没有官方包，校验无从比对
	if (row.is_local) return false
	return Boolean(row.install_info && Object.keys(row.install_info).length)
}

const openDiff = (row: any) => {
	diffTarget.value = row.key
	diffIcon.value = row.icon
	diffVisible.value = true
}

/**
 * 卡片：是否「已安装且已是最新」
 *
 * 成立时右侧不再单独报「最新版本」（两个值本来就相同），
 * 而是在「当前版本 x.y.z」后面紧跟一个「最新」标记。
 *
 * ★ 必须要求「已安装」：未安装的应用没有当前版本可言（那种情况下
 *   当前与最新两个值只是都取了 row.version），说它「已经是最新版本」是错的。
 */
const cardUpToDate = (row: any) => {
	const installInfo = row?.install_info
	const installed = Boolean(installInfo && Object.keys(installInfo).length)

	return installed && installInfo.version === row.version
}

/**
 * 框架的「文件差异」入口（顶部框架栏的按钮，以及框架详情底部的「校验」）
 *
 * ★ 目标标识必须传 framework：应用列表里框架的 key 是 niucloud-admin，
 *   那是商城 / 升级体系用的标识，检测接口只认 framework，
 *   传过去会被后端直接以「未找到检测目标」拒掉（canDiff 里那段注释说的就是这件事）。
 * 图标传 frameworkIcon：框架栏和框架详情显示的都是它，弹框里也保持一致，
 * 不再落到占位图上（原来那条「用的是矢量图标、没有图片地址」的说明已过时）。
 */
const openFrameworkDiff = () => {
	diffTarget.value = 'framework'
	diffIcon.value = frameworkIcon
	diffVisible.value = true
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

	.cell {
		height: 100%;
	}
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
	top: 0;
	width: 1px;
	height: 100%;
	transform: translateY(-100%);
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

/* ============================================================
   应用卡片（参考应用中心设计稿换肤，沿用蓝色品牌色）
   ============================================================ */
.am-table-key {
	display: inline-block;
	max-width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: bottom;
}

.am-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
	gap: var(--cmp-module-card-gap);
	align-items: stretch;
	/* 与框架栏、筛选区同一档：列表页表格间距 */
	margin: var(--cmp-table-page-section-gap) 0;
}

.am-card {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
	background: var(--cmp-module-card-bg);
	border: var(--cmp-module-card-border-width) solid var(--cmp-module-card-border-color);
	border-radius: var(--cmp-module-card-radius);
	color: var(--cmp-module-card-text);
	padding: var(--cmp-module-card-padding) var(--cmp-module-card-padding) var(--sys-space-3);
	cursor: pointer;
	transition: border-color .2s, box-shadow .2s, transform .2s;

	/* 顶部渐变高亮条：悬浮时淡入，与站点列表卡片保持一致 */
	&::before {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: var(--cmp-module-card-accent-height);
		background: linear-gradient(90deg, var(--cmp-module-card-accent-start), var(--cmp-module-card-accent-end));
		opacity: 0;
		transition: opacity .3s;
	}
}

.am-card:hover {
	border-color: var(--cmp-module-card-hover-border-color);
	box-shadow: var(--cmp-module-card-hover-shadow);
	transform: translateY(var(--cmp-module-card-hover-offset));

	&::before {
		opacity: 1;
	}
}

.am-card--selected {
	border-color: var(--sys-color-primary);
	box-shadow: 0 0 0 3px var(--sys-color-primary-soft);
}

/*
 * 被筛选条件排除的卡片
 *
 * ★ 不能用 Tailwind 的 .hidden：它权重只有 (0,1,0)，而 .am-card 经 scoped 编译后是
 *   .am-card[data-v-x]（0,2,0），display: flex 会把 display: none 盖掉，卡片照样显示。
 *   这里用「.am-card + 状态类」两级选择器，权重高于 .am-card 自身，必定生效。
 */
.am-card.is-hidden {
	display: none;
}

.am-card__head {
	display: grid;
	/* 三列：图标 / 名称+标识 / 右上角状态。第三列 auto，宽度只够放下状态标签 */
	grid-template-columns: 44px 1fr auto;
	column-gap: 12px;
	row-gap: 6px;
}

.am-card__tile {
	grid-row: 1 / span 2;
	width: 44px;
	height: 44px;
	/* 图标块跟随卡片内的圆角梯度，与站点卡片一致 */
	border-radius: var(--sys-radius-md);
	background: var(--sys-color-primary-soft);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	flex: none;
}

.am-card__logo {
	width: 100%;
	height: 100%;
}

/* 让图标铺满整个图标块（cover 裁切，不留白边） */
:deep(.am-card__logo .el-image__inner) {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.am-card__logo-default {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.am-card__info {
	min-width: 0;
}

.am-card__title-row {
	display: flex;
	align-items: center;
	gap: 6px;
	min-width: 0;
}

.am-card__title {
	font-size: var(--sys-font-size-base);
	font-weight: var(--sys-font-weight-semibold);
	color: var(--sys-color-text-primary);
	line-height: 20px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.am-badge {
	flex: none;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 18px;
	padding: 0 7px;
	border-radius: var(--sys-radius-sm);
	font-size: 11px;
	line-height: 1;
	color: #fff;
	white-space: nowrap;
}

.am-badge--app {
	background: #f3321d;
}

.am-badge--addon {
	background: #8031f0;
}

/* 应用标识那一行（状态标签已挪到右上角 .am-card__status） */
.am-card__key-row {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: nowrap;
	margin-top: 6px;
	min-width: 0;
}

/*
 * 应用状态（可升级 / 已安装 / 兼容提示 …）：卡片右上角
 *
 * 位于 head 的第三列，align-self: center —— 该行正是「应用名称 + 应用标识」两行，
 * 所以状态标签与这两行整体垂直居中。
 * 标签不压缩（见下方 flex: none）：空间不够时由标识自己出省略号（.am-card__key）。
 */
.am-card__status {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: nowrap;
	align-self: center;
}

.am-card__status .am-pill {
	flex: none;
}

.am-pill {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	height: 20px;
	padding: 0 8px;
	border-radius: var(--sys-radius-full);
	font-size: 11.5px;
	line-height: 1;
	white-space: nowrap;
}

.am-pill--ok {
	color: #03c92e;
	background: rgba(3, 201, 46, 0.1);
}

.am-pill--warn {
	color: #f09000;
	background: rgba(240, 144, 0, 0.12);
}

.am-pill--muted {
	color: #9699b6;
	background: #f4f5f7;
}

.am-pill--danger {
	color: #f3321d;
	background: rgba(243, 50, 29, 0.1);
}

.am-pill__dot {
	width: 5px;
	height: 5px;
	border-radius: var(--sys-radius-full);
	background: currentColor;
	flex: none;
}

.am-card__desc {
	/* 与上方名称/徽标的间距收紧：卡片 gap 10px + 此处 -4px = 6px */
	margin-top: -4px;
	font-size: var(--sys-font-size-xs);
	line-height: 1.5;
	color: var(--sys-color-text-secondary);
	min-height: 18px;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	word-break: break-all;
}

.am-card__meta {
	/* 与上方简介的间距收紧：卡片 gap 10px + 此处 -4px = 6px */
	margin-top: -4px;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	gap: 8px;
	font-size: var(--sys-font-size-xs);
	color: var(--sys-color-text-secondary);
	min-width: 0;
}

/* 当前版本 / 最新版本 各占一半（flex-basis: 0），多张卡片的标签因此能上下对齐 */
.am-card__meta-item {
	display: flex;
	align-items: center;
	gap: 6px;
	flex: 1 1 0;
	min-width: 0;
}

.am-card__meta-k {
	color: var(--sys-color-text-secondary);
	flex: none;
}

.am-card__meta-v {
	font-variant-numeric: tabular-nums;
	color: var(--sys-color-text-regular);
	white-space: nowrap;
	/* ★ 版本值不压缩、也不设上限：当前版本 / 最新版本必须完整显示（版本号本身很短，不会撑破一行）。
	   标识已挪到上面状态标签那一行，这行不再有需要收省略号的内容 */
	flex: none;
}

.am-card__meta-v.is-new {
	color: var(--sys-color-warning);
	font-weight: var(--sys-font-weight-semibold);
}

/*
 * 「最新」标记
 *
 * 行内元素，嵌在版本值里、靠一个文本空格跟在版本号后面（见模板）。
 * 配色与卡片右上角「可升级」状态标签（.am-pill--warn）一致；尺寸不跟它对齐 ——
 * 那是 20px 高的胶囊，直接套会把版本这一行撑高，这里只借用配色。
 */
.am-card__meta-uptodate {
	padding: 1px 6px;
	border-radius: var(--sys-radius-sm);
	color: #f09000;
	background: rgba(240, 144, 0, 0.12);
}

.am-card__sep {
	width: 1px;
	height: 9px;
	background: var(--sys-color-border-default);
	flex: none;
}

/*
 * 应用标识（卡片第二行）
 *
 * ★ 它才是这一行里「可以被压缩」的元素：状态标签已挪到右上角且不压缩（见 .am-card__status），
 *   标识却可能很长（如 template_flower_industry）。所以给它 min-width: 0 —— 空间不够时
 *   由它自己出省略号，而不是把整行挤到第二行（.am-card__key-row 是 flex-wrap: nowrap）。
 */
.am-card__key {
	flex: 0 1 auto;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: var(--sys-color-text-secondary);
	/* 12px：比右上角的状态标签（11.5px）略大一档，作为可省略的次要信息 */
	font-size: 12px;
}

/*
 * 卡片底部操作区
 * 不使用 margin-top:auto 压底：卡片被栅格拉伸后多出的高度会全部堆在
 * 「版本行 → 操作区」之间，导致间距忽大忽小。这里让内容自然堆叠，
 * 多余高度留在卡片底部（与 padding 融为一体），行内间距保持恒定。
 */
.am-card__foot {
	/* 与卡片 padding-bottom 保持一致（均为 --sys-space-3），按钮上下留白等距 */
	padding-top: var(--sys-space-3);
	border-top: 1px solid var(--sys-color-border-lighter);
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
	min-height: 32px;
}

.am-card__foot-left {
	display: flex;
	align-items: center;
	min-width: 0;
}

.am-card__check {
	height: auto;
	margin-right: 0;
}

.am-card__acts {
	display: flex;
	align-items: center;
	gap: 4px;
	margin-left: auto;
	flex-wrap: wrap;
	justify-content: flex-end;
}

.am-act.el-button {
	height: 26px;
	padding: 0 8px;
	margin-left: 0;
	font-size: 12px;
	border-color: transparent;
	border-radius: var(--sys-radius-sm) !important;
}

.am-act.el-button > span {
	display: inline-flex;
	align-items: center;
}

.am-act--primary.el-button {
	color: #0766f5;
	background: #eaf2ff;
}

.am-act--primary.el-button:hover {
	color: #fff;
	background: #0766f5;
}

.am-act--ok.el-button {
	color: #03c92e;
	background: rgba(3, 201, 46, 0.1);
}

.am-act--ok.el-button:hover {
	color: #fff;
	background: #03c92e;
}

.am-act--verify.el-button {
	color: #0766f5;
	background: #f4f5f7;
}

.am-act--verify.el-button:hover {
	color: #0766f5;
	background: #eaf2ff;
}

.am-act--muted.el-button {
	color: #4f516d;
	background: #f4f5f7;
}

.am-act--muted.el-button:hover {
	color: #f3321d;
	background: rgba(243, 50, 29, 0.08);
}

@media (max-width: 560px) {
	.am-grid {
		grid-template-columns: 1fr;
	}
}

@media (prefers-reduced-motion: reduce) {
	.am-card {
		transition: none;
	}

	.am-card:hover {
		transform: none;
	}
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

/* ============================================================
   顶部框架信息栏（常驻）
   ============================================================ */
.am-framework {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--sys-space-5);
	flex-wrap: wrap;
	/* 与站点列表一致的白底卡片：圆角、边框、内边距 */
	padding: var(--sys-space-4);
	margin-bottom: var(--cmp-table-page-section-gap);
	background: var(--cmp-card-bg, var(--el-bg-color-overlay));
	border: 1px solid var(--sys-color-border-default);
	border-radius: var(--sys-radius-lg);
}

/* ---- 设计稿通用按钮 ---- */
.am-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	height: 33px;
	padding: 0 13px;
	border-radius: var(--sys-radius-md);
	font-size: 13px;
	font-weight: 500;
	line-height: 1;
	white-space: nowrap;
	border: 1px solid transparent;
	background: transparent;
	cursor: pointer;
	transition: background 0.14s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.14s cubic-bezier(0.16, 1, 0.3, 1),
		color 0.14s cubic-bezier(0.16, 1, 0.3, 1), transform 0.14s cubic-bezier(0.16, 1, 0.3, 1);
}

.am-btn:active {
	transform: scale(0.975);
}

.am-btn svg {
	flex: none;
}

.am-btn--ghost {
	color: #4f516d;
}

.am-btn--ghost:hover {
	background: #f1f2ef;
	color: #1d1f3a;
}

.am-btn--outline {
	border-color: #d3d7d0;
	color: #1d1f3a;
	background: #fff;
}

.am-btn--outline:hover {
	border-color: #9699b6;
	background: #f9faf8;
}

.am-btn--primary {
	background: #0766f5;
	color: #fff;
	box-shadow: 0 1px 2px rgba(29, 31, 58, 0.06);
}

.am-btn--primary:hover {
	background: #0553cc;
}

.am-btn--primary:disabled {
	opacity: 0.45;
	pointer-events: none;
}

.am-btn--danger {
	color: #f3321d;
}

.am-btn--danger:hover {
	background: rgba(243, 50, 29, 0.08);
	color: #f3321d;
}

/* ---- 工具栏：页签 + 搜索（参考设计稿） ---- */
.am-toolbar {
	display: flex;
	align-items: center;
	gap: 14px;
	flex-wrap: wrap;
}

@media (max-width: 900px) {
	.am-toolbar__right {
		margin-left: 0;
		width: 100%;
	}

	.am-search {
		flex: 1;
	}

	.am-search input {
		width: 100%;
	}
}

.am-tabs {
	display: flex;
	align-items: center;
	gap: 2px;
	flex-wrap: wrap;
}

.am-tab {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	height: 31px;
	padding: 0 12px;
	border-radius: var(--sys-radius-md);
	font-size: 13px;
	font-weight: 500;
	color: #4f516d;
	background: transparent;
	border: 0;
	cursor: pointer;
	transition: background 0.14s cubic-bezier(0.16, 1, 0.3, 1), color 0.14s cubic-bezier(0.16, 1, 0.3, 1);
}

.am-tab:hover {
	background: var(--el-color-primary-light-9);
	color: var(--el-color-primary);
}

.am-tab.is-active {
	background: var(--el-color-primary);
	color: #fff;
	font-weight: 600;
}

.am-tab__n {
	font-variant-numeric: tabular-nums;
	font-size: 11px;
	font-weight: 500;
	min-width: 18px;
	height: 17px;
	padding: 0 5px;
	border-radius: var(--sys-radius-full);
	display: inline-grid;
	place-items: center;
	background: #f4f5f7;
	color: #9699b6;
}

.am-tab.is-active .am-tab__n {
	background: rgba(255, 255, 255, 0.24);
	color: #fff;
}

.am-tab__n--warn {
	background: rgba(240, 144, 0, 0.14);
	color: #f09000;
}

.am-tab.is-active .am-tab__n--warn {
	background: #fff;
	color: #f09000;
}

.am-toolbar__right {
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 8px;
}

/*
 * 应用类型下拉
 *
 * ★ 原来是原生 <select>：闭合态可以靠 CSS 画出来，但点开的那张列表是**系统菜单**
 *   （方角、系统字体、与主题无关的灰底），和项目里其他下拉（Element Plus 的 el-select）
 *   不是一个观感 —— 这就是「展开后不匹配」的原因，而且系统菜单 CSS 根本改不到。
 *   换成 el-select 后，展开面板由 el-select-dropdown 渲染，直接继承全局样式；
 *   这里只负责把「触发框」对齐工具栏规格：33px 高、13px 字、#e4e6e1 边框。
 */
.am-select {
	/* Element Plus 用这个变量控制控件高度；改成 33px 才能与相邻的搜索框/按钮齐平 */
	--el-component-size: 33px;
	width: 108px;
	font-size: 13px;

	:deep(.el-select__wrapper) {
		min-height: 33px;
		padding: 0 8px 0 12px;
		border-radius: var(--sys-radius-md);
		/* el-select 的边框是 inset 阴影而非 border，这里换成与工具栏其他控件同色的值 */
		box-shadow: 0 0 0 1px #e4e6e1 inset;
		transition: box-shadow 0.14s ease;
	}

	:deep(.el-select__wrapper:hover) {
		box-shadow: 0 0 0 1px #9699b6 inset;
	}

	/* 聚焦反馈：与 .am-search input:focus 同一套主色 */
	:deep(.el-select__wrapper.is-focused) {
		box-shadow: 0 0 0 1px #0766f5 inset, 0 0 0 3px rgba(7, 102, 245, 0.14);
	}

	/* 选中值用正文色，空值（显示「应用类型」）用占位色，与搜索框 placeholder 一致 */
	:deep(.el-select__placeholder) {
		color: #1d1f3a;
	}

	:deep(.el-select__placeholder.is-transparent) {
		color: #9699b6;
	}
}

.am-search {
	position: relative;
	display: block;
}

.am-search svg {
	position: absolute;
	left: 9px;
	top: 50%;
	transform: translateY(-50%);
	color: #9699b6;
	pointer-events: none;
}

.am-search input {
	width: 248px;
	height: 33px;
	padding: 0 12px 0 31px;
	border-radius: var(--sys-radius-md);
	background: #fff;
	border: 1px solid #e4e6e1;
	font-size: 13px;
	color: #1d1f3a;
	transition: border-color 0.14s ease, box-shadow 0.14s ease;
}

.am-search input::-webkit-search-cancel-button {
	display: none;
}

.am-search input::placeholder {
	color: #9699b6;
}

.am-search input:focus {
	outline: none;
	border-color: #0766f5;
	box-shadow: 0 0 0 3px rgba(7, 102, 245, 0.14);
}

/* 搜索按钮：与搜索框同高（.am-btn 本就是 33px / 9px 圆角），只保证别被 flex 压扁 */
.am-search__btn {
	flex: 0 0 auto;
	padding: 0 16px;
}

.am-framework__brand {
	display: flex;
	align-items: center;
	gap: 11px;
	min-width: 0;
}

.am-framework__mark {
	width: 30px;
	height: 30px;
	border-radius: var(--sys-radius-md);
	flex: none;
	display: grid;
	place-items: center;
	/* 原来这里是深底 + 白色描边的矢量图标；换成 app.ico 后让位给图片本身，
	   只留一圈细描边 —— 图标若是浅色，浅背景上才看得出边界 */
	background: #fff;
	overflow: hidden;
	box-shadow: inset 0 0 0 1px #ebedf0;
}

.am-framework__mark img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.am-framework__info {
	min-width: 0;
}

.am-framework__name {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 15.5px;
	font-weight: 600;
	letter-spacing: -0.01em;
	line-height: 22px;
	color: #1d1f3a;
}

.am-framework__meta {
	margin-top: 1px;
	font-size: 11.5px;
	letter-spacing: -0.01em;
	color: #9699b6;
	font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;
}

.am-pill-status {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	height: 20px;
	padding: 0 8px;
	border-radius: var(--sys-radius-full);
	font-size: 11.5px;
	font-weight: 500;
	letter-spacing: 0.01em;
	white-space: nowrap;
}

.am-pill-status.is-ok {
	color: #03c92e;
	background: rgba(3, 201, 46, 0.12);
}

.am-pill-status.is-warn {
	color: #f09000;
	background: rgba(240, 144, 0, 0.14);
}

.am-pill-status__dot {
	width: 5px;
	height: 5px;
	border-radius: var(--sys-radius-full);
	background: currentColor;
	flex: none;
}

.am-pill-status.is-ok .am-pill-status__dot {
	animation: am-pill-pulse 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}

@keyframes am-pill-pulse {
	0%,
	100% {
		opacity: 1;
		transform: scale(1);
	}

	50% {
		opacity: 0.45;
		transform: scale(0.82);
	}
}

.am-framework__ops {
	display: flex;
	align-items: center;
	gap: 8px;
	flex: none;
}

/* ============================================================
   应用详情抽屉
   ============================================================ */
.am-detail {
	display: flex;
	flex-direction: column;
	flex: 1;
	width: 100%;
	min-height: 0;
	background: #fff;
}

.am-detail__head {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 12px;
	padding: 18px 20px 14px;
	border-bottom: 1px solid #f1f2f4;
	flex: none;
}

.am-detail__head-main {
	display: flex;
	align-items: center;
	min-width: 0;
}

.am-detail__tile {
	width: 54px;
	height: 54px;
	border-radius: var(--sys-radius-md);
	background: var(--sys-color-primary-soft);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	margin-right: 12px;
	flex: none;
}

.am-detail__logo {
	width: 100%;
	height: 100%;
}

/* 让图标铺满整个图标块（cover 裁切，不留白边）—— 与卡片 .am-card__logo 同一套 */
:deep(.am-detail__logo .el-image__inner) {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

/* 兜底图也铺满，别在块里留一圈底色 */
.am-detail__tile-default {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.am-detail__ident {
	min-width: 0;
}

.am-detail__title {
	margin: 0;
	font-size: 16px;
	font-weight: 600;
	line-height: 22px;
	color: #1d1f3a;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.am-detail__key {
	margin: 2px 0 0;
	font-size: 11.5px;
	line-height: 18px;
	color: #9699b6;
	font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.am-detail__badges {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: wrap;
	margin-top: 8px;
}

.am-detail__close {
	width: 28px;
	height: 28px;
	border-radius: var(--sys-radius-md);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #9699b6;
	background: transparent;
	border: 0;
	cursor: pointer;
	flex: none;
	transition: background 0.14s ease, color 0.14s ease;

	&:hover {
		background: #f4f5f7;
		color: #1d1f3a;
	}
}

.am-detail__body {
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	/* 下内边距为 0：让最后的「更新历史」块底边直接贴到操作区上方那条分隔线
	   （上、左右仍留内边距，内容不贴边）；这 24px 也顺势变成了列表可用的高度 */
	padding: 18px 20px 0;
}

/* 其余块按内容高度占位：既不拉伸也不被压缩，弹性空间全留给「更新历史」 */
.am-detail__body > .am-detail__block {
	flex: none;
}

/*
 * 「更新历史」是最后一个块：吃掉剩余高度
 *
 * 它的高度 = 抽屉可用高度 − 其他块，所以这块区域恰好是「访问应用」到操作区上方
 * 那条分隔线之间的全部空间，抽屉自身不出现滚动条（滚动条只可能出现在这块内部）。
 */
.am-detail__body > .am-detail__block:last-child {
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 0;
}

.am-detail__desc {
	margin: 0 0 20px;
	font-size: 12.5px;
	line-height: 1.62;
	color: #4f516d;
	word-break: break-word;
}

.am-detail__block + .am-detail__block {
	margin-top: 20px;
}

.am-detail__block-title {
	margin: 0 0 9px;
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.08em;
	color: #9699b6;
}

.am-kv {
	display: flex;
	flex-direction: column;
	margin: 0;
	border: 1px solid #ebeef5;
	border-radius: var(--sys-radius-lg);
	overflow: hidden;
	background: #fafbfc;
}

.am-kv > div {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 14px;
	padding: 8px 11px;
	border-bottom: 1px solid #ebeef5;
	font-size: 12px;
}

.am-kv > div:last-child {
	border-bottom: 0;
}

.am-kv dt {
	flex: none;
	color: #9699b6;
}

.am-kv dd {
	margin: 0;
	min-width: 0;
	text-align: right;
	font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;
	font-size: 11.5px;
	color: #1d1f3a;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.am-kv__link {
	margin-left: 8px;
	font-family: inherit;
	color: #0766f5;
	cursor: pointer;
}

.am-kv__link:hover {
	color: #0553cc;
}

.am-chips {
	display: flex;
	flex-wrap: wrap;
	gap: 6px;
}

.am-chip {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	padding: 6px 10px;
	border: 0;
	border-radius: var(--sys-radius-sm);
	font-size: 11.5px;
	color: #4f516d;
	background: #f4f5f7;
	cursor: pointer;
	transition: background 0.14s ease, color 0.14s ease;
}

.am-chip:hover {
	background: #eaf2ff;
	color: #0766f5;
}

.am-log-wrap {
	display: flex;
	flex-direction: column;
	/* 撑满「更新历史」块（见 .am-detail__body > .am-detail__block:last-child）：
	   打开详情那几秒（版本列表还在请求）也占住位置，短列表同样撑满，
	   列表长了在块内滚动。
	   ★ 不设 max-height —— 设了会把这块压回固定高度；
	   ★ 不设 min-height —— 设了它就压不下去，整体高度超过抽屉，body 必然出现滚动条。
	   撑满靠 flex: 1，不靠 min-height。
	   下内边距留在这里（而不是挂在 .am-detail__body 上）：滚动区本身仍然抵到
	   操作区上方那条分隔线，而列表最后一条与它之间留出呼吸空间；列表长到需要
	   滚动时，这段空隙也在可滚动区域内，滚到底不会被裁掉。 */
	flex: 1;
	min-height: 0;
	overflow-y: auto;
	padding-bottom: 20px;
}

.am-log {
	/* 保持自然高度：否则外层 .am-log-wrap 变 flex 后会把长列表压扁，
	   内容溢出却不产生滚动条。滚动交给外层容器 */
	flex: none;
	display: flex;
	flex-direction: column;
	gap: 14px;
	margin: 0 0 0 3px;
	padding: 0;
	list-style: none;
	border-left: 1px solid #e4e6e1;
}

.am-log li {
	position: relative;
	padding-left: 15px;
}

.am-log li::before {
	content: "";
	position: absolute;
	left: -3.5px;
	top: 5.5px;
	width: 6px;
	height: 6px;
	border-radius: var(--sys-radius-full);
	background: #d3d7d0;
	box-shadow: 0 0 0 3px #fff;
}

.am-log li:first-child::before {
	background: #0766f5;
}

.am-log__head {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 12px;
	font-weight: 600;
	color: #1d1f3a;
}

.am-log__time {
	font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace;
	font-size: 11px;
	font-weight: 400;
	color: #9699b6;
}

.am-log__body {
	margin-top: 3px;
	font-size: 12px;
	line-height: 1.55;
	color: #4f516d;
	word-break: break-word;

	:deep(ul) {
		list-style: disc;
		padding-left: 16px;
	}

	:deep(ol) {
		list-style: decimal;
		padding-left: 16px;
	}
}

.am-log__empty {
	/* 空态（加载中也是空态，上面盖着 loading 遮罩）：占满这块高度并居中，
	   别让中间空一大片、提示字却挤在顶上 */
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	margin: 0;
	padding: 12px 0;
	font-size: 12px;
	color: #9699b6;
}

.am-detail__foot {
	display: flex;
	align-items: center;
	gap: 8px;
	flex-wrap: wrap;
	padding: 12px 20px;
	background: #fafbfc;
	border-top: 1px solid #ebeef5;
	flex: none;
}

.am-detail__spacer {
	flex: 1;
}

/* ============================================================
   顶部筛选区（页签 + 搜索）：与站点列表筛选区一致的白底卡片
   ============================================================ */
/* 列表模式与卡片栅格同一档表格间距；清掉 .table-panel 自带的上边距，避免两段间距叠在一起 */
.am-list {
	margin-top: var(--cmp-table-page-section-gap);

	> .table-panel {
		margin-top: 0 !important;
	}
}

.app-head {
	box-sizing: border-box;
	/* 底部留白收窄：页签贴住卡片底边，与改造前 el-card 的几何一致 */
	padding: var(--sys-space-4);
	background-color: var(--cmp-card-bg, var(--el-bg-color-overlay));
	border: 1px solid var(--sys-color-border-default);
	border-radius: var(--sys-radius-lg);
	overflow: hidden;
}
</style>

<style>
.el-empty .el-empty__image {
	width: auto;
}

/* 应用详情抽屉：el-drawer 内部结构不由本组件渲染，需用非 scoped 样式覆盖 */
.am-drawer {
	max-width: 100vw;
}
.am-drawer .el-drawer__body {
	padding: 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
</style>
