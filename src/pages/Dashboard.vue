<template>
    <div>
        <v-row v-if="isMobile">
            <v-col>
                <status-panel></status-panel>
                <template v-for="component in mobileLayout">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-mobileLayout-'+component.name"></component>
                </template>
            </v-col>
        </v-row>
        <v-row v-else-if="isTablet">
            <v-col class="col-6">
                <status-panel></status-panel>
                <template v-for="component in tabletLayout1">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-tabletLayout1-'+component.name"></component>
                </template>
            </v-col>
            <v-col class="col-6">
                <template v-for="component in tabletLayout2">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-tabletLayout2-'+component.name"></component>
                </template>
            </v-col>
        </v-row>
        <v-row v-else-if="isDesktop">
            <v-col class="col-5">
                <status-panel></status-panel>
                <template v-for="component in desktopLayout1">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-desktopLayout1-'+component.name"></component>
                </template>
            </v-col>
            <v-col class="col-7">
                <template v-for="component in desktopLayout2">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-desktopLayout2-'+component.name"></component>
                </template>
            </v-col>
        </v-row>
        <v-row v-else-if="isWidescreen">
            <v-col class="col-3">
                <status-panel></status-panel>
                <template v-for="component in widescreenLayout1">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-desktopLayout1-'+component.name"></component>
                </template>
            </v-col>
            <v-col class="col-5">
                <template v-for="component in widescreenLayout2">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-desktopLayout2-'+component.name"></component>
                </template>
            </v-col>
            <v-col class="col-4">
                <template v-for="component in widescreenLayout3">
                    <component v-bind:is="extractPanelName(component.name)" :panel-id="extractPanelId(component.name)" :key="'dashboard-desktopLayout3-'+component.name"></component>
                </template>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">

import Component from 'vue-class-component'
import {Mixins} from 'vue-property-decorator'
import MinSettingsPanel from '@/components/panels/MinSettingsPanel.vue'
import KlippyStatePanel from '@/components/panels/KlippyStatePanel.vue'
import MoonrakerStatePanel from '@/components/panels/MoonrakerStatePanel.vue'
import StatusPanel from '@/components/panels/StatusPanel.vue'
import ToolsPanel from '@/components/panels/ToolsPanel.vue'
import WebcamPanel from '@/components/panels/WebcamPanel.vue'
import ZoffsetPanel from '@/components/panels/ZoffsetPanel.vue'
import ControlPanel from '@/components/panels/ControlPanel.vue'
import MacrosPanel from '@/components/panels/MacrosPanel.vue'
import MacrogroupPanel from '@/components/panels/MacrogroupPanel.vue'
import MiscellaneousPanel from '@/components/panels/MiscellaneousPanel.vue'
import MiniconsolePanel from '@/components/panels/MiniconsolePanel.vue'
import PrintsettingsPanel from '@/components/panels/PrintsettingsPanel.vue'
import DashboardMixin from '@/components/mixins/dashboard'

@Component({
    components: {
        PrintsettingsPanel,
        MiniconsolePanel,
        MiscellaneousPanel,
        ControlPanel,
        MacrosPanel,
        MacrogroupPanel,
        ZoffsetPanel,
        WebcamPanel,
        ToolsPanel,
        StatusPanel,
        MoonrakerStatePanel,
        KlippyStatePanel,
        MinSettingsPanel
    }
})
export default class PageDashboard extends Mixins(DashboardMixin) {
    get mobileLayout() {
        let panels = this.$store.getters['gui/getPanels']('mobileLayout')
        panels = panels.concat(this.missingPanelsMobile)
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get tabletLayout1() {
        let panels = this.$store.getters['gui/getPanels']('tabletLayout1')
        panels = panels.concat(this.missingPanelsTablet)
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get tabletLayout2() {
        let panels = this.$store.getters['gui/getPanels']('tabletLayout2')
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get desktopLayout1() {
        let panels = this.$store.getters['gui/getPanels']('desktopLayout1')
        panels = panels.concat(this.missingPanelsDesktop)
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get desktopLayout2() {
        let panels = this.$store.getters['gui/getPanels']('desktopLayout2')
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get widescreenLayout1() {
        let panels = this.$store.getters['gui/getPanels']('widescreenLayout1')
        panels = panels.concat(this.missingPanelsWidescreen)
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get widescreenLayout2() {
        let panels = this.$store.getters['gui/getPanels']('widescreenLayout2')
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    get widescreenLayout3() {
        let panels = this.$store.getters['gui/getPanels']('widescreenLayout3')
        panels = panels.filter((element: any) => element.visable)

        return panels
    }

    extractPanelName(name: string) {
        return name.split('_')[0]+'-panel'
    }

    extractPanelId(name: string) {
        return name.split('_')[1] ?? null
    }
}
</script>